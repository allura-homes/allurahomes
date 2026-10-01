import type { Metadata } from 'next'
import { PrivacyContent } from './content'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Allura Homes collects, uses and protects personal information. Read about data collection, cookies, third-party services and your rights.',
  alternates: { canonical: 'https://www.allurahomes.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
