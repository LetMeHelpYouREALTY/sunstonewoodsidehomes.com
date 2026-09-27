import type { Metadata } from 'next'
import Link from 'next/link'

import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  SALES_HOURS,
} from '@/lib/site'
import { ContactForm } from '@/components/contact-form'
import { DeferredRender } from '@/components/deferred-render'
import { AmenityMapSection } from '@/components/amenities/amenity-map-section'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbList } from '@/lib/structured-data'

const reasons = [
  'Schedule a private tour of Capella model homes.',
  'Request move-in ready inventory updates.',
  'Review incentive stacking and design studio budgets.',
  'Coordinate relocation services and utility setup.',
]

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=10249%20Celestial%20Pole%20St%20Las%20Vegas%2C%20NV%2089143&output=embed'
const MAP_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=10249+Celestial+Pole+St+Las+Vegas+NV+89143'

export const metadata: Metadata = {
  title: 'Contact Dr. Duffy | Sunstone Woodside Home Concierge',
  description:
    'Call or message Dr. Duffy to book Sunstone tours, preview move-in ready homes, and plan your Las Vegas relocation support.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id="schema-contact-breadcrumb"
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <header className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Contact
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Let’s plan your next move together
        </h1>
        <p className="text-lg text-muted-foreground">
          Reach out by phone, email, or complete the concierge form below to begin your
          personalized Capella at Sunstone experience.
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Concierge request form</h2>
          <p className="text-sm text-muted-foreground">
            Tell us who will be joining the journey, your target move-in date, and any must-haves.
            Dr. Duffy’s team will respond within one business day.
          </p>
          <ContactForm />
        </div>
        <aside className="space-y-6 rounded-3xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Visit the sales center</h2>
          <p>{CONTACT_ADDRESS}</p>
          <p>Hours: {SALES_HOURS}</p>
          <Link
            href={CONTACT_PHONE_LINK}
            className="inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
          >
            Call {CONTACT_PHONE}
          </Link>
          <p>
            Email:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-foreground transition hover:text-primary"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <div className="border-t border-border/60 pt-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-primary">Top requests</h3>
            <ul className="mt-2 space-y-2">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-2xl border border-border/60 bg-background/80 p-4">
            <h3 className="text-sm font-semibold text-foreground">Plan your visit</h3>
            <p>
              Use Google Maps to confirm travel time, preview street views, and save the sales center to your favorites so
              directions are one tap away when you tour.
            </p>
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Open directions in Google Maps
            </a>
            <DeferredRender
              fallback={
                <div className="h-[220px] w-full animate-pulse rounded-xl border border-border/60 bg-muted/40" />
              }
            >
              <div className="overflow-hidden rounded-xl border border-border/60">
                <iframe
                  title="Google Maps location for Dr. Duffy's Sunstone sales center"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </DeferredRender>
          </div>
        </aside>
      </section>

      <AmenityMapSection
        compact
        title="What's near the Capella sales center"
        description="Explore restaurants, parks, grocery, and healthcare around Sunstone before you book a tour."
      />
    </div>
  )
}

