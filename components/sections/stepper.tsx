'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

export function Stepper() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            accent="Simple & Seamless"
            title="How It Works"
            subtitle="Getting started with Allura Homes is easy. Here is what to expect."
          />
        </AnimateOnScroll>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-12 hidden h-0.5 w-[calc(100%-160px)] -translate-x-1/2 bg-gold/20 lg:block" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="relative z-10 mb-6 flex size-24 items-center justify-center rounded-full border-2 border-gold bg-card">
                    <span
                      className="font-headline text-3xl font-bold text-gold-dark"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3
                    className="font-headline text-xl font-semibold uppercase tracking-wider text-navy-deep"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
