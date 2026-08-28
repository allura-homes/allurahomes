import type { Metadata } from 'next'
import { HowItWorksContent } from './content'

export const metadata: Metadata = {
  title: 'How It Works - Getting Started with Allura Homes Property Management',
  description:
    'How Allura onboards a California home: we learn the house, set pricing and channels, and stay on the guest standard. Since 2013.',
  alternates: { canonical: 'https://www.allurahomes.com/how-it-works' },
  keywords: ['how Allura Homes works', 'vacation rental onboarding', 'property management process', 'get started rental management'],
  openGraph: {
    title: 'How It Works | Allura Homes Property Management',
    description: 'How Allura onboards a California home: we learn the house, set pricing and channels, and stay on the guest standard. Since 2013.',
    url: 'https://www.allurahomes.com/how-it-works',
  },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
