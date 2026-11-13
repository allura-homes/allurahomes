export type CompanyEntry = {
  name: string
  model: string
  serviceArea: string
  publishedFee: string
  googleRating: string
  otherFacts?: string
  sources: { label: string; href: string }[]
  blurb: string
  homepage: string
}

export type FAQ = { question: string; paragraphs: string[] }

export const comparisonContent = {
  seo: {
    title: 'Top San Diego Vacation Rental Managers (2026 Comparison)',
    description: 'An owner comparison of 16 San Diego vacation rental managers: published fees, service areas and ratings from each company\'s own site. Updated Nov 13, 2026.',
    url: 'https://www.allurahomes.com/top-san-diego-vacation-rental-managers',
  },
  hero: {
    title: 'Top San Diego Vacation Rental Managers (2026 Comparison)',
    subhead: 'An owner comparison of companies that publicly manage short-term rentals in San Diego County. Companies are listed in alphabetical order, without a rank.',
    updated: 'Updated November 13, 2026',
  },
  disclosure: 'Allura Homes wrote this page and is included in the list. We do not rank a #1. Companies appear in alphabetical order. Each fee, rating, and service area below is what that company published on its own site as of November 13, 2026, with a link to the page we checked. If a company does not publish a fee or a Google rating, we say "not published." We do not guess.',
  intro: 'Owners comparing San Diego vacation rental managers can start with a published fee and a clear service model, plus a local service area they can check. The companies below all offer short-term rental management in San Diego County. Published full-service fees on these sites range from a flat 10% to 23% of booking revenue. Some firms also offer a lower-fee plan, and several do not publish a rate.',
  howWeBuilt: {
    title: 'How we built this list',
    intro: 'We included a company if, on November 13, 2026:',
    criteria: [
      'It publicly offered vacation-rental or short-term rental management in San Diego County.',
      'It had a working public website we could read.',
      'We could verify at least its service area and service model from its own pages.',
    ],
    recorded: 'For each company we recorded, from that company\'s own pages only:',
    recordedItems: [
      'Service area, as stated',
      'Service model (for example: local full-service, tiered / hybrid, or a lower-fee plan that leaves some work with the owner)',
      'Published management fee, if one is stated',
      'Google rating and review count, only if the company (or a Google listing we could read) states them',
      'The source URL and the date checked',
    ],
    disclaimer: 'We did not score companies or invent a rank. Guest ratings that a company describes as Airbnb or "guest reviews," without calling them Google reviews, are quoted as such and are not treated as a Google rating. When two pages from the same company disagree, both figures are shown.',
    summary: 'This is a first-pass comparison of published facts. It is not a mystery-shop or an in-home test of operations.',
  },
  companiesIncluded: {
    title: 'Companies included (alphabetical)',
    list: 'Air Concierge · Allura Homes · Atlia · AvantStay · Bluewater Vacation Homes · Cardo Vacation Rentals · Drift Vacation Homes · Haustay · Leveled MGMT · OODA · Open Road Stays · Salt & Sky Lodging Co. · Stay Classy Homes · Superstays · Titan Beach Rentals · West Coast Homestays',
    alluraNote: 'Allura is in the list because it meets the same inclusion test as the others, and because it publishes this page. It is not placed first. Alphabetically, it sits second, after Air Concierge.',
    entriesNote: 'Each entry below has the fields Model, Service area (as stated), Published fee, Google rating, optional Other published facts, and Source(s).',
  },
  howToUse: {
    title: 'How to use this list',
    body: 'Before signing with any company on this page, ask for a written fee schedule (what the percentage is charged on, and what sits outside it), who owns the listing and its reviews, who files STRO and TOT paperwork, and a sample owner statement from a comparable home. A lower published percentage is not automatically a lower cost if cleaning, supplies, or maintenance sit outside the fee.',
  },
}

export const companies: CompanyEntry[] = [
  {
    name: 'Air Concierge',
    model: 'Full-service vacation rental management, with a San Diego page that also describes a long-term stay fee schedule. The company operates in multiple U.S. markets; San Diego is one of them.',
    serviceArea: 'San Diego, plus nearby cities listed on the same page, including Carlsbad, La Jolla, and Oceanside.',
    publishedFee: 'On the San Diego management page: 18% "Luxe" for bookings starting at $1,000 per night or more; long-term stays at 10% for 30+ days, 14% for 60+ days, and 16% for 90+ days. A standard short-term management percentage for stays under those Luxe or long-term terms is not published on this page.',
    googleRating: 'Not published on the page checked. The page does state "15,000+ Five-Star Reviews" without naming Google as the source.',
    sources: [{ label: 'https://www.airconcierge.net/san-diego-airbnb-manager', href: 'https://www.airconcierge.net/san-diego-airbnb-manager' }],
    blurb: 'Full-service vacation rental management operating in multiple U.S. markets including San Diego, Carlsbad, La Jolla, and Oceanside',
    homepage: 'https://www.airconcierge.net',
  },
  {
    name: 'Allura Homes',
    model: 'Local, full-service boutique management for short-term stays and furnished 30-night stays.',
    serviceArea: 'San Diego (the company also lists other California markets on its site; this comparison is about San Diego).',
    publishedFee: '20% of the accommodation fare for short-term stays; from 15% for stays of 30+ nights; supplies at cost, with receipts.',
    googleRating: 'Not published as a Google rating on the San Diego management page. The page leads with a 4.9-star guest rating in 2025.',
    otherFacts: 'Fewer than two dozen homes; local since 2013; Vrbo Premier Host; Airbnb Superhost.',
    sources: [{ label: 'https://www.allurahomes.com/san-diego-vacation-rental-management', href: '/san-diego-vacation-rental-management' }],
    blurb: 'Local, full-service boutique management for short-term stays and furnished 30-night stays in San Diego',
    homepage: 'https://www.allurahomes.com',
  },
  {
    name: 'Atlia',
    model: 'Full-service short-term rental management. The San Diego page describes a local operation and says the company is backed by Y Combinator.',
    serviceArea: 'San Diego (the site also has pages for other cities).',
    publishedFee: 'A flat 10% management fee for full-service management. The fees page repeats "Atlia charges a 10% management fee." Photography is described as included.',
    googleRating: 'Not published on the pages checked.',
    sources: [
      { label: 'https://www.atlia.com/airbnb-property-management-san-diego/', href: 'https://www.atlia.com/airbnb-property-management-san-diego/' },
      { label: 'https://www.atlia.com/airbnb-management-fees/', href: 'https://www.atlia.com/airbnb-management-fees/' },
    ],
    blurb: 'Full-service short-term rental management in San Diego backed by Y Combinator',
    homepage: 'https://www.atlia.com',
  },
  {
    name: 'AvantStay',
    model: 'National, full-service vacation rental management, with a San Diego page that describes a local team and on-site inspections. The company states it operates in 140+ markets.',
    serviceArea: 'San Diego. The San Diego management page lists homes in San Diego and La Jolla.',
    publishedFee: 'Not published as a percentage. The company\'s homeowner-reviews page says it charges one full-service management fee, a percentage of booking revenue, quoted per home. The exact rate is put in writing before an owner commits.',
    googleRating: 'Not published on the pages checked.',
    sources: [
      { label: 'https://avantstay.com/san-diego-vacation-rental-management', href: 'https://avantstay.com/san-diego-vacation-rental-management' },
      { label: 'https://avantstay.com/homeowner-reviews', href: 'https://avantstay.com/homeowner-reviews' },
    ],
    blurb: 'National, full-service vacation rental management with a local San Diego team, operating in 140+ markets',
    homepage: 'https://avantstay.com',
  },
  {
    name: 'Bluewater Vacation Homes',
    model: 'Locally owned, full-service vacation rental management, founded in San Diego in 2009.',
    serviceArea: 'Coastal San Diego, including Mission Beach, Pacific Beach, La Jolla, Coronado, Del Mar, Encinitas, and Carlsbad, as listed on the management-page FAQ.',
    publishedFee: 'Not published. The management page says the fee is a percentage of booking revenue. The exact percentage depends on the property and services selected, and is reviewed in a consultation.',
    googleRating: 'The company\'s own pages do not agree, so the figures are shown together. The management page states "over 1500 5-star reviews on Google," and later on the same page, "hundreds of five-star Google reviews." The about page states "900+ 5-star Google reviews." These are company-stated figures; they were not independently re-checked on a Google listing on Nov 13.',
    otherFacts: 'The management page also states Airbnb Superhost status with over 4,500 reviews, and "VRBO Premier Partner" status. Those program badges were not independently verified.',
    sources: [
      { label: 'https://www.bluewatervacationhomes.com/san-diego-vacation-rental-property-management/bluewatervacationhomes-san-diego-vacation-rental-management/', href: 'https://www.bluewatervacationhomes.com/san-diego-vacation-rental-property-management/bluewatervacationhomes-san-diego-vacation-rental-management/' },
      { label: 'https://www.bluewatervacationhomes.com/about/', href: 'https://www.bluewatervacationhomes.com/about/' },
    ],
    blurb: 'Locally owned, full-service vacation rental management in coastal San Diego, founded in 2009',
    homepage: 'https://www.bluewatervacationhomes.com',
  },
  {
    name: 'Cardo Vacation Rentals',
    model: 'Local, full-service management, with in-house design and cleaning described on its fee page.',
    serviceArea: 'The San Diego coast, including La Jolla, Pacific Beach, Del Mar, and Coronado among the markets listed in the site navigation.',
    publishedFee: 'A straight 20% of booking revenue, described as all-in, with no setup fees and no monthly minimums.',
    googleRating: '"Google 4.9 · 127 reviews," as stated on Cardo\'s owners page. The reviews page states "Google 4.9" without a count. The same site also states "3,500+ five-star Airbnb reviews" and "3,500+ Google & Airbnb reviews." Those larger counts mix sources and are not treated here as a Google figure.',
    otherFacts: '5-star Superhost since 2013, as stated on the site.',
    sources: [
      { label: 'https://cardorentals.com/owners', href: 'https://cardorentals.com/owners' },
      { label: 'https://cardorentals.com/owners/management-fees', href: 'https://cardorentals.com/owners/management-fees' },
      { label: 'https://cardorentals.com/reviews', href: 'https://cardorentals.com/reviews' },
    ],
    blurb: 'Local, full-service management on the San Diego coast with in-house design and cleaning',
    homepage: 'https://cardorentals.com',
  },
  {
    name: 'Drift Vacation Homes',
    model: 'Locally owned, full-service vacation rental management. The San Diego page states there is no long-term contract.',
    serviceArea: 'San Diego County (Mission Beach, Pacific Beach, Mission Bay, Bay Park, Sunset Cliffs, and La Jolla); North County (Del Mar, Rancho Santa Fe, Encinitas, Leucadia, and Cardiff by the Sea); and Julian.',
    publishedFee: 'Not published. The page says cost depends on the home\'s size, location, and needs, and is walked through at a free evaluation.',
    googleRating: 'The page states "5.0 on Google from 1,000+ reviews." It also states a 4.95 average across 3,000+ Airbnb reviews, and that Drift is an Airbnb Superhost and Vrbo Premier Host. The Google figure is reported as the company\'s own claim; it was not independently re-checked on a Google listing on Nov 13.',
    sources: [{ label: 'https://driftvh.com/san-diego-short-term-rental-management/', href: 'https://driftvh.com/san-diego-short-term-rental-management/' }],
    blurb: 'Locally owned, full-service vacation rental management in San Diego County, North County, and Julian',
    homepage: 'https://driftvh.com',
  },
  {
    name: 'Haustay',
    model: 'Locally owned, full-service Airbnb and vacation rental management, founded by Nick and Elisa Foster, who the site describes as long-time Carlsbad residents.',
    serviceArea: 'North County and nearby coastal cities listed on the site, including Carlsbad, Cardiff-by-the-Sea, Del Mar, Encinitas, La Jolla, Oceanside, Rancho Santa Fe, San Clemente, and Solana Beach.',
    publishedFee: 'Not published. The site says fees are set "up front" with no hidden fees, but it does not state a percentage.',
    googleRating: 'Not published on the page checked. The page does state "over 3,000 five-star" Airbnb reviews and Airbnb Superhost status. The same page also says the company has maintained "VRBO Premier Partner" status for 16 quarters. That Premier Partner wording is the company\'s own claim; we did not independently verify it with Vrbo.',
    sources: [{ label: 'https://www.haustay.com/airbnb-property-management/', href: 'https://www.haustay.com/airbnb-property-management/' }],
    blurb: 'Locally owned, full-service Airbnb and vacation rental management in North County and nearby coastal cities',
    homepage: 'https://www.haustay.com',
  },
  {
    name: 'Leveled MGMT',
    model: 'Full-service short-term rental management (the San Diego page says it does not use a co-hosting model). Founded and run by Brady and Skylar Schrank, per the page. The site also lists Newport Beach.',
    serviceArea: 'San Diego\'s coastal neighborhoods, from Mission Beach and Pacific Beach to La Jolla and Point Loma.',
    publishedFee: 'Starts at 15% of gross booking revenue, plus a one-time onboarding fee that covers setup and professional photography. The onboarding amount is not stated. The page says there is no monthly minimum.',
    googleRating: 'Not published on the page checked. The page is marked "Last updated May 2026."',
    sources: [{ label: 'https://leveledstr.com/san-diego/owners/management', href: 'https://leveledstr.com/san-diego/owners/management' }],
    blurb: 'Full-service short-term rental management in San Diego\'s coastal neighborhoods',
    homepage: 'https://leveledstr.com',
  },
  {
    name: 'OODA',
    model: 'San Diego-based short-term rental management with tiered plans, including full-service and a revenue-only / dynamic-pricing option.',
    serviceArea: 'San Diego County, including Downtown San Diego, La Jolla, Pacific Beach, Mission Beach, Point Loma, and North County coastal cities (Del Mar, Encinitas, Carlsbad, and Oceanside). Escondido is also mentioned.',
    publishedFee: 'The company\'s own pages do not agree, so both are shown: The San Diego page: "transparent fees from 7% to 15%," described as 7% for targeted revenue management and 15% for full-service management, with no hidden markups. The pricing page: Revenue-Only (dynamic pricing) at 5% of booking revenue; Standard full-service 10%; Premium full-service 12% ("most popular"); Platinum full-service 15%. It also states maintenance, cleaning, and supplies billed at vendor cost with 0% markup.',
    googleRating: 'Not published on the pages checked.',
    sources: [
      { label: 'https://oodahost.com/airbnb-management/san-diego', href: 'https://oodahost.com/airbnb-management/san-diego' },
      { label: 'https://oodahost.com/pricing', href: 'https://oodahost.com/pricing' },
    ],
    blurb: 'San Diego-based short-term rental management with tiered plans from revenue-only to full-service',
    homepage: 'https://oodahost.com',
  },
  {
    name: 'Open Road Stays',
    model: 'Two published plans: a lower-fee "Lite" plan if the owner handles cleaning and repairs, and a "Standard" full-service plan.',
    serviceArea: 'Coastal San Diego, from Oceanside to Coronado, including La Jolla, Pacific Beach, Mission Beach, Ocean Beach, Point Loma / Sunset Cliffs, Downtown (Little Italy / Gaslamp), Old Town, Solana Beach, and Del Mar, among neighborhoods listed on the homepage.',
    publishedFee: 'Lite 12% of booking revenue; Standard 23% of booking revenue. The fee is described as a percentage of booking revenue, charged after a guest checks in, with no setup cost. Standard is described as including cleaning, maintenance, vendors, tax reporting, and guest consumables.',
    googleRating: 'The homepage states "4.85★ across 6,106 guest reviews" and attributes that figure to its public Airbnb host profile as of November 2026. The San Diego area page states a "5.0★ Google Rating" with no review count. Both are company-stated figures.',
    sources: [
      { label: 'https://openroadstays.com/', href: 'https://openroadstays.com/' },
      { label: 'https://openroadstays.com/areas/san-diego', href: 'https://openroadstays.com/areas/san-diego' },
    ],
    blurb: 'Vacation rental management with Lite and Standard full-service plans in coastal San Diego',
    homepage: 'https://openroadstays.com',
  },
  {
    name: 'Salt & Sky Lodging Co.',
    model: 'Selective local full-service management, with a co-hosting option for owners who already have an Airbnb listing. The page says the portfolio is kept small on purpose.',
    serviceArea: 'Coastal San Diego County, including Ocean Beach, Point Loma, Pacific Beach, La Jolla, North Park, Carlsbad, and Oceanside.',
    publishedFee: '20% of booking revenue for full-service management; co-hosting 15% to 20% depending on scope. The page states there are no hidden fees.',
    googleRating: 'Not published as a Google rating. The page states "880+ guest reviews" and a "4.96 average guest rating."',
    sources: [{ label: 'https://www.saltandskylodgingco.com/short-term-rental-management-services', href: 'https://www.saltandskylodgingco.com/short-term-rental-management-services' }],
    blurb: 'Selective local full-service management in coastal San Diego County with a co-hosting option',
    homepage: 'https://www.saltandskylodgingco.com',
  },
  {
    name: 'Stay Classy Homes',
    model: 'Full-service short-term vacation rental management, as stated on the homepage.',
    serviceArea: 'San Diego. The homepage does not publish a neighborhood-by-neighborhood service list. A guest review on the same page mentions a condo in Mission Beach. That is a guest comment. It is not a company service-area claim.',
    publishedFee: 'Not published on the homepage checked.',
    googleRating: 'Not published as a rating or count. The homepage links out with "Read all reviews on Google" but does not state the figure on the page.',
    sources: [{ label: 'https://www.stayclassyhomes.com/', href: 'https://www.stayclassyhomes.com/' }],
    blurb: 'Full-service short-term vacation rental management in San Diego',
    homepage: 'https://www.stayclassyhomes.com',
  },
  {
    name: 'Superstays',
    model: 'Local, boutique full-service vacation rental management, operating as Superstays Property Management. The homepage also describes a co-host model in which the owner keeps the Airbnb listing.',
    serviceArea: 'San Diego. The pages checked do not publish a neighborhood-by-neighborhood service list.',
    publishedFee: 'The company\'s own pages do not agree, so both are shown: The homepage calls the fee a "20% Flat Rate" ("We charge just 20%"). The San Diego Airbnb FAQ also states that the full-service fee is 20%. The pricing page states 20% to 22% of booking revenue, starting at 20%, with some properties at 21% to 22% depending on size, features, and service level. The general FAQ also states "20-22% of booked earnings." The pricing and FAQ pages also list owner-paid items outside the fee, including photography and monthly software charges.',
    googleRating: 'Not published as a Google rating. The homepage states a "100% 5-star review history across all managed properties." That is the company\'s own claim. It is not treated here as a Google rating.',
    sources: [
      { label: 'https://superstaysmanagement.com/', href: 'https://superstaysmanagement.com/' },
      { label: 'https://superstaysmanagement.com/pricing-and-services-2', href: 'https://superstaysmanagement.com/pricing-and-services-2' },
      { label: 'https://superstaysmanagement.com/general-faq', href: 'https://superstaysmanagement.com/general-faq' },
      { label: 'https://superstaysmanagement.com/sd-airbnb-mgmt-faq', href: 'https://superstaysmanagement.com/sd-airbnb-mgmt-faq' },
    ],
    blurb: 'Local, boutique full-service vacation rental management in San Diego with a co-host model option',
    homepage: 'https://superstaysmanagement.com',
  },
  {
    name: 'Titan Beach Rentals',
    model: 'Locally owned and operated in San Diego since 2015, per the page, with full-service short-term rental management. The page also says a booking-agent-only option can be discussed. The page states no hidden fees and zero maintenance markups.',
    serviceArea: 'Mission Beach, La Jolla, Pacific Beach, Ocean Beach, Sunset Cliffs, and Point Loma, among neighborhoods listed on the owner page.',
    publishedFee: 'Not published. (The page\'s "15% Avg Annual Growth" figure is a growth claim. It is not a management fee, and it is not treated as a fee here.)',
    googleRating: 'The company\'s own pages do not agree, so both are shown. The San Diego management page states a "5★ Google Rating" (with a "4.8★ Airbnb Rating") and no review count. The contact page states "4.8 · 124 Google Reviews." Both are company-stated figures.',
    sources: [
      { label: 'https://www.titanbeachrentals.com/owners/san-diego-vacation-rental-management/', href: 'https://www.titanbeachrentals.com/owners/san-diego-vacation-rental-management/' },
      { label: 'https://www.titanbeachrentals.com/about/contact-information/', href: 'https://www.titanbeachrentals.com/about/contact-information/' },
    ],
    blurb: 'Locally owned and operated full-service short-term rental management in San Diego since 2015',
    homepage: 'https://www.titanbeachrentals.com',
  },
  {
    name: 'West Coast Homestays',
    model: 'Full-service Airbnb / short-term rental management and co-hosting, with a mid-term rental offer described on the San Diego page. San Diego-based.',
    serviceArea: 'The San Diego page lists Pacific Beach, La Jolla, Mission Beach, Greater San Diego, Oceanside, and Carlsbad among its service areas.',
    publishedFee: 'Not published on the San Diego management page checked, and not published on the company\'s "Top 10 San Diego Airbnb Management Companies" post.',
    googleRating: 'Not published on the San Diego management page checked.',
    sources: [{ label: 'https://www.westcoasthomestays.com/airbnb-management-san-diego', href: 'https://www.westcoasthomestays.com/airbnb-management-san-diego' }],
    blurb: 'Full-service Airbnb and short-term rental management with mid-term rental offers in San Diego',
    homepage: 'https://www.westcoasthomestays.com',
  },
]

export const comparisonTableData = {
  intro: 'Figures are as published on the source pages above, checked Nov 13, 2026. "Not published" means we could not find the figure on the page we checked.',
  headers: ['Company', 'Model', 'Service area (as stated)', 'Published fee', 'Google rating (as published)'],
  rows: [
    ['Air Concierge', 'Full-service, multi-market', 'San Diego, Carlsbad, La Jolla, Oceanside (and other cities on the same site)', '18% Luxe at $1,000+/night; 10% / 14% / 16% for 30+ / 60+ / 90+ day stays. Standard short-term % not published', 'Not published'],
    ['Allura Homes', 'Local full-service boutique', 'San Diego', '20% short-term; from 15% for stays of 30+ nights; supplies at cost', 'Not published as a Google rating. Site leads with a 4.9-star guest rating in 2025'],
    ['Atlia', 'Full-service', 'San Diego', 'Flat 10%', 'Not published'],
    ['AvantStay', 'National full-service, with a local San Diego team', 'San Diego (homes listed in San Diego and La Jolla)', 'Not published. Fee is a percentage of booking revenue, quoted per home', 'Not published'],
    ['Bluewater Vacation Homes', 'Local full-service, founded 2009', 'Coastal San Diego (Mission Beach, Pacific Beach, La Jolla, Coronado, Del Mar, Encinitas, Carlsbad)', 'Not published', 'Pages disagree: management page "over 1500 5-star reviews on Google" and "hundreds of five-star Google reviews"; about page "900+ 5-star Google reviews" (company-stated; not re-checked on Google)'],
    ['Cardo Vacation Rentals', 'Local full-service', 'San Diego coast (La Jolla, Pacific Beach, Del Mar, Coronado, and other markets listed)', '20% of booking revenue, described as all-in', 'Google 4.9 · 127 reviews (company owners page)'],
    ['Drift Vacation Homes', 'Local full-service', 'San Diego County, North County, and Julian', 'Not published', '5.0 from 1,000+ reviews (as stated on Drift\'s site; not re-checked on Google)'],
    ['Haustay', 'Local full-service', 'North County and nearby coastal cities listed on the site', 'Not published', 'Not published'],
    ['Leveled MGMT', 'Local full-service', 'Coastal San Diego (Mission Beach, Pacific Beach, La Jolla, Point Loma)', 'Starts at 15% of gross booking revenue, plus a one-time onboarding fee (amount not stated)', 'Not published'],
    ['OODA', 'San Diego-based, tiered', 'San Diego County, including North County coastal cities', 'Pages disagree: SD page 7% to 15%; pricing page 5% / 10% / 12% / 15%', 'Not published'],
    ['Open Road Stays', 'Lite or full-service', 'Coastal San Diego, Oceanside to Coronado', 'Lite 12%; Standard 23% of booking revenue', '5.0 Google (area page, no count); 4.85 from 6,106 Airbnb reviews'],
    ['Salt & Sky Lodging Co.', 'Selective local full-service; co-host option', 'Coastal San Diego County (Ocean Beach, Point Loma, Pacific Beach, La Jolla, North Park, Carlsbad, Oceanside)', '20% full-service; co-hosting 15% to 20%', 'Not published as Google. Site states 880+ guest reviews, 4.96 average'],
    ['Stay Classy Homes', 'Full-service', 'San Diego (neighborhood list not published on the homepage)', 'Not published', 'Not published on the page'],
    ['Superstays', 'Local boutique full-service; co-host option', 'San Diego (neighborhood list not published on the pages checked)', 'Pages disagree: homepage and SD Airbnb FAQ 20%; pricing page and general FAQ 20% to 22% of booking revenue', 'Not published as Google. Homepage states a 100% 5-star review history across managed properties'],
    ['Titan Beach Rentals', 'Local full-service (booking-agent option mentioned)', 'Mission Beach, La Jolla, Pacific Beach, Ocean Beach, Sunset Cliffs, Point Loma', 'Not published', '"5★ Google Rating" on one page; 4.8 · 124 Google reviews on another (company site)'],
    ['West Coast Homestays', 'Local full-service / co-hosting; mid-term offer', 'Pacific Beach, La Jolla, Mission Beach, Greater San Diego, Oceanside, Carlsbad', 'Not published', 'Not published'],
  ],
}

export const faqs: FAQ[] = [
  {
    question: 'Who wrote this list, and is Allura included?',
    paragraphs: ['Yes. Allura Homes wrote this comparison and is included. Companies are listed alphabetically, not ranked. Facts were checked against each company\'s public pages on November 13, 2026.'],
  },
  {
    question: 'Do you rank a #1 San Diego vacation rental manager?',
    paragraphs: ['No. This page is a comparison of published facts. It is not a scored ranking.'],
  },
  {
    question: 'What does Allura charge?',
    paragraphs: ['20% of the accommodation fare for short-term stays, and from 15% for stays of 30+ nights, with supplies billed at cost.'],
  },
  {
    question: 'Why do some fees say "not published"?',
    paragraphs: ['If we could not find a percentage on the company\'s own public page, we did not invent one. Ask that company for a written quote.'],
  },
  {
    question: 'Why do some companies show two sets of fees?',
    paragraphs: ['On November 13, 2026, OODA\'s San Diego page and its pricing page did not match (7% to 15% versus 5% / 10% / 12% / 15%). Superstays\' homepage and San Diego Airbnb FAQ state a 20% fee, while its pricing page and general FAQ state 20% to 22%. Both figures are shown for each company, with links, so an owner can check the current pages.'],
  },
  {
    question: 'How current is this page?',
    paragraphs: ['Updated November 13, 2026. Fees and ratings should be re-checked on the source links before anyone relies on a figure, because companies change published rates.'],
  },
]

const organizationId = 'https://www.allurahomes.com/#organization'
const c = comparisonContent
export const comparisonStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${c.seo.url}#article`,
      headline: c.hero.title,
      datePublished: '2026-11-13',
      dateModified: '2026-11-13',
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      description: c.intro,
      url: c.seo.url,
    },
    {
      '@type': 'ItemList',
      '@id': `${c.seo.url}#itemlist`,
      numberOfItems: 16,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: companies.map((company, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Organization',
          name: company.name,
          url: company.homepage,
          description: company.blurb,
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${c.seo.url}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.paragraphs.join(' '),
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.allurahomes.com/' },
        { '@type': 'ListItem', position: 2, name: 'Top San Diego Vacation Rental Managers', item: c.seo.url },
      ],
    },
  ],
}
