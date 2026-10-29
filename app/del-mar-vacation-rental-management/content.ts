import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const delMarContent = {
  seo: {
    title: 'Del Mar Vacation Rental Management | Allura Homes',
    description:
      'Del Mar vacation rental management that protects your STR permit: 30-minute response, 3-night minimum, 13% TOT filed monthly. Get a free earnings report.',
    url: 'https://www.allurahomes.com/del-mar-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Del Mar vacation rental management',
    title: 'Del Mar Vacation Rental Management That Protects Your Permit',
    subtitle:
      'With only 129 permits citywide, a Del Mar STR permit is worth guarding. We answer inside the City\'s 30-minute window and keep every stay at three nights or more.',
  },
  answer: {
    text: 'Del Mar caps short-term rental permits at 129 citywide; new owners join a City waitlist. A permit belongs to the owner, lasts two years and ends when the home is sold. Every stay runs at least three nights. A local contact must answer complaints within 30 minutes, 24/7, and owners remit 13% TOT monthly through Rentalscape.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: '30-Minute Response',
      body: 'The City gives you 30 minutes to respond to a complaint, day or night. As your local contact, our average response runs under 5 minutes.',
      icon: 'Clock',
    },
    {
      title: 'Permit Protection',
      body: 'Del Mar permits are scarce. We track the biennial renewal, insurance and signage so yours stays in good standing.',
      icon: 'Shield',
    },
    {
      title: '3-Night Minimum',
      body: 'Every reservation must run at least three consecutive nights. Your calendar and pricing are set that way from the start.',
      icon: 'Calendar',
    },
    {
      title: 'TOT Through Rentalscape',
      body: 'Your 13% TOT goes through the City\'s Rentalscape portal each month, filed by the last day of the following month.',
      icon: 'FileText',
    },
  ],
  permitRules: {
    title: 'Who Can Rent Short Term in Del Mar Today',
    intro:
      'Del Mar\'s STR ordinance caps permits at 129 citywide. It grandfathered in 150 Existing STRs, and new owners wait on a City list for an opening.',
    items: [
      {
        title: 'Existing STR permits',
        body: 'If you hold an Existing-STR permit, guard it. Renew on time and keep your insurance current. A single lapse ends your Existing-STR status.',
      },
      {
        title: 'Waitlist',
        body: 'New owners can\'t apply until a permit opens, so the first step is the City waitlist. When your name comes up, you have 30 days to apply or you\'re removed.',
      },
      {
        title: 'Primary residence requirement',
        body: 'When capacity opens, new STR permits go only to a primary residence, meaning you live there 6+ months a year. Existing STRs are exempt.',
      },
    ],
  },
  keepPermit: {
    title: 'Keep Your Permit in Good Standing',
    body: 'Permits renew every two years. In between, you carry $1,000,000 in liability insurance, keep signage posted, respond within 30 minutes and remit TOT monthly. A lapse or revocation ends Existing-STR protection.',
  },
  buying: {
    title: 'Buying in Del Mar',
    body: 'A Del Mar permit doesn\'t come with the house. When ownership transfers, the permit terminates and Existing-STR status ends. Inheritance, or a title change that keeps an original owner on, is allowed with notice to the City within 30 days.',
  },
  requirements: {
    title: 'Owner Checklist',
    intro: 'What Del Mar asks of permit holders, in order. Rules change, so confirm with the City of Del Mar before you list.',
    items: [
      'Check whether your home is an Existing STR on the City\'s registry, or join the waitlist.',
      'New STRs only: the home must be your primary residence, owned by you, a family trust, or an LLC/LP/LLP owned by individuals.',
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
    body: 'Rentals of more than 30 consecutive days, and a calendar-month rental to the same renter, count as long-term rentals. They\'re exempt from Del Mar\'s STR rules and TOT, and month-long guests can carry the calendar between short-term seasons.',
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
      'Under 20 homes on our roster, each treated as our own',
      '24/7 local contact with average response under 5 minutes',
      'Owner reports delivered within 24 hours',
      'Monthly statements by the 10th',
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
      'Within 30 minutes, 24/7, whether the complaint comes from the City, the Sheriff\'s Department or a resident.',
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
