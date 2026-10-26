'use client'

import Link from 'next/link'
import { Sun, Briefcase, Home, Calendar, Phone, ExternalLink, CheckCircle2 } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { SectionHeading } from '@/components/section-heading'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { CTABand } from '@/components/sections/cta-band'
import { BRAND } from '@/lib/constants'
import type { MetroArea } from '@/lib/metro-areas'
import { PRIMARY_PHONE_DISPLAY, FREE_INCOME_REPORT_HREF, BOOK_A_CALL_HREF, GUEST_BOOKING_HREF } from '@/lib/site-config'

const faqItems = [
  {
    question: 'What does Allura charge for Carlsbad vacation rental management?',
    answer: '20% of accommodation fare for short-term stays, from 15% for furnished stays of 30+ nights. Supplies are billed at cost with receipts. We evaluate every home individually.'
  },
  {
    question: 'How long does it take to launch my Carlsbad rental?',
    answer: 'Weeks, not months. After onboarding, we handle furnishing, photography, permitting, and listing setup. Your timeline depends on permit processing and your home\'s readiness.'
  },
  {
    question: 'What if I want to leave Allura?',
    answer: 'Mutual 30-day out clause. Either party can end the agreement with 30 days' notice. No penalties.'
  },
  {
    question: 'Does Allura manage properties in Carlsbad's coastal zone?',
    answer: 'Yes, where permits allow. Coastal zone properties may have additional requirements. We recommend contacting the City of Carlsbad to confirm your property's permit eligibility before onboarding.'
  },
  {
    question: 'When do I receive my owner statements?',
    answer: 'Monthly statements are guaranteed by the 10th of the following month. Clear revenue breakdowns, expense receipts, and proactive quarterly reviews.'
  },
  {
    question: 'Can you manage my Carlsbad ADU?',
    answer: 'Yes. ADUs can be rented as furnished 30+ night homes. Short-term rentals (under 30 days) are not allowed for ADUs under California law.'
  },
]

const iconMap: Record<string, React.ElementType> = {
  Sun, Briefcase, Home, Calendar,
}

export function CarlsbadContent({ metro }: { metro: MetroArea }) {
  return (
    <main>
      {/* Hero */}
      <Hero
        video="/videos/hero-pm.mp4"
        image="/images/hero-pm.jpg"
        accent={metro.heroAccent}
        title={metro.heroTitle}
        subtitle={metro.heroSubtitle}
        primaryCta={{ label: 'Get Free Earnings Report', href: FREE_INCOME_REPORT_HREF }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
        fullHeight
      />

      {/* Answer-First Block */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <h2
              className="text-3xl font-bold text-navy-deep md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {metro.intro.heading}
            </h2>
          </AnimateOnScroll>
          <div className="mt-8 flex flex-col gap-6">
            {metro.intro.paragraphs.map((p, i) => (
              <AnimateOnScroll key={i} delay={0.1 * (i + 1)}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Allura Different */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            accent="Why Allura"
            title="What Makes Us Different"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {metro.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || Home
              return (
                <AnimateOnScroll key={h.title} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-2xl border border-border bg-background p-8 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <Icon className="size-7 text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold uppercase tracking-wide text-navy-deep"
                        style={{ fontFamily: 'var(--font-headline)' }}
                      >
                        {h.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {h.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="What's Included in Our Management"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { title: 'Compliance and permitting', body: 'City rules, HOA and condo bylaws, rental agreement requirements' },
              { title: 'Furnishing, design and staging', body: 'Durable, considered interiors built for real stays' },
              { title: 'Photography and listings', body: 'Professional HDR photography and listing copywriting' },
              { title: 'Marketing and distribution', body: 'Dynamic pricing set daily, across nightly platforms, direct booking, and corporate partners' },
              { title: 'Screening', body: 'Vetting 30+ night residents and guests' },
              { title: '24/7 local contact', body: 'Available for guest questions, move-ins, and emergencies' },
              { title: 'Operations and maintenance', body: 'Turnover cleaning coordination, repairs and preventative upkeep' },
              { title: 'Safety and move-in', body: 'Smoke and CO alarms, extinguishers, posted exits, move-in inventory reports for 30+ night stays' },
              { title: 'Owner reporting', body: 'Detailed monthly statements by the 10th, clear revenue breakdowns, proactive quarterly reviews' },
            ].map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="flex gap-4 rounded-xl border border-border bg-off-white p-6">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2} />
                  <div>
                    <h3 className="font-semibold text-navy-deep">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Fees and Pricing"
          />
          <div className="mt-12 space-y-6">
            <AnimateOnScroll>
              <div className="rounded-2xl border border-border bg-background p-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-navy-deep">Short-term stays:</p>
                    <p className="mt-1 text-muted-foreground">20% of the accommodation fare.</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-navy-deep">Furnished stays of 30+ nights:</p>
                    <p className="mt-1 text-muted-foreground">from 15%.</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-navy-deep">Supplies:</p>
                    <p className="mt-1 text-muted-foreground">at cost, with receipts.</p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-navy-deep">We evaluate every home individually.</p>
                    <p className="mt-2 text-muted-foreground">Tell us about your Carlsbad property and we'll show you what it can earn.</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-xl bg-navy-deep/5 p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Zero markup on cleaning, maintenance and supplies. Cleaning fees are guest-paid and passed to cleaners at the same amount. Supplies and repairs are billed at cost with receipts. Local taxes are remitted at face value.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Key Details */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="How We Work"
          />
          <div className="mt-12 space-y-8">
            <AnimateOnScroll>
              <div className="rounded-xl border border-border bg-off-white p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Launch Timeline
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Weeks, not months. After onboarding, we handle furnishing, photography, permitting, and listing setup.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-xl border border-border bg-off-white p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Owner Statements
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Statements guaranteed by the 10th of the following month. Clear revenue breakdowns, expense receipts, and proactive quarterly reviews.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="rounded-xl border border-border bg-off-white p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Exit Terms
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Mutual 30-day out clause. Either party can end the agreement with 30 days' notice. No penalties.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="rounded-xl border border-border bg-off-white p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Track Record
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <div>
                    <p className="text-2xl font-bold text-gold">Since 2013</p>
                    <p className="mt-1 text-sm text-muted-foreground">Founded</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold">&lt; 20</p>
                    <p className="mt-1 text-sm text-muted-foreground">Homes managed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold">4.9 stars</p>
                    <p className="mt-1 text-sm text-muted-foreground">In 2025</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gold">&lt; 5 min</p>
                    <p className="mt-1 text-sm text-muted-foreground">Avg response</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-navy-deep">Airbnb Superhost</span>
                  <span className="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-navy-deep">Vrbo Premier Host</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Carlsbad Regulations */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <h2
              className="text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {metro.regulations.heading}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/70">
              Staying compliant is critical. Allura monitors regulatory changes and serves as your local contact.
            </p>
          </AnimateOnScroll>
          <ul className="mt-10 flex flex-col gap-4">
            {metro.regulations.items.map((item, i) => (
              <AnimateOnScroll key={i} delay={0.1 * (i + 1)}>
                <li className="flex gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-primary-foreground/80">{item}</p>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
          <AnimateOnScroll delay={0.5}>
            <div className="mt-8 rounded-xl bg-primary-foreground/5 p-6">
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                This is general information, not legal advice. Contact the City of Carlsbad Planning Department to confirm your property's permit eligibility and any coastal zone requirements.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Frequently Asked Questions"
          />
          <div className="mt-12 space-y-6">
            {faqItems.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-border bg-background p-8">
                  <h3 className="text-lg font-semibold text-navy-deep">{faq.question}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Booking & Contact */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimateOnScroll>
            <h2
              className="text-3xl font-bold text-navy-deep md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book Direct or Get Your Earnings Report
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Guest bookings are available at <a href={GUEST_BOOKING_HREF} target="_blank" rel="noopener noreferrer" className="font-medium text-gold hover:underline">book.allurahomes.com</a>
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Owners: get your free earnings report in 24 hours, or call us at{' '}
              <a href={`tel:${PRIMARY_PHONE_DISPLAY}`} className="font-medium text-gold hover:underline">
                {PRIMARY_PHONE_DISPLAY}
              </a>
            </p>
          </AnimateOnScroll>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <AnimateOnScroll delay={0.3}>
              <a
                href={FREE_INCOME_REPORT_HREF}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-semibold text-navy-deep transition-all hover:bg-gold/90"
              >
                Get Free Earnings Report
              </a>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.35}>
              <a
                href={BOOK_A_CALL_HREF}
                className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-4 font-semibold text-gold transition-all hover:bg-gold/10"
              >
                Book a Call
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-off-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
              Related Resources
            </h3>
          </AnimateOnScroll>
          <div className="mt-6 flex flex-col gap-3">
            <AnimateOnScroll delay={0.1}>
              <Link
                href="/san-diego-vacation-rental-management"
                className="group flex items-center gap-2 text-gold hover:underline"
              >
                <ExternalLink className="size-4" />
                <span>San Diego Vacation Rental Management</span>
              </Link>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.15}>
              <Link
                href="/property-management/switch-property-managers-san-diego"
                className="group flex items-center gap-2 text-gold hover:underline"
              >
                <ExternalLink className="size-4" />
                <span>Switch Property Managers San Diego</span>
              </Link>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll delay={0.2}>
            <p className="mt-8 text-sm text-muted-foreground">
              Updated October 2026
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand
        headline="Ready to Maximize Your Carlsbad Rental Income?"
        subtitle="Join property owners across North County who trust Allura Homes for boutique vacation rental management."
        primaryCta={{ label: 'Get Free Earnings Report', href: FREE_INCOME_REPORT_HREF }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  )
}
