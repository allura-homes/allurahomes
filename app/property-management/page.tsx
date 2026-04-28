import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel'
import { CTABand } from '@/components/sections/cta-band'
import { ProblemSection } from './problem-section'
import { AlluraDifference } from './allura-difference'

export const metadata: Metadata = {
  title: 'Full-Service Vacation Rental Property Management in California',
  description:
    'Professional Airbnb & VRBO property management in San Diego, Temecula, Los Angeles & across California. Superhost-certified, full-service management that maximizes your short-term rental income. Dynamic pricing, 24/7 guest support, and transparent reporting.',
  alternates: { canonical: 'https://allurahomes.com/property-management' },
  keywords: ['property management San Diego', 'Airbnb management Temecula', 'vacation rental manager California', 'VRBO property management', 'short-term rental management'],
  openGraph: {
    title: 'Full-Service Vacation Rental Property Management | Allura Homes',
    description: 'Professional Airbnb & VRBO management in California. Superhost-certified with dynamic pricing and 24/7 guest support.',
    url: 'https://allurahomes.com/property-management',
  },
}

export default function PropertyManagementPage() {
  return (
    <>
      <Hero
        video="/videos/hero-pm.mp4"
        image="/images/hero-pm.jpg"
        accent="Full-Service Property Management"
        title="Your Property Deserves a Manager Who Actually Manages"
        subtitle="Most property managers promise full-service. We actually deliver it. From revenue optimization to midnight guest calls -- Allura handles everything."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'How It Works', href: '/how-it-works' }}
      />

      <StatsBar />

      <ProblemSection />

      <AlluraDifference />

      <FeatureGrid />

      <TestimonialCarousel />

      <CTABand
        headline={"Let's See If We're a Fit"}
        subtitle="No contracts to sign, no commitment required. Book a call with our team to discuss your property."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Browse Homes', href: BRAND.bookingUrl }}
        variant="gold"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Allura Homes Property Management',
            description:
              'Full-service luxury vacation rental management in San Diego and Temecula, CA.',
            provider: {
              '@type': 'Organization',
              name: 'Allura Homes',
            },
            areaServed: [
              { '@type': 'City', name: 'San Diego' },
              { '@type': 'City', name: 'Temecula' },
            ],
          }),
        }}
      />
    </>
  )
}
