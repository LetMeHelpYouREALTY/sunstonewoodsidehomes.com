import type { Metadata } from 'next'
import Link from 'next/link'

import { serviceAreas } from '@/lib/service-areas'
import { CONTACT_EMAIL } from '@/lib/site'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { getFaqsByCategory } from '@/lib/faqs'
import { buildBreadcrumbList } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Las Vegas Service Areas | Sunstone Woodside Neighborhood Guides',
  description:
    'Review Sunstone, Cadence, Summerlin, Skye Canyon, and Northwest Las Vegas insights curated by Dr. Duffy for new construction buyers.',
}

const marketFaqs = getFaqsByCategory(['market'], [1, 2, 3, 4, 5])

export default function ServiceAreasIndexPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-service-areas-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas' },
        ])}
      />
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Service Areas
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Live where desert adventure meets modern convenience
        </h1>
        <p className="text-lg text-muted-foreground">
          Capella at Sunstone places you moments from trails, regional parks, and all the daily
          essentials. Dr. Duffy curates neighborhood tours that showcase how each pocket fits your
          move-in goals. Compare quick-closing options in the{' '}
          <Link href="/move-in-ready" className="text-primary underline-offset-2 hover:underline">
            move-in-ready collection
          </Link>{' '}
          and reach out through our{' '}
          <Link href="/contact" className="text-primary underline-offset-2 hover:underline">
            concierge team
          </Link>
          .
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {serviceAreas.map((area) => (
          <article
            key={area.slug}
            className="flex h-full flex-col rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-foreground">{area.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{area.headline}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {area.keyHighlights.slice(0, 3).map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {area.localDetails.map((detail) => (
                <div key={detail.label} className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-foreground/80">{detail.label}</dt>
                  <dd className="text-right normal-case tracking-normal text-muted-foreground">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto space-y-3 pt-6">
              <Link
                href={`/service-areas/${area.slug}`}
                className="inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
              >
                Explore {area.name} &rsaquo;
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(area.tourCta.mailSubject)}`}
                className="inline-flex items-center text-sm font-semibold text-foreground transition hover:text-primary"
              >
                {area.tourCta.label}
              </a>
            </div>
          </article>
        ))}
      </section>

      <FaqSection
        title="Woodside Market Research & Investment FAQs"
        faqs={marketFaqs}
        className="mt-16"
        limit={6}
        showMoreHref="/faqs#market"
      />
    </div>
  )
}

