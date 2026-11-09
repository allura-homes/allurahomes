import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const sanDiegoCountyContent = {
  seo: {
    title: 'San Diego County Vacation Rental Management: Fallbrook, Bonsall, Julian & Ramona | Allura Homes',
    description:
      'Boutique management for country homes in unincorporated San Diego County: County TOT registration, quarterly 8% filings and thoughtful guest care. Free earnings report.',
    url: 'https://www.allurahomes.com/san-diego-county-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Unincorporated San Diego County vacation rental management',
    title: 'Vacation Rental Management for Unincorporated San Diego County',
    subtitle:
      'For homes in Fallbrook, Bonsall, Rainbow, Julian and Ramona. We register you for County TOT and file the 8% return every quarter.',
  },
  answer: {
    text: 'Fallbrook, Bonsall, Rainbow, Julian and Ramona are in unincorporated San Diego County, which has no short-term rental permit program as of October 2026. Owners must register with the County Treasurer-Tax Collector within 30 days of starting, collect 8% TOT on stays of 30 days or less, and report quarterly. The TOT certificate is not a permit, and HOA rules still apply.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: 'No City Permit',
      body: 'As of October 2026, unincorporated San Diego County has no short-term rental permit program. What you need instead is County TOT registration.',
      icon: 'FileCheck',
    },
    {
      title: 'County TOT',
      body: 'The County collects 8% on stays of 30 days or less. We register you and keep the paperwork off your desk.',
      icon: 'FileText',
    },
    {
      title: 'Quarterly Reporting',
      body: 'Returns are due October 31, January 31, April 30 and July 31. We put each one in before the deadline.',
      icon: 'Calendar',
    },
    {
      title: 'Country Home Care',
      body: 'A well, a septic system, a long drive in and a fire season to prepare for. Country homes ask for a different kind of attention.',
      icon: 'Home',
    },
  ],
  isUnincorporated: {
    title: 'Is My Home in Unincorporated County or a City?',
    body: 'Fallbrook, Bonsall, Rainbow, Julian and Ramona are unincorporated communities. If your home sits inside an incorporated city such as Escondido, Vista or Oceanside, that city\'s rules and TOT apply instead. The County can confirm your property\'s status.',
  },
  requirements: {
    title: 'Owner Checklist',
    intro:
      'Here is the short list for country owners. Rules change, so check with the County before you list.',
    items: [
      'Confirm your home is in unincorporated San Diego County, not inside a city.',
      'Check your HOA or CC&Rs and any deed restrictions.',
      'Register your rental with the County Treasurer-Tax Collector within 30 days of starting, through the online Host Compliance portal, and keep your TOT certificate.',
      'Collect 8% TOT from guests on stays of 30 days or less.',
      'Report and pay quarterly, by October 31, January 31, April 30 and July 31.',
      'Keep business, accounting and guest records for three years.',
      'Tell the Treasurer-Tax Collector if you stop renting, transfer or sell.',
    ],
  },
  enforcement: {
    title: 'The County Is Enforcing TOT',
    body: 'The County Treasurer-Tax Collector is actively enforcing TOT registration in Fallbrook, Bonsall and Rainbow. Register within 30 days, file quarterly and hold on to three years of records, or hand the filings to us.',
  },
  countryHomes: {
    title: 'Running a Country Home Well',
    body: 'Out here, the details differ. Wells and septic need watching, guests drive farther, fire season needs a plan, and winery weekends and Julian\'s busy seasons set the rhythm. We stay on top of it so your home runs well year-round.',
  },
  management: {
    title: 'How Allura Manages Your San Diego County Home',
    stats: [
      { label: 'Founded', value: '2013' },
      { label: 'Homes managed', value: '< 20' },
      { label: '2025 rating', value: '4.9 stars' },
      { label: 'Avg response', value: '< 5 min' },
    ],
    badges: ['Airbnb Superhost', 'Vrbo Premier Host'],
    features: [
      'A small roster of fewer than 20 homes, each run like our own',
      '24/7 local contact with average response under 5 minutes',
      'Owner reports delivered within 24 hours',
      'Monthly statements sent by the 10th',
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

export const sanDiegoCountyFAQs: FAQ[] = [
  {
    question: 'Do I need a permit for a vacation rental in Fallbrook, Bonsall or Julian?',
    paragraphs: [
      'These communities are in unincorporated San Diego County, which has no short-term rental permit program as of October 2026. You must register with the County Treasurer-Tax Collector and get a TOT certificate. The certificate is not a permit to operate, so contact the County to confirm what else applies to your property.',
    ],
  },
  {
    question: 'How much is the transient occupancy tax in unincorporated San Diego County?',
    paragraphs: [
      '8% of the rent, on stays of 30 days or less. The operator collects it from guests and reports it to the County quarterly.',
    ],
  },
  {
    question: 'When is County TOT due?',
    paragraphs: [
      'Within one calendar month after each quarter ends: October 31, January 31, April 30 and July 31.',
    ],
  },
  {
    question: 'How soon do I have to register my rental with the County?',
    paragraphs: [
      'Within 30 days of starting your rental business. The County says to allow up to 30 days for review.',
    ],
  },
]

export const sanDiegoCountyStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Vacation Rental Management in Unincorporated San Diego County',
      provider: {
        '@type': 'Organization',
        name: 'Allura Homes',
        url: 'https://www.allurahomes.com',
      },
      areaServed: [
        { '@type': 'Place', name: 'Fallbrook' },
        { '@type': 'Place', name: 'Bonsall' },
        { '@type': 'Place', name: 'Rainbow' },
        { '@type': 'Place', name: 'Julian' },
        { '@type': 'Place', name: 'Ramona' },
      ],
      description: sanDiegoCountyContent.seo.description,
      url: sanDiegoCountyContent.seo.url,
    },
    {
      '@type': 'FAQPage',
      mainEntity: sanDiegoCountyFAQs.map((faq) => ({
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
