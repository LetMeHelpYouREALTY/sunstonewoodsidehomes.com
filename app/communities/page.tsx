import type { Metadata } from 'next'
import Link from 'next/link'

import { CONTACT_EMAIL, CONTACT_PHONE_LINK, CONTACT_PHONE } from '@/lib/site'
import { FaqSection } from '@/components/faq-section'
import { AmenityMapSection } from '@/components/amenities/amenity-map-section'
import { JsonLd } from '@/components/json-ld'
import { getFaqsByCategory } from '@/lib/faqs'
import { buildBreadcrumbList } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Sunstone & Northwest Las Vegas Communities | Dr. Duffy',
  description:
    'Explore Capella at Sunstone, the broader master plan, and nearby Northwest Las Vegas amenities with guidance from Dr. Duffy.',
}

const communitySections = [
  {
    title: 'Capella at Sunstone',
    description:
      'Single-story living meets designer detailing with three curated plans, energy-smart construction, and a ready-made social fabric.',
    bullets: [
      'Trailhead access to Sunstone’s extensive hiking, biking, and walking network.',
      'Neighborhood parks with splash pads, dog runs, and shaded picnic spaces.',
      'Close to Smith’s Marketplace, local eateries, and daily conveniences.',
    ],
    cta: { href: '/models', label: 'Browse Capella plans' },
  },
  {
    title: 'Sunstone Master Plan',
    description:
      'Inside the northwest Las Vegas desert basins, Sunstone brings master-planned amenities, community events, and boundless outdoor play.',
    bullets: [
      '15+ miles of planned trails and pocket parks that connect neighborhoods.',
      'Future community center with fitness programming and co-working lounges.',
      'Resident events calendar celebrating music, food, and seasonal festivities.',
    ],
    cta: { href: `mailto:${CONTACT_EMAIL}?subject=Sunstone%20Community%20Guide` },
  },
  {
    title: 'Beyond Sunstone',
    description:
      'Minutes from Skye Canyon, Summerlin, and Centennial Hills, you’re positioned for CCSD schools, healthcare, entertainment, and outdoor escapes.',
    bullets: [
      'Mt. Charleston and Lee Canyon for skiing, hiking, and climate relief.',
      'Downtown Summerlin shopping, dining, and Golden Knights hockey.',
      'Proximity to Centennial Hills Hospital, Nellis AFB, and major employment hubs.',
    ],
    cta: { href: '/buyers-guide', label: 'See relocation playbook' },
  },
]

const areaSpotlights = [
  {
    name: 'Sunstone Trail Network',
    detail:
      'A connected web of paved and natural trails that lets you run, ride, or stroll without leaving the community.',
  },
  {
    name: 'Skye Canyon Marketplace',
    detail:
      'Boutique fitness, coffee, and dining with a front-row seat to community events and seasonal farmers markets.',
  },
  {
    name: 'Summerlin Lifestyle',
    detail:
      'Award-winning master plan living with golf, retail, and entertainment only 15 minutes away.',
  },
]

const communityFaqs = getFaqsByCategory(['communities'], [1, 2, 3, 4, 5])

export default function CommunitiesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-communities-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Communities', path: '/communities' },
        ])}
      />
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Community Snapshot
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Live where desert adventure meets modern convenience
        </h1>
        <p className="text-lg text-muted-foreground">
          Capella at Sunstone places you moments from trails, regional parks, and all the daily
          essentials. Dr. Duffy curates neighborhood tours that showcase how each pocket fits your
          move-in goals.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {communitySections.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-3xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {item.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={item.cta.href}
                className="inline-flex items-center rounded-full border border-input px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                {item.cta.label ?? 'Request details'} &rsaquo;
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-border bg-background/70 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground">What locals love</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Lifestyle highlights curated by Dr. Duffy’s clients as they relocated across Las Vegas’s
          northwest corridor.
        </p>
        <ul className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          {areaSpotlights.map((spotlight) => (
            <li key={spotlight.name} className="rounded-2xl border border-border/70 p-4">
              <h3 className="text-base font-semibold text-foreground">{spotlight.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{spotlight.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <AmenityMapSection
        title="What's nearby Capella at Sunstone"
        description="Filter restaurants, parks, grocery, healthcare, and schools around the sales center, then dive into the full amenities guide."
      />

      <section className="rounded-3xl border border-dashed border-border/70 bg-background/50 p-8 text-sm text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">
          Ready for a neighborhood preview tour?
        </h2>
        <p className="mt-2">
          Choose a guided route that covers Capella at Sunstone plus nearby hotspots. Tours can be
          tailored for outdoor enthusiasts, commuters, or buyers comparing school boundaries.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Neighborhood%20Preview%20Tour`}
            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Request a tour itinerary
          </a>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Call {CONTACT_PHONE}
          </Link>
        </div>
      </section>

      <FaqSection
        title="Woodside Community & Lifestyle FAQs"
        faqs={communityFaqs}
        className="mt-16"
        limit={6}
        showMoreHref="/faqs#communities"
      />
    </div>
  )
}

