import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { CONTACT_EMAIL } from '@/lib/site'
import { FaqSection } from '@/components/faq-section'
import { getFaqsByCategory } from '@/lib/faqs'
import { buildBreadcrumbList, buildFaqPage } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'New Construction Financing Strategies | Sunstone Woodside',
  description:
    'Compare lender partners, rate lock tactics, and incentive stacking strategies for Capella at Sunstone buyers with Dr. Duffy.',
}

const lenderPartners = [
  {
    name: 'Summit Peak Mortgage',
    focus: 'New construction financing, extended rate locks, builder incentive coordination.',
    contact: `mailto:${CONTACT_EMAIL}?subject=Summit%20Peak%20Mortgage%20Intro`,
  },
  {
    name: 'Desert Equity Lending',
    focus: 'Bridge loans and equity strategies for buyers moving within Las Vegas.',
    contact: `mailto:${CONTACT_EMAIL}?subject=Desert%20Equity%20Lending%20Intro`,
  },
  {
    name: 'Silver State Home Loans',
    focus: 'VA, FHA, and first-time buyer programs with Sunstone familiarity.',
    contact: `mailto:${CONTACT_EMAIL}?subject=Silver%20State%20Home%20Loans%20Intro`,
  },
]

const financingSteps = [
  {
    title: 'Clarify budget & incentives',
    detail:
      'Pair base pricing with premiums, design dollars, and current builder incentives. Dr. Duffy can model “all-in” cost projections for each plan.',
  },
  {
    title: 'Select the right loan product',
    detail:
      'Evaluate conventional, jumbo, VA, or buy-down programs aligned with your timeline and lifestyle plans.',
  },
  {
    title: 'Lock with confidence',
    detail:
      'Coordinate with lenders who offer extended rate locks, float-down options, and construction draw expertise for a stress-free close.',
  },
]

const resources = [
  {
    title: 'Cost worksheet',
    description:
      'Side-by-side comparison of Aries, Taurus, and Virgo plans with structural and design allowances.',
  },
  {
    title: 'Monthly payment planner',
    description:
      'Model payments across rate scenarios, property taxes, HOA, and insurance for a realistic budget.',
  },
  {
    title: 'Closing timeline',
    description:
      'Track deposits, appraisal dates, and final walkthroughs to stay ahead of key milestones.',
  },
]

const conciergeSupport = [
  'Coordinate builder paperwork, option deposits, and closing timelines.',
  'Review incentive updates weekly to secure the best credit mix for your loan.',
  'Align lender deadlines with construction milestones to avoid rush fees.',
]

const financingFaqs = getFaqsByCategory(['pricing'], [1, 2, 3, 4, 5])

export default function FinancingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-financing-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Financing', path: '/financing' },
        ])}
      />
      <JsonLd id="schema-financing-faq" data={buildFaqPage(financingFaqs.slice(0, 6))} />
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Financing Strategy
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Align your financing with Capella’s build timelines
        </h1>
        <p className="text-lg text-muted-foreground">
          New construction purchases require proactive planning. Dr. Duffy collaborates with
          lender partners who understand builder incentives, construction milestones, and rate
          lock strategies unique to Sunstone.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {financingSteps.map((step) => (
          <article
            key={step.title}
            className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{step.detail}</p>
          </article>
        ))}
      </section>

      <section id="partners" className="rounded-3xl border border-border bg-background/70 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground">Preferred lending partners</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          These lenders provide quick-response pre-approvals, community-specific appraisals, and
          transparent rate-lock options. Introductions are coordinated through Dr. Duffy to keep
          communications streamlined.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {lenderPartners.map((partner) => (
            <div key={partner.name} className="rounded-2xl border border-border/60 p-4">
              <h3 className="text-base font-semibold text-foreground">{partner.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{partner.focus}</p>
              <a
                href={partner.contact}
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                Request introduction &rsaquo;
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.title}
            className="flex h-full flex-col rounded-3xl border border-dashed border-border/70 bg-background/50 p-6 text-sm text-muted-foreground"
          >
            <h3 className="text-base font-semibold text-foreground">{resource.title}</h3>
            <p className="mt-2 flex-1">{resource.description}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(resource.title)}%20Request`}
              className="mt-6 inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
            >
              Email me this &rsaquo;
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Need a second opinion on your financing plan?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Dr. Duffy can review lender estimates, compare incentive scenarios, and help you stage a
          win-ready offer that preserves cash flow and negotiation power.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Financing%20Strategy%20Session`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Request a financing session
        </a>
      </section>

      <section className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">Concierge support</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Dr. Duffy provides comprehensive support to ensure a smooth financing process.
        </p>
        <ul className="mt-6 space-y-3">
          {conciergeSupport.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="mr-3 h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection
        title="Woodside Pricing, Incentives & Financing FAQs"
        faqs={financingFaqs}
        className="mt-16"
        limit={6}
        showMoreHref="/faqs#pricing"
      />

    </div>
  )
}

