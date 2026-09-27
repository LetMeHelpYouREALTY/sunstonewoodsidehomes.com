import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import { AmenityMapLazy } from '@/components/amenities/amenity-map-lazy'
import {
  AMENITIES_PAGE_FAQS,
  AMENITY_CONTENT_SECTIONS,
  COMMUNITY_CENTER,
  COMMUNITY_CITY,
  COMMUNITY_NAME,
  COMMUNITY_PLACE_NAME,
  COMMUNITY_POSTAL_CODE,
  COMMUNITY_STATE,
  COMMUNITY_STREET_ADDRESS,
  CURATED_NEARBY_PLACES,
  MASTER_PLAN_NAME,
  formatPlaceAddress,
} from '@/lib/amenities-config'
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  SALES_HOURS,
} from '@/lib/site'

const pageTitle = `Nearby Amenities in ${COMMUNITY_NAME}, ${COMMUNITY_CITY}`
const pageDescription =
  'Interactive map and hyperlocal guide to grocery, parks, healthcare, schools, golf, and commute routes near Capella at Sunstone in northwest Las Vegas — curated by Dr. Jan Duffy.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/amenities',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.sunstonewoodsidehomes.com/amenities',
    type: 'website',
  },
}

const baseUrl = 'https://www.sunstonewoodsidehomes.com'

export default function AmenitiesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AMENITIES_PAGE_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Featured places near ${COMMUNITY_NAME}`,
    itemListElement: CURATED_NEARBY_PLACES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.streetAddress,
          addressLocality: place.addressLocality,
          addressRegion: place.addressRegion,
          postalCode: place.postalCode,
          addressCountry: 'US',
        },
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Nearby Amenities',
        item: `${baseUrl}/amenities`,
      },
    ],
  }

  const communityPlaceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: COMMUNITY_PLACE_NAME,
    description: `${COMMUNITY_NAME} new construction by Woodside Homes within the ${MASTER_PLAN_NAME} master plan in northwest ${COMMUNITY_CITY}.`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMMUNITY_CENTER.lat,
      longitude: COMMUNITY_CENTER.lng,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMMUNITY_STREET_ADDRESS,
      addressLocality: COMMUNITY_CITY,
      addressRegion: COMMUNITY_STATE,
      postalCode: COMMUNITY_POSTAL_CODE,
      addressCountry: 'US',
    },
  }

  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${baseUrl}/#realestateagent`,
    name: 'Sunstone Woodside | Homes by Dr. Duffy',
    url: baseUrl,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    areaServed: {
      '@type': 'Place',
      name: COMMUNITY_PLACE_NAME,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMMUNITY_CENTER.lat,
        longitude: COMMUNITY_CENTER.lng,
      },
    },
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <Script id="schema-amenities-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="schema-amenities-places" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListSchema)}
      </Script>
      <Script
        id="schema-amenities-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id="schema-amenities-community" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(communityPlaceSchema)}
      </Script>
      <Script id="schema-amenities-agent" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(agentSchema)}
      </Script>

      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Hyperlocal guide
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Nearby Amenities in {COMMUNITY_NAME}, {COMMUNITY_CITY}
        </h1>
        <p className="text-lg text-muted-foreground">
          Capella at Sunstone places you in the {MASTER_PLAN_NAME} master plan with trail access,
          Skye Canyon errands, and northwest Las Vegas healthcare — explore the map, verified
          destinations, and buyer FAQs below.
        </p>
      </header>

      <section aria-labelledby="amenities-interactive-map-heading">
        <h2 id="amenities-interactive-map-heading" className="sr-only">
          Interactive amenity map
        </h2>
        <AmenityMapLazy showCuratedListInFallback={false} />
      </section>

      <div className="space-y-12">
        {AMENITY_CONTENT_SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={`amenity-section-${section.id}`}>
            <h2
              id={`amenity-section-${section.id}`}
              className="text-2xl font-semibold text-foreground"
            >
              {section.title}
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.places && section.places.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.places.map((place) => (
                  <li
                    key={place.name}
                    className="rounded-xl border border-border/70 bg-card/60 p-4 text-sm"
                  >
                    <p className="font-semibold text-foreground">{place.name}</p>
                    <p className="text-muted-foreground">{formatPlaceAddress(place)}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section
        className="rounded-3xl border border-border bg-background/80 p-8 shadow-sm"
        aria-labelledby="amenities-faq-heading"
      >
        <h2 id="amenities-faq-heading" className="text-2xl font-semibold text-foreground">
          Nearby amenities FAQs
        </h2>
        <dl className="mt-6 space-y-6">
          {AMENITIES_PAGE_FAQS.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold text-foreground">{item.question}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Tour {COMMUNITY_NAME} with Dr. Jan Duffy
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Dr. Jan Duffy (NV S.0197614) represents buyers for Woodside Homes at Sunstone with
          Berkshire Hathaway HomeServices Nevada Properties. Schedule a model tour and neighborhood
          drive that covers groceries, trails, and daily routes before you write an offer.
        </p>
        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
          <li>{CONTACT_ADDRESS}</li>
          <li>Sales center hours: {SALES_HOURS}</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Capella%20Amenities%20Tour`}
            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Email Dr. Duffy
          </a>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Call {CONTACT_PHONE}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Contact page
          </Link>
        </div>
      </section>
    </div>
  )
}
