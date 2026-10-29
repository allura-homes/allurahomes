import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const ranchoSantaFeContent = {
  seo: {
    title: 'Rancho Santa Fe & Fairbanks Ranch Luxury Vacation Rental Management | Allura Homes',
    description:
      'Discreet vacation rental management for Rancho Santa Fe and Fairbanks Ranch estates. Covenant-aware short stays or furnished 30+ night stays. Free earnings report.',
    url: 'https://www.allurahomes.com/rancho-santa-fe-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Rancho Santa Fe & Fairbanks Ranch vacation rental management',
    title: 'Luxury Vacation Rental Management for Rancho Santa Fe & Fairbanks Ranch Estates',
    subtitle:
      'Quiet, careful management for estates in the Covenant of Rancho Santa Fe and Fairbanks Ranch, whether you host short stays or furnished stays of 30+ nights.',
  },
  answer: {
    text: 'Rancho Santa Fe and Fairbanks Ranch sit in unincorporated San Diego County, so no city rental permit applies. Owners register with the County Treasurer-Tax Collector within 30 days and remit 8% TOT quarterly on stays of 30 days or less. Association rules sit on top of that: the RSF Covenant bars paid event rentals and limits renting guest houses, so check before you list.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: 'Estate-Grade Care',
      body: 'Vetted guests, a written house manual and vendors who answer to us. No events. With fewer than 20 homes, each estate gets our full attention.',
      icon: 'Home',
    },
    {
      title: 'Covenant-Aware',
      body: 'The RSF Association prohibits paid event rentals and limits renting guest houses. Our plan for your estate starts from those rules.',
      icon: 'Shield',
    },
    {
      title: 'Short or Long Stays',
      body: 'Host short stays, or furnished stays of more than 30 nights for corporate relocations, insurance placements and seasonal guests. Stays of more than 30 nights avoid TOT.',
      icon: 'Calendar',
    },
    {
      title: 'County TOT',
      body: 'County TOT is 8% on stays of 30 days or less, reported quarterly. Registration and every filing are on us.',
      icon: 'FileText',
    },
  ],
  layers: {
    title: 'Three Layers of Rules',
    intro:
      'Rancho Santa Fe and Fairbanks Ranch are in unincorporated San Diego County. No city rental permit applies, yet three sets of rules still shape how you rent:',
    items: [
      {
        title: 'County TOT',
        body: 'Register with the County Treasurer-Tax Collector within 30 days of starting. Collect 8% TOT on stays of 30 days or less. Report quarterly.',
      },
      {
        title: 'RSF Association / Covenant',
        body: 'The RSF Covenant prohibits renting homes as paid event venues. It limits renting accessory buildings and parts of homes. Contact the RSF Association to confirm the current rules for your property before you list.',
      },
      {
        title: 'Fairbanks Ranch CC&Rs',
        body: 'Fairbanks Ranch is a private association with recorded CC&Rs. Contact the Fairbanks Ranch Association to confirm rental terms.',
      },
    ],
  },
  requirements: {
    title: 'Owner Checklist',
    intro:
      'Before you list, work through these steps. Rules change, so confirm with the County and your association first.',
    items: [
      'Confirm your home is in unincorporated San Diego County (Covenant of Rancho Santa Fe, Fairbanks Ranch).',
      'Check your association rules: the RSF Association for Covenant homes, or the Fairbanks Ranch Association. Ask about minimum stays and guest houses.',
      'Don\'t rent the home as a paid event venue. The RSF Covenant prohibits it.',
      'Register with the County Treasurer-Tax Collector within 30 days of your first booking and get your TOT certificate.',
      'Collect 8% TOT on stays of 30 days or less and report quarterly.',
      'Keep guest and accounting records for three years.',
      'Consider furnished stays of more than 30 nights, which aren\'t subject to TOT.',
    ],
  },
  estates: {
    title: 'Short Stays vs Furnished 30+ Nights for Estates',
    body: 'An estate can host short stays or furnished stays of more than 30 nights. The longer stays suit corporate relocations, insurance housing and Del Mar race season. They also avoid County TOT and bridge the gaps between short-stay bookings.',
  },
  management: {
    title: 'How Allura Runs Your Estate',
    intro:
      'Discretion comes first. Guests are screened, events stay off the property and one team coordinates every vendor.',
    stats: [
      { label: 'Founded', value: '2013' },
      { label: 'Homes managed', value: '< 20' },
      { label: '2025 rating', value: '4.9 stars' },
      { label: 'Avg response', value: '< 5 min' },
    ],
    badges: ['Airbnb Superhost', 'Vrbo Premier Host'],
    features: [
      'Fewer than 20 homes, each cared for like our own',
      '24/7 local contact with average response under 5 minutes',
      'Owner reports delivered within 24 hours',
      'Monthly statements delivered by the 10th',
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

export const ranchoSantaFeFAQs: FAQ[] = [
  {
    question: 'Do I need a permit to rent my Rancho Santa Fe home short term?',
    paragraphs: [
      'Rancho Santa Fe is in unincorporated San Diego County, which has no city short-term rental permit. You must register with the County Treasurer-Tax Collector within 30 days of starting and get a TOT certificate, which is not a permit to operate. Association rules also apply.',
    ],
  },
  {
    question: 'Does the Rancho Santa Fe Covenant allow vacation rentals?',
    paragraphs: [
      'The RSF Association prohibits renting a home as a paid venue for events like parties and weddings, and it limits renting accessory buildings and parts of a home. Contact the RSF Association to confirm the current rules for your property before you list.',
    ],
  },
  {
    question: 'What tax applies to vacation rentals in Rancho Santa Fe and Fairbanks Ranch?',
    paragraphs: [
      'The County\'s Transient Occupancy Tax of 8% of the rent on stays of 30 days or less, reported and paid quarterly to the Treasurer-Tax Collector.',
    ],
  },
  {
    question: 'Are rentals of more than 30 days subject to TOT?',
    paragraphs: ['No. County TOT applies to stays of 30 days or less.'],
  },
]

export const ranchoSantaFeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Rancho Santa Fe & Fairbanks Ranch Vacation Rental Management',
      provider: {
        '@type': 'Organization',
        name: 'Allura Homes',
        url: 'https://www.allurahomes.com',
      },
      areaServed: [
        {
          '@type': 'Place',
          name: 'Rancho Santa Fe',
        },
        {
          '@type': 'Place',
          name: 'Fairbanks Ranch',
        },
      ],
      description: ranchoSantaFeContent.seo.description,
      url: ranchoSantaFeContent.seo.url,
    },
    {
      '@type': 'FAQPage',
      mainEntity: ranchoSantaFeFAQs.map((faq) => ({
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
