import Link from 'next/link'

import { AmenityMapLazy } from '@/components/amenities/amenity-map-lazy'
import { COMMUNITY_NAME } from '@/lib/amenities-config'

type AmenityMapSectionProps = {
  title?: string
  description?: string
  showFullPageLink?: boolean
  compact?: boolean
}

export function AmenityMapSection({
  title = `Life near ${COMMUNITY_NAME}`,
  description = 'Explore parks, grocery, healthcare, schools, and everyday conveniences around Sunstone with an interactive map curated for Capella buyers.',
  showFullPageLink = true,
  compact = false,
}: AmenityMapSectionProps) {
  return (
    <section
      className="mx-auto max-w-6xl px-4"
      aria-labelledby="amenity-map-section-heading"
    >
      <div className="space-y-4 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          What&apos;s nearby
        </p>
        <h2
          id="amenity-map-section-heading"
          className="text-3xl font-semibold text-foreground sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground sm:max-w-3xl">{description}</p>
        {showFullPageLink ? (
          <Link
            href="/amenities"
            className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View full nearby amenities guide
          </Link>
        ) : null}
      </div>
      <div className="mt-8">
        <AmenityMapLazy compact={compact} />
      </div>
    </section>
  )
}
