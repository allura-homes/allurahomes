import type { Metadata } from 'next'
import { BookACallContent } from './content'

export const metadata: Metadata = {
  title: 'Book a Free Consultation Call - Schedule with Allura Homes',
  description:
    'Schedule a free, no-obligation consultation with Allura Homes. Discuss your vacation rental property goals and learn how our boutique management services can maximize your revenue in San Diego, Temecula, and across California.',
  alternates: { canonical: 'https://allurahomes.com/book-a-call' },
  keywords: ['book a call Allura Homes', 'free property management consultation', 'vacation rental consultation', 'schedule rental management meeting'],
  openGraph: {
    title: 'Book a Free Consultation | Allura Homes',
    description: 'Schedule a free, no-obligation call to discuss your vacation rental property.',
    url: 'https://allurahomes.com/book-a-call',
  },
}

export default function BookACallPage() {
  return <BookACallContent />
}
