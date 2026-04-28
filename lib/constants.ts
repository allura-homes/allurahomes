// ─── Brand ────────────────────────────────────────────────────
export const BRAND = {
  name: 'Allura Homes',
  tagline: 'Distinguished by Design',
  tm: '\u2122',
  phone: '(619) 333-4553',
  email: 'support@allurahomes.com',
  address: 'San Diego, CA',
  bookingUrl: '/stays',
  calendarUrl: '/book-a-call',
  social: {
    instagram: 'https://www.instagram.com/allurahomes',
    facebook: 'https://www.facebook.com/allurahomes.us',
    x: 'https://x.com/AlluraHomes',
    linkedin: 'https://www.linkedin.com/company/allurahomes/',
  },
  logos: {
    horizontal:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Multi-Color%20Horizontal%20-%20no%20background-BGL17EwqoKIUCvgjhnhnioZGBw8cgo.png',
    horizontalGold:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All%20Gold%20Horizontal%20-%20no%20background-2Mu3ka9j3sJ1TSxGoLF8AG7pJdGEKF.png',
    stacked:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/All%20Gold%20Stacked%20-%20no%20background-MAucONFgUVBK8PpcutkgDi2UW4Q82g.png',
    bug: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
  },
} as const

// ─── Navigation ──────────────────────────────────────────────
export const NAV_ITEMS = [
  {
    label: 'Property Management',
    href: '/property-management',
    children: [
      { label: 'San Diego & Temecula', href: '/property-management/san-diego-temecula' },
      { label: 'Coachella Valley', href: '/property-management/coachella-valley' },
      { label: 'Los Angeles', href: '/property-management/los-angeles' },
      { label: 'SF/Oakland Bay Area', href: '/property-management/sf-bay-area' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  {
    label: 'Resources',
    href: '/hosting',
    children: [
      { label: 'Hosting Resources', href: '/hosting' },
      { label: 'STR Regulations', href: '/regulations' },
      { label: 'AI & Technology', href: '/ai' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Browse Homes',
    href: '/stays',
  },
] as const

// ─── Trust / Stats ───────────────────────────────────────────
export const TRUST_STATS = [
  { value: '13+', label: 'Years Hosting' },
  { value: '4.9', label: 'Star Rating' },
  { value: 'Superhost', label: 'Airbnb Certified' },
  { value: 'Premier', label: 'VRBO Host' },
] as const

// ─── Service Pillars ─────────────────────────────────────────
export const SERVICE_PILLARS = [
  {
    title: 'Revenue Intelligence',
    description:
      'Dynamic pricing algorithms, market analysis, and demand forecasting to maximize every booking window.',
    icon: 'TrendingUp',
  },
  {
    title: 'True Full-Service',
    description:
      'From guest communication to deep cleans, maintenance coordination to restocking -- we handle everything.',
    icon: 'Layers',
  },
  {
    title: 'Boutique Accountability',
    description:
      'A small, senior team where you always know who is managing your property. No call centers, no ticket queues.',
    icon: 'Users',
  },
  {
    title: 'Compliance & Risk Fluency',
    description:
      'We navigate STR permits, TOT registration, HOA rules, and evolving local regulations so you stay legal and protected.',
    icon: 'Shield',
  },
  {
    title: 'Multi-Channel Revenue',
    description:
      'Your property listed and optimized across Airbnb, VRBO, Booking.com, Google Vacation Rentals, and our direct booking site.',
    icon: 'Globe',
  },
  {
    title: 'Transparent Reporting',
    description:
      'Real-time owner portal with monthly statements, occupancy trends, and revenue breakdowns. No surprises.',
    icon: 'BarChart3',
  },
] as const

// ─── How It Works Steps ──────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Tell Us About Your Property',
    description:
      'Fill out our quick form or book a call. We will ask about your property, goals, and current situation.',
  },
  {
    step: 2,
    title: 'We Build Your Strategy',
    description:
      'Our team conducts a market analysis, pricing study, and custom revenue projection tailored to your home.',
  },
  {
    step: 3,
    title: 'You Earn, We Manage',
    description:
      'Sit back while we handle everything -- from listing optimization to guest experience to your monthly payouts.',
  },
] as const

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      'Allura Homes transformed our rental from underperforming to consistently booked. Their attention to detail and communication is unlike any manager we have worked with.',
    author: 'Sarah M.',
    location: 'La Jolla, CA',
    rating: 5,
  },
  {
    quote:
      'After trying two other management companies, Allura was a breath of fresh air. They actually care about our property as if it were their own.',
    author: 'David & Jen R.',
    location: 'Temecula, CA',
    rating: 5,
  },
  {
    quote:
      'The revenue increase in our first quarter with Allura was remarkable. Their pricing strategy and guest experience are next level.',
    author: 'Michael T.',
    location: 'Encinitas, CA',
    rating: 5,
  },
] as const

// ─── Featured Properties (Placeholders) ─────────────────────
export const FEATURED_PROPERTIES = [
  {
    title: 'The Sunset Estate',
    location: 'La Jolla, San Diego',
    image: '/images/property-sunset-estate.jpg',
    beds: 4,
    baths: 3,
    guests: 8,
    rating: 4.97,
    href: 'https://reservations.allurahomes.com',
  },
  {
    title: 'Vineyard View Retreat',
    location: 'Temecula Wine Country',
    image: '/images/property-vineyard-retreat.jpg',
    beds: 3,
    baths: 2,
    guests: 6,
    rating: 4.95,
    href: 'https://reservations.allurahomes.com',
  },
  {
    title: 'Coastal Modern Villa',
    location: 'Encinitas, North County',
    image: '/images/property-coastal-villa.jpg',
    beds: 5,
    baths: 4,
    guests: 10,
    rating: 4.98,
    href: 'https://reservations.allurahomes.com',
  },
] as const

// ─── Hero Images ─────────────────────────────────────────────
export const HERO_IMAGES = {
  home: '/images/hero-home.jpg',
  propertyManagement: '/images/hero-pm.jpg',
  incomeReport: '/images/hero-pm.jpg',
  howItWorks: '/images/step-strategy.jpg',
  about: '/images/hero-about.jpg',
  contact: '/images/hero-contact.jpg',
} as const
