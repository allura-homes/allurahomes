import type { Metadata } from 'next'
import { ContactContent } from './content'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Allura Homes',
  description:
    'Contact Allura Homes for vacation rental management inquiries. Call +1 (858) 244-9400 for 24-hour support, email support@allurahomes.com, or fill out our form. Serving San Diego, Temecula, Los Angeles & all of California.',
  alternates: { canonical: 'https://allurahomes.com/contact' },
  keywords: ['contact Allura Homes', 'vacation rental management contact', 'property management inquiry', 'San Diego rental manager phone'],
  openGraph: {
    title: 'Contact Allura Homes | Get in Touch',
    description: 'Reach out to our team for property management inquiries. 24-hour support at +1 (858) 244-9400.',
    url: 'https://allurahomes.com/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
}
