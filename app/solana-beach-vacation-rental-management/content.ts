import { PRIMARY_PHONE_E164 } from '@/lib/site-config'

export type FAQ = { question: string; paragraphs: string[]; link?: { text: string; href: string } }

export const solanaBeachContent = {
  seo: {
    title: 'Solana Beach Vacation Rental Management | Allura Homes',
    description: 'Solana Beach vacation rental management built for the 7-night rule: annual STVR permit, 13% TOT filed monthly. Get a free earnings report.',
    url: 'https://www.allurahomes.com/solana-beach-vacation-rental-management',
  },
  hero: {
    eyebrow: 'Solana Beach vacation rental management',
    title: 'Solana Beach Vacation Rental Management, Built Around the 7-Night Rule',
    subtitle: 'Seven-night minimums, an annual STVR permit and a 13% TOT return every month. We plan your Solana Beach home around the rules from day one.',
  },
  answer: {
    text: 'Solana Beach allows rentals of 7 to 30 nights with an annual City short-term vacation rental permit. Anything under 7 nights is off the table in residential zones. Permits expire December 31 and must be renewed by January 31. Owners file 13% TOT monthly, post a 24/7 contact number and answer complaints within 24 hours.',
    updated: 'Updated October 2026',
    author: 'Mike Corrales',
  },
  highlights: [
    {
      title: '7-Night Strategy',
      body: 'We price and plan your calendar for 7+ night stays and 31+ night furnished stays. Weekly guests mean fewer turnovers and a fuller calendar.',
      icon: 'Calendar',
    },
    {
      title: 'Permit & TOT Handled',
      body: 'Your STVR application, each annual renewal and the monthly 13% TOT return all sit with us. We\'re also your 24/7 local contact.',
      icon: 'Shield',
    },
    {
      title: '$43 Manager Change',
      body: 'The City\'s 2026 form lists a $43 manager change fee. When you\'re ready to switch, we walk the paperwork with you.',
      icon: 'RefreshCw',
    },
    {
      title: 'Launch in Weeks',
      body: 'Once you\'re onboarded, we take on furnishing, photography, permitting and the listing itself. Timing depends on permit processing and how ready your home is.',
      icon: 'Zap',
    },
  ],
  requirements: {
    title: 'What Solana Beach Requires',
    intro: 'Work through these in order. Rules change, so confirm with the City of Solana Beach before you list.',
    items: [
      'Confirm your home is in a residential zone and not an ADU, JADU or accessory living unit. ADUs can\'t be rented for under 30 days.',
      'Check your HOA rules. The City counts HOA warnings and fines as evidence of violations.',
      'Apply for an annual STVR permit (new application fee $263 on the 2026 form). It doubles as your business certificate.',
      'If a manager runs the home, they need their own Solana Beach Business Certificate.',
      'Post your permit inside the main entry door and a 24/7 complaint number outside, and give that number to adjacent owners.',
      'Set a 7-night minimum on every listing.',
      'Respond to complaints within 24 hours.',
      'File the 13% TOT return every month, even with no bookings, by the last day of the following month.',
      'Renew by January 31 every year through eTrakit.',
    ],
  },
  renewal: {
    title: 'Renewal Season',
    body: 'Every Solana Beach STVR permit expires December 31, and you can renew on or before January 31. Miss that date and the City closes your permit, so you start over with a new application and the new-application fee ($263 on the 2026 form). Put January 31 on your calendar now.',
  },
  switching: {
    title: 'Switching Managers in Solana Beach',
    body: 'The City\'s 2026 permit form lists a $43 manager change fee, and we work through the handover paperwork with you. Every Allura contract carries a mutual 30-day out clause: either side can end the agreement with 30 days\' notice and no penalty.',
  },
  weeklyStays: {
    title: 'Weekly-Stay Strategy',
    body: 'Solana Beach\'s 7-night minimum rewrites the pricing playbook. We set rates for 7+ night stays and 31+ night furnished stays, so each booking runs longer and turnovers come less often. Weekly guests also make revenue easier to predict.',
  },
  management: {
    title: 'How Allura Manages Your Solana Beach Home',
    stats: [
      { label: 'Founded', value: '2013' },
      { label: 'Homes managed', value: '< 20' },
      { label: '2025 rating', value: '4.9 stars' },
      { label: 'Avg response', value: '< 5 min' },
    ],
    badges: ['Airbnb Superhost', 'Vrbo Premier Host'],
    features: [
      'Fewer than 20 homes, each run like our own',
      '24/7 local contact with average response under 5 minutes',
      'Owner reports delivered within 24 hours',
      'Monthly statements in your inbox by the 10th',
      'A launch timeline measured in weeks',
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

export const solanaBeachFAQs: FAQ[] = [
  {
    question: 'What is the minimum stay for a vacation rental in Solana Beach?',
    paragraphs: [
      'Seven nights. In residential zones, Solana Beach prohibits rentals shorter than seven consecutive days, and stays of 7 to 30 days need an annual short-term vacation rental permit.',
    ],
  },
  {
    question: 'When do Solana Beach STVR permits expire?',
    paragraphs: [
      'Every permit expires December 31 and can be renewed on or before January 31. Permits not renewed by January 31 are closed, and the owner must file a new application and pay the new-application fee.',
    ],
  },
  {
    question: 'Can I switch property managers without losing my Solana Beach permit?',
    paragraphs: [
      'The City\'s 2026 permit form lists a $43 manager change fee. Contact the City to confirm the steps for your permit; Allura works through the handover paperwork with you.',
    ],
  },
  {
    question: 'Can I rent my ADU short term in Solana Beach?',
    paragraphs: [
      'No. The City does not permit rentals of less than 30 consecutive days in an accessory dwelling unit, junior ADU or accessory living unit, unless otherwise allowed by law.',
    ],
  },
  {
    question: 'What tax applies to Solana Beach vacation rentals?',
    paragraphs: [
      'Transient Occupancy Tax of 13% of the rent. A return is due every month, even if no tax was collected, by the last day of the following month.',
    ],
  },
]

export const solanaBeachStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Solana Beach Vacation Rental Management',
      provider: {
        '@type': 'Organization',
        name: 'Allura Homes',
        url: 'https://www.allurahomes.com',
      },
      areaServed: {
        '@type': 'City',
        name: 'Solana Beach',
      },
      description: solanaBeachContent.seo.description,
      url: solanaBeachContent.seo.url,
    },
    {
      '@type': 'FAQPage',
      mainEntity: solanaBeachFAQs.map((faq) => ({
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
