'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { CTABand } from '@/components/sections/cta-band'
import { StatsBar } from '@/components/sections/stats-bar'
import { ArrowRight, FileSearch, LineChart, KeyRound, Headphones } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: FileSearch,
    title: 'Free Property Assessment',
    description:
      'Tell us about your property and goals. We will conduct a thorough market analysis, review local comps, and assess your home\'s earning potential.',
    details: [
      'Complete our simple online form or book a call',
      'We research your neighborhood, competition, and demand',
      'You receive a custom income projection within 48 hours',
    ],
    image: '/images/step-assessment.jpg',
  },
  {
    step: 2,
    icon: LineChart,
    title: 'Custom Revenue Strategy',
    description:
      'Our team designs a tailored management plan covering pricing strategy, listing optimization, guest experience standards, and operational protocols.',
    details: [
      'Dynamic pricing strategy built for your market',
      'Professional photography and listing copywriting',
      'Compliance review and permit coordination',
    ],
    image: '/images/step-strategy.jpg',
  },
  {
    step: 3,
    icon: KeyRound,
    title: 'Seamless Onboarding',
    description:
      'We handle the entire transition. From listing migration to lock installation, interior prep to first booking -- your property is launch-ready in weeks, not months.',
    details: [
      'Listing transfer and optimization across all channels',
      'Smart lock and property tech installation',
      'Deep clean, staging, and professional photography',
    ],
    image: '/images/step-onboarding.jpg',
  },
  {
    step: 4,
    icon: Headphones,
    title: 'Ongoing Management',
    description:
      'Sit back and earn. We handle everything day-to-day -- guest communication, cleaning coordination, maintenance, pricing updates, and your monthly payouts.',
    details: [
      '24/7 guest support and issue resolution',
      'Monthly owner statements and performance reports',
      'Ongoing optimization and revenue maximization',
    ],
    image: '/images/step-management.jpg',
  },
]

export function HowItWorksContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateOnScroll>
              <span className="mb-3 block font-serif text-sm tracking-wide text-gold-light">
                Simple & Seamless
              </span>
              <h1
                className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                How It Works
              </h1>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">
                From first conversation to first booking, our process is designed
                to be effortless for you. Here is exactly what to expect.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Steps */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-24">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isEven = i % 2 === 1
              return (
                <AnimateOnScroll key={step.step}>
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${isEven ? 'lg:[direction:rtl]' : ''}`}
                  >
                    {/* Image */}
                    <div className={isEven ? 'lg:[direction:ltr]' : ''}>
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="aspect-[3/2] w-full object-cover"
                          style={{ height: 'auto' }}
                        />
                        {/* Step number overlay */}
                        <div className="absolute left-4 top-4 flex size-14 items-center justify-center rounded-full bg-navy-deep/90 backdrop-blur-sm">
                          <span
                            className="font-headline text-xl font-bold text-gold"
                            style={{ fontFamily: 'var(--font-headline)' }}
                          >
                            {step.step}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isEven ? 'lg:[direction:ltr]' : ''}>
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                          <Icon className="size-5 text-gold-dark" />
                        </div>
                        <span className="font-headline text-sm font-medium uppercase tracking-widest text-gold-dark" style={{ fontFamily: 'var(--font-headline)' }}>
                          Step {step.step}
                        </span>
                      </div>
                      <h2
                        className="mt-4 text-3xl font-bold text-navy-deep"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3 text-sm text-foreground">
                            <ArrowRight className="mt-0.5 size-4 shrink-0 text-gold" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to Get Started?"
        subtitle="It takes just a few minutes to begin. Schedule a call with our team to discuss your property."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Browse Homes', href: BRAND.bookingUrl }}
        variant="gold"
      />
    </>
  )
}
