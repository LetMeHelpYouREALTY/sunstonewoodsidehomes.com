import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import { getServiceAreaBySlug, serviceAreas } from '@/lib/service-areas'
import { AmenityMapSection } from '@/components/amenities/amenity-map-section'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_LINK } from '@/lib/site'

const baseUrl = 'https://www.sunstonewoodsidehomes.com'

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return {
      title: 'Service Area Not Found',
    }
  }

  return {
    title: `${area.name} Real Estate Guide`,
    description: area.description,
  }
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <Script
        id={`schema-service-area-${area.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${baseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Service Areas',
              item: `${baseUrl}/service-areas`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: area.name,
              item: `${baseUrl}/service-areas/${area.slug}`,
            },
          ],
        })}
      </Script>
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {area.name}
        </p>
        <h1 className="text-balance text-4xl font-semibold text-foreground sm:text-5xl">
          {area.headline}
        </h1>
        <p className="text-lg text-muted-foreground">{area.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Link
            href="/service-areas"
            className="inline-flex items-center rounded-full border border-input px-4 py-2 font-semibold text-foreground transition hover:bg-muted"
          >
            View all service areas
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(area.tourCta.mailSubject)}`}
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {area.tourCta.label}
          </a>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Community snapshot</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            What makes {area.name} a standout choice for Las Vegas homebuyers.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            {area.keyHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
        <aside className="space-y-6 rounded-3xl border border-border/70 bg-background/70 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground">At-a-glance stats</h3>
          <dl className="space-y-4 text-sm text-muted-foreground">
            {area.communityStats.map((stat) => (
              <div key={stat.label} className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <dt className="font-semibold text-foreground">{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-border/60 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Local living fast facts
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {area.localDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary/60" />
                  <span>
                    <span className="font-semibold text-foreground/80">{detail.label}:</span> {detail.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Buyer insights</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Dr. Duffy’s guidance for navigating {area.name} inventory, competition, and value.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {area.buyerInsights.map((insight) => (
              <li key={insight}>• {insight}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Concierge notes</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tap into concierge-level planning to make your move seamless.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {area.conciergeNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-3xl border border-dashed border-border/70 bg-background/70 p-8 text-sm text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">
          Ready to tailor a {area.name} tour?
        </h2>
        <p className="mt-2">
          Share your preferred timeline, budget, and must-haves—Dr. Duffy will craft an itinerary
          with builder releases, resale opportunities, and lifestyle highlights.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(area.tourCta.mailSubject)}`}
            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {area.tourCta.label}
          </a>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Call {CONTACT_PHONE}
          </Link>
        </div>
      </section>

      {slug === 'capella-at-sunstone' || slug === 'sunstone-master-plan' ? (
        <AmenityMapSection
          compact
          title={`Amenities near ${area.name}`}
          description="Switch categories to see parks, grocery, healthcare, and schools within a short drive of the Capella sales center."
        />
      ) : null}
    </div>
  )
}

