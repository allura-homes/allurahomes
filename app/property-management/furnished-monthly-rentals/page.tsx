import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription, metaTitle } from '@/lib/seo'
import { FurnishedMonthlyContent } from './content'

export const metadata: Metadata = {
  title: { absolute: metaTitle('Furnished Monthly Rental Management in San Diego | Allura') },
  description: metaDescription('Furnished stays of 30+ nights in San Diego, Temecula and Palm Springs. ID and background checks, written stay agreements, monthly check-ins. Since 2013.'),
  keywords: [
    'furnished monthly rentals San Diego',
    'furnished rental management',
    '30 day rentals San Diego',
    'mid-term rental management',
    'furnished rentals Temecula',
    'furnished rentals Palm Springs',
  ],
  alternates: { canonical: 'https://www.allurahomes.com/property-management/furnished-monthly-rentals' },
  openGraph: {
    images: [SHARE_IMAGE],
    title: metaTitle('Furnished Monthly Rental Management in San Diego | Allura'),
    description: metaDescription('Furnished stays of 30+ nights in San Diego, Temecula and Palm Springs. ID and background checks, written stay agreements, monthly check-ins. Since 2013.'),
    url: 'https://www.allurahomes.com/property-management/furnished-monthly-rentals',
  },
  twitter: {
    title: metaTitle('Furnished Monthly Rental Management in San Diego | Allura'),
    description: metaDescription('Furnished stays of 30+ nights in San Diego, Temecula and Palm Springs. ID and background checks, written stay agreements, monthly check-ins. Since 2013.'),
  },
}

export default function FurnishedMonthlyRentalsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Furnished Monthly Rental Management',
            serviceType: 'Mid-term furnished rental management',
            provider: {
              '@type': 'Organization',
              name: 'Allura Homes',
              url: 'https://www.allurahomes.com',
              sameAs: [
                'https://www.linkedin.com/company/82304816',
                'https://www.instagram.com/allurahomes',
                'https://www.facebook.com/allurahomes.us',
                'https://x.com/AlluraHomes',
              ],
            },
            areaServed: [
              { '@type': 'City', name: 'San Diego' },
              { '@type': 'City', name: 'Temecula' },
              { '@type': 'City', name: 'Palm Springs' },
            ],
            description: metaDescription('Furnished stays of 30+ nights in San Diego, Temecula and Palm Springs. ID and background checks, written stay agreements, monthly check-ins. Since 2013.'),
            url: 'https://www.allurahomes.com/property-management/furnished-monthly-rentals',
            telephone: '+1-858-244-9400',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.allurahomes.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Property Management',
                item: 'https://www.allurahomes.com/property-management',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Furnished Monthly Rentals',
                item: 'https://www.allurahomes.com/property-management/furnished-monthly-rentals',
              },
            ],
          }),
        }}
      />
      <FurnishedMonthlyContent />
    </>
  )
}
