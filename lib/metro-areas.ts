import { BRAND } from './constants'

function cityBookingUrl(city: string) {
  return `https://reservations.allurahomes.com/en/properties?city=${encodeURIComponent(city)}&country=United+States&minOccupancy=1`
}

export type MetroCity = {
  name: string
  bookable: boolean
}

export type MetroArea = {
  slug: string
  name: string
  region: string
  heroAccent: string
  heroTitle: string
  heroSubtitle: string
  heroVideo?: string
  intro: {
    heading: string
    paragraphs: string[]
  }
  cities: MetroCity[]
  highlights: {
    title: string
    description: string
    icon: string
  }[]
  regulations: {
    heading: string
    items: string[]
  }
  seo: {
    title: string
    description: string
    keywords: string[]
    canonical: string
  }
}

export const METRO_AREAS: MetroArea[] = [
  {
    slug: 'san-diego-temecula',
    name: 'San Diego & Temecula',
    region: 'Southern California',
    heroAccent: 'Our Flagship Markets',
    heroTitle: 'San Diego & Temecula\nProperty Management',
    heroSubtitle:
      'From the coastal bluffs of La Jolla to the rolling vineyards of Temecula Wine Country, Allura manages the most sought-after vacation rentals in Southern California.',
    intro: {
      heading: 'Why San Diego & Temecula?',
      paragraphs: [
        'San Diego County is one of the strongest short-term rental markets in the nation, driven by year-round tourism, world-class beaches, a thriving culinary scene, and major events from Comic-Con to the US Open. Temecula Wine Country adds a unique dimension with its boutique wineries, hot-air balloon festivals, and growing popularity as a luxury getaway destination.',
        'Allura Homes was born in San Diego. With 13+ years operating in these markets, we understand the hyper-local dynamics that drive revenue -- from seasonal pricing swings to neighborhood-level regulation nuances. Our relationships with local cleaners, maintenance crews, and hospitality vendors are unmatched.',
      ],
    },
    cities: [
      { name: 'San Diego', bookable: true },
      { name: 'La Jolla', bookable: false },
      { name: 'Del Mar', bookable: false },
      { name: 'Encinitas', bookable: false },
      { name: 'Solana Beach', bookable: false },
      { name: 'Carlsbad', bookable: false },
      { name: 'Oceanside', bookable: false },
      { name: 'San Marcos', bookable: false },
      { name: 'Vista', bookable: false },
      { name: 'Chula Vista', bookable: false },
      { name: 'Fallbrook', bookable: false },
      { name: 'Little Italy', bookable: false },
      { name: 'Temecula', bookable: false },
      { name: 'Murrieta', bookable: true },
      { name: 'Menifee', bookable: true },
      { name: 'Winchester', bookable: false },
    ],
    highlights: [
      {
        title: 'Year-Round Demand',
        description:
          'San Diego enjoys 266 sunny days per year, meaning consistent booking demand across all four seasons -- no dead months.',
        icon: 'Sun',
      },
      {
        title: 'Wine Country Premium',
        description:
          'Temecula Valley properties command weekend premiums of 30-50% above comparable inland markets, especially during harvest season.',
        icon: 'Wine',
      },
      {
        title: 'Military & Corporate Travel',
        description:
          'Home to multiple military bases and a booming biotech corridor, San Diego generates steady mid-week corporate and relocation bookings.',
        icon: 'Briefcase',
      },
      {
        title: 'Event-Driven Spikes',
        description:
          'Comic-Con, KAABOO, Del Mar Races, and dozens of annual events create predictable revenue spikes we optimize for months in advance.',
        icon: 'Calendar',
      },
    ],
    regulations: {
      heading: 'San Diego & Temecula STR Regulations',
      items: [
        'City of San Diego requires a Short-Term Residential Occupancy (STRO) license for all rentals under 30 days.',
        'San Diego caps non-owner-occupied whole-home STR licenses, making existing permits increasingly valuable.',
        'Transient Occupancy Tax (TOT) of 10.5% applies in San Diego; rates vary by jurisdiction in Riverside County.',
        'Temecula and surrounding Riverside County cities have evolving STR ordinances -- Allura monitors all updates proactively.',
        'HOA restrictions vary widely; we review CC&Rs as part of our onboarding compliance check.',
      ],
    },
    seo: {
      title: 'San Diego & Temecula Vacation Rental Property Management',
      description:
        'Professional Airbnb & VRBO property management in San Diego, La Jolla, Del Mar, Encinitas, Temecula, and across Southern California. Superhost-certified with 13+ years of local expertise. Maximize your rental income with Allura Homes.',
      keywords: [
        'San Diego property management',
        'Temecula vacation rental management',
        'Airbnb management San Diego',
        'La Jolla rental management',
        'Del Mar short-term rental',
        'Encinitas Airbnb manager',
        'Temecula wine country rentals',
        'San Diego STR management',
      ],
      canonical: 'https://allurahomes.com/property-management/san-diego-temecula',
    },
  },
  {
    slug: 'coachella-valley',
    name: 'Coachella Valley',
    region: 'Desert & Central Coast',
    heroAccent: 'Desert Luxury Markets',
    heroTitle: 'Coachella Valley\nProperty Management',
    heroSubtitle:
      'From the mid-century glamour of Palm Springs to the sprawling desert estates of Palm Desert, Allura brings white-glove management to the Coachella Valley.',
    intro: {
      heading: 'Why the Coachella Valley?',
      paragraphs: [
        'The Coachella Valley is a powerhouse vacation rental market, fueled by Coachella and Stagecoach festival season, the BNP Paribas Open, PGA golf tournaments, and a snowbird season that runs from October through April. Properties here can generate a significant portion of annual revenue in just a few peak weekends.',
        'Allura understands the unique rhythm of desert markets -- dramatic seasonal swings, extreme heat management protocols, pool and spa maintenance requirements, and the city-by-city regulatory patchwork. Our dynamic pricing captures every dollar during peak events while maintaining strong occupancy in shoulder seasons.',
      ],
    },
    cities: [
      { name: 'Palm Springs', bookable: true },
      { name: 'Palm Desert', bookable: true },
      { name: 'Cathedral City', bookable: true },
      { name: 'Ojai', bookable: true },
    ],
    highlights: [
      {
        title: 'Festival Revenue',
        description:
          'Coachella, Stagecoach, and other major festivals can generate 4-6 months of typical revenue in just 2-3 weekends.',
        icon: 'Music',
      },
      {
        title: 'Snowbird Season',
        description:
          'October through April delivers consistent long-stay bookings from winter visitors escaping cold-weather states.',
        icon: 'Thermometer',
      },
      {
        title: 'Golf & Wellness Tourism',
        description:
          'World-class golf courses and wellness retreats drive premium mid-week bookings, especially among affluent travelers.',
        icon: 'Heart',
      },
      {
        title: 'Mid-Century Chic',
        description:
          'Palm Springs\' iconic architecture and design heritage attracts a design-savvy traveler willing to pay premium nightly rates.',
        icon: 'Home',
      },
    ],
    regulations: {
      heading: 'Coachella Valley STR Regulations',
      items: [
        'Palm Springs requires a Vacation Rental Registration and has a minimum night stay requirement in certain zones.',
        'Cathedral City requires a STR permit and enforces noise and occupancy limits.',
        'Palm Desert has adopted STR regulations including a registration process and TOT collection requirements.',
        'Transient Occupancy Tax rates vary by city: Palm Springs 12.5%, Cathedral City 12%, Palm Desert 11%.',
        'Allura ensures full compliance with evolving desert city ordinances and handles all permit renewals.',
      ],
    },
    seo: {
      title: 'Coachella Valley Vacation Rental Property Management - Palm Springs, Palm Desert',
      description:
        'Professional Airbnb & VRBO management in Palm Springs, Palm Desert, Cathedral City, and the Coachella Valley. Festival revenue optimization, snowbird season strategy, and full-service property management by Allura Homes.',
      keywords: [
        'Palm Springs property management',
        'Coachella Valley rental management',
        'Palm Desert Airbnb management',
        'Cathedral City vacation rental',
        'Coachella festival rental management',
        'Palm Springs STR management',
        'desert vacation rental manager',
      ],
      canonical: 'https://allurahomes.com/property-management/coachella-valley',
    },
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    region: 'Greater Los Angeles',
    heroAccent: 'Entertainment Capital',
    heroVideo: '/videos/hero-la.mp4',
    heroTitle: 'Los Angeles\nProperty Management',
    heroSubtitle:
      'From the iconic Hollywood Hills to the upscale enclaves of Woodland Hills, Allura delivers boutique vacation rental management across the City of Angels.',
    intro: {
      heading: 'Why Los Angeles?',
      paragraphs: [
        'Los Angeles is the second-largest city in the United States and one of the most visited destinations on Earth. With 50+ million annual visitors, a $36 billion tourism industry, and demand driven by entertainment, business travel, film production, and cultural events, LA offers extraordinary short-term rental potential.',
        'Navigating LA\'s STR landscape requires expertise. Allura understands the city\'s Home Sharing Ordinance, neighborhood-specific restrictions, and the competitive dynamics of a market with world-class hotels. We position your property to capture premium guests who want the privacy, space, and character that only a well-managed vacation home can offer.',
      ],
    },
    cities: [
      { name: 'Los Angeles', bookable: true },
      { name: 'Hollywood Hills', bookable: false },
      { name: 'Woodland Hills', bookable: false },
    ],
    highlights: [
      {
        title: '50M+ Annual Visitors',
        description:
          'LA\'s tourism machine generates year-round demand from leisure travelers, business visitors, and entertainment industry professionals.',
        icon: 'Users',
      },
      {
        title: 'Entertainment Industry',
        description:
          'Film shoots, award seasons, and production schedules drive consistent demand for premium, private accommodations.',
        icon: 'Film',
      },
      {
        title: 'Premium ADR',
        description:
          'Well-positioned LA properties command some of the highest average daily rates in the country, especially in sought-after neighborhoods.',
        icon: 'DollarSign',
      },
      {
        title: 'Diverse Demand Sources',
        description:
          'Business travelers, digital nomads, medical tourism, university visits, and entertainment events create diversified revenue streams.',
        icon: 'Layers',
      },
    ],
    regulations: {
      heading: 'Los Angeles STR Regulations',
      items: [
        'LA\'s Home Sharing Ordinance requires hosts to register with the city and limits short-term rentals to 120 days per year unless an Extended Home-Sharing Permit is obtained.',
        'Only primary residences qualify for STR permits in the City of LA; investment properties require special approval.',
        'Transient Occupancy Tax of 14% applies to all short-term rentals in the City of Los Angeles.',
        'Unincorporated LA County areas and neighboring cities have separate regulations that may be more favorable.',
        'Allura navigates the permit process and ensures ongoing compliance with evolving LA ordinances.',
      ],
    },
    seo: {
      title: 'Los Angeles Vacation Rental Property Management - Hollywood Hills, Woodland Hills',
      description:
        'Professional Airbnb & VRBO property management in Los Angeles, Hollywood Hills, and Woodland Hills. Expert navigation of LA\'s Home Sharing Ordinance, premium guest experiences, and revenue optimization by Allura Homes.',
      keywords: [
        'Los Angeles property management',
        'Hollywood Hills rental management',
        'LA Airbnb management',
        'Woodland Hills vacation rental',
        'Los Angeles STR management',
        'LA short-term rental manager',
        'Hollywood vacation rental management',
      ],
      canonical: 'https://allurahomes.com/property-management/los-angeles',
    },
  },
  {
    slug: 'sf-bay-area',
    name: 'SF/Oakland Bay Area',
    region: 'Northern California',
    heroAccent: 'Northern California Markets',
    heroTitle: 'SF/Oakland Bay Area\nProperty Management',
    heroSubtitle:
      'From the iconic streets of San Francisco to the rolling hills of Napa and Sonoma, Allura brings Southern California hospitality expertise to the Bay Area and Wine Country.',
    intro: {
      heading: 'Why the Bay Area & Wine Country?',
      paragraphs: [
        'The San Francisco Bay Area combines one of the world\'s premier tech and business hubs with world-class dining, culture, and tourism. Paired with the legendary Napa and Sonoma wine regions, this corridor offers diverse short-term rental opportunities ranging from urban pied-à-terres to vineyard estates.',
        'Allura\'s expansion into Northern California brings our proven operational playbook to markets with strong corporate travel demand, international tourism, and a sophisticated traveler who expects exceptional quality. Whether it\'s a tech executive visiting for a week or a wine enthusiast on a harvest-season getaway, we deliver five-star experiences.',
      ],
    },
    cities: [
      { name: 'San Francisco', bookable: false },
      { name: 'Oakland', bookable: true },
      { name: 'Napa', bookable: true },
      { name: 'Sonoma', bookable: false },
    ],
    highlights: [
      {
        title: 'Tech & Business Travel',
        description:
          'Silicon Valley and SF\'s tech ecosystem drives steady corporate travel demand with guests who value quality accommodations.',
        icon: 'Laptop',
      },
      {
        title: 'Wine Country Premium',
        description:
          'Napa and Sonoma properties command premium rates, especially during harvest season (August-October) and holiday weekends.',
        icon: 'Wine',
      },
      {
        title: 'International Tourism',
        description:
          'San Francisco is a top-10 global destination, attracting international visitors who book longer stays and spend more per trip.',
        icon: 'Globe',
      },
      {
        title: 'Convention & Event Demand',
        description:
          'Dreamforce, Google I/O, Apple WWDC, and hundreds of annual conventions create predictable booking spikes.',
        icon: 'Calendar',
      },
    ],
    regulations: {
      heading: 'Bay Area & Wine Country STR Regulations',
      items: [
        'San Francisco requires STR registration through the Office of Short-Term Rentals and limits un-hosted rentals to 90 days per year.',
        'Oakland requires a STR permit and collects a 14% Transient Occupancy Tax on all short-term rentals.',
        'Napa County has strict STR limits in agricultural zones; city of Napa has a separate permitting process.',
        'Sonoma County is actively evolving its STR policies with caps in certain unincorporated areas.',
        'Allura stays ahead of Bay Area regulatory changes and manages all permit applications and renewals.',
      ],
    },
    seo: {
      title: 'SF Bay Area & Wine Country Vacation Rental Property Management - Napa, Oakland',
      description:
        'Professional Airbnb & VRBO property management in San Francisco, Oakland, Napa, and Sonoma. Tech-driven revenue optimization, wine country expertise, and full-service management by Allura Homes.',
      keywords: [
        'San Francisco property management',
        'Oakland Airbnb management',
        'Napa vacation rental management',
        'Sonoma rental manager',
        'Bay Area STR management',
        'wine country property management',
        'SF short-term rental manager',
      ],
      canonical: 'https://allurahomes.com/property-management/sf-bay-area',
    },
  },
]

export function getMetroArea(slug: string): MetroArea | undefined {
  return METRO_AREAS.find((m) => m.slug === slug)
}

export function getMetroCityBookingUrl(cityName: string): string {
  return cityBookingUrl(cityName)
}

export function getAllMetroSlugs(): string[] {
  return METRO_AREAS.map((m) => m.slug)
}
