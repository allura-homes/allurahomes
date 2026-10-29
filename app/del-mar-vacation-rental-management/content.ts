import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const delMarContent = {
  seo: {
    title: 'Del Mar Vacation Rental Management | Allura Homes',
    description:
      'Protect your Del Mar STR permit: 30-minute response, 3-night minimum, 13% TOT filed monthly. Boutique management and a free earnings report for your home.',
    url: 'https://www.allurahomes.com/del-mar-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Del Mar vacation rental management',
    title: 'Del Mar Vacation Rental Management That Protects Your Permit',
    subtitle:
      'Boutique management for Del Mar STR permit holders. 30-minute response required. 3-night minimum. Permits capped at 129 citywide.',
  },
  answer: {
    text: 'Del Mar caps short-term rental permits at 129 citywide, and new owners go on a City waitlist. Permits belong to the owner, last two years, and end when the home is sold. Every stay must be at least three nights. A local contact must respond to complaints within 30 minutes, 24/7, and owners remit 13% TOT monthly through Rentalscape.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: '30-Minute Response',
      body: 'Del Mar requires a 30-minute response to complaints, 24/7. We serve as your local contact and protect your permit.',
      icon: 'Clock',
    },
    {
      title: 'Permit Protection',
      body: 'Your permit is valuable. We handle biennial renewal, insurance tracking, signage, and compliance so you keep it in good standing.',
      icon: 'Shield',
    },
    {
      title: '3-Night Minimum',
      body: 'Every reservation must be at least three consecutive nights. We set your calendar and pricing to match.',
      icon: 'Calendar',
    },
    {
      title: 'TOT Through Rentalscape',
      body: 'We file your 13% TOT monthly through the City\'s Rentalscape portal, by the last day of the following month.',
      icon: 'FileText',
    },
  ],
  permitRules: {
    title: 'Who Can Rent Short Term in Del Mar Today',
    intro:
      'Del Mar\'s STR ordinance caps permits at 129 citywide. There are 150 Existing STRs grandfathered in, and new owners go on a waitlist.',
    items: [
      {
        title: 'Existing STR permits',
        body: 'If you hold an Existing-STR permit, protect it. Keep your permit renewed, insurance current, and compliance tight. A lapse ends your Existing-STR status.',
      },
      {
        title: 'Waitlist',
        body: 'New owners can\'t apply until a permit opens. Join the City waitlist. When called, you have 30 days to apply or you\'re removed.',
      },
      {
        title: 'Primary residence requirement',
        body: 'New STR permits (when capacity opens) must be in your primary residence—you live there 6+ months per year. Existing STRs are exempt.',
      },
    ],
  },
  keepPermit: {
    title: 'Keep Your Permit in Good Standing',
    body: 'Permits renew every two years. You must maintain $1,000,000 liability insurance, post signage, respond within 30 minutes, and remit TOT monthly. A lapse or revocation ends Existing-STR protection.',
  },
  buying: {
    title: 'Buying in Del Mar',
    body: 'Permits don\'t transfer with the home. When ownership transfers, the permit terminates and Existing-STR status ends. Inheritance or a title change where an original owner stays on is OK, with notice to the City within 30 days.',
  },
  requirements: {
    title: 'Owner Checklist',
    intro: 'A step-by-step checklist for Del Mar permit holders. Rules change, so contact the City of Del Mar to confirm before you list.',
    items: [
      'Check whether your home is an Existing STR on the City\'s registry, or join the waitlist.',
      'New STRs only: the home must be your primary residence, owned by you, a family trust, or a people-owned LLC/LP/LLP.',
      'Confirm the zone allows STRs and the unit isn\'t an ADU, rental apartment or deed-restricted unit. Get HOA written consent if you have one.',
      'Gather the application: deed, rental agreement, parking plan, floor plan, safety self-certification, $1,000,000 liability insurance, local contact consent.',
      'Pay the permit fee ($815 initial for two years; $598 renewal).',
      'Post the permit inside the entry door and the exterior notice sign.',
      'Name a local contact who can respond within 30 minutes, 24/7.',
      'Set a 3-night minimum, 2 guests per bedroom plus 2, guest hours 8 a.m.–10 p.m., no events.',
      'Show your permit number on every listing.',
      'Remit 13% TOT monthly through Rentalscape.',
      'Renew before your permit expires, every two years.',
    ],
  },
  longTerm: {
    title: '30+ Night and Month-Long Stays',
    body: 'Rentals of more than 30 consecutive days, and a calendar-month rental to the same renter, are long-term rentals. They\'re exempt from Del Mar\'s STR rules and TOT. Month-long stays can fill the calendar between STR seasons.',
  },
  management: {
    title: 'How Allura Manages Your Del Mar Home',
    stats: [
      { label: 'Founded', value: '2013' },
      { label: 'Homes managed', value: '< 20' },
      { label: '2025 rating', value: '4.9 stars' },
      { label: 'Avg response', value: '< 5 min' },
    ],
    badges: ['Airbnb Superhost', 'Vrbo Premier Host'],
    features: [
      'Fewer than 20 homes managed like they are our own',
      '24/7 local contact with average response under 5 minutes',
      'Owner reports delivered within 24 hours',
      'Monthly statements guaranteed by the 10th',
    ],
  },
  fees: {
    title: 'Fees and Pricing',
    items: [
      { label: 'Short-term stays', value: '20% of the accommodation fare' },
      { label: 'Furnished stays of 30+ nights', value: 'from 15%' },
      { label: 'Supplies', value: 'at cost, with receipts' },
    ],
    note: 'We evaluate every home individually.',
  },
}

export const delMarFAQs: FAQ[] = [
  {
    question: 'Can I get a new short-term rental permit in Del Mar?',
    paragraphs: [
      'Not right now. Del Mar caps permits at 129 citywide, and new owners can only join the City\'s waitlist. When a permit opens, the City contacts the next person on the list, who has 30 days to apply.',
    ],
  },
  {
    question: 'Does a Del Mar STR permit transfer when I buy a home?',
    paragraphs: [
      'No. Permits can\'t be transferred, sold or assigned. The permit ends when ownership transfers, except for inheritance or a title change where an original owner stays on title.',
    ],
  },
  {
    question: 'What is the minimum stay in Del Mar?',
    paragraphs: ['Three consecutive nights for every reservation.'],
  },
  {
    question: 'How fast must a Del Mar local contact respond?',
    paragraphs: [
      'Within 30 minutes, 24 hours a day, seven days a week, to complaints from the City, the Sheriff\'s Department or residents.',
    ],
  },
  {
    question: 'Do month-long rentals need a Del Mar STR permit?',
    paragraphs: [
      'No. Rentals of more than 30 consecutive days, and a calendar-month rental to the same renter, are long-term rentals and are exempt from the STR rules and TOT.',
    ],
  },
]

export const delMarStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Del Mar Vacation Rental Management',
      provider: {
        '@type': 'Organization',
        name: 'Allura Homes',
        url: 'https://www.allurahomes.com',
      },
      areaServed: {
        '@type': 'City',
        name: 'Del Mar',
      },
      description: delMarContent.seo.description,
      url: delMarContent.seo.url,
    },
    {
      '@type': 'FAQPage',
      mainEntity: delMarFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.paragraphs.join(' '),
        },
      })),
    },
  ],
}
