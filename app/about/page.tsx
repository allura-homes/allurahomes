import type { Metadata } from 'next'
import { AboutContent } from './content'
import { AIRBNB_PROFILE_HREF, PRIMARY_PHONE_E164 } from '@/lib/site-config'

const SITE = 'https://www.allurahomes.com'

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Allura Homes',
      legalName: 'Allura Homes LLC',
      alternateName: [
        'Allura Homes Vacation Rental Management',
        'Allura Homes San Diego',
      ],
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
      },
      foundingDate: '2013',
      founder: {
        '@id': `${SITE}/about#founder`,
      },
      telephone: PRIMARY_PHONE_E164,
      email: 'support@allurahomes.com',
      description: 'Boutique San Diego vacation rental (short-term) and monthly furnished (30+ night) rental management company, founded in 2013, managing less than 20 homes. Airbnb Superhost and Vrbo Premier Host. Not a home builder or renovation company.',
      areaServed: [
        { '@type': 'City', name: 'San Diego' },
        { '@type': 'City', name: 'Temecula' },
        { '@type': 'City', name: 'French Valley' },
        { '@type': 'City', name: 'Palm Springs' },
        { '@type': 'City', name: 'Los Angeles' },
        { '@type': 'City', name: 'Ojai' },
        { '@type': 'City', name: 'Napa' },
        { '@type': 'City', name: 'Oakland' },
      ],
      knowsAbout: [
        'Vacation rental management',
        'Short-term rental management',
        'Airbnb management',
        'Monthly furnished rentals',
        'Dynamic pricing',
        'San Diego STRO licensing',
      ],
      sameAs: [
        AIRBNB_PROFILE_HREF,
        'https://x.com/AlluraHomes',
        'https://www.instagram.com/allurahomes',
        'https://www.facebook.com/allurahomes.us',
        'https://www.linkedin.com/company/82304816',
      ],
    },
    {
      '@type': ['LocalBusiness', 'RealEstateAgent'],
      '@id': `${SITE}/#localbusiness`,
      name: 'Allura Homes',
      parentOrganization: {
        '@id': `${SITE}/#organization`,
      },
      url: SITE,
      telephone: PRIMARY_PHONE_E164,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Diego',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      areaServed: {
        '@type': 'City',
        name: 'San Diego',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE}/about#founder`,
      name: 'Mike Corrales',
      jobTitle: 'Founder',
      worksFor: {
        '@id': `${SITE}/#organization`,
      },
      sameAs: [
        'https://www.linkedin.com/in/mikecorrales',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Allura Homes',
      publisher: {
        '@id': `${SITE}/#organization`,
      },
    },
    {
      '@type': 'AboutPage',
      '@id': `${SITE}/about#webpage`,
      url: `${SITE}/about`,
      name: 'About Allura Homes',
      about: {
        '@id': `${SITE}/#organization`,
      },
      mainEntity: {
        '@id': `${SITE}/#organization`,
      },
      isPartOf: {
        '@id': `${SITE}/#website`,
      },
    },
  ],
}

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
  return (
    <>
      <AboutContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, '\\u003c') }}
      />
    </>
  )
}
