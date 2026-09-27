import Link from 'next/link'

import {
  AMENITY_CATEGORIES,
  COMMUNITY_CENTER,
  COMMUNITY_NAME,
  CURATED_NEARBY_PLACES,
  communityEmbedMapUrl,
  directionsUrlForCommunity,
  directionsUrlForPlace,
  formatPlaceAddress,
} from '@/lib/amenities-config'

type AmenityMapFallbackProps = {
  showCuratedList?: boolean
  className?: string
}

export function AmenityMapFallback({
  showCuratedList = true,
  className = '',
}: AmenityMapFallbackProps) {
  const embedUrl = communityEmbedMapUrl()

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
        <iframe
          title={`Map showing ${COMMUNITY_NAME} in Las Vegas`}
          src={embedUrl}
          className="h-[min(420px,70vh)] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Map centered on the Capella sales office (
        <a
          href={directionsUrlForCommunity()}
          className="font-semibold text-primary underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          directions to the sales center
        </a>
        ).
      </p>
      {showCuratedList ? (
        <div>
          <h3 className="text-base font-semibold text-foreground">Featured nearby places</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CURATED_NEARBY_PLACES.map((place) => {
              const address = formatPlaceAddress(place)
              const categoryLabel =
                AMENITY_CATEGORIES.find((c) => c.id === place.category)?.label ?? place.category
              return (
                <li
                  key={`${place.name}-${place.streetAddress}`}
                  className="rounded-xl border border-border/70 bg-background/80 p-4 text-sm"
                >
                  <p className="font-semibold text-foreground">{place.name}</p>
                  <p className="text-xs uppercase tracking-wide text-primary">{categoryLabel}</p>
                  <p className="mt-1 text-muted-foreground">{address}</p>
                  {place.note ? (
                    <p className="mt-2 text-xs text-muted-foreground">{place.note}</p>
                  ) : null}
                  <a
                    href={directionsUrlForPlace(place.name, address)}
                    className="mt-2 inline-flex text-xs font-semibold text-primary underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions in Google Maps
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
