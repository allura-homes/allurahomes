import type { Metadata } from 'next'
import { SHARE_IMAGE } from '@/lib/seo'
import { ContactContent } from './content'
import { PHONE_DISPLAY } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Allura Homes',
  description:
    `Contact Allura Homes for California vacation rental management. Call ${PHONE_DISPLAY} or email support@allurahomes.com.`,
  alternates: { canonical: 'https://www.allurahomes.com/contact' },
  keywords: ['contact Allura Homes', 'vacation rental management contact', 'property management inquiry', 'San Diego rental manager phone'],
  openGraph: {
    images: [SHARE_IMAGE],
    title: 'Contact Allura Homes | Get in Touch',
    description: `Reach out to our team for property management inquiries. 24-hour support at ${PHONE_DISPLAY}.`,
    url: 'https://www.allurahomes.com/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
}
