import type { Metadata } from 'next'
import { BRAND } from '@/lib/constants'
import {
  FREE_INCOME_REPORT_HREF,
  BOOK_A_CALL_HREF,
  GUEST_BOOKING_HREF,
  PRIMARY_PHONE_CONFIRMED,
  PRIMARY_PHONE_E164,
} from '@/lib/site-config'
import { Hero } from '@/components/sections/hero'
import { StatsBar } from '@/components/sections/stats-bar'
import { AudienceSplit } from '@/components/sections/audience-split'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel'
import { Stepper } from '@/components/sections/stepper'
import { FeaturedProperties } from '@/components/sections/featured-properties'
import { CTABand } from '@/components/sections/cta-band'

const HOME_TITLE = 'Vacation Rental Property Management in California | Allura Homes'
const HOME_DESCRIPTION =
  'Boutique vacation rental management since 2013. Under 20 homes, Airbnb Superhost, Vrbo Premier Host, rated above 4.9 stars in 2025. Get your free income report.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.allurahomes.com'),
  title: HOME_TITLE,
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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
        subtitle="Under 20 homes, each managed like our own. Airbnb Superhost. Vrbo Premier Host. Rated above 4.9 stars in 2025. Built for owners who want revenue, protection, and peace of mind."
        primaryCta={{ label: 'Get Your Free Income Report', href: FREE_INCOME_REPORT_HREF }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
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
        primaryCta={{ label: 'Get Your Free Income Report', href: FREE_INCOME_REPORT_HREF }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
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
              url: 'https://www.allurahomes.com',
              logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gold%20Bug%20-%20blue%20background-w5gGFhOU00lG43WErprop28jNDADyc.png',
              description:
                'Boutique vacation rental management in California since 2013. Under 20 homes managed like our own. Airbnb Superhost. Vrbo Premier Host.',
              ...(PRIMARY_PHONE_CONFIRMED ? { telephone: PRIMARY_PHONE_E164 } : {}),
              email: 'support@allurahomes.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Diego',
                addressRegion: 'CA',
                addressCountry: 'US',
              },
              // TODO(Mike): confirm served markets, price range and hours
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
              // NEEDS-REAL-DATA: aggregateRating requires a real, verifiable
              // ratingCount (e.g. from Airbnb/Google). Do not publish an
              // estimated count — Google can penalize unverifiable review
              // markup.
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Allura Homes',
              url: 'https://www.allurahomes.com',
              description: 'Boutique vacation rental management in California.',
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
              ...(PRIMARY_PHONE_CONFIRMED ? { telephone: PRIMARY_PHONE_E164 } : {}),
              email: 'support@allurahomes.com',
              url: 'https://www.allurahomes.com',
              // TODO(Mike): confirm served markets, price range and hours
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
