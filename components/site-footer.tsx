import Link from 'next/link'

import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_LINK,
  SERVICE_AREAS,
} from '@/lib/site'

const footerNav = [
  { href: '/models', label: 'Home Plans' },
  { href: '/move-in-ready', label: 'Move-In Ready' },
  { href: '/buyers-guide', label: 'Buyer Journey' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/communities', label: 'Communities' },
  { href: '/amenities', label: 'Nearby Amenities' },
  { href: '/financing', label: 'Financing' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/95 py-10 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Dr. Duffyet Duffy Realty
          </p>
          <p className="text-sm text-muted-foreground">
            Dedicated to guiding homebuyers through Sunstone, Summerlin, and the
            Greater Las Vegas Valley with data-driven strategy and concierge
            service. Browse our{' '}
            <Link href="/move-in-ready" className="text-primary underline-offset-2 hover:underline">
              move-in-ready homes
            </Link>{' '}
            and schedule a tour from the{' '}
            <Link href="/contact" className="text-primary underline-offset-2 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Contact</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block font-semibold text-primary transition hover:text-primary/80"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href={CONTACT_PHONE_LINK}
              className="block font-semibold text-foreground transition hover:text-primary"
            >
              {CONTACT_PHONE}
            </Link>
            <p>{CONTACT_ADDRESS}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Buyer Tools</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Service Areas</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-between gap-3 px-4 text-xs text-muted-foreground">
        <div className="space-y-2">
          <p>
            © {new Date().getFullYear()} Sunstone Woodside | Homes by Dr. Duffy. All rights reserved.
          </p>
          <p>
            Dr. Duffy NV License S.0197614 | Berkshire Hathaway HomeServices Nevada Properties
          </p>
          <p>Representing buyers for homes in Sunstone Woodside by Woodside Homes</p>
        </div>
        <div className="space-y-2 text-right">
          <p>© {new Date().getFullYear()} Berkshire Hathaway HomeServices Nevada Properties</p>
          <p>Member of BHH Affiliates LLC franchise system | Equal Housing Opportunity</p>
          <p>Property information not guaranteed - buyers advised to verify independently</p>
        </div>
      </div>
    </footer>
  )
}

