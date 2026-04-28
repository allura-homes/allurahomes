'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { PropertyCard } from '@/components/sections/property-card'
import { FEATURED_PROPERTIES } from '@/lib/constants'

export function FeaturedProperties() {
  return (
    <section className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            accent="Our Portfolio"
            title="Featured Properties"
            subtitle="A selection of our curated luxury vacation rentals across Southern California."
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROPERTIES.map((property, i) => (
            <AnimateOnScroll key={property.title} delay={i * 0.1}>
              <PropertyCard {...property} priority={i === 0} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/stays"
              className="group inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-navy-deep transition-colors hover:text-gold-dark"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              View All Properties
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
