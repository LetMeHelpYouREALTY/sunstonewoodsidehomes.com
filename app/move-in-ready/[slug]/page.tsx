import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import {
  getMoveInReadyHomeBySlug,
  moveInReadyHomes,
} from '@/lib/move-in-ready'
import { buildBreadcrumbList, SITE_URL } from '@/lib/structured-data'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK } from '@/lib/site'

const baseUrl = SITE_URL

const specs = (home: (typeof moveInReadyHomes)[number]) => [
  { label: 'Bedrooms', value: home.beds },
  { label: 'Bathrooms', value: home.baths },
  { label: 'Garage', value: home.garage },
  { label: 'Square Feet', value: home.squareFeet },
]

const parsePrice = (price: string) => Number(price.replace(/[^0-9]/g, ''))

type CommunityContext = {
  heading: string
  summary: string
  highlights: string[]
  link?: string
  linkLabel?: string
}

const cadenceContext: CommunityContext = {
  heading: 'Cadence Henderson advantages',
  summary:
    'Cadence in Henderson 89011 offers lake-inspired trails, Central Park events, and quick access to Lake Las Vegas and the 215 Beltway.',
  highlights: [
    'Walk or bike to 50-acre Central Park, splash pads, and pickleball courts.',
    'Minutes from Smith’s Marketplace, Cowabunga Bay, and Henderson medical campuses.',
    'Easy commute to the Strip or airport via 215 Beltway and Boulder Highway connector.',
  ],
  link: '/communities',
  linkLabel: 'See Las Vegas communities',
}

const sunstoneContext: CommunityContext = {
  heading: 'Sunstone Northwest Las Vegas perks',
  summary:
    'Sunstone’s 89143 master plan delivers desert-modern architecture, mountain views, and rapid access to US-95 for Summerlin and Strip commutes.',
  highlights: [
    'Trail network links Capella, Lyra, and Serenata villages with pocket parks.',
    'Close to Skye Canyon Marketplace, Gilcrease Orchard, and Floyd Lamb Park.',
    '21-minute drive to Downtown Summerlin and pro sports venues.',
  ],
  link: '/service-areas/sunstone-master-plan',
  linkLabel: 'Explore the Sunstone guide',
}

const capellaContext: CommunityContext = {
  heading: 'Capella at Sunstone lifestyle',
  summary:
    'Capella showcases Woodside’s single-story designs within Sunstone’s amenity-rich northwest corridor near Centennial Hills.',
  highlights: [
    'Low-maintenance lots with mountain backdrops and evening trail temperatures.',
    'Choice of three floor plans with multi-gen, retreat, and flex options.',
    'Minutes to Centennial Hills Hospital, Costco, and Skye Canyon retail.',
  ],
  link: '/service-areas/capella-at-sunstone',
  linkLabel: 'Tour Capella insights',
}

const summerlinContext: CommunityContext = {
  heading: 'Summerlin elevated living',
  summary:
    'Summerlin’s 89138 villages deliver resort amenities, Red Rock Canyon access, and award-winning schools within 20 minutes of the Strip.',
  highlights: [
    'Downtown Summerlin retail, dining, and entertainment minutes away.',
    'Proximity to City National Arena, Las Vegas Ballpark, and Red Rock Casino.',
    'Access to top-ranked CCSD and private school campuses.',
  ],
  link: '/service-areas/summerlin',
  linkLabel: 'View the Summerlin guide',
}

const communityContext: Record<string, CommunityContext> = {
  'Meridian at Cadence': cadenceContext,
  'Ambridge at Cadence': cadenceContext,
  'Acacia at Cadence': cadenceContext,
  'Ashwood at Cadence': cadenceContext,
  'Serenata at Cadence': cadenceContext,
  'Adair at Cadence': cadenceContext,
  'Lyra Collection I at Sunstone': sunstoneContext,
  'Lyra Collection II at Sunstone': sunstoneContext,
  'Capella at Sunstone': capellaContext,
  'Vireo at Summerlin': summerlinContext,
}

export async function generateStaticParams() {
  return moveInReadyHomes.map((home) => ({ slug: home.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const home = getMoveInReadyHomeBySlug(slug)

  if (!home) {
    return {
      title: 'Move-in ready home not found',
      description: 'This move-in ready residence could not be located.',
    }
  }

  return {
    title: `${home.planName} ${home.lot} | ${home.community}`,
    description: `${home.planName} ${home.lot} in ${home.community} is ready for move-in at ${home.price} with ${home.beds}, ${home.baths}, and ${home.squareFeet}.`,
  }
}

export default async function MoveInReadyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const home = getMoveInReadyHomeBySlug(slug)

  if (!home) {
    notFound()
  }

  const context =
    communityContext[home.community] ?? {
      heading: `${home.city} lifestyle essentials`,
      summary: `${home.community} places you near daily conveniences, schools, and recreation throughout ${home.city}.`,
      highlights: [
        'Tour with Dr. Duffy to pinpoint commute times, school options, and HOA perks.',
        'Compare nearby move-in ready inventory to secure the best incentives.',
        'Leverage concierge partners for movers, utilities, and design studio selections.',
      ],
      link: '/service-areas',
      linkLabel: 'Review all service areas',
    }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16">
      <JsonLd
        id={`schema-move-in-ready-${home.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${home.planName} ${home.lot}`,
          description: home.description,
          sku: home.slug,
          brand: {
            '@type': 'Brand',
            name: 'Sunstone Woodside | Homes by Dr. Duffy',
          },
          seller: {
            '@type': 'RealEstateAgent',
            name: 'Dr. Jan Duffy',
            url: `${baseUrl}/contact`,
            telephone: CONTACT_PHONE,
            areaServed: ['Las Vegas NV', 'Henderson NV'],
          },
          offers: {
            '@type': 'Offer',
            price: parsePrice(home.price),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/move-in-ready/${home.slug}`,
            itemCondition: 'https://schema.org/NewCondition',
          },
        }}
      />
      <JsonLd
        id={`schema-breadcrumb-${home.slug}`}
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Move-In Ready Homes', path: '/move-in-ready' },
          { name: `${home.planName} ${home.lot}`, path: `/move-in-ready/${home.slug}` },
        ])}
      />
      <nav className="text-sm text-muted-foreground">
        <Link href="/move-in-ready" className="hover:text-primary">
          Move-In Ready
        </Link>{' '}
        / <span className="text-foreground">{home.planName}</span>
      </nav>

      <header className="space-y-6 rounded-3xl border border-border/70 bg-card/70 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {home.status}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
              {home.planName} <span className="text-lg text-muted-foreground">{home.lot}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {home.city} | {home.community}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Starting at
            </p>
            <p className="text-3xl font-semibold text-primary">{home.price}</p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {specs(home).map((item) => (
            <li key={item.label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{item.value}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(home.mailSubject)}`}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Ask about this home
          </a>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center justify-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Call {CONTACT_PHONE}
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Why you will love it</h2>
          <p className="mt-3 text-sm text-muted-foreground">{home.description}</p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            {home.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
        <aside className="space-y-4 rounded-3xl border border-dashed border-border/70 bg-background/70 p-6 text-sm text-muted-foreground">
          <h3 className="text-base font-semibold text-foreground">{context.heading}</h3>
          <p>{context.summary}</p>
          <ul className="space-y-2">
            {context.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary/60" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {context.link ? (
            <Link
              href={context.link}
              className="inline-flex items-center font-semibold text-primary underline-offset-2 hover:underline"
            >
              {context.linkLabel ?? 'Explore neighborhood insights'} &rsaquo;
            </Link>
          ) : null}
          <div className="rounded-2xl border border-border/70 bg-card/70 p-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Imagining your furniture? Ask Dr. Duffy for the full design studio spec sheet and floor plan PDFs, and compare layouts in our{' '}
            <Link href="/models" className="text-primary underline-offset-2 hover:underline">
              model gallery
            </Link>
            .
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">Concierge notes</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Dr. Duffy guides your contract, design review, and closing with a proven checklist.
        </p>
        <ul className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
          {home.conciergeNotes.map((note) => (
            <li key={note} className="rounded-2xl border border-border/70 bg-background/70 p-4">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-dashed border-border/70 bg-background/70 p-6 text-sm text-muted-foreground">
        <h3 className="text-base font-semibold text-foreground">Ready to reserve {home.planName}?</h3>
        <p className="mt-2">
          Email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(home.mailSubject)}`}
            className="font-semibold text-primary transition hover:text-primary/80"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          to secure a private tour window or request a same-day video walk-through. Want to compare other quick closings? Visit the{' '}
          <Link href="/move-in-ready" className="text-primary underline-offset-2 hover:underline">
            full move-in-ready collection
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
