import type { Metadata } from 'next'
import { HowItWorksContent } from './content'

export const metadata: Metadata = {
  title: 'How It Works - Getting Started with Allura Homes Property Management',
  description:
    'Getting started with Allura Homes is simple. Learn our streamlined onboarding process: tell us about your property, we build your custom strategy, and you earn while we manage everything. No contracts, no pressure.',
  alternates: { canonical: 'https://allurahomes.com/how-it-works' },
  keywords: ['how Allura Homes works', 'vacation rental onboarding', 'property management process', 'get started rental management'],
  openGraph: {
    title: 'How It Works | Allura Homes Property Management',
    description: 'Our simple onboarding process to get your property professionally managed and earning more.',
    url: 'https://allurahomes.com/how-it-works',
  },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
