import type { Metadata } from 'next'
import { FAQContent } from './content'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Allura Homes Property Management',
  description:
    'Answers to Allura Homes vacation rental management questions, including fees, marketing, guest damage protection, technology and onboarding.',
  alternates: { canonical: 'https://www.allurahomes.com/faq' },
  keywords: ['Allura Homes FAQ', 'vacation rental management questions', 'property management fees', 'Airbnb management questions'],
  openGraph: {
    title: 'FAQ | Allura Homes Property Management',
    description: 'Answers to common questions about our vacation rental management services.',
    url: 'https://www.allurahomes.com/faq',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Allura Homes boutique vacation rental management' }],
  },
}

export default function FAQPage() {
  return <FAQContent />
}
