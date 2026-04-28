'use client'

import Image from 'next/image'
import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { StatsBar } from '@/components/sections/stats-bar'
import { CTABand } from '@/components/sections/cta-band'
import { Heart, TrendingUp, Shield, Wrench } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Boutique by Design',
    description:
      'We intentionally keep our portfolio small. Every property receives executive-level attention from a senior team that knows your home inside and out.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue-Obsessed',
    description:
      'We treat your property as an investment. Dynamic pricing, market analysis, and demand forecasting drive every decision we make.',
  },
  {
    icon: Shield,
    title: 'Compliance-Savvy',
    description:
      'STR regulations are complex and always evolving. We stay ahead of every change so your investment stays protected and legal.',
  },
  {
    icon: Wrench,
    title: 'Operationally Deep',
    description:
      'From professional photography to preventative maintenance, guest experience to deep cleaning -- we manage the full operation with precision.',
  },
]

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimateOnScroll>
              <span className="mb-3 block font-serif text-sm tracking-wide text-gold-light">
                Our Story
              </span>
              <h1
                className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Distinguished by Design
              </h1>
              <div className="mt-4 h-0.5 w-16 bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">
                Founded in 2013, Allura Homes was born from a simple belief: vacation rental
                management should feel personal, not transactional. What started as a single property
                in San Diego has grown into a curated portfolio of luxury homes across Southern California.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/70">
                We built Allura to be the management company we wished existed when we were property
                owners ourselves -- one that treats every home as if it were our own.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero-about.jpg"
                  alt="San Diego coastal luxury homes"
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                  style={{ height: 'auto' }}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimateOnScroll>
            <span className="mb-4 block font-serif text-sm tracking-wide text-gold-dark">
              Our Mission
            </span>
            <blockquote className="text-2xl leading-relaxed text-navy-deep md:text-3xl">
              &ldquo;To set the standard for what boutique vacation rental management looks like --
              where every homeowner feels valued, every guest feels welcomed, and every property
              performs at its peak.&rdquo;
            </blockquote>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-gold" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll>
            <SectionHeading
              accent="What We Stand For"
              title="Our Core Values"
              subtitle="These principles guide every decision we make, from the properties we take on to the guests we serve."
            />
          </AnimateOnScroll>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <AnimateOnScroll key={value.title} delay={i * 0.1}>
                  <div className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-navy-deep/5">
                      <Icon className="size-7 text-gold-dark" strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-headline text-base font-semibold uppercase tracking-wider text-navy-deep"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <AnimateOnScroll>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[390px] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/mike-corrales.jpeg"
                    alt="Mike Corrales, Founder of Allura Homes"
                    width={390}
                    height={520}
                    sizes="(max-width: 1024px) 390px, 390px"
                    className="w-full object-cover object-top"
                    style={{ height: 'auto' }}
                    priority
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <span className="mb-2 block font-serif text-sm tracking-wide text-gold-dark">
                Meet the Founder
              </span>
              <h2
                className="text-3xl font-bold text-navy-deep"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Mike Corrales
              </h2>
              <div className="mt-3 h-0.5 w-12 bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                With over 13 years in the vacation rental industry, Mike founded Allura Homes
                on the principle that property management should be personal, transparent, and
                relentlessly focused on results.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Having managed dozens of properties across California,
                Mike brings operational depth, market fluency, and a genuine passion for hospitality
                to every homeowner relationship. His hands-on approach and commitment to excellence
                is what sets Allura apart.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When he is not optimizing listings or resolving guest requests, you will find Mike
                exploring Southern California&apos;s food scene, hiking local trails, or
                researching the next innovation in hospitality technology.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to Experience the Allura Difference?"
        subtitle="Join our portfolio of luxury properties and see what true boutique management feels like."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
        variant="navy"
      />
    </>
  )
}
