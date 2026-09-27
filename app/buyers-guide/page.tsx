import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import { CONTACT_EMAIL, CONTACT_PHONE_LINK, CONTACT_PHONE } from '@/lib/site'
import { FaqSection } from '@/components/faq-section'
import { AmenityMapSection } from '@/components/amenities/amenity-map-section'
import { getFaqsByCategory } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Las Vegas New Construction Buyer Guide | Dr. Duffy',
  description:
    'Follow a concierge roadmap for financing, design selections, and move-in milestones tailored to Sunstone Woodside homebuyers.',
}

const milestones = [
  {
    title: 'Discovery Session',
    description:
      'Review your budget, lifestyle goals, and timing. Dr. Duffy provides recent sales, incentive intel, and builder release schedules.',
    ctas: [
      {
        label: 'Book a consultation',
        href: `mailto:${CONTACT_EMAIL}?subject=Buyer%20Discovery%20Session`,
      },
    ],
  },
  {
    title: 'Financing & Pre-Approval',
    description:
      'Connect with trusted mortgage partners who understand new construction timelines, rate locks, and incentive stacking.',
    ctas: [
      { label: 'Meet preferred lenders', href: '/financing#partners' },
      {
        label: 'Request cost worksheet',
        href: `mailto:${CONTACT_EMAIL}?subject=Capella%20Cost%20Worksheet`,
      },
    ],
  },
  {
    title: 'Community & Plan Selection',
    description:
      'Tour Capella models, review structural options, and map out design studio priorities. Create a ready-to-offer package that keeps you ahead of new releases.',
    ctas: [
      { label: 'Explore Sunstone living', href: '/communities' },
      {
        label: 'See model overviews',
        href: '/models',
      },
    ],
  },
  {
    title: 'Offer, Build, & Closing',
    description:
      'Track construction milestones, walkthroughs, and warranty orientations with checklists that simplify every signature.',
    ctas: [
      {
        label: 'Download closing checklist',
        href: `mailto:${CONTACT_EMAIL}?subject=Closing%20Checklist%20Request`,
      },
    ],
  },
]

const conciergeHighlights = [
  '360° move coordination including movers, painters, and utility set-up.',
  'Post-close valuation checkpoints to track appreciation and equity growth.',
  'Local partner introductions for schools, healthcare, and recreation clubs.',
]

const faqs = [
  {
    question: 'How long does a Sunstone or Cadence new construction home take to build?',
    answer:
      'Most Woodside Homes builds close in roughly six months once structural selections are finalized. Dr. Duffy reviews the construction calendar and milestone walk-throughs so you can plan rate locks, movers, and design studio visits with confidence.',
  },
  {
    question: 'Can I stack builder incentives with lender credits or rate buy-downs?',
    answer:
      'Yes. Dr. Duffy coordinates with preferred lenders to layer builder flex dollars, buydowns, and closing-cost credits. She models “all-in” costs so you understand how incentives impact cash to close and monthly payments.',
  },
  {
    question: 'What should I prepare before the design studio appointment?',
    answer:
      'Bring inspiration photos, must-have upgrades, and a working budget. Dr. Duffy shares curated lookbooks for Capella, Lyra, and Meridian collections, plus outlines which structural choices must be locked before the design visit.',
  },
]

const guideFaqs = getFaqsByCategory(['process', 'education'], [1, 2, 3, 4, 5])

export default function BuyersGuidePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Buyer Journey
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Navigate your Sunstone purchase with expert precision
        </h1>
        <p className="text-lg text-muted-foreground">
          From the first tour to your final walk-through, Dr. Duffyet Duffy translates builder
          timelines, financing nuances, and design studio choices into clear next steps. Use
          this roadmap to stay confident and on track.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {milestones.map((milestone) => (
          <article
            key={milestone.title}
            className="flex h-full flex-col rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-foreground">{milestone.title}</h2>
            <p className="mt-4 flex-1 text-sm text-muted-foreground">
              {milestone.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {milestone.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className="inline-flex items-center rounded-full border border-input px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-border bg-background/70 p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground">Buyer checklists</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Keep your move organized with downloadable templates. Each resource is tailored
            for Capella build timelines and the Sunstone lifestyle.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li>
              • Structural &amp; design studio worksheet with budgeting guidance
            </li>
            <li>
              • Weekly construction milestone tracker with walkthrough reminders
            </li>
            <li>
              • Closing-week utilities and address update checklist
            </li>
          </ul>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Buyer%20Checklist%20Bundle`}
            className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Request checklist bundle
          </a>
        </div>
        <aside className="space-y-6 rounded-3xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          <h3 className="text-base font-semibold text-foreground">
            Preferred partners on call
          </h3>
          <p>
            Work with lenders, inspectors, insurance brokers, and movers who understand
            Capella’s build cadence.
          </p>
          <Link
            href="/financing#partners"
            className="inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
          >
            Meet the partner roster &rsaquo;
          </Link>
          <div className="border-t border-border/60 pt-4">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Concierge access
            </p>
            <p className="mt-2">
              Call{' '}
              <Link
                href={CONTACT_PHONE_LINK}
                className="font-semibold text-foreground transition hover:text-primary"
              >
                {CONTACT_PHONE}
              </Link>{' '}
              for real-time availability updates or to reserve a same-day tour.
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Ready to map out your homebuying game plan?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Tell Dr. Duffy where you are in the journey—discovery, financing, offer—or ask for a
          custom roadmap that blends Sunstone expertise with your goals.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Homebuyer%20Roadmap%20Request`}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Email Dr. Duffy
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-base font-semibold text-foreground transition hover:bg-muted"
          >
            Contact concierge team
          </Link>
        </div>
      </section>

      <AmenityMapSection
        title="Map daily life near Sunstone"
        description="Preview grocery, healthcare, parks, and schools around Capella while you compare communities and plans."
      />

      <FaqSection
        title="Woodside Buying Process & Buyer Education FAQs"
        faqs={guideFaqs}
        className="mt-16"
        limit={6}
        showMoreHref="/faqs#process"
      />

      <section className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">Buyer FAQs</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Straight answers to the most common questions we receive from Sunstone and Henderson new
          construction clients.
        </p>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground"
            >
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Script id="schema-buyers-guide-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        })}
      </Script>
    </div>
  )
}

