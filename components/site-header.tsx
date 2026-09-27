import Link from 'next/link'

import { CONTACT_PHONE, CONTACT_PHONE_LINK } from '@/lib/site'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/models', label: 'Home Plans' },
  { href: '/move-in-ready', label: 'Move-In Ready' },
  { href: '/buyers-guide', label: 'Buyer Journey' },
  { href: '/communities', label: 'Communities' },
  { href: '/amenities', label: 'Nearby Amenities' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/financing', label: 'Financing' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EEEEEE] bg-white">
      <div className="mx-auto flex max-w-[1448px] items-center justify-between gap-5 px-12 py-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: 'var(--font-body), Manrope, sans-serif' }}
        >
          Dr. Duffy Realty
        </Link>
        
        {/* Navigation - Center */}
        <nav className="hidden items-center gap-[34px] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-foreground transition-all hover:text-primary hover:underline"
              style={{
                fontFamily: 'var(--font-body), Manrope, sans-serif',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* CTA Section - Right */}
        <div className="flex items-center gap-5">
          <Link
            href={CONTACT_PHONE_LINK}
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
            style={{ fontFamily: 'var(--font-body), Manrope, sans-serif' }}
          >
            {CONTACT_PHONE}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#A4A4A4] bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            style={{ fontFamily: 'var(--font-body), Manrope, sans-serif' }}
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </header>
  )
}

