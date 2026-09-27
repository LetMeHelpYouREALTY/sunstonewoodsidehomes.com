import type { Metadata } from 'next'
import Link from 'next/link'

import { models } from '@/lib/models'
import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import { getFaqsByCategory } from '@/lib/faqs'
import { buildBreadcrumbList } from '@/lib/structured-data'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Capella Floor Plans | Sunstone Woodside Models in Las Vegas',
  description:
    'Compare the Aries, Taurus, and Virgo single-story plans with pricing, square footage, and concierge design insights for Sunstone Woodside Homes.',
}

const modelFaqs = getFaqsByCategory(['floorplans'], [1, 2, 3, 4, 5])

export default function ModelsIndexPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-models-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Floor Plans', path: '/models' },
        ])}
      />
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Capella Collection
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Compare the single-story plans at Capella
        </h1>
        <p className="text-lg text-muted-foreground">
          Each plan layers indoor-outdoor living, energy efficiency, and smart design to suit
          move-up buyers, multi-gen households, and luxury downsizers alike.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {models.map((model) => (
          <article
            key={model.slug}
            className="flex h-full flex-col rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-sm text-muted-foreground">
              <span>{model.priceFrom}</span>
              <span className="mx-2 text-border">|</span>
              <span>{model.size}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{model.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{model.headline}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{model.beds}</li>
              <li>{model.baths}</li>
              <li>{model.garage}</li>
              <li>{model.outdoor}</li>
            </ul>
            <div className="mt-auto space-y-3">
              <Link
                href={`/models/${model.slug}`}
                className="inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
              >
                See floor plan story &rsaquo;
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(model.name)}%20Design%20Inquiry`}
                className="inline-flex items-center text-sm font-semibold text-foreground transition hover:text-primary"
              >
                Ask about incentives &rsaquo;
              </a>
            </div>
          </article>
        ))}
      </section>

      <FaqSection
        title="Woodside Floor Plan & Customization FAQs"
        faqs={modelFaqs}
        className="mt-16"
        limit={6}
        showMoreHref="/faqs#floorplans"
      />
    </div>
  )
}

