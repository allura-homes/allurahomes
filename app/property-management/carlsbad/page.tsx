import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription, metaTitle } from '@/lib/seo'
import { getMetroArea } from '@/lib/metro-areas'
import { notFound } from 'next/navigation'
import { CarlsbadContent } from './content'

const SLUG = 'carlsbad'

export const metadata: Metadata = {
  title: { absolute: metaTitle('Carlsbad Vacation Rental Management') },
  description: metaDescription('Boutique Airbnb and vacation rental management in Carlsbad. 20% / from 15% / supplies at cost. Free earnings report in 24 hours. 4.9 stars in 2025.'),
  keywords: [
    'Carlsbad vacation rental management',
    'Carlsbad Airbnb management',
    'Carlsbad property management',
    'North County vacation rental',
    'Carlsbad short-term rental',
  ],
  alternates: { canonical: 'https://www.allurahomes.com/property-management/carlsbad' },
  openGraph: {
    images: [SHARE_IMAGE],
    title: metaTitle('Carlsbad Vacation Rental Management'),
    description: metaDescription('Boutique Airbnb and vacation rental management in Carlsbad. 20% / from 15% / supplies at cost. Free earnings report in 24 hours. 4.9 stars in 2025.'),
    url: 'https://www.allurahomes.com/property-management/carlsbad',
  },
  twitter: {
    title: metaTitle('Carlsbad Vacation Rental Management'),
    description: metaDescription('Boutique Airbnb and vacation rental management in Carlsbad. 20% / from 15% / supplies at cost. Free earnings report in 24 hours. 4.9 stars in 2025.'),
  },
}

export default function CarlsbadPage() {
  const metro = getMetroArea(SLUG)
  if (!metro) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Carlsbad Vacation Rental Management',
            provider: {
              '@type': 'Organization',
              name: 'Allura Homes',
              url: 'https://www.allurahomes.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'Carlsbad',
            },
            description: metaDescription('Boutique Airbnb and vacation rental management in Carlsbad. 20% / from 15% / supplies at cost. Free earnings report in 24 hours. 4.9 stars in 2025.'),
            url: 'https://www.allurahomes.com/property-management/carlsbad',
          }),
        }}
      />
      <CarlsbadContent metro={metro} />
    </>
  )
}
