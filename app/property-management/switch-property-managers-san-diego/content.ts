import { BRAND } from '@/lib/constants'
import { BOOK_A_CALL_HREF, MARKETS, PRIMARY_PHONE_E164, SWITCH_PAGE_PATH, HOME_COUNT_PHRASE, HOME_COUNT_PHRASE_CAPITALIZED } from '@/lib/site-config'

type ContentItem = { title: string; body: string }
type FAQ = { question: string; paragraphs: readonly string[] }

export const switchContent = {
  seo: {
    title: 'Leaving a Big Manager? Switch in San Diego | Allura Homes',
    description: `Leaving a big management company? Switch to Allura in San Diego. ${HOME_COUNT_PHRASE_CAPITALIZED}. A mutual 30-day out. 4.9-star rating in 2025.`,
    url: `https://www.allurahomes.com${SWITCH_PAGE_PATH}`,
  },
  cta: { primary: 'Get My Free Switch Analysis', secondary: 'Book a 30-Minute Call', callHref: BOOK_A_CALL_HREF },
  hero: {
    eyebrow: 'Leaving a big management company?',
    title: 'Switch Your San Diego Vacation Rental Manager.',
    emphasis: 'Keep Your Bookings. Raise the Bar.',
    lede: 'A boutique San Diego team. A clean handover. A manager who picks up the phone.',
    body: `Big-box managers can run 200+ properties. The biggest have thousands of doors, and we don't want you to feel like a number. That's what makes us different. ${HOME_COUNT_PHRASE_CAPITALIZED} managed like they are our own. We handle the switch with you: contract, bookings, license paperwork, listings, and a set handover date.`,
    imageAlt: 'A modern single-story home on a hillside at golden hour, with a pool, palm trees and warm light glowing from the windows',
    badge: `${HOME_COUNT_PHRASE_CAPITALIZED} under management`, badgeLabel: 'Like our own',
  },
  trust: ['13+ Years Hosting', 'Airbnb Superhost', 'Vrbo Premier Host', '4.9 star rating in 2025', `${HOME_COUNT_PHRASE_CAPITALIZED} managed like they are our own.`],
  superhostHref: 'https://www.airbnb.com/users/profile/1462510352178210196',
  answer: `Switching vacation rental managers in San Diego starts with your current contract. Read the notice period and confirm who owns the listings and reviews. In the City of San Diego, the Host files the STRO License Local Contact Update Form within 30 days of a local-contact change, then updates exterior signage and license numbers on advertisements. Allura\'s owner agreement is month-to-month, with a mutual 30-day written notice and no termination fee.`,
  answerFirst: {
    eyebrow: 'Quick answer',
    title: 'Switching property managers in San Diego, at a glance',
    proseAnswer: `Switching vacation rental managers in San Diego starts with your current contract. Read the notice period and confirm who owns the listings and reviews. In the City of San Diego, the Host files the STRO License Local Contact Update Form within 30 days of a local-contact change, then updates exterior signage and license numbers on advertisements. Allura\'s owner agreement is month-to-month, with a mutual 30-day written notice and no termination fee.`,
    checklist: {
      title: 'Four steps',
      items: [
        { 
          title: 'Notice period', 
          body: 'Read your current contract first: the notice period, how written notice must be delivered, and any early-termination or post-term commission terms. Those terms are the outgoing manager\'s, and they vary. Once you are with Allura, the owner agreement is month-to-month. Either the owner or Allura may end it with thirty (30) days\' written notice. No termination fees apply, and no management fees are accelerated or become due for any period after termination.' 
        },
        { 
          title: 'Who owns the listings and reviews', 
          body: 'Confirm whose Airbnb and Vrbo accounts hold the listings. If the listing is yours and your manager is a co-host, Airbnb says removing them leaves your listing and future reservations with you. If the listing sits on the manager\'s account, reviews generally don\'t move. Vrbo can transfer reviews to a new listing for the same address.' 
        },
        { 
          title: 'File the City STRO Local Contact Update Form within 30 days', 
          body: 'In the City of San Diego, the STRO license belongs to the Host, a natural person such as the owner, and it cannot be transferred. A property manager can serve as the local contact. Only the Host can request the change, by emailing the STRO License Local Contact Update Form to stro@sandiego.gov from the Host email address on file. The City\'s Host Operating Requirements checklist tells Hosts to update Host and local-contact information with the Office of the City Treasurer within 30 days of the change. Allura can be named as the local contact; the Host still has to send the form.' 
        },
        { 
          title: 'Signage and license numbers', 
          body: 'Once the local contact has changed, update the exterior notice so it shows the TOT certificate number, the STRO license number, and contact information for the host or designated local contact. The notice must be visible from the sidewalk or public right-of-way. Include the TOT certificate number and the STRO license number on all advertisements.' 
        },
      ] satisfies ContentItem[],
    },
    fees: {
      title: 'Fees',
      items: [
        { label: 'Short-term stays', value: '20% of the accommodation fare the guest pays' },
        { label: 'Furnished stays of 30+ nights', value: 'From 15%' },
        { label: 'Supplies', value: 'At cost. No markup. Receipts with your monthly statement.' },
      ],
    },
    updated: 'Updated November 2026',
  },
  pain: {
    eyebrow: 'Sound familiar?', title: 'Why San Diego owners leave big national managers',
    items: [
      { title: 'Revenue that coasts', body: 'Static pricing, weak listings, and missed event peaks like Comic-Con and the Del Mar racing season.' },
      { title: 'Service that stalls', body: 'Ticket queues, rotating coordinators, and a home that\'s "just another number."' },
      { title: 'Fees that fog', body: "Statements you can't read, with markups buried in line items." },
      { title: 'Compliance that slips', body: "STRO, TOT, and quarterly reporting treated as the owner's problem." },
    ] satisfies ContentItem[],
  },
  steps: {
    eyebrow: 'Eight steps, one clean handover', title: 'The switch, step by step',
    items: [
      { title: 'Read your contract', body: 'Find the notice period, termination fee, auto-renewal window, post-term commission clause, and who owns the listing.' },
      { title: 'Check the paperwork is in your name', body: 'STRO license (Host), TOT certificate, and your Airbnb and Vrbo accounts.' },
      { title: 'Get your free switch analysis', body: 'We benchmark your current performance and build a projection. Your report arrives in 24–48 hours, up to 72 for complex homes.' },
      { title: 'Send written notice', body: 'Deliver it the way the contract specifies, with a dated effective date.' },
      { title: 'Agree in writing how booked stays are handled', body: 'Say who services them and who is paid for them.' },
      { title: 'Onboard in parallel', body: 'Pricing strategy, photography, listing optimization, smart-lock and tech install, deep clean. Launch-ready in weeks, not months.' },
      { title: 'Handover day', body: 'Access codes, co-host permissions, the Host\'s STRO License Local Contact Update Form (filed within 30 days of the change), updated signage and license numbers, and guest-messaging cutover.' },
      { title: 'Your first statement', body: 'Statements by the 10th of each month, with a real-time owner portal.' },
    ] satisfies ContentItem[],
  },
  services: {
    eyebrow: 'True full-service', title: 'Allura handles everything',
    lede: "Complete asset stewardship. We handle the heavy lifting end-to-end so you don't have to.",
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
  },
  fees: {
    eyebrow: 'Fees', title: 'What switching to Allura costs', lede: 'Clear fees. Clean statements. No markups.',
    headers: ['Item', 'What you pay'],
    rows: [
      ['Short-term stays', '20% of the accommodation fare the guest pays'],
      ['Furnished stays of 30+ nights', 'From 15%'],
      ['Supplies', 'At cost. No markup. Receipts with your monthly statement.'],
    ],
  },
  proof: {
    quote: 'After trying two other management companies, Allura was a breath of fresh air. They actually care about our property as if it were their own.',
    author: 'David & Jen R., Temecula, CA', rating: '4.9 star rating in 2025',
    eyebrow: 'Why boutique beats big-box', title: `${HOME_COUNT_PHRASE_CAPITALIZED} managed like they are our own.`,
    body: "The biggest managers have thousands of doors. We don't want you to feel like a number. That's what makes us different: a manager who picks up the phone, and fewer homes for finer results.",
    items: [
      { title: 'Revenue, rigorously managed', body: 'A full-time human revenue manager plus dynamic pricing updated daily. Distribution across Airbnb, Vrbo, Booking.com, Google Vacation Rentals, and direct booking.' },
      { title: 'Compliance fluency', body: 'Permit and license management, TOT collection and remittance. We can free you from being the local contact.' },
      { title: 'Transparent reporting', body: 'Real-time owner portal, statements by the 10th, monthly check-ins, and quarterly reviews.' },
    ] satisfies ContentItem[],
  },
  faq: {
    eyebrow: 'Frequently asked questions', title: 'Switching managers in San Diego, answered',
    disclaimer: 'This is not legal advice.', jurisdiction: 'Rules described apply to the City of San Diego only.',
    items: [
      { question: 'How do I switch vacation rental managers in San Diego?', paragraphs: ['Start with your current contract: check the notice period, how written notice must be delivered, and who owns the listings and reviews. In the City of San Diego, the Host files the STRO License Local Contact Update Form within 30 days of a local-contact change, and updates exterior signage and license numbers on advertisements. Agree in writing how booked stays are handled, then hand over access, pricing and guest messaging on a set date. Allura\'s owner agreement is month-to-month, with a mutual 30-day written notice and no termination fee.'] },
      { question: 'What does it cost to switch to Allura Homes?', paragraphs: ['Allura charges 20% of the accommodation fare the guest pays for short-term stays, and from 15% for furnished stays of 30+ nights. Supplies pass through at cost, with receipts.'] },
      { question: 'How long does it take to switch property managers?', paragraphs: ['Your current contract\'s notice period sets the timeline, commonly 30 to 90 days, depending on that agreement. Preparation runs in parallel during that window: market analysis, pricing strategy, photography, listing optimization and smart-lock setup. The home should be ready for guests the day the handover takes effect. Once you are with Allura, the owner agreement is month-to-month, and either side may end it with thirty (30) days\' written notice.'] },
      { question: 'What happens to my existing bookings when I switch?', paragraphs: ['Confirmed guests should keep their stays. Usually the outgoing manager services arrivals inside the notice period and the new manager takes stays after the cutoff. Many agreements still owe the old manager commission on stays booked during their term, so settle how each reservation is handled, and paid, in writing before you give notice.'] },
      { question: 'Will I keep my Airbnb reviews and listing?', paragraphs: ["It depends on whose account owns the listing. If the listing is yours and your manager is a co-host, Airbnb says removing them leaves your listing and future reservations with you. If it sits on the manager\'s account, reviews generally don\'t move. Vrbo can transfer reviews to a new listing for the same address."] },
      { question: 'Do I need a new STRO license if I change managers in San Diego?', paragraphs: ['Usually not. In the City of San Diego, the STRO license belongs to the Host, a natural person such as the owner, and it cannot be transferred. A property manager can serve as the local contact. Only the Host can request that change, by emailing the STRO License Local Contact Update Form to stro@sandiego.gov from the Host email on file, within 30 days of the change. If a manager is named as Host, a new license application is required.', "We are your home\'s local contact."] },
      { question: 'How do I get out of my current property management contract?', paragraphs: ['Follow the outgoing contract\'s termination clause. Written notice must be delivered the way that contract specifies, with a clear effective date. Check auto-renewal windows, early-termination fees and post-term commissions. Then request a final statement, owner funds, keys, codes and vendor records. Allura\'s owner agreement is month-to-month. Either the owner or Allura may end it with thirty (30) days\' written notice, with no termination fee. This is general guidance, not legal advice; have an attorney review unclear terms.'] },
    ] satisfies FAQ[],
    sources: [
      { label: 'City of San Diego STRO', href: 'https://www.sandiego.gov/treasurer/short-term-residential-occupancy' },
      { label: 'City of San Diego TOT', href: 'https://www.sandiego.gov/treasurer/taxesfees/tot' },
      { label: 'Airbnb Help', href: 'https://www.airbnb.com/help/article/1632' },
      { label: 'Vrbo Help', href: 'https://help.vrbo.com/articles/IPM-Transfer-reviews-to-another-listing' },
      { label: 'STRO License Local Contact Update Form', href: 'https://www.sandiego.gov/sites/default/files/2025-03/stro-license-local-contact-update-form.pdf' },
      { label: 'STRO Host Operating Requirements', href: 'https://www.sandiego.gov/sites/default/files/2025-07/stro-host-operating-requirements.pdf' },
    ],
  },
  closing: {
    eyebrow: 'Free switch analysis', title: "Your home. A higher standard. Let's make the switch simple.",
    body: 'Fill out the form first, so your call starts with your numbers. Then book a time. No pressure. Just a straight read on your contract, your calendar and your options.',
  },
  form: {
    title: 'Get your free switch analysis', hint: 'Report in 24–48 hours, up to 72 for complex homes.',
    success: 'Thanks. Now book a call so we can walk you through it',
    labels: { name: 'Name', email: 'Email', phone: 'Phone', address: 'Property address', managed: 'Currently managed?', fee: 'Current management fee % (optional)', notice: 'Notice period (optional)', listing: 'Who owns your Airbnb listing? (optional)', license: 'Whose name is on your STRO license? (optional)' },
    placeholders: { name: 'Full name', email: 'you@email.com', address: 'Street, San Diego', fee: 'e.g. 25', notice: 'e.g. 60 days' },
    managedOptions: ['Self-managed', 'Another management company', 'Not yet rented'],
    ownershipOptions: ['Me', 'My manager', 'Not sure'], licenseOptions: ['Me', 'My manager', 'Not sure', 'Not in City of SD'],
    optionalPlaceholder: 'Select an option', nameError: 'Please enter your name.', emailError: 'Please enter a valid email address.',
  },
} as const

export const switchStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage', '@id': `${switchContent.seo.url}#faq`,
      mainEntity: switchContent.faq.items.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.paragraphs.join(' ') } })),
    },
    {
      '@type': ['Organization', 'LocalBusiness'], '@id': 'https://www.allurahomes.com/#organization',
      name: 'Allura Homes', url: 'https://www.allurahomes.com', foundingDate: '2013',
      description: `Boutique vacation rental management in San Diego. ${HOME_COUNT_PHRASE_CAPITALIZED} managed like they are our own.`,
      telephone: PRIMARY_PHONE_E164, logo: BRAND.logos.bug,
      areaServed: MARKETS.map((name) => ({ '@type': 'City', name })),
      sameAs: Object.values(BRAND.social),
    },
    {
      '@type': 'WebSite', '@id': 'https://www.allurahomes.com/#website',
      name: 'Allura Homes', url: 'https://www.allurahomes.com',
      publisher: { '@id': 'https://www.allurahomes.com/#organization' },
    },
    {
      '@type': 'BreadcrumbList', '@id': `${switchContent.seo.url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.allurahomes.com' },
        { '@type': 'ListItem', position: 2, name: 'Property Management', item: 'https://www.allurahomes.com/property-management' },
        { '@type': 'ListItem', position: 3, name: 'Switch Managers in San Diego', item: switchContent.seo.url },
      ],
    },
    {
      '@type': 'Service', '@id': `${switchContent.seo.url}#service`,
      name: 'Vacation rental management switch and handover, San Diego', url: switchContent.seo.url,
      provider: { '@id': 'https://www.allurahomes.com/#organization' },
      areaServed: { '@type': 'City', name: 'San Diego' },
    },
    {
      '@type': 'WebPage', '@id': `${switchContent.seo.url}#webpage`, url: switchContent.seo.url,
      name: switchContent.seo.title, description: switchContent.seo.description,
      dateModified: '2026-11-27',
      breadcrumb: { '@id': `${switchContent.seo.url}#breadcrumb` },
      mainEntity: { '@id': `${switchContent.seo.url}#service` },
      isPartOf: { '@id': 'https://www.allurahomes.com/#website' }, about: { '@id': 'https://www.allurahomes.com/#organization' },
      primaryImageOfPage: { '@type': 'ImageObject', url: 'https://www.allurahomes.com/images/switch-managers/hero.jpg' },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ["[data-speakable='answer-first']", "[data-speakable='answer-card']", 'h1'] },
    },
  ],
}
