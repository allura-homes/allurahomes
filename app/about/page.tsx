import type { Metadata } from 'next'
import { AboutContent } from './content'

export const metadata: Metadata = {
  title: 'About Allura Homes - Our Story & Mission',
  description:
    'Founded in 2013 in San Diego. Boutique vacation-rental and furnished-monthly management. About 19 homes. 4.9 guest rating in 2025.',
  alternates: { canonical: 'https://www.allurahomes.com/about' },
  keywords: ['Allura Homes about', 'Mike Corrales', 'vacation rental management company', 'San Diego property manager', 'Superhost certified'],
  openGraph: {
    title: 'About Allura Homes | Our Story & Mission',
    description: 'Founded in 2013 in San Diego. Boutique vacation-rental and furnished-monthly management. About 19 homes. 4.9 guest rating in 2025.',
    url: 'https://www.allurahomes.com/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
