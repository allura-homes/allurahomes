import type { Metadata } from 'next'
import { ReferralsContent } from './content'

export const metadata: Metadata = {
  title: 'Referral Program - Earn Up to $3,000 Per Homeowner Referral',
  description:
    'Earn up to $3,000 for every homeowner you refer to Allura Homes. $500 at sign-up plus $250 per bedroom after 6 months. Turn your connections into commissions with California\'s premier vacation rental management company.',
  alternates: { canonical: 'https://allurahomes.com/referrals' },
  keywords: ['Allura Homes referral program', 'vacation rental referral', 'property management referral fee', 'earn referral commission', 'refer a homeowner'],
  openGraph: {
    title: 'Referral Program | Earn Up to $3,000 | Allura Homes',
    description: 'Earn up to $3,000 for every homeowner you refer. $500 at sign-up plus $250 per bedroom after 6 months.',
    url: 'https://allurahomes.com/referrals',
  },
}

export default function ReferralsPage() {
  return <ReferralsContent />
}
