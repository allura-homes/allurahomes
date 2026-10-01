'use client'

import Link from 'next/link'
import { Home, Plane, ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { BRAND } from '@/lib/constants'
import { FORM_URL, BOOK_CALL_URL, GUEST_BOOKING_HREF } from '@/lib/site-config'

export function AudienceSplit() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="mb-12 text-center">
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
            <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl lg:p-14">
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
                See what your home could earn with Allura. Start with a free income report, or talk it through on a call.
              </p>
              <Link
                href={FORM_URL}
                className="relative z-10 mt-6 inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-gold-dark transition-colors hover:text-gold"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Get Your Free Income Report
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={BOOK_CALL_URL}
                className="relative z-10 mt-2 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-gold-dark"
              >
                Book a Call
              </Link>
              {/* Subtle gold shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          </AnimateOnScroll>

          {/* Guest Card */}
          <AnimateOnScroll delay={0.2}>
            <a
              href={GUEST_BOOKING_HREF}
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
                Browse our boutique vacation rentals and book direct with Allura.
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
