import type { Metadata } from 'next'
import { TermsContent } from './content'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Review the Terms of Use for the Allura Homes website. Understand your rights and responsibilities when using our vacation rental management services and website.',
  alternates: { canonical: 'https://allurahomes.com/terms-of-use' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return <TermsContent />
}
