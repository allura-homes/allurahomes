import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const ranchoSantaFeContent = {
  seo: {
    title: 'Rancho Santa Fe & Fairbanks Ranch Luxury Rental Management | Allura Homes',
    description:
      'Discreet, boutique management for Rancho Santa Fe and Fairbanks Ranch estates: Covenant-aware short stays or furnished 30+ night stays. Free earnings report.',
    url: 'https://www.allurahomes.com/rancho-santa-fe-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Rancho Santa Fe & Fairbanks Ranch luxury rental management',
    title: 'Luxury Vacation Rental Management in Rancho Santa Fe & Fairbanks Ranch',
    subtitle:
      'Discreet, boutique management for estates in the Covenant of Rancho Santa Fe and Fairbanks Ranch. Short stays or furnished 30+ night stays.',
  },
  answer: {
    text: 'Rancho Santa Fe and Fairbanks Ranch are in unincorporated San Diego County, so there\'s no city rental permit. Owners register with the County Treasurer-Tax Collector within 30 days and remit 8% TOT quarterly on stays of 30 days or less. Association rules also apply. The RSF Covenant bars paid event rentals and limits renting guest houses, so check before you list.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: 'Estate-Grade Care',
      body: 'Discretion, vetted guests, no events, house manual, vendor coordination. Fewer than 20 homes managed like they are our own.',
      icon: 'Home',
    },
    {
      title: 'Covenant-Aware',
      body: 'The RSF Association prohibits paid event rentals and limits renting guest houses. We manage within those rules.',
      icon: 'Shield',
    },
    {
      title: 'Short or Long Stays',
      body: 'Short stays or furnished 30+ night stays for corporate relocation, insurance, and seasonal guests. 30+ nights avoid TOT.',
      icon: 'Calendar',
    },
    {
      title: 'County TOT',
      body: '8% County TOT on stays of 30 days or less, reported quarterly. We handle registration and filings.',
      icon: 'FileText',
    },
  ],
  layers: {
    title: 'Three Layers of Rules',
    intro:
      'Rancho Santa Fe and Fairbanks Ranch are in unincorporated San Diego County. There\'s no city rental permit, but three sets of rules apply:',
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
      'A step-by-step checklist for owners. Rules change, so contact the County and your association to confirm before you list.',
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
    body: 'Estates can host short stays or furnished stays of 30+ nights. Furnished stays are good for corporate relocation, insurance housing, and Del Mar race season. They avoid County TOT and fill the calendar between short-stay bookings.',
  },
  management: {
    title: 'Estate-Grade Care',
    intro:
      'Discretion, vetted guests, no events, house manual, vendor coordination. Fewer than 20 homes managed like they are our own.',
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
      name: 'Rancho Santa Fe & Fairbanks Ranch Luxury Rental Management',
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
