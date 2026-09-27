'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { AmenityMapFallback } from '@/components/amenities/amenity-map-fallback'
import { searchCategoryPlaces } from '@/lib/amenities-places-search'
import {
  AMENITY_CATEGORIES,
  COMMUNITY_CENTER,
  COMMUNITY_NAME,
  COMMUNITY_STREET_ADDRESS,
  CURATED_NEARBY_PLACES,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  formatPlaceAddress,
  type AmenityCategoryId,
  type CuratedPlace,
} from '@/lib/amenities-config'
import { loadGoogleMaps, mapsAuthFailed } from '@/lib/google-maps-loader'

type AmenityMapInteractiveProps = {
  compact?: boolean
}

type PlaceResult = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  directionsUrl: string
}

function detachMarker(marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker) {
  if (marker instanceof google.maps.Marker) {
    marker.setMap(null)
    return
  }
  marker.map = null
}

function buildDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

function placeDisplayName(rawName: google.maps.places.Place['displayName']): string {
  if (typeof rawName === 'string') {
    return rawName
  }
  if (rawName && typeof rawName === 'object' && 'text' in rawName) {
    return String((rawName as { text?: string }).text ?? 'Nearby place')
  }
  return 'Nearby place'
}

function curatedToPlaceResults(categoryId: AmenityCategoryId): PlaceResult[] {
  return CURATED_NEARBY_PLACES.filter((place) => place.category === categoryId).map(
    (place: CuratedPlace, index) => ({
      id: `curated-${categoryId}-${index}`,
      name: place.name,
      address: formatPlaceAddress(place),
      lat: COMMUNITY_CENTER.lat,
      lng: COMMUNITY_CENTER.lng,
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        formatPlaceAddress(place),
      )}`,
    }),
  )
}

function buildInfoWindowContent(place: PlaceResult): HTMLElement {
  const root = document.createElement('div')
  root.style.maxWidth = '240px'
  root.style.fontFamily = 'system-ui, sans-serif'
  root.style.fontSize = '14px'
  root.style.lineHeight = '1.4'

  const title = document.createElement('strong')
  title.textContent = place.name
  root.appendChild(title)

  const address = document.createElement('p')
  address.style.margin = '4px 0'
  address.textContent = place.address
  root.appendChild(address)

  const link = document.createElement('a')
  link.href = place.directionsUrl
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.textContent = 'Directions'
  root.appendChild(link)

  return root
}

export function AmenityMapInteractive({ compact = false }: AmenityMapInteractiveProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const communityMarkerRef = useRef<
    google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null
  >(null)
  const placeMarkersRef = useRef<(google.maps.marker.AdvancedMarkerElement | google.maps.Marker)[]>(
    [],
  )
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>('parks')
  const [places, setPlaces] = useState<PlaceResult[]>([])
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  const [useFallback, setUseFallback] = useState(false)
  const [searchPending, setSearchPending] = useState(false)

  const enterFallback = useCallback(() => {
    clearPlaceMarkersInternal()
    mapRef.current = null
    if (communityMarkerRef.current) {
      detachMarker(communityMarkerRef.current)
      communityMarkerRef.current = null
    }
    setUseFallback(true)
  }, [])

  function clearPlaceMarkersInternal() {
    placeMarkersRef.current.forEach((marker) => {
      detachMarker(marker)
    })
    placeMarkersRef.current = []
  }

  const clearPlaceMarkers = useCallback(() => {
    clearPlaceMarkersInternal()
  }, [])

  const showInfoWindow = useCallback(
    (map: google.maps.Map, anchor: google.maps.MVCObject, place: PlaceResult) => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow()
      }
      infoWindowRef.current.setContent(buildInfoWindowContent(place))
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
        const nearbyPlaces = await searchCategoryPlaces(
          COMMUNITY_CENTER,
          categoryId,
          category.includedPrimaryTypes,
        )

        const parsed = nearbyPlaces
          .map((place, index) => {
            const location = place.location
            if (!location) {
              return null
            }
            const { lat, lng } = location.toJSON()
            const name = placeDisplayName(place.displayName)
            const address = place.formattedAddress ?? ''
            const directionsUrl = place.googleMapsURI ?? buildDirectionsUrl(lat, lng)
            return {
              id: `${categoryId}-${index}-${lat}-${lng}`,
              name,
              address,
              lat,
              lng,
              directionsUrl,
            }
          })
          .filter((item): item is PlaceResult => item !== null)

        const displayPlaces = parsed.length > 0 ? parsed : curatedToPlaceResults(categoryId)
        setPlaces(displayPlaces)
        renderPlaceMarkers(map, displayPlaces)
      } catch {
        const curated = curatedToPlaceResults(categoryId)
        setPlaces(curated)
        renderPlaceMarkers(map, curated)
      } finally {
        setSearchPending(false)
      }
    },
    [renderPlaceMarkers],
  )

  useEffect(() => {
    const onAuthFailure = () => {
      enterFallback()
    }
    window.addEventListener('gmaps:auth-failure', onAuthFailure)
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFailure)
  }, [enterFallback])

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      if (mapsAuthFailed) {
        enterFallback()
        return
      }

      if (!mapContainerRef.current || !GOOGLE_MAPS_API_KEY) {
        enterFallback()
        return
      }

      try {
        await loadGoogleMaps(GOOGLE_MAPS_API_KEY)
        if (cancelled || mapsAuthFailed) {
          if (!cancelled) {
            enterFallback()
          }
          return
        }
        if (!mapContainerRef.current) {
          return
        }

        await google.maps.importLibrary('marker')
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
          enterFallback()
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
  }, [clearPlaceMarkers, compact, enterFallback])

  useEffect(() => {
    if (status !== 'ready' || useFallback) {
      return
    }
    void searchCategory(activeCategory)
  }, [activeCategory, searchCategory, status, useFallback])

  if (useFallback) {
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
