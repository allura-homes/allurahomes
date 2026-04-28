import type { Metadata } from 'next'
import { FAQContent } from './content'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Allura Homes Property Management',
  description:
    'Answers to common questions about Allura Homes vacation rental management. Learn about our commission structure, marketing strategy, technology, guest damage protection, onboarding process, and more.',
  alternates: { canonical: 'https://allurahomes.com/faq' },
  keywords: ['Allura Homes FAQ', 'vacation rental management questions', 'property management fees', 'Airbnb management questions'],
  openGraph: {
    title: 'FAQ | Allura Homes Property Management',
    description: 'Answers to common questions about our vacation rental management services.',
    url: 'https://allurahomes.com/faq',
  },
}

export default function FAQPage() {
  return <FAQContent />
}
