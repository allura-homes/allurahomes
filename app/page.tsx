import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants'
import {
  FORM_URL,
  BOOK_CALL_URL,
  PHONE_TEL,
  MARKETS,
} from '@/lib/site-config'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { AudienceSplit } from '@/components/sections/audience-split'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel'
import { Stepper } from '@/components/sections/stepper'
import { FeaturedProperties } from '@/components/sections/featured-properties'
import { CTABand } from '@/components/sections/cta-band'

const HOME_TITLE = 'California Vacation Rental Management | Allura Homes'
const HOME_DESCRIPTION =
  'Boutique management since 2013. Less than 20 homes under management. Airbnb Superhost. Vrbo Premier Host. 4.9 star rating in 2025. Free income report.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.allurahomes.com'),
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: 'https://www.allurahomes.com' },
  openGraph: {
    type: 'website',
    url: 'https://www.allurahomes.com',
    siteName: 'Allura Homes',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern hillside home with a pool at sunset',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/images/og-image.jpg'],
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
        title="Boutique Management. Higher Standards. Better Returns."
        subtitle="Less than 20 homes managed like they are our own. Airbnb Superhost. Vrbo Premier Host. 4.9 star rating in 2025. Built for owners who want revenue, protection, and peace of mind."
        primaryCta={{ label: 'Get Your Free Income Report', href: FORM_URL }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_CALL_URL }}
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
        subtitle="Get a free, no-obligation consultation to discuss your property. No pressure. Just a conversation."
        primaryCta={{ label: 'Get Your Free Income Report', href: FORM_URL }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_CALL_URL }}
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
              '@id': 'https://www.allurahomes.com/#organization',
              name: 'Allura Homes',
              url: 'https://www.allurahomes.com',
              logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
              description:
                'Boutique vacation rental management in California since 2013. Less than 20 homes managed like they are our own. Airbnb Superhost. Vrbo Premier Host.',
              telephone: PHONE_TEL,
              email: 'support@allurahomes.com',
              areaServed: MARKETS.map((name) => ({ '@type': 'City', name })),
              sameAs: Object.values(BRAND.social),
              // NEEDS-REAL-DATA: aggregateRating requires a real, verifiable
              // ratingCount (e.g. from Airbnb/Google). Do not publish an
              // estimated count — Google can penalize unverifiable review
              // markup.
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.allurahomes.com/#website',
              name: 'Allura Homes',
              url: 'https://www.allurahomes.com',
              description: 'Boutique vacation rental management in California.',
              publisher: { '@id': 'https://www.allurahomes.com/#organization' },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.allurahomes.com/#organization',
              name: 'Allura Homes',
              image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
              telephone: PHONE_TEL,
              email: 'support@allurahomes.com',
              url: 'https://www.allurahomes.com',
              areaServed: MARKETS.map((name) => ({ '@type': 'City', name })),
              // TODO(Mike): confirm price range and hours
              priceRange: '$$',
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
