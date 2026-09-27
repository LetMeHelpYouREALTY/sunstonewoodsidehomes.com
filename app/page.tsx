import type { Metadata } from 'next'
import Link from 'next/link'

import { FindYourHomeForm } from '@/components/find-your-home-form'
import { models } from '@/lib/models'
import { DeferredRender } from '@/components/deferred-render'
import { JsonLd } from '@/components/json-ld'
import { FaqSection } from '@/components/faq-section'
import { AmenityMapSection } from '@/components/amenities/amenity-map-section'
import { getFaqsByCategory } from '@/lib/faqs'
import { buildBreadcrumbList, buildFaqPage } from '@/lib/structured-data'
import { moveInReadyHomes } from '@/lib/move-in-ready'
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  SALES_HOURS,
} from '@/lib/site'

const highlightStats = [
  { value: '$42K+', label: 'Average buyer incentives negotiated in 2024' },
  { value: '37', label: 'Private model tours hosted this year' },
  { value: '14', label: 'Days saved versus market-average closings' },
  { value: '100%', label: 'Five-star reviews from Sunstone homeowners' },
]

const buyerSteps = [
  {
    title: '1. Strategy Consultation',
    body: 'Outline timelines, financing goals, and wish-list priorities with Dr. Duffy’s market intel.',
    cta: {
      href: `mailto:${CONTACT_EMAIL}?subject=Buyer%20Consultation%20Request`,
      label: 'Schedule consultation',
    },
  },
  {
    title: '2. Community + Plan Match',
    body: 'Tour Capella and nearby communities with curated sheets that align plans, pricing, and incentives.',
    cta: { href: '/communities', label: 'Preview communities' },
  },
  {
    title: '3. Offer to Closing',
    body: 'Tap into verified lenders, detailed cost breakdowns, and closing checklists to keep the process seamless.',
    cta: { href: '/financing', label: 'View financing guide' },
  },
]

const communityAdvantages = [
  'Single-story living near Mt. Charleston and Lee Canyon.',
  'Energy-efficient features engineered for the Las Vegas climate.',
  'Covered patios, flex rooms, and designer-curated finish packages.',
  'Connected master-plan lifestyle with mountain-view backdrops.',
]

const lifestyleHighlights = [
  {
    title: 'Trail Network',
    description:
      'Immediate access to Sunstone’s hiking and biking paths for dawn-to-dusk adventures.',
  },
  {
    title: 'Local Parks',
    description:
      'Gather at nearby community parks with shaded play areas and dog-friendly lawns.',
  },
  {
    title: 'Shopping & Dining',
    description: 'Minutes to Smith’s Marketplace, everyday conveniences, and local eateries.',
  },
]

const testimonials = [
  {
    quote:
      'Dr. Duffy negotiated design credits we didn’t even know existed and had us under contract in under a week.',
    name: 'Kara & Devin M.',
    detail: 'Relocated from Southern California',
  },
  {
    quote:
      'Her weekly construction updates with photos kept us calm. Closing was the smoothest we’ve ever experienced.',
    name: 'Michelle R.',
    detail: 'Second-home buyer, Capella Aries Plan',
  },
  {
    quote:
      'We toured Sunstone, Summerlin, and Skye Canyon. Janet’s insights made the decision obvious and confident.',
    name: 'Marcus & Lena T.',
    detail: 'First-time buyers',
  },
]

const conciergeServices = [
  {
    title: 'Design studio playbooks',
    description:
      'Plan selections before your appointment with curated palettes, budget guidance, and upgrade ROI tips.',
  },
  {
    title: 'Weekly construction check-ins',
    description:
      'Receive photo updates, milestone reminders, and punch-list prep so you never miss a walkthrough detail.',
  },
  {
    title: 'Relocation logistics',
    description:
      'Coordinate movers, utilities, school registration, and HOA introductions through our concierge roster.',
  },
  {
    title: 'Post-close care',
    description:
      'Stay connected with warranty reminders, landscape partners, and quarterly valuation snapshots.',
  },
]

const buildTimeline = [
  { label: 'Week 1–2', detail: 'Secure homesite, finalize structural options, and order appraisal.' },
  { label: 'Week 3–6', detail: 'Design studio selections, lender lock strategy, and permitting.' },
  { label: 'Month 2–5', detail: 'Framing to drywall walkthroughs with proactive punch-list reviews.' },
  { label: 'Month 6', detail: 'Orientation, blue-tape inspection, and closing-day concierge support.' },
]

const resourceHighlights = [
  {
    title: 'Buyer Journey Roadmap',
    description: 'Step-by-step milestones, checklists, and curated partner intros.',
    href: '/buyers-guide',
  },
  {
    title: 'Financing Playbook',
    description: 'Compare loan structures, rate-lock strategies, and incentive stacking tips.',
    href: '/financing',
  },
  {
    title: 'Community Preview',
    description: 'Discover lifestyle perks, trail maps, and nearby amenities for Sunstone living.',
    href: '/amenities',
  },
]

const realScoutLink =
  'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xNDE2Nw=='

const homepageFaqs = getFaqsByCategory(['company'], [1, 2, 3, 4, 5])
const homepageFaqSchema = homepageFaqs.slice(0, 6)

export const metadata: Metadata = {
  title: 'Sunstone Woodside Homes | Las Vegas New Construction Concierge',
  description:
    'Discover move-in ready inventory, Capella floor plans, and Las Vegas service areas with Dr. Duffy’s concierge real estate guidance.',
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 pb-16">
      <JsonLd id="schema-home-faq" data={buildFaqPage(homepageFaqSchema)} />
      {/* Hero section - Next Step Realty style with prominent form */}
      <section className="relative bg-white pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Headline and value props */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  The Easiest & Quickest Way to Find Your Las Vegas Home
                </h1>
                <p className="text-xl text-muted-foreground">
                  We are a leading real estate advisor in Las Vegas, specializing in a seamless, personalized home search experience.
                </p>
              </div>
              
              {/* Key benefits grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">FRIENDLY & EFFICIENT AGENTS</h3>
                  <p className="text-sm text-muted-foreground">Expert guidance every step of the way</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">EXPERIENCE A SEAMLESS JOURNEY</h3>
                  <p className="text-sm text-muted-foreground">From discovery to closing day</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">90 PERCENT SUCCESS RATE</h3>
                  <p className="text-sm text-muted-foreground">When clients work with Dr. Duffy</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">COMPREHENSIVE ACCESS</h3>
                  <p className="text-sm text-muted-foreground">To all Las Vegas new construction</p>
                </div>
              </div>
            </div>

            {/* Right: Lead capture form */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Find Your Home</h2>
                <FindYourHomeForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid - Next Step Realty style */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Happy Hunting</h3>
              <p className="text-muted-foreground">We Make Home Buying Fun Again.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Fast and Friendly</h3>
              <p className="text-muted-foreground">Find your home in weeks, not months.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">A Seamless Journey</h3>
              <p className="text-muted-foreground">8 in 10 Clients Find Home Quickly.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">One Stop Shop</h3>
              <p className="text-muted-foreground">Comprehensive access to the entire marketplace.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Search Now. Pay Later.</h3>
              <p className="text-muted-foreground">No Costs Until Success.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Efficiency At It&apos;s Finest</h3>
              <p className="text-muted-foreground">See 5-12 Curated Homes in Just 2-4 Hours.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Happiest Clients in Las Vegas</h3>
              <p className="text-muted-foreground">9 in 10 home tours turn into successful purchases.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Find Home.</h3>
              <p className="text-muted-foreground">One appointment. Every home for you.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Luxury at the Right Price.</h3>
              <p className="text-muted-foreground">More Amenities, at a Lower Cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Home Awaits section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Home Awaits</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Through a comprehensive, concierge-style tour, one of our qualified agents will show you 5-12 curated homes in 2-4 hours.
          </p>
          <p className="mb-8 text-lg text-muted-foreground">
            Providing expert guidance and a 90% success rate, we&apos;ve earned the highest customer satisfaction in Las Vegas.
          </p>
          <div className="space-y-2">
            <p className="text-xl font-semibold italic text-foreground">Welcome to Dr. Duffy Realty. Welcome Home.</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
            >
              SIGN UP
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {highlightStats.map((stat) => (
            <div key={stat.label} className="space-y-1 rounded-2xl border border-border/50 bg-background/70 p-4">
              <p className="text-2xl font-semibold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-secondary p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Move-In Ready Collection
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Need keys in 60 days or less?
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse designer-curated homes across Cadence, Sunstone, and Summerlin that are ready now. Filter by community, price, or bedroom count and secure a private tour with Dr. Duffy.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/move-in-ready"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                View move-in ready homes
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Move-In%20Ready%20Collection%20Inquiry`}
                className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Request curated list
              </a>
            </div>
          </div>
          <div className="space-y-3 rounded-3xl border border-dashed border-border/70 bg-background/70 p-6 text-sm text-muted-foreground">
            <h3 className="text-base font-semibold text-foreground">Featured inventory</h3>
            <ul className="space-y-2">
              {moveInReadyHomes.slice(0, 3).map((home) => (
                <li key={home.slug} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{home.planName}</p>
                    <p className="text-xs text-muted-foreground">
                      {home.community} • {home.price}
                    </p>
                  </div>
                  <Link
                    href={`/move-in-ready/${home.slug}`}
                    className="text-xs font-semibold text-primary transition hover:text-primary/80"
                  >
                    Details ›
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DeferredRender
        fallback={
          <section className="mx-auto max-w-6xl px-4">
            <div className="h-[420px] animate-pulse rounded-3xl border border-border/60 bg-muted/40" />
          </section>
        }
      >
        <section className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 rounded-3xl border border-border/70 bg-card/85 p-8 shadow-sm md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Live Woodside Inventory Feed
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Unlock real-time Woodside listings across Las Vegas
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore the live Woodside Homes search curated by Dr. Duffy. Track price drops, new releases, and move-in ready homes across Sunstone, Cadence, and Summerlin without waiting for marketing emails.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Filter by community, price point, and delivery timeline in one dashboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Set alerts for Sunstone, Cadence, or Summerlin quick move-ins as soon as they appear.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Sync with Dr. Duffy’s concierge team to schedule tours or request pricing sheets instantly.</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href={realScoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Browse live Woodside listings
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Woodside%20Listing%20Alert%20Setup`}
                className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Request personalized alerts
              </a>
            </div>
          </div>
            <div className="space-y-4 rounded-3xl border border-dashed border-border/70 bg-background/80 p-6 text-sm text-muted-foreground">
            <h3 className="text-base font-semibold text-foreground">What you’ll track</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-primary">Communities covered</dt>
                <dd className="mt-1 text-sm text-muted-foreground">Capella at Sunstone, Lyra, Dove Rock, Cadence enclaves, and more.</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-primary">Updates included</dt>
                <dd className="mt-1 text-sm text-muted-foreground">Daily price changes, incentive notes, and quick move-in availability.</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-primary">Support</dt>
                <dd className="mt-1 text-sm text-muted-foreground">Dr. Duffy monitors listings, coordinates tours, and confirms incentive eligibility.</dd>
              </div>
            </dl>
            <p className="rounded-2xl border border-border/60 bg-background/80 p-4 text-xs text-muted-foreground">
              Prefer a guided tour of the dashboard? Email for a live walkthrough and listing setup tailored to your move-in timeline.
            </p>
          </div>
          </div>
        </section>
      </DeferredRender>

      <FaqSection
        title="Woodside Homes Company Knowledge Base"
        faqs={homepageFaqs}
        className="mt-12"
        limit={6}
        showMoreHref="/faqs#company"
      />

      <section id="models" className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Three designer single-story plans to explore
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Start with the floor plan that fits your lifestyle, then request design packages and
            availability details curated for your move-in timeline.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
              <h3 className="mt-3 text-xl font-semibold text-foreground">{model.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{model.headline}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>{model.beds}</li>
                <li>{model.baths}</li>
                <li>{model.garage}</li>
              </ul>
              <Link
                href={`/models/${model.slug}`}
                className="mt-auto inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
              >
                View plan details &rsaquo;
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/buyers-guide"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            See the buyer journey
          </Link>
          <Link
            href="/communities"
            className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-base font-semibold text-foreground transition hover:bg-muted"
          >
            Explore Sunstone living
          </Link>
        </div>
      </section>

      <section className="bg-muted/20 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Navigate the homebuyer experience with confidence
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              From discovery sessions to closing day, Dr. Duffyet Duffy keeps every step transparent,
              organized, and aligned with your goals.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {buyerSteps.map((step) => (
              <article
                key={step.title}
                className="flex h-full flex-col rounded-3xl border border-border bg-background/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{step.body}</p>
                <Link
                  href={step.cta.href}
                  className="mt-6 inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
                >
                  {step.cta.label} &rsaquo;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-background/70 p-8 shadow-lg">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Why buyers choose Capella at Sunstone
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Live at the intersection of desert tranquility and city convenience with curated finishes crafted by
              Woodside Homes.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {communityAdvantages.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Capella%20Preview%20Appointment`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Reserve a preview appointment
            </a>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">Lifestyle perks</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Step outside to explore desert trails, neighborhood parks, and local shopping hubs.
              </p>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                {lifestyleHighlights.map((highlight) => (
                  <li key={highlight.title} className="rounded-2xl border border-border/60 p-4">
                    <h4 className="text-base font-semibold text-foreground">{highlight.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{highlight.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-dashed border-border/70 bg-background/50 p-6 text-sm text-muted-foreground">
              <p>
                Directions: Located within the Sunstone master-plan off the US-95 and Skye Canyon Park Drive, just minutes
                from Mt. Charleston recreation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AmenityMapSection />

      <section className="bg-gradient-to-br from-primary via-primary-hover to-[#004494] py-20 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              Buyer testimonials
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Concierge guidance loved by Las Vegas homeowners
            </h2>
            <p className="text-base text-white/90">
              Hear how Sunstone buyers leveraged Dr. Duffy&apos;s strategy, partner network, and construction monitoring to move
              with total confidence.
            </p>
          </div>
          <div className="flex-1 grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="h-full rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-white/95"
              >
                <p className="italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-semibold text-primary-foreground">{testimonial.name}</p>
                  <p className="text-xs text-white/80">{testimonial.detail}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Concierge-level support from first tour to final walkthrough
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Choose the services that match your pace, lifestyle, and preferred level of involvement.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {conciergeServices.map((service) => (
            <article key={service.title} className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
            </article>
          ))}
      </div>
      </section>

      <section className="bg-muted/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Construction timeline at a glance
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Understand key milestones so you can plan travel, design studio visits, and financing with ease.
            </p>
          </div>
          <ol className="relative mx-auto mt-10 max-w-3xl space-y-6 border-l border-border/80 pl-6">
            {buildTimeline.map((item) => (
              <li key={item.label} className="space-y-1">
                <span className="absolute -left-[10px] mt-1 inline-flex h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <p className="text-sm font-semibold text-primary">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Essential resources for Sunstone buyers
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Dive deeper into the journey with curated guides covering financing, relocation, and community life.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resourceHighlights.map((resource) => (
            <article
              key={resource.title}
              className="flex h-full flex-col rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{resource.description}</p>
              <Link
                href={resource.href}
                className="mt-6 inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
              >
                Explore &rsaquo;
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Imagine life on one level
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Share your preferred move-in timeline and discover incentives tailored to your household.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Capella%20at%20Sunstone%20Consultation`}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Email Dr. Duffy
          </a>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center justify-center rounded-full border border-input px-6 py-3 text-base font-semibold text-foreground transition hover:bg-muted"
          >
            Call {CONTACT_PHONE}
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Serving Capella at Sunstone, Summerlin, and Greater Las Vegas with integrity and equal housing commitment.
        </p>
      </section>
    </div>
  )
}

