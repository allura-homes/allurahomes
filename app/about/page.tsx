import type { Metadata } from 'next'
import { AboutContent } from './content'

export const metadata: Metadata = {
  title: 'About Allura Homes - Our Story & Mission',
  description:
    'Founded in 2013, Allura Homes is California\'s boutique vacation rental management company. Learn about founder Mike Corrales and our 13+ years of Superhost-certified experience managing luxury properties across San Diego, Temecula, and beyond.',
  alternates: { canonical: 'https://allurahomes.com/about' },
  keywords: ['Allura Homes about', 'Mike Corrales', 'vacation rental management company', 'San Diego property manager', 'Superhost certified'],
  openGraph: {
    title: 'About Allura Homes | Our Story & Mission',
    description: 'Founded in 2013 with 13+ years of Superhost-certified experience. Meet the team behind California\'s most trusted boutique rental management company.',
    url: 'https://allurahomes.com/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
