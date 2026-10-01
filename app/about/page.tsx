import type { Metadata } from 'next'
import { AboutContent } from './content'

export const metadata: Metadata = {
  title: 'About Allura Homes - Our Story & Mission',
  description:
    'Founded in 2013 in San Diego. Boutique management. Less than 20 homes under management. 4.9 star rating in 2025.',
  alternates: { canonical: 'https://www.allurahomes.com/about' },
  keywords: ['Allura Homes about', 'Mike Corrales', 'vacation rental management company', 'San Diego property manager', 'Superhost certified'],
  openGraph: {
    title: 'About Allura Homes | Our Story & Mission',
    description: 'Founded in 2013 in San Diego. Boutique management. Less than 20 homes under management. 4.9 star rating in 2025.',
    url: 'https://www.allurahomes.com/about',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Allura Homes boutique vacation rental management' }],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
