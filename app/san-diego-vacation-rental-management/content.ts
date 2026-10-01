import { AIRBNB_PROFILE_HREF, SHOW_FEES, SHOW_TRIAL, SWITCH_PAGE_HREF } from '@/lib/site-config'

export type ContentItem = { title: string; body: string }
export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const boutiqueContent = {
  seo: {
    title: 'Boutique Vacation Rental Management San Diego | Allura',
    description: SHOW_TRIAL
      ? 'Boutique vacation rental management in San Diego since 2013. Airbnb Superhost, under 20 homes, furnished 30+ night stays, and a 90-day trial.'
      : 'Boutique vacation rental management in San Diego since 2013. Airbnb Superhost, under 20 homes, and furnished 30+ night stays.',
    url: 'https://www.allurahomes.com/san-diego-vacation-rental-management',
  },
  header: { brand: 'ALLURA', brandAccent: 'HOMES', home: 'Home', breadcrumb: 'San Diego Vacation Rental Management' },
  cta: { primary: 'Get My Free Income Report', secondary: 'Book a 30-Minute Call' },
  hero: {
    eyebrow: 'San Diego vacation rental management',
    title: 'Boutique vacation rental management in San Diego.',
    emphasis: 'Small portfolio. Serious results.',
    lede: 'A boutique San Diego team. Nightly stays and furnished 30+ night stays. A manager who picks up the phone.',
    body: "Big national managers can run 200+ properties. The biggest have thousands of doors, and we don't want you to feel like a number. Allura manages fewer than 20 homes like they are our own.",
    imageAlt: 'A modern single-story home on a hillside at golden hour, with a pool, palm trees and warm light glowing from the windows',
    badge: '<20 homes', badgeLabel: 'Like our own',
  },
  trust: ['13+ Years Hosting', 'Airbnb Superhost', 'Vrbo Premier Host', '4.9 star rating in 2025', 'Less than 20 homes managed like they are our own'],
  answer: 'Allura Homes is a boutique vacation rental manager in San Diego, founded in 2013. We manage under 20 homes like they are our own, so no owner is a number in a queue. We run short-term stays and furnished stays of 30+ nights, with statements and payouts by the 10th. Airbnb Superhost. Vrbo Premier Host.',
  boutique: {
    eyebrow: 'Boutique, in practice', title: 'What "boutique" actually means',
    items: [
      { title: 'A small portfolio', body: 'Less than 20 homes managed like they are our own. Your home is never a number in a queue.' },
      { title: 'One accountable team', body: 'A team that knows your home, your guests and your goals. A manager who picks up the phone. Under 5 minute average response time.' },
      { title: 'Revenue managed by a person', body: 'A full-time human revenue manager plus dynamic pricing updated daily. Distribution across Airbnb, Vrbo, Booking.com, Google Vacation Rentals, and direct booking.' },
      { title: 'Reporting you can read', body: 'Real-time owner portal, statements and payouts by the 10th, monthly check-ins, and quarterly reviews.' },
      { title: 'Compliance handled', body: 'Permit and license management, TOT collection and remittance. We can free you from being the local contact.' },
      { title: 'Slow seasons covered', body: 'Furnished stays of 30+ nights can help fill the gaps between nightly bookings.' },
    ] satisfies ContentItem[],
  },
  proof: {
    quote: 'After trying two other management companies, Allura was a breath of fresh air. They actually care about our property as if it were their own.',
    author: 'David & Jen R., Temecula, CA', rating: '4.9 star rating in 2025',
    note: 'One Allura home: 71% revenue uplift (single case study, results vary)',
    eyebrow: 'Why boutique beats big-box', title: 'Big national managers can run 200+ properties.', emphasis: 'Ours is under 20.',
    body: "The biggest managers have thousands of doors. We don't want you to feel like a number. That's what makes us different: a manager who picks up the phone, and fewer homes for finer results.",
  },
  housing: {
    eyebrow: 'Furnished stays of 30+ nights', title: 'Insurance, corporate, and travel-nurse housing',
    paragraphs: [
      'Between a nightly stay and a one-year lease sits a third option. We manage furnished stays of 30+ nights for insurance-displaced households, corporate guests and travel nurses. These are furnished stays, not 1-year leases.',
      'For owners, that can help fill slow seasons and steady the calendar between nightly bookings. Our full-service management applies to both kinds of stays.',
    ],
    evaluation: "We evaluate every home individually, so tell us about yours and we'll show you what it can earn.",
    feeLine: 'Fees start at 15%.',
    legal: 'In the City of San Diego, STRO and TOT apply to stays of less than one month. The city counts a month by calendar date, not as 30 nights, so a 30-night stay may still count as less than one month.',
    sourceLabel: 'City of San Diego TOT FAQ', disclaimer: 'Not legal advice.',
    items: [
      { title: 'Insurance housing', body: 'Furnished stays of 30+ nights for households displaced from their home.' },
      { title: 'Corporate housing', body: 'Furnished stays of 30+ nights for corporate guests.' },
      { title: 'Travel nurses', body: 'Furnished stays of 30+ nights for travel nurses on assignment.' },
    ] satisfies ContentItem[],
  },
  services: {
    eyebrow: 'True full-service', title: 'Allura handles everything',
    lede: "Complete asset stewardship, for nightly stays and furnished 30+ night stays alike. We handle the heavy lifting end-to-end so you don't have to.",
    items: [
      { title: 'Revenue management', body: 'Daily human-led pricing backed by data, across every booking channel.' },
      { title: 'Compliance & permitting', body: 'Permits, licenses and TOT handled, so the rules are never your problem.' },
      { title: 'Photography & listings', body: 'Professional photography and copywriting for high-converting listings.' },
      { title: 'Furnishing & design', body: 'Interior styling and procurement that photographs well and lives well.' },
      { title: 'Guest screening & sales', body: 'Vetting guests and marketing your home to the right audience.' },
      { title: 'Guest relations', body: 'Under 5 minute average response time. 24/7 support, arrival coordination, and conflict resolution.' },
      { title: 'Ops & maintenance', body: 'Coordinating turnover cleanings, repairs, and preventative upkeep.' },
      { title: 'Owner reporting', body: 'Detailed monthly statements, clear revenue breakdowns, and honest performance reviews.' },
    ] satisfies ContentItem[],
    linkText: 'full-service vacation rental management',
  },
  fees: {
    eyebrow: 'Fees', title: 'What boutique management costs', lede: 'Clear fees. Clean statements. No markups.',
    headers: ['Item', 'What you pay'],
    rows: [
      ['Short-term stays', '20% of the accommodation fare the guest pays'],
      ['Furnished stays of 30+ nights', 'From 15%'],
      ['Onboarding', '$500, withheld from your first payout. Nothing billed upfront.'],
      ['Supplies', 'At cost. No markup. Receipts with your monthly statement.'],
    ],
  },
  promise: { eyebrow: 'Risk reversal', title: 'The 90-day promise', line: '90 days to outperform. Or walk away.', lines: ['90 days to outperform.', 'Or walk away.'], body: 'We walk you through the details on a call.' },
  where: { eyebrow: 'Where we manage', title: 'San Diego', body: "Allura manages homes in San Diego. Different city, different rules, so tell us where your home is and we'll tell you how it works there." },
  faq: { eyebrow: 'Frequently asked questions', title: 'Boutique management in San Diego, answered', disclaimer: 'This is not legal advice.', legal: 'Rules described apply to the City of San Diego only.' },
  closing: {
    eyebrow: 'Your free income report', title: 'Your home. A higher standard.',
    body: 'Allura Homes is a boutique vacation rental manager in San Diego, founded in 2013. Start with the form so your call begins with your numbers. Then book a time. No pressure.',
    trialBody: 'On the call, we walk you through the details of our 90-day promise.',
    cardTitle: 'Two steps. No obligation.', hint: 'Report in 24–48 hours, up to 72 for complex homes.',
    labels: ['Step 1', 'Step 2'], switchIntro: 'Leaving a big management company?', switchLink: 'See the full switch checklist',
  },
  sources: [
    { label: 'City of San Diego STRO', href: 'https://www.sandiego.gov/treasurer/short-term-residential-occupancy' },
    { label: 'City of San Diego TOT', href: 'https://www.sandiego.gov/treasurer/taxesfees/tot' },
    { label: 'Airbnb Help', href: 'https://www.airbnb.com/help/article/1632' },
  ],
  footer: { brand: 'ALLURA HOMES', copyright: 'Allura Homes' },
}

export const boutiqueFAQs: FAQ[] = [
  { question: 'What does "boutique" mean for a vacation rental manager?', paragraphs: ['A boutique manager keeps the portfolio small, so your home gets real attention. Allura manages under 20 homes like they are our own. You get a manager who picks up the phone, a full-time human revenue manager, dynamic pricing updated daily, and statements by the 10th. Fewer homes, finer results.'] },
  { question: 'How does switching to Allura work?', paragraphs: ["Your current contract's notice period sets the start date, commonly 30 to 90 days. We onboard in parallel: market analysis, pricing, photography, listing optimization and smart-lock setup, so you are launch-ready in weeks, not months."], link: { text: 'Leaving a big management company? See the full switch checklist', href: SWITCH_PAGE_HREF } },
  { question: 'What happens to my existing bookings and reviews when I switch?', paragraphs: ['Confirmed guests should keep their stays, and the outgoing manager usually services arrivals inside the notice period. Settle in writing how each reservation is handled and paid. Reviews depend on whose account owns the listing: if you own it and your manager is a co-host, Airbnb says removing them leaves the listing with you.'] },
  // REMOVABLE: public use of fees needs Mike sign-off.
  ...(SHOW_FEES ? [{ question: 'What does Allura cost?', paragraphs: ['Allura charges 20% of the accommodation fare guests pay for short-term stays, and from 15% for furnished stays of 30+ nights. A $500 onboarding fee is withheld from your first payout, not billed upfront. Supplies pass through at cost, with receipts.'] }] : []),
  // REMOVABLE: public use of the trial needs Mike sign-off.
  ...(SHOW_TRIAL ? [{ question: "What if I'm not happy?", paragraphs: ['Our promise is simple: 90 days to outperform. Or walk away. We walk you through the details on a call, so you know exactly how it works before you start.'] }] : []),
  { question: 'Do you manage furnished 30+ night stays for insurance, corporate and travel-nurse guests?', paragraphs: ["Yes. Allura manages furnished stays of 30+ nights for insurance-displaced households, corporate guests and travel nurses. These are furnished stays, not 1-year leases. " + (SHOW_FEES ? 'Fees start at 15%. ' : '') + "We evaluate every home individually, so tell us about yours and we'll show you what it can earn. In the City of San Diego, STRO and TOT apply to stays of less than one month. Not legal advice."] },
  { question: 'Does Allura act as my local contact in San Diego?', paragraphs: ["In the City of San Diego, a property manager can serve as a home's local contact, updated through the city's form.", "We are your home's local contact."] },
  { question: 'Where does Allura manage homes?', paragraphs: ["Allura manages homes in San Diego. Rules differ by city, so tell us where your home is and we'll tell you how it works there."] },
]

const organizationId = 'https://www.allurahomes.com/#organization'
const c = boutiqueContent
export const boutiqueStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': ['Organization', 'LocalBusiness'], '@id': organizationId, name: 'Allura Homes', url: 'https://www.allurahomes.com', description: 'Boutique vacation rental management in San Diego. Fewer than 20 homes managed like they are our own.', foundingDate: '2013', areaServed: { '@type': 'City', name: 'San Diego', containedInPlace: { '@type': 'AdministrativeArea', name: 'California' } }, sameAs: ['https://www.instagram.com/allurahomes', 'https://www.facebook.com/allurahomes.us', 'https://www.linkedin.com/company/allurahomes', AIRBNB_PROFILE_HREF] },
    { '@type': 'WebPage', '@id': `${c.seo.url}#webpage`, url: c.seo.url, name: c.seo.title, description: c.seo.description, about: { '@id': organizationId }, primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.allurahomes.com/images/boutique/hero.jpg' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ["[data-speakable='answer-card']", 'h1'] } },
    { '@type': 'FAQPage', '@id': `${c.seo.url}#faq`, mainEntity: boutiqueFAQs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.paragraphs.join(' ') + (faq.link ? ` ${faq.link.text}.` : '') } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: c.header.home, item: 'https://www.allurahomes.com/' }, { '@type': 'ListItem', position: 2, name: c.header.breadcrumb, item: c.seo.url }] },
    ...['Vacation rental property management', 'Furnished 30+ night stay management'].map(serviceType => ({ '@type': 'Service', serviceType, areaServed: { '@type': 'City', name: 'San Diego, CA' }, provider: { '@id': organizationId } })),
  ],
}
