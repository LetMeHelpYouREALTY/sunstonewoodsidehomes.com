'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { AmenityMapFallback } from '@/components/amenities/amenity-map-fallback'
import {
  AMENITY_CATEGORIES,
  AMENITY_SEARCH_RADIUS_METERS,
  COMMUNITY_CENTER,
  COMMUNITY_NAME,
  COMMUNITY_STREET_ADDRESS,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  type AmenityCategoryId,
} from '@/lib/amenities-config'

type AmenityMapInteractiveProps = {
  compact?: boolean
}

type PlaceResult = {
  id: string
  name: string
  address: string
  rating?: number
  lat: number
  lng: number
  directionsUrl: string
}

let mapsScriptPromise: Promise<void> | null = null

function detachMarker(marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker) {
  if (marker instanceof google.maps.Marker) {
    marker.setMap(null)
    return
  }
  marker.map = null
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser'))
  }

  if (typeof window.google?.maps?.importLibrary === 'function') {
    return Promise.resolve()
  }

  if (mapsScriptPromise) {
    return mapsScriptPromise
  }

  mapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps-loader="true"]',
    )
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Maps script failed')))
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places,marker&loading=async`
    script.async = true
    script.defer = true
    script.dataset.googleMapsLoader = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Maps script failed'))
    document.head.appendChild(script)
  })

  return mapsScriptPromise
}

function buildDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export function AmenityMapInteractive({ compact = false }: AmenityMapInteractiveProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const communityMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(
    null,
  )
  const placeMarkersRef = useRef<
    (google.maps.marker.AdvancedMarkerElement | google.maps.Marker)[]
  >([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>('parks')
  const [places, setPlaces] = useState<PlaceResult[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [searchPending, setSearchPending] = useState(false)

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach((marker) => {
      detachMarker(marker)
    })
    placeMarkersRef.current = []
  }, [])

  const showInfoWindow = useCallback(
    (map: google.maps.Map, anchor: google.maps.MVCObject, place: PlaceResult) => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow()
      }
      const ratingLine =
        place.rating !== undefined ? `<p style="margin:4px 0">Rating: ${place.rating.toFixed(1)}</p>` : ''
      infoWindowRef.current.setContent(
        `<div style="max-width:240px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.4">
          <strong>${place.name}</strong>
          ${ratingLine}
          <p style="margin:4px 0">${place.address}</p>
          <a href="${place.directionsUrl}" target="_blank" rel="noopener noreferrer">Directions</a>
        </div>`,
      )
      infoWindowRef.current.open({ map, anchor })
    },
    [],
  )

  const renderPlaceMarkers = useCallback(
    (map: google.maps.Map, results: PlaceResult[]) => {
      clearPlaceMarkers()
      results.forEach((place) => {
        const position = { lat: place.lat, lng: place.lng }
        let marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker

        if (GOOGLE_MAPS_MAP_ID && google.maps.marker?.AdvancedMarkerElement) {
          marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position,
            title: place.name,
          })
        } else {
          marker = new google.maps.Marker({
            map,
            position,
            title: place.name,
          })
        }

        const open = () => showInfoWindow(map, marker as google.maps.MVCObject, place)
        google.maps.event.addListener(marker, 'click', open)

        placeMarkersRef.current.push(marker)
      })
    },
    [clearPlaceMarkers, showInfoWindow],
  )

  const searchCategory = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const map = mapRef.current
      if (!map || !window.google?.maps) {
        return
      }

      const category = AMENITY_CATEGORIES.find((item) => item.id === categoryId)
      if (!category) {
        return
      }

      setSearchPending(true)

      try {
        const placesLibrary = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary
        const center = new google.maps.LatLng(COMMUNITY_CENTER.lat, COMMUNITY_CENTER.lng)

        const { places: nearbyPlaces } = await placesLibrary.Place.searchNearby({
          fields: [
            'displayName',
            'formattedAddress',
            'location',
            'rating',
            'googleMapsURI',
          ],
          locationRestriction: {
            center,
            radius: AMENITY_SEARCH_RADIUS_METERS,
          },
          includedPrimaryTypes: category.includedPrimaryTypes,
          maxResultCount: 15,
        })

        const parsed = nearbyPlaces
          .map((place, index) => {
            const location = place.location
            if (!location) {
              return null
            }
            const lat = location.lat()
            const lng = location.lng()
            const rawName = place.displayName
            const name =
              typeof rawName === 'string'
                ? rawName
                : rawName && typeof rawName === 'object' && 'text' in rawName
                  ? String((rawName as { text?: string }).text ?? 'Nearby place')
                  : 'Nearby place'
            const address = place.formattedAddress ?? ''
            const directionsUrl =
              place.googleMapsURI ?? buildDirectionsUrl(lat, lng)
            return {
              id: `${categoryId}-${index}-${lat}-${lng}`,
              name,
              address,
              rating: place.rating ?? undefined,
              lat,
              lng,
              directionsUrl,
            }
          })
          .filter((item) => item !== null)

        setPlaces(parsed as PlaceResult[])
        renderPlaceMarkers(map, parsed)
      } catch {
        try {
          await searchWithLegacyService(map, category.includedPrimaryTypes[0] ?? 'point_of_interest')
        } catch {
          setStatus('error')
        }
      } finally {
        setSearchPending(false)
      }
    },
    [renderPlaceMarkers],
  )

  async function searchWithLegacyService(map: google.maps.Map, type: string) {
    const service = new google.maps.places.PlacesService(map)
    const center = new google.maps.LatLng(COMMUNITY_CENTER.lat, COMMUNITY_CENTER.lng)

    const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      service.nearbySearch(
        {
          location: center,
          radius: AMENITY_SEARCH_RADIUS_METERS,
          keyword: type.replace(/_/g, ' '),
        },
        (found, searchStatus) => {
          if (searchStatus === google.maps.places.PlacesServiceStatus.OK && found) {
            resolve(found)
            return
          }
          if (searchStatus === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            resolve([])
            return
          }
          reject(new Error(searchStatus))
        },
      )
    })

    const parsed = results
      .map((place, index) => {
        const location = place.geometry?.location
        if (!location) {
          return null
        }
        const lat = location.lat()
        const lng = location.lng()
        return {
          id: `legacy-${index}-${lat}`,
          name: place.name ?? 'Nearby place',
          address: place.vicinity ?? place.formatted_address ?? '',
          rating: place.rating ?? undefined,
          lat,
          lng,
          directionsUrl: buildDirectionsUrl(lat, lng),
        }
      })
      .filter((item) => item !== null) as PlaceResult[]

    setPlaces(parsed)
    renderPlaceMarkers(map, parsed)
  }

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      if (!mapContainerRef.current || !GOOGLE_MAPS_API_KEY) {
        setStatus('error')
        return
      }

      try {
        await loadGoogleMapsScript(GOOGLE_MAPS_API_KEY)
        if (cancelled || !mapContainerRef.current) {
          return
        }

        const mapsLibrary = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
        const mapOptions: google.maps.MapOptions = {
          center: COMMUNITY_CENTER,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: !compact,
        }

        if (GOOGLE_MAPS_MAP_ID) {
          mapOptions.mapId = GOOGLE_MAPS_MAP_ID
        }

        const map = new mapsLibrary.Map(mapContainerRef.current, mapOptions)
        mapRef.current = map

        const communityPosition = COMMUNITY_CENTER
        if (GOOGLE_MAPS_MAP_ID && google.maps.marker?.AdvancedMarkerElement) {
          const communityPin = document.createElement('div')
          communityPin.className =
            'rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md'
          communityPin.textContent = COMMUNITY_NAME
          communityMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: communityPosition,
            title: `${COMMUNITY_NAME} sales center`,
            content: communityPin,
          })
        } else {
          communityMarkerRef.current = new google.maps.Marker({
            map,
            position: communityPosition,
            title: `${COMMUNITY_NAME} — ${COMMUNITY_STREET_ADDRESS}`,
            label: { text: '★', color: '#ffffff', fontWeight: '700' },
          })
        }

        setStatus('ready')
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    void initMap()

    return () => {
      cancelled = true
      clearPlaceMarkers()
      if (communityMarkerRef.current) {
        detachMarker(communityMarkerRef.current)
      }
    }
  }, [clearPlaceMarkers, compact])

  useEffect(() => {
    if (status !== 'ready') {
      return
    }
    void searchCategory(activeCategory)
  }, [activeCategory, searchCategory, status])

  if (status === 'error') {
    return <AmenityMapFallback showCuratedList={!compact} />
  }

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
      >
        {AMENITY_CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={category.ariaLabel}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/20">
        <div
          ref={mapContainerRef}
          className="h-[min(420px,70vh)] w-full"
          role="region"
          aria-label={`Interactive map of amenities near ${COMMUNITY_NAME}`}
        />
        {status === 'loading' || searchPending ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/40 text-sm font-medium text-muted-foreground">
            Loading map…
          </div>
        ) : null}
      </div>

      {!compact && places.length > 0 ? (
        <ul className="grid gap-2 sm:grid-cols-2" aria-live="polite">
          {places.slice(0, 6).map((place) => (
            <li
              key={place.id}
              className="rounded-xl border border-border/60 bg-background/90 p-3 text-sm"
            >
              <p className="font-semibold text-foreground">{place.name}</p>
              <p className="text-xs text-muted-foreground">{place.address}</p>
              <a
                href={place.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex text-xs font-semibold text-primary underline-offset-2 hover:underline"
              >
                Directions
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
