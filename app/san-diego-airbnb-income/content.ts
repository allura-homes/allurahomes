import { AIRBNB_PROFILE_HREF, BOOK_A_CALL_HREF, FREE_INCOME_REPORT_HREF, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from '@/lib/site-config'

const SITE = 'https://www.allurahomes.com'
export const INCOME_PAGE_PATH = '/san-diego-airbnb-income'
const PAGE_URL = `${SITE}${INCOME_PAGE_PATH}`

export const incomeContent = {
  seo: {
    title: 'San Diego Airbnb Income vs 30+ Night Rentals | Allura',
    description: 'What a San Diego home really earns as an Airbnb vs a furnished 30+ night rental: gross vs net after fees, TOT, cleaning and vacancy. Get a free estimate.',
    url: PAGE_URL,
  },
  cta: {
    primary: 'Get your free income estimate',
    primaryHref: FREE_INCOME_REPORT_HREF,
    microcopy: 'Gross and net, for your address. No obligation.',
    secondaryLead: 'Prefer to talk?',
    secondary: 'Book a call',
    secondaryHref: BOOK_A_CALL_HREF,
    phone: PRIMARY_PHONE_DISPLAY,
    phoneHref: `tel:${PRIMARY_PHONE_E164}`,
  },
  breadcrumb: 'San Diego Airbnb Income',
  title: 'What your San Diego home actually earns: Airbnb vs furnished 30+ nights',
  byline: 'By Mike Corrales, founder, Allura Homes · Updated October 14, 2026',
  datePublished: '2026-10-14',
  answer: 'For most San Diego homes that can hold a short-term license and whose HOA allows it, a blended calendar earns the most: nightly stays in peak season, furnished 30+ night stays in the slow months. Judge it on net, after tourist tax, platform fees, utilities and management. Allura charges 20% of short-term accommodation fare, from 15% for monthly stays.',
  trust: ['Since 2013', 'Airbnb Superhost', 'Less than 20 homes', '4.9 star rating in 2025'],
  superhostHref: AIRBNB_PROFILE_HREF,
  recommendation: {
    title: 'Our recommendation: a blended calendar, when your home qualifies',
    paragraphs: [
      'If your home can get a short-term license and your HOA allows short stays, we recommend a blended calendar. Nightly stays capture peak-season rates. Furnished stays of 30+ nights, for traveling clinicians, relocating families, snowbirds, corporate and insurance placements, fill the softer months instead of leaving them to night-by-night gaps.',
      "It isn't a fixed schedule. We decide period by period which track each stretch of your calendar sits in, hold a 30-night floor and seasonal rate plans for the monthly side, and rebalance the mix every quarter. Sometimes that means not chasing occupancy, to protect the home and your margin. We judge it on net revenue, not on nights booked.",
      "If your home can't get a license, or your HOA bans short stays, furnished 30+ nights is the path. It's a sound one, with steadier income and lighter turnover, but where a license and your HOA allow it, the blend is what we aim for.",
    ],
  },
  grossNet: {
    title: 'Gross is the headline. Net is your income.',
    paragraphs: [
      "Most earnings figures you'll see online are gross: what guests paid. Your income is what's left after the tourist tax is remitted, the booking platform takes its fee, the utilities are paid and the home is insured, licensed and managed.",
      "Two homes can post the same gross and very different nets. The difference is rarely luck. It's pricing, the stay mix, and how carefully costs are handled.",
    ],
  },
  market: {
    title: 'What San Diego short-term rentals gross today',
    lede: "AirDNA's public San Diego market page reports, for the twelve months through September 2026:",
    stats: [
      { value: '18,004', label: 'active short-term rental listings' },
      { value: '$67.3K', label: 'average annual revenue per listing' },
      { value: '66%', label: 'average occupancy' },
      { value: '$319', label: 'average daily rate' },
      { value: '$210', label: 'RevPAR (revenue per available night)' },
    ],
    source: "Source: AirDNA, San Diego market overview, updated Oct 13, 2026, retrieved Oct 14, 2026. AirDNA's revenue figure is before host expenses and includes cleaning and other guest fees.",
    note: "These are citywide averages. A two-bedroom inland condo and a beachfront house sit far apart. That's why we evaluate every home individually.",
  },
  example: {
    title: 'A worked example: short-term, blended and monthly-only',
    disclaimerStrong: 'Illustrative only. This is not a forecast or a guarantee.',
    disclaimer: "The nightly rate and occupancy come from AirDNA's public San Diego averages (above). Every other number is an example input, chosen to show the math. Your home's numbers will differ.",
    pricingLead: 'How Allura prices it.',
    pricing: "We set each listing's nightly rate with a markup so that the channel fee (Airbnb's 15.5%, Vrbo's 12%) is covered by the guest's rate, not taken from your income. The exact markup is set per listing. Here we model it simply as fully offsetting Airbnb's 15.5%:",
    pricingPoints: [
      'Base rate $319 (AirDNA avg) ÷ (1 − 0.155) = $377.51 listed rate',
      "Airbnb's 15.5% of $377.51 = $58.51, which equals the $58.51 markup. The base rate is preserved.",
      "Allura's 20% is charged on the accommodation fare guests pay, before channel fees.",
      'The example assumes occupancy holds at 66% at the listed rate.',
    ],
    calendarLead: 'About the calendar.',
    calendar: "There's no fixed list of nightly and monthly months. Which stretches run nightly depends on your home's local demand and is reviewed every quarter. The 8/4 split below is an example input, not a schedule.",
    mathLead: 'How the math works:',
    math: 'booked nights = available nights × occupancy. Accommodation fare = booked nights × listed rate. Then subtract management, channel fees, utilities, license, insurance and maintenance. Cleaning fees are guest-paid and passed straight to cleaners; tourist tax is collected from guests and remitted. Neither counts as owner income or expense.',
    headers: ['Short-term all year', 'Blended (recommended where permit and HOA allow)', 'Monthly-only (no permit, or HOA bans STR)'],
    rows: [
      { label: 'Calendar', cells: ['12 months nightly', '8 peak months nightly + 4 low months furnished 30+ nights (example input)', '10 of 12 months booked (example input)'] },
      { label: 'Nightly stays', cells: ['365 × 66% = 241 nights × $377.51', '244 × 66% = 161 nights × $377.51', 'n/a'] },
      { label: 'Monthly stays', cells: ['n/a', '4 × $6,000 (example input)', '10 × $6,000 (example input)'] },
      { label: 'Accommodation fare (gross)', cells: ['$90,981', '$60,780 + $24,000 = $84,780', '$60,000'], strong: true },
      { label: 'Allura management', cells: ['−$18,196 (20%)', '−$12,156 (20% of nightly) − $3,600 (15% of monthly)', '−$9,000 (15%)'] },
      { label: 'Channel fees', cells: ['−$14,102 (15.5%, covered by the markup)', '−$9,421 (15.5% of nightly, covered by the markup); $0 on monthly (example input)', '$0 (example input: direct or housing partner)'] },
      { label: 'Utilities (incl. trash)', cells: ['−$3,600 ($300/mo, example input)', '−$2,400 (8 nightly months; monthly guests pay a utility fee)', '−$600 (2 empty months; guests pay a utility fee while booked)'] },
      { label: 'City STRO license (Tier 3)', cells: ['−$585/yr ($41 application + $1,129 license, every 2 years; City of San Diego)', '−$585/yr (same)', '$0 (not required for stays of a month or more)'] },
      { label: 'Insurance', cells: ['−$3,000 (illustrative; see note)', '−$3,000 (illustrative)', '−$3,000 (illustrative)'] },
      { label: 'General maintenance (illustrative)', cells: ['−$1,800 ($150/mo)', '−$1,800 ($150/mo)', '−$1,800 ($150/mo)'] },
      { label: 'Net to owner, before mortgage and property tax', cells: ['$49,698', '$51,818', '$45,600'], strong: true },
    ],
    notesTitle: 'Notes on the example',
    notes: [
      'The markup check: $90,981 listed fare − $76,879 at the base rate = $14,102, the same as the channel fee.',
      'License: City of San Diego STRO fees, Tier 3 and Tier 4 alike: $41 application + $1,129 license, valid two years, non-refundable (sandiego.gov/treasurer/short-term-residential-occupancy, retrieved Oct 14, 2026). Shown annualized. Tier 4 (Mission Beach) applications are closed.',
      'Insurance: published estimates put typical California and San Diego short-term rental premiums at about $1,800 to $3,500 a year.¹ We use $3,000 as an illustrative default in all three columns; a 30+ night landlord policy can cost less, and fire-zone or high-value homes run higher.',
      "General maintenance: an illustrative default of $150 a month for routine upkeep (landscaping, pest control, small repairs, exterior cleaning). Supplies and repairs are passed through at cost with receipts; your home's figure will differ.",
      "241 nights × $319 is above AirDNA's $67.3K average partly because the example assumes availability all 365 nights; many listings aren't.",
      'The blend uses the citywide average occupancy even for peak months, which is conservative. In practice the gain comes from filling slow months that nightly demand leaves empty.',
      'Monthly-only is the right path when a license or your HOA rules out short stays. Where both allow it, we build toward the blend.',
    ],
    licenseSourceHref: 'https://www.sandiego.gov/treasurer/short-term-residential-occupancy',
    footnote: {
      lead: "¹ Insurance sources (insurance sellers' published estimates, not rate surveys):",
      sources: [
        { label: 'GetCoveredAI, "Short-Term Rental Insurance in California,"', href: 'https://getcoveredai.com/rentals/california', after: 'average $1,800–$3,500/yr, retrieved Oct 14, 2026;' },
        { label: 'STR Guard, "Short-Term Rental Insurance Cost in California (2026 Guide)," May 16, 2026,', href: 'https://strguardinsurance.com/blog/str-insurance-cost-california-2026-guide/', after: 'which puts a full program for a low-fire-risk San Diego urban home at about $3,000–$6,000/yr, retrieved Oct 14, 2026.' },
      ],
    },
  },
  comparison: {
    title: 'Airbnb vs furnished 30+ nights, honestly',
    headers: ['Short-term (under 30 nights)', 'Furnished 30+ nights'],
    rows: [
      ['City license', "Required for whole-home stays. The city listed 802 Tier 3 licenses remaining (Oct 9, 2026) and none in Tier 4 (Mission Beach). The license belongs to the Host and can't be transferred.", 'Not required for stays of a month or more'],
      ['Tourist tax (TOT)', '11.75%, 12.75% or 13.75% depending on zone, collected from guests', 'None on stays of a calendar month or more'],
      ['Rates', 'Highest nightly rates, bigger seasonal swings', 'Lower per night, steadier'],
      ['Cleaning', 'After every stay; guest-paid, passed through', 'Fewer, deeper cleans; guest-paid, passed through'],
      ['Channel fees', 'Airbnb 15.5% single host-only fee, required for homes run on property management software (final switch Oct 13, 2026); Vrbo 12% (from Oct 29, 2026)', 'Lower or none when booked direct or through housing partners'],
      ['Utilities', 'Owner pays', 'Guests pay a utility fee'],
      ['Furnishing', 'Hotel-grade, frequent refresh', 'Fully furnished for daily living, lighter wear'],
      ['Vacancy', 'Night-by-night gaps, slow-season dips', 'Fewer, longer gaps between stays'],
      ['Allura fee', '20% of accommodation fare', 'From 15%'],
      ['ADUs and HOAs', "An ADU can't be rented for less than a month. HOA rules may limit short stays.", 'ADUs can rent at 31+ nights. Usually works within HOA minimums.'],
    ] as const,
    paths: [
      { title: 'Recommended: both, when your permit and HOA allow it', body: 'Nightly stays when demand peaks, furnished 30+ night stays to smooth out the low season. This is our default for licensable homes.' },
      { title: "When your home can't run short-term: 30+ nights", body: 'No license is available, the home is an ADU, or your HOA bans short stays. Furnished 30+ nights then delivers steadier, lower-touch income from relocating professionals, traveling clinicians, corporate and insurance placements.' },
    ],
  },
  regulations: {
    title: 'Can you run short-term in San Diego?',
    body: "In the City of San Diego, renting a whole home for less than a month requires a short-term residential occupancy (STRO) license. Tier 3 licenses are capped; the city listed 802 remaining as of Oct 9, 2026. The license is issued to the Host, not the manager, and it isn't transferable. Allura serves as your local contact, available 24/7.",
    guideLead: 'Other cities in the county set their own rules. See our',
    guideLabel: 'San Diego regulations guide',
    guideHref: '/regulations/san-diego-california',
    disclaimer: 'This is general information, not legal or tax advice.',
  },
  fees: {
    title: "What Allura charges, and what's included",
    pricing: [
      { lead: 'Short-term stays:', body: '20% of the accommodation fare.' },
      { lead: 'Furnished stays of 30+ nights:', body: 'from 15%.' },
      { lead: 'We evaluate every home individually.', body: "Tell us about yours and we'll show you what it can earn." },
    ],
    includedTitle: 'Included in our management:',
    included: [
      { title: 'Compliance and permitting', body: 'city rules, HOA and condo bylaws, and rental agreement requirements' },
      { title: 'Furnishing, design and staging', body: 'durable, considered interiors built for real stays' },
      { title: 'Photography and listings', body: 'professional HDR photography and listing copywriting' },
      { title: 'Marketing and distribution', body: 'dynamic pricing set daily by people and data, across nightly platforms, direct booking, and healthcare, corporate and insurance partners' },
      { title: 'Screening', body: 'vetting 30+ night residents and guests' },
      { title: 'Local contact and guest relations', body: 'your local contact, available 24/7, plus move-in coordination' },
      { title: 'Operations and maintenance', body: 'turnover cleaning coordination, repairs and preventative upkeep' },
      { title: 'Safety and move-in', body: 'smoke and CO alarms, extinguishers and posted exits, plus a move-in inventory report for 30+ night stays' },
      { title: 'Calendar governance', body: 'matching each booking to the right track and channel, and rebalancing the nightly and 30+ night mix every quarter' },
      { title: 'Owner reporting', body: 'detailed monthly statements, clear revenue breakdowns, proactive quarterly revenue reviews' },
    ],
    markupLead: 'Zero markup on cleaning, maintenance and supplies.',
    markup: "Cleaning fees are guest-paid and passed to cleaners at the same amount; supplies and maintenance are billed at cost, with receipts; local taxes are remitted at face value. The nightly-rate markup that covers Airbnb and Vrbo channel fees is separate: it's paid by guests in the listed rate, not by you.",
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { question: 'How much does an Airbnb make in San Diego?', answer: "AirDNA's public San Diego page reports an average of $67.3K in annual revenue per active listing, with 66% occupancy and a $319 average daily rate, for the twelve months through September 2026. That figure is gross, before host expenses. Your home's number depends on its location, size, license and season." },
      { question: "What's left after fees?", answer: 'Take the accommodation fare, then subtract management, channel fees, utilities, license, insurance and maintenance. Cleaning fees and tourist tax are paid by guests and passed through. Our illustrative example above shows the math line by line, so you can plug in your own numbers.' },
      { question: 'Should I run Airbnb, furnished 30+ nights, or both?', answer: 'Both, when your home can hold a short-term license and your HOA allows it: nightly stays in peak season and furnished 30+ night stays in the slow months. If a license or your HOA rules out short stays, furnished 30+ nights is the path, with steadier income and no short-term license or tourist tax.' },
      { question: 'Do I need a license to rent short-term in San Diego?', answer: "Yes, to rent a whole home for less than a month in the City of San Diego. Tier 3 licenses are capped; the city listed 802 remaining on Oct 9, 2026. The license belongs to the Host and can't be transferred. This is general information, not legal advice." },
      { question: 'How much tourist tax applies?', answer: "In the City of San Diego, transient occupancy tax is 11.75%, 12.75% or 13.75% depending on the zone, and it's collected from guests. It doesn't apply to stays of a calendar month or more." },
      { question: "How do Airbnb's and Vrbo's new fees affect my payout?", answer: 'Airbnb moved the last homes run on property management software to its single 15.5% host-only fee on Oct 13, 2026, and Vrbo moves to 12% on Oct 29, 2026. Allura adds a rate markup to counter these fees, and our 20% is charged on the accommodation fare before channel fees.' },
      { question: 'What does Allura charge?', answer: '20% of the accommodation fare for short-term stays, and from 15% for furnished stays of 30+ nights.' },
      { question: 'Can my ADU be an Airbnb in San Diego?', answer: 'Not for stays less than a month. ADUs can be rented as furnished 30+ night homes; a junior ADU has no rental-term limit. This is general information, not legal advice.' },
    ],
  },
  closing: {
    title: 'Get your number',
    body: "Can your home run a blended calendar? Gross is easy to find; net takes knowing your home's license, HOA and season. Since 2013, we've managed homes for owners who want the real figure, not the headline.",
    estimateDetail: 'blended, short-term and monthly, gross and net, for your address. No obligation.',
  },
  related: [
    { label: 'Boutique vacation rental management in San Diego', href: '/san-diego-vacation-rental-management' },
    { label: 'Leaving a big management company?', href: '/property-management/switch-property-managers-san-diego' },
    { label: 'San Diego regulations guide', href: '/regulations/san-diego-california' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
  ],
}

const ORG_ID = `${SITE}/#organization`
const PERSON_ID = `${SITE}/#mike-corrales`

export const incomeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': ORG_ID,
      name: 'Allura Homes', legalName: 'Allura Homes LLC', url: `${SITE}/`,
      telephone: '+1-858-244-9400', foundingDate: '2013',
      founder: { '@id': PERSON_ID },
      sameAs: [AIRBNB_PROFILE_HREF],
    },
    { '@type': 'Person', '@id': PERSON_ID, name: 'Mike Corrales', jobTitle: 'Founder', worksFor: { '@id': ORG_ID } },
    {
      '@type': 'Article', '@id': `${PAGE_URL}#article`,
      headline: incomeContent.title, description: incomeContent.seo.description,
      author: { '@id': PERSON_ID }, publisher: { '@id': ORG_ID },
      datePublished: incomeContent.datePublished, dateModified: incomeContent.datePublished,
      mainEntityOfPage: PAGE_URL, inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: incomeContent.breadcrumb, item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage', '@id': `${PAGE_URL}#faq`,
      mainEntity: incomeContent.faq.items.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
  ],
}
