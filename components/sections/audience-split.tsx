'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Home, Plane, ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { BRAND } from '@/lib/constants'

export function AudienceSplit() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-3 block font-serif text-sm tracking-wide text-gold-dark">
              How Can We Help?
            </span>
            <h2
              className="text-3xl font-bold text-navy-deep md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Two Ways to Work With Us
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </AnimateOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Owner Card */}
          <AnimateOnScroll delay={0.1}>
            <Link
              href={BRAND.calendarUrl}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl lg:p-14"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-navy-deep/5">
                <Home className="size-9 text-gold-dark" strokeWidth={1.5} />
              </div>
              <h3
                className="font-headline text-2xl font-semibold uppercase tracking-wider text-navy-deep"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                I Own a Rental Property
              </h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Ready to maximize your property's potential? Schedule a consultation with our team to discuss your goals.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-gold-dark transition-colors group-hover:text-gold" style={{ fontFamily: 'var(--font-headline)' }}>
                Book a Call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Subtle gold shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </AnimateOnScroll>

          {/* Guest Card */}
          <AnimateOnScroll delay={0.2}>
            <a
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl lg:p-14"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-navy-deep/5">
                <Plane className="size-9 text-gold-dark" strokeWidth={1.5} />
              </div>
              <h3
                className="font-headline text-2xl font-semibold uppercase tracking-wider text-navy-deep"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {"I'm Looking for a Stay"}
              </h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Browse our curated collection of luxury vacation rentals across
                San Diego and Temecula Wine Country.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-gold-dark transition-colors group-hover:text-gold" style={{ fontFamily: 'var(--font-headline)' }}>
                Browse Homes
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
