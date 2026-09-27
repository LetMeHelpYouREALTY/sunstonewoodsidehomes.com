/**
 * Capella at Sunstone / Sunstone master plan — map center and curated nearby places.
 *
 * Map center: sales office at 10249 Celestial Pole St, Las Vegas, NV 89143 (site NAP).
 * Coordinates derived from OpenStreetMap Nominatim for Celestial Pole St (89143) and
 * cross-checked against published MLS coordinates for adjacent Sunstone lots on the same street.
 */
export const COMMUNITY_NAME = 'Capella at Sunstone'
export const COMMUNITY_PLACE_NAME = 'Capella at Sunstone'
export const MASTER_PLAN_NAME = 'Sunstone'
export const COMMUNITY_CITY = 'Las Vegas'
export const COMMUNITY_STATE = 'NV'
export const COMMUNITY_POSTAL_CODE = '89143'
export const COMMUNITY_STREET_ADDRESS = '10249 Celestial Pole St'

export const COMMUNITY_CENTER = {
  lat: 36.33386,
  lng: -115.30462,
} as const

export const COMMUNITY_MAP_ZOOM = 14
export const AMENITY_SEARCH_RADIUS_METERS = 8000

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? ''
export const GOOGLE_MAPS_MAP_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() ?? ''

export type AmenityCategoryId =
  | 'parks'
  | 'grocery'
  | 'restaurants'
  | 'fitness'
  | 'healthcare'
  | 'schools'
  | 'cafes'
  | 'shopping'
  | 'golf'
  | 'pharmacies'
  | 'parking'

export type AmenityCategory = {
  id: AmenityCategoryId
  label: string
  /** Google Places (New) primary types for searchNearby */
  includedPrimaryTypes: string[]
  ariaLabel: string
}

/** Family master-plan community — parks, daily errands, and schools first. */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: 'parks',
    label: 'Parks',
    includedPrimaryTypes: ['park', 'playground'],
    ariaLabel: 'Show parks and playgrounds near Capella at Sunstone',
  },
  {
    id: 'grocery',
    label: 'Grocery',
    includedPrimaryTypes: ['grocery_store', 'supermarket'],
    ariaLabel: 'Show grocery stores near Capella at Sunstone',
  },
  {
    id: 'restaurants',
    label: 'Restaurants',
    includedPrimaryTypes: ['restaurant'],
    ariaLabel: 'Show restaurants near Capella at Sunstone',
  },
  {
    id: 'fitness',
    label: 'Fitness',
    includedPrimaryTypes: ['gym', 'fitness_center'],
    ariaLabel: 'Show gyms and fitness centers near Capella at Sunstone',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    includedPrimaryTypes: ['hospital', 'doctor', 'medical_clinic'],
    ariaLabel: 'Show hospitals and medical clinics near Capella at Sunstone',
  },
  {
    id: 'schools',
    label: 'Schools',
    includedPrimaryTypes: ['school', 'primary_school', 'secondary_school'],
    ariaLabel: 'Show schools near Capella at Sunstone',
  },
  {
    id: 'cafes',
    label: 'Cafes',
    includedPrimaryTypes: ['cafe', 'coffee_shop'],
    ariaLabel: 'Show cafes near Capella at Sunstone',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    includedPrimaryTypes: ['shopping_mall', 'department_store'],
    ariaLabel: 'Show shopping near Capella at Sunstone',
  },
  {
    id: 'golf',
    label: 'Golf',
    includedPrimaryTypes: ['golf_course'],
    ariaLabel: 'Show golf courses near Capella at Sunstone',
  },
  {
    id: 'pharmacies',
    label: 'Pharmacies',
    includedPrimaryTypes: ['pharmacy', 'drugstore'],
    ariaLabel: 'Show pharmacies near Capella at Sunstone',
  },
  {
    id: 'parking',
    label: 'Parking',
    includedPrimaryTypes: ['parking'],
    ariaLabel: 'Show parking near Capella at Sunstone',
  },
]

export type CuratedPlace = {
  name: string
  category: AmenityCategoryId
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  sourceUrl: string
  schemaType:
    | 'Restaurant'
    | 'CafeOrCoffeeShop'
    | 'GroceryStore'
    | 'Park'
    | 'GolfCourse'
    | 'Hospital'
    | 'Pharmacy'
    | 'ShoppingCenter'
    | 'School'
  note?: string
}

/** Verified addresses only — used for fallback list, copy, and ItemList schema. */
export const CURATED_NEARBY_PLACES: CuratedPlace[] = [
  {
    name: "Smith's Marketplace",
    category: 'grocery',
    streetAddress: '9710 W Skye Canyon Park Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89166',
    sourceUrl:
      'https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/skye-canyon-marketplace/706/00367',
    schemaType: 'GroceryStore',
    note: 'Full grocery, home goods, and in-store pharmacy at Skye Canyon Marketplace.',
  },
  {
    name: 'Centennial Hills Hospital Medical Center',
    category: 'healthcare',
    streetAddress: '6900 N Durango Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89149',
    sourceUrl: 'https://www.centennialhillshospital.com/patients-visitors/maps-directions',
    schemaType: 'Hospital',
  },
  {
    name: 'Floyd Lamb Park at Tule Springs',
    category: 'parks',
    streetAddress: '9200 Tule Springs Rd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89131',
    sourceUrl: 'https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Floyd-Lamb-Park',
    schemaType: 'Park',
    note: 'City park with trails, picnic areas, and fishing ponds a short drive from Sunstone.',
  },
  {
    name: 'William & Mary Scherkenbach Elementary School',
    category: 'schools',
    streetAddress: '9371 Iron Mountain Rd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89143',
    sourceUrl: 'https://williamandmaryscherkenbaches.ccsd.net/contact-us',
    schemaType: 'School',
  },
  {
    name: 'Arbor View High School',
    category: 'schools',
    streetAddress: '7500 Whispering Sands Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89131',
    sourceUrl: 'https://www.arborviewhs.org/apps/contact/',
    schemaType: 'School',
  },
  {
    name: 'Angel Park Golf Club',
    category: 'golf',
    streetAddress: '100 S Rampart Blvd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89145',
    sourceUrl: 'https://arcisgolf.com/clubs/angel-park-golf-club/hours-and-directions',
    schemaType: 'GolfCourse',
  },
]

export function formatPlaceAddress(place: CuratedPlace): string {
  return `${place.streetAddress}, ${place.addressLocality}, ${place.addressRegion} ${place.postalCode}`
}

export function communityEmbedMapUrl(): string {
  const { lat, lng } = COMMUNITY_CENTER
  return `https://www.google.com/maps?q=${lat},${lng}&z=${COMMUNITY_MAP_ZOOM}&output=embed`
}

export function directionsUrlForPlace(name: string, address: string): string {
  const destination = encodeURIComponent(`${name}, ${address}`)
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

export function directionsUrlForCommunity(): string {
  const destination = encodeURIComponent(
    `${COMMUNITY_STREET_ADDRESS}, ${COMMUNITY_CITY}, ${COMMUNITY_STATE} ${COMMUNITY_POSTAL_CODE}`,
  )
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

export const AMENITIES_PAGE_FAQS = [
  {
    question: 'What grocery stores are near Capella at Sunstone?',
    answer:
      "Smith's Marketplace at Skye Canyon Marketplace (9710 W Skye Canyon Park Dr) is the closest full-service grocery option for Sunstone residents, with produce, home goods, and pharmacy services.",
  },
  {
    question: 'How far is Capella at Sunstone from the Las Vegas Strip?',
    answer:
      'From northwest Las Vegas, the Strip is typically about a 25–35 minute drive via US-95 and I-15 depending on traffic and your starting point in Sunstone — approximate drive time, not a guarantee.',
  },
  {
    question: 'Are there hospitals near Sunstone?',
    answer:
      'Centennial Hills Hospital Medical Center at 6900 N Durango Dr serves the northwest Las Vegas corridor near Sunstone for acute-care needs.',
  },
  {
    question: 'What parks and outdoor recreation are close to Sunstone?',
    answer:
      'Sunstone’s master-planned trail network connects neighborhoods on foot and bike, while Floyd Lamb Park at Tule Springs and Mount Charleston offer larger-scale hiking, picnicking, and seasonal snow play a short drive away.',
  },
  {
    question: 'Which schools serve the Sunstone area?',
    answer:
      'Clark County School District assigns schools by address; nearby campuses often referenced for Sunstone include William & Mary Scherkenbach Elementary and Arbor View High School — always verify assignment for your specific lot before you buy.',
  },
  {
    question: 'How far is Sunstone from Harry Reid International Airport?',
    answer:
      'Harry Reid International Airport is roughly a 25–35 minute drive from northwest Las Vegas via US-95 and the 215 Beltway, depending on traffic — approximate drive time.',
  },
  {
    question: 'How do I get to Downtown Summerlin from Sunstone?',
    answer:
      'Downtown Summerlin shopping and dining is commonly about a 15–25 minute drive south through Summerlin parkways from the Sunstone area — approximate drive time that varies with traffic.',
  },
  {
    question: 'Who helps buyers tour Capella at Sunstone and nearby amenities?',
    answer:
      'Dr. Jan Duffy (NV S.0197614) represents buyers for Woodside Homes at Capella at Sunstone and can coordinate model tours plus neighborhood drives covering groceries, trails, and daily errands.',
  },
]

export type AmenityContentSection = {
  id: AmenityCategoryId | 'commute'
  title: string
  paragraphs: string[]
  places?: CuratedPlace[]
}

export const AMENITY_CONTENT_SECTIONS: AmenityContentSection[] = [
  {
    id: 'restaurants',
    title: 'Dining near Sunstone',
    paragraphs: [
      'Northwest Las Vegas dining clusters along Skye Canyon Park Drive, Durango Drive, and the Centennial Hills retail corridors. Many Sunstone buyers start at Skye Canyon Marketplace for quick meals, coffee, and takeout before exploring chef-driven spots in Summerlin.',
      'Dr. Duffy often maps a first-week meal plan around your commute and school routes so you know dependable options before move-in day.',
    ],
  },
  {
    id: 'parks',
    title: 'Parks, trails, and recreation',
    paragraphs: [
      'Capella at Sunstone sits inside the Sunstone master plan, where miles of planned trails and neighborhood parks connect daily walks, dog outings, and weekend rides.',
      'Floyd Lamb Park at Tule Springs adds lakeside picnic areas and desert hiking minutes north, while Mount Charleston and Lee Canyon deliver cooler temperatures and seasonal snow play.',
    ],
    places: CURATED_NEARBY_PLACES.filter((p) => p.category === 'parks'),
  },
  {
    id: 'golf',
    title: 'Golf',
    paragraphs: [
      'Northwest Las Vegas and Summerlin offer public and private golf options. Angel Park Golf Club is a well-known municipal complex with multiple courses serving the northwest valley.',
    ],
    places: CURATED_NEARBY_PLACES.filter((p) => p.category === 'golf'),
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    paragraphs: [
      'Centennial Hills Hospital Medical Center anchors acute care for the northwest Las Vegas corridor, with physician offices and urgent care sprinkled along Durango and Town Center corridors.',
      'Pharmacy needs are often handled at Smith’s Marketplace or standalone drugstores along Durango Drive — confirm hours and services before you relocate prescriptions.',
    ],
    places: CURATED_NEARBY_PLACES.filter((p) => p.category === 'healthcare'),
  },
  {
    id: 'shopping',
    title: 'Shopping and daily errands',
    paragraphs: [
      'Skye Canyon Marketplace pairs Smith’s Marketplace with apparel, services, and coffee in one stop. Larger fashion and entertainment trips often head to Downtown Summerlin or the Centennial Hills retail nodes.',
    ],
    places: CURATED_NEARBY_PLACES.filter((p) =>
      ['grocery', 'shopping'].includes(p.category),
    ),
  },
  {
    id: 'schools',
    title: 'Schools (verify for your homesite)',
    paragraphs: [
      'School assignments in Clark County depend on your exact homesite address. Buyers comparing Sunstone frequently review William & Mary Scherkenbach Elementary and Arbor View High School while confirming boundaries with CCSD.',
    ],
    places: CURATED_NEARBY_PLACES.filter((p) => p.category === 'schools'),
  },
  {
    id: 'commute',
    title: 'Commute and regional access',
    paragraphs: [
      'Sunstone connects to US-95 for commutes to the Strip, airport, and central Las Vegas employment centers. Approximate drive times: Las Vegas Strip 25–35 minutes, Harry Reid International Airport 25–35 minutes, Downtown Summerlin 15–25 minutes — all traffic-dependent estimates.',
      'Skye Canyon Park Drive and Sunstone Parkway feed daily errands, while Mount Charleston access provides a weekend escape without leaving Clark County.',
    ],
  },
]
