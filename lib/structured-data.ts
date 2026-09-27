import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from '@/lib/site'

export const SITE_URL = 'https://www.sunstonewoodsidehomes.com'

export type BreadcrumbItem = {
  name: string
  path: string
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function buildFaqPage(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export const realEstateAgentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#realestateagent`,
  name: 'Dr. Jan Duffy',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  priceRange: '$$',
  worksFor: {
    '@type': 'RealEstateAgency',
    name: 'Berkshire Hathaway HomeServices Nevada Properties',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Real Estate License',
    identifier: 'S.0197614.LLC',
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
  ],
  knowsAbout: [
    'Sunstone new construction homes',
    'Capella at Sunstone Woodside Homes',
    'Las Vegas 55+ and active-adult communities',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10249 Celestial Pole St',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89143',
    addressCountry: 'US',
  },
} as const satisfies Record<string, unknown>
