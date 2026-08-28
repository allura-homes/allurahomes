import type { Metadata } from 'next'
import { ReferralsContent } from './content'

export const metadata: Metadata = {
  title: 'Referral Program - Earn Up to $3,000 Per Homeowner Referral',
  description:
    'Refer a homeowner to Allura Homes. $500 at sign-up plus $250 per bedroom after six months. Boutique California management since 2013.',
  alternates: { canonical: 'https://www.allurahomes.com/referrals' },
  keywords: ['Allura Homes referral program', 'vacation rental referral', 'property management referral fee', 'earn referral commission', 'refer a homeowner'],
  openGraph: {
    title: 'Referral Program | Earn Up to $3,000 | Allura Homes',
    description: 'Refer a homeowner to Allura Homes. $500 at sign-up plus $250 per bedroom after six months. Boutique California management since 2013.',
    url: 'https://www.allurahomes.com/referrals',
  },
}

export default function ReferralsPage() {
  return <ReferralsContent />
}
