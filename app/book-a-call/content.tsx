'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'

export function BookACallContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28">
        <div className="container relative z-10">
          <AnimateOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span
                className="mb-6 inline-block font-serif text-xl tracking-wide text-gold-light md:text-2xl"
                style={{ fontFamily: 'var(--font-rock-salt)' }}
              >
                Let&apos;s Connect
              </span>
              <h1
                className="text-4xl font-bold md:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Book Your Free Consultation
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 md:text-xl">
                Schedule a 30-minute call with our team to discuss your property, goals, and how Allura Homes can help maximize your rental revenue.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-deep/20" />
      </section>

      {/* Calendar Section */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="container">
          <AnimateOnScroll>
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                title="Choose a Time That Works for You"
                subtitle="No pressure, no commitment — just a conversation about your property and goals."
                align="center"
              />

              {/* Google Calendar Embed */}
              <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UHCjr0C45fuRx1gQ8679mXWI6z38nE3k-ay2Bdb7JrIYqpay1ueFcbXQsT7AJH-ipl4T3bS5E?gv=true"
                  className="h-[1050px] w-full border-0"
                  title="Book a consultation with Allura Homes"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <AnimateOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                className="text-3xl font-bold text-navy-deep md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                What to Expect on the Call
              </h2>
              <div className="mt-12 grid gap-8 text-left md:grid-cols-3">
                <div>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-navy-deep/5">
                    <span className="font-headline text-xl font-bold text-gold">1</span>
                  </div>
                  <h3 className="mb-2 font-headline text-lg font-semibold uppercase tracking-wide text-navy-deep">
                    Discuss Your Property
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll learn about your home, location, and current rental situation.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-navy-deep/5">
                    <span className="font-headline text-xl font-bold text-gold">2</span>
                  </div>
                  <h3 className="mb-2 font-headline text-lg font-semibold uppercase tracking-wide text-navy-deep">
                    Explore Your Goals
                  </h3>
                  <p className="text-muted-foreground">
                    Revenue optimization? Hands-off management? We&apos;ll align on what matters to you.
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-navy-deep/5">
                    <span className="font-headline text-xl font-bold text-gold">3</span>
                  </div>
                  <h3 className="mb-2 font-headline text-lg font-semibold uppercase tracking-wide text-navy-deep">
                    See If We&apos;re a Fit
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll explain our approach and answer all your questions. No pressure, no obligation.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
