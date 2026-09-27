'use client'

import { DeferredRender } from '@/components/deferred-render'
import { AmenityMapFallback } from '@/components/amenities/amenity-map-fallback'
import { AmenityMapInteractive } from '@/components/amenities/amenity-map-interactive'
import { GOOGLE_MAPS_API_KEY } from '@/lib/amenities-config'

type AmenityMapLazyProps = {
  compact?: boolean
  showCuratedListInFallback?: boolean
}

const mapFallbackSkeleton = (
  <div
    className="h-[min(420px,70vh)] w-full animate-pulse rounded-2xl border border-border/60 bg-muted/40"
    aria-hidden
  />
)

export function AmenityMapLazy({
  compact = false,
  showCuratedListInFallback = true,
}: AmenityMapLazyProps) {
  const hasApiKey = GOOGLE_MAPS_API_KEY.length > 0

  return (
    <DeferredRender fallback={mapFallbackSkeleton}>
      {hasApiKey ? (
        <AmenityMapInteractive compact={compact} />
      ) : (
        <AmenityMapFallback showCuratedList={!compact && showCuratedListInFallback} />
      )}
    </DeferredRender>
  )
}
