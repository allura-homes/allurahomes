import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { AudienceSplit } from '@/components/sections/audience-split'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel'
import { Stepper } from '@/components/sections/stepper'
import { FeaturedProperties } from '@/components/sections/featured-properties'
import { CTABand } from '@/components/sections/cta-band'

export const metadata: Metadata = {
  title: 'Allura Homes | Distinguished by Design - Luxury Vacation Rental Management in California',
  description:
    'California\'s premier white-glove, boutique vacation rental management. Superhost-certified, full-service Airbnb & VRBO property management in San Diego, Temecula, Los Angeles & beyond. 13+ years maximizing rental income.',
  alternates: { canonical: 'https://allurahomes.com' },
  openGraph: {
    title: 'Allura Homes | Distinguished by Design - Luxury Vacation Rental Management',
    description:
      'California\'s premier white-glove, boutique vacation rental management with 13+ years of Superhost-certified experience.',
    url: 'https://allurahomes.com',
  },
  twitter: {
    title: 'Allura Homes | Distinguished by Design',
    description: 'California\'s premier white-glove vacation rental management. Superhost-certified with 13+ years of experience.',
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        video="/videos/hero-home.mp4"
        image="/images/hero-home.jpg"
        accent="Distinguished by Design"
        title="Experience Worry-Free 5-Star Rental Management"
        subtitle="Choose California's premier white-glove, boutique property management partner. The Allura partnership experience is built for owners who care about revenue, protection, and peace of mind."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Browse Homes', href: BRAND.bookingUrl }}
        fullHeight
      />

      {/* 2. Trust / Stats Bar */}
      <StatsBar />

      {/* 3. Audience Split */}
      <AudienceSplit />

      {/* 4. Why Owners Choose Us (Feature Grid) */}
      <FeatureGrid />

      {/* 5. Social Proof (Testimonials) */}
      <TestimonialCarousel />

      {/* 6. How It Works (Stepper) */}
      <Stepper />

      {/* 7. Featured Properties */}
      <FeaturedProperties />

      {/* 8. Final CTA Band */}
      <CTABand
        headline="Ready to See What Your Property Could Earn?"
        subtitle="Get a free, no-obligation consultation to discuss your property. No contracts, no pressure -- just a conversation."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Browse Homes', href: BRAND.bookingUrl }}
        variant="gold"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Allura Homes',
              url: 'https://allurahomes.com',
              logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
              description:
                'California\'s premier white-glove, boutique vacation rental management company with 13+ years of Superhost-certified hospitality excellence.',
              telephone: '+1-858-244-9400',
              email: 'support@allurahomes.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Diego',
                addressRegion: 'CA',
                addressCountry: 'US',
              },
              areaServed: [
                { '@type': 'State', name: 'California' },
                { '@type': 'City', name: 'San Diego' },
                { '@type': 'City', name: 'Temecula' },
                { '@type': 'City', name: 'Los Angeles' },
                { '@type': 'City', name: 'Palm Springs' },
                { '@type': 'City', name: 'Napa' },
                { '@type': 'City', name: 'San Francisco' },
              ],
              sameAs: [
                'https://www.instagram.com/allurahomes',
                'https://www.facebook.com/allurahomes.us',
                'https://x.com/AlluraHomes',
                'https://www.linkedin.com/company/allurahomes/',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                bestRating: '5',
                ratingCount: '150',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Allura Homes',
              url: 'https://allurahomes.com',
              description: 'California\'s premier white-glove vacation rental management company.',
              publisher: {
                '@type': 'Organization',
                name: 'Allura Homes',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Allura Homes',
              image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
              telephone: '+1-858-244-9400',
              email: 'support@allurahomes.com',
              url: 'https://allurahomes.com',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Diego',
                addressRegion: 'CA',
                addressCountry: 'US',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
              },
            },
          ]),
        }}
      />
    </>
  )
}
