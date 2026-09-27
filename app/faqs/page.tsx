import type { Metadata } from 'next'
import Link from 'next/link'

import { FaqSection } from '@/components/faq-section'
import { JsonLd } from '@/components/json-ld'
import {
  faqCategoryMeta,
  getFaqsByCategory,
  orderedFaqCategories,
} from '@/lib/faqs'
import { buildBreadcrumbList, buildFaqPage } from '@/lib/structured-data'

const libraryFaqs = getFaqsByCategory(orderedFaqCategories)

export const metadata: Metadata = {
  title: 'Woodside Homes Las Vegas FAQs | Research Library by Dr. Duffy',
  description:
    'Comprehensive Woodside Homes FAQ resource curated by Dr. Duffy—covering builder background, specifications, pricing, communities, buying process, market research, and buyer education tools.',
}

export default function FaqLibraryPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-faqs-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'FAQs', path: '/faqs' },
        ])}
      />
      <JsonLd id="schema-faqs-page" data={buildFaqPage(libraryFaqs)} />
      <header className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Woodside Knowledge Hub
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Woodside Homes Research FAQ Library
        </h1>
        <p className="text-lg text-muted-foreground">
          Dr. Duffy has closed more than 500 Las Vegas new construction transactions, capturing field data,
          inspection notes, incentive models, and market insights for every Woodside community. Use this FAQ library to
          explore builder specs, pricing strategies, community research, and buyer education tools—all backed by
          verifiable data.
        </p>
        <div className="rounded-3xl border border-border/70 bg-background/70 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Jump to a research category
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            {orderedFaqCategories.map((category) => {
              const meta = faqCategoryMeta[category]
              return (
                <li key={category}>
                  <Link
                    href={`#${meta.anchor}`}
                    className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 font-semibold text-foreground transition hover:bg-muted"
                  >
                    {meta.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </header>

      {orderedFaqCategories.map((category) => {
        const meta = faqCategoryMeta[category]
        const faqs = getFaqsByCategory([category])

        return (
          <div key={category} className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {meta.title}
              </p>
              <h2 className="text-3xl font-semibold text-foreground">{meta.title}</h2>
              <p className="text-sm text-muted-foreground">{meta.description}</p>
            </div>
            <FaqSection id={meta.anchor} title={meta.title} faqs={faqs} />
          </div>
        )
      })}
    </div>
  )
}

