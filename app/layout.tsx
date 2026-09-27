
import type { Metadata } from 'next'
import { Manrope, Archivo, Roboto } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from '@/lib/site'
import './globals.css'

// Next Step Realty uses Manrope as primary font
const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

// Archivo for headings (as seen in their hero section)
const headingFont = Archivo({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

// Roboto for testimonials and specific sections
const testimonialFont = Roboto({
  subsets: ['latin'],
  variable: '--font-testimonial',
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sunstonewoodsidehomes.com'),
  title: {
    default: 'Dr. Duffyet Duffy | Las Vegas Real Estate Advisor',
    template: '%s | Dr. Duffyet Duffy Realty',
  },
  description:
    'Work with Dr. Duffyet Duffy for tailored Las Vegas real estate guidance. Unlock equity insights, discover show-ready listings, and secure high-performing investments.',
  keywords: [
    'Dr. Duffyet Duffy',
    'Las Vegas real estate',
    'Sunstone Woodside Homes',
    'buy home Las Vegas',
    'sell home Las Vegas',
    'Las Vegas investment property',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dr. Duffyet Duffy | Las Vegas Real Estate Advisor',
    description:
      'Strategic buying, selling, and investment guidance for Sunstone, Summerlin, and the Las Vegas Valley.',
    url: 'https://www.sunstonewoodsidehomes.com',
    siteName: 'Dr. Duffyet Duffy Real Estate',
    locale: 'en_US',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Duffyet Duffy | Las Vegas Real Estate Advisor',
    description:
      'Personalized Las Vegas real estate strategies for buyers, sellers, and investors.',
    images: ['/og-image.png'],
  },
  // Performance hints
  other: {
    'x-dns-prefetch-control': 'on',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preconnect to Google Tag Manager for faster connection */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Defer Google Tag Manager to reduce main thread blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1HCM0VVVP8"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1HCM0VVVP8');
          `}
        </Script>
        <Script id="organization-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['RealEstateAgent', 'Organization'],
            '@id': 'https://www.sunstonewoodsidehomes.com/#realestateagent',
            name: 'Sunstone Woodside | Homes by Dr. Duffy',
            legalName: 'Homes by Dr. Duffy',
            url: 'https://www.sunstonewoodsidehomes.com',
            logo: 'https://www.sunstonewoodsidehomes.com/og-image.png',
            image: 'https://www.sunstonewoodsidehomes.com/og-image.png',
            telephone: CONTACT_PHONE,
            email: CONTACT_EMAIL,
            priceRange: '$$',
            broker: {
              '@type': 'RealEstateAgency',
              name: 'Berkshire Hathaway HomeServices Nevada Properties',
            },
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'Real Estate License',
              identifier: 'NV S.0197614',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: CONTACT_PHONE,
              contactType: 'customer service',
              areaServed: 'US-NV',
              availableLanguage: ['English'],
              hoursAvailable: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['https://schema.org/Monday'],
                  opens: '14:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'https://schema.org/Tuesday',
                    'https://schema.org/Wednesday',
                    'https://schema.org/Thursday',
                    'https://schema.org/Friday',
                    'https://schema.org/Saturday',
                    'https://schema.org/Sunday',
                  ],
                  opens: '10:00',
                  closes: '17:00',
                },
              ],
            },
            areaServed: [
              { '@type': 'City', name: 'Las Vegas', addressRegion: 'NV', addressCountry: 'US' },
              { '@type': 'City', name: 'Henderson', addressRegion: 'NV', addressCountry: 'US' },
              { '@type': 'City', name: 'North Las Vegas', addressRegion: 'NV', addressCountry: 'US' },
              {
                '@type': 'Place',
                name: 'Capella at Sunstone',
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 36.33386,
                  longitude: -115.30462,
                },
              },
            ],
            knowsAbout: [
              'Sunstone new construction homes',
              'Cadence quick move-in homes',
              'Las Vegas luxury real estate concierge services',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '10249 Celestial Pole St',
              addressLocality: 'Las Vegas',
              addressRegion: 'NV',
              postalCode: '89143',
              addressCountry: 'US',
            },
          })}
        </Script>
      </head>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${testimonialFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}