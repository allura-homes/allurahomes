import type { Metadata } from 'next'
import { BookACallContent } from './content'

export const metadata: Metadata = {
  title: 'Book a Free Consultation Call - Schedule with Allura Homes',
  description:
    'Talk with Allura about a California vacation rental or 30-night home. Boutique management, San Diego, since 2013.',
  alternates: { canonical: 'https://www.allurahomes.com/book-a-call' },
  keywords: ['book a call Allura Homes', 'free property management consultation', 'vacation rental consultation', 'schedule rental management meeting'],
  openGraph: {
    title: 'Book a Free Consultation | Allura Homes',
    description: 'Talk with Allura about a California vacation rental or 30-night home. Boutique management, San Diego, since 2013.',
    url: 'https://www.allurahomes.com/book-a-call',
  },
}

export default function BookACallPage() {
  return <BookACallContent />
}
