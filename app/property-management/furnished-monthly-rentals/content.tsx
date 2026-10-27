'use client'

import Link from 'next/link'
import { CheckCircle2, ExternalLink } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { SectionHeading } from '@/components/section-heading'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { CTABand } from '@/components/sections/cta-band'
import { FREE_INCOME_REPORT_HREF, BOOK_A_CALL_HREF, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from '@/lib/site-config'

const faqItems = [
  {
    question: 'Does Allura Homes manage furnished rentals of 30+ nights in San Diego?',
    answer: 'Yes. Allura Homes manages furnished stays of 30+ nights in San Diego, Temecula, and Palm Springs, alongside vacation stays, and has managed furnished homes in California since 2013.'
  },
  {
    question: 'Where does Allura Homes list furnished monthly rentals?',
    answer: 'Depending on the home, Allura Homes lists across four groups: vacation rental and travel sites such as Airbnb, Vrbo, and Booking.com; its own direct booking, Allura Homes Reservations; extended-stay and furnished rental sites such as Furnished Finder and Travel Nurse Housing; and rental search sites such as Zillow, Apartments.com, and HotPads.'
  },
  {
    question: 'How does Allura Homes screen monthly guests?',
    answer: 'Every monthly guest goes through ID and background checks and signs a detailed written stay agreement. Every stay also includes mandatory damage waiver protection and monthly cleanings that double as in-stay check-ins.'
  },
  {
    question: 'Is damage protection included on monthly stays?',
    answer: 'Yes. Allura Homes requires damage waiver protection on every stay it manages. It is mandatory, not an optional add-on.'
  },
  {
    question: 'How does Allura Homes check on a home during a long stay?',
    answer: 'Every monthly stay includes a mandatory monthly cleaning. The cleaning keeps the home in good condition and gives the Allura team regular access during the stay.'
  },
  {
    question: 'Can my home do both vacation stays and monthly stays?',
    answer: 'Yes. Allura Homes can run a home on monthly stays of 30+ nights, vacation stays, or a mix of both, depending on the owner\'s goals, local rules, and HOA requirements.'
  },
  {
    question: 'Does my HOA allow 30-day rentals?',
    answer: 'It depends on your HOA\'s governing documents. Many HOAs that restrict short stays treat stays of 30+ nights differently. Allura Homes reviews HOA rules before listing a home for monthly stays.'
  },
  {
    question: 'Who typically books a furnished monthly stay in San Diego?',
    answer: 'Furnished monthly stays in San Diego often attract traveling professionals and medical staff, people relocating, families between homes, and guests placed by insurance during home repairs.'
  },
  {
    question: 'How many homes does Allura Homes manage?',
    answer: 'Allura Homes manages fewer than 20 homes, so each one gets hands-on attention. It is an Airbnb Superhost and Vrbo Premier Host, with a 4.9-star guest rating in 2025.'
  },
]

export function FurnishedMonthlyContent() {
  return (
    <main>
      {/* Hero */}
      <Hero
        video="/videos/hero-pm.mp4"
        image="/images/hero-pm.jpg"
        accent="Furnished Monthly Rentals"
        title="How We Find and Vet Monthly Guests for Your Furnished Home"
        subtitle="Furnished stays of 30+ nights across San Diego, Temecula and Palm Springs. Managed hands-on since 2013, with fewer than 20 homes in our care."
        primaryCta={{ label: 'Get Free Income Report', href: FREE_INCOME_REPORT_HREF }}
        secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
        fullHeight
      />

      {/* Built Around the Stay You Want */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <h2
              className="text-3xl font-bold text-navy-deep md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Built Around the Stay You Want
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Some owners want a steady run of monthly guests. Others want a mix of monthly stays and vacation stays through the year. We start with your goals, your home and your HOA rules, then set a strategy that fits. One month or several, the plan is yours.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Where Your Home Is Seen */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Where Your Home Is Seen"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Monthly guests search in more than one place, so your home should too. Depending on the property, we place it across four channel groups.
            </p>
          </AnimateOnScroll>

          <div className="mt-12 space-y-8">
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Vacation rental and travel sites
                </h3>
                <p className="mt-2 text-muted-foreground">Where travelers already plan and book their stays.</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  <li>• Airbnb</li>
                  <li>• Vrbo</li>
                  <li>• Booking.com</li>
                  <li>• Google Hotels</li>
                  <li>• Wander</li>
                  <li>• Whimstay</li>
                  <li>• Savvy</li>
                  <li>• Capital One Travel</li>
                  <li>• TravelStaytion</li>
                  <li>• Hopper</li>
                  <li>• and more…</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Allura Homes direct booking (no platform fees)
                </h3>
                <p className="mt-2 text-muted-foreground">Our own reservations, for repeat guests and referrals.</p>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li>• Allura Homes Reservations</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Extended-stay and furnished rentals
                </h3>
                <p className="mt-2 text-muted-foreground">Where professionals and placed guests look for longer stays.</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li>• Furnished Finder</li>
                  <li>• Travel Nurse Housing</li>
                  <li>• Blueground</li>
                  <li>• Government housing databases</li>
                  <li>• Corporate travel sites</li>
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.4}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  Rental search sites
                </h3>
                <p className="mt-2 text-muted-foreground">Where renters search when they need a home for months, not nights.</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li>• Apartments.com</li>
                  <li>• Apartment Finder</li>
                  <li>• HotPads</li>
                  <li>• Trulia</li>
                  <li>• Zillow</li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Who Books a Monthly Stay */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Who Books a Monthly Stay"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Furnished monthly stays tend to draw guests with a clear reason to be in town:
            </p>
          </AnimateOnScroll>
          <div className="mt-8 space-y-3">
            {[
              'Traveling professionals and medical staff on assignment',
              'People relocating while they find a permanent home',
              'Families between homes during a move or remodel',
              'Guests placed by insurance after a home repair or loss',
            ].map((item, i) => (
              <AnimateOnScroll key={i} delay={0.1 * (i + 2)}>
                <div className="flex gap-3 rounded-xl border border-border bg-off-white p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2} />
                  <p className="leading-relaxed text-muted-foreground">{item}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={0.6}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Every guest, for any reason, goes through the same vetting.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* How We Vet Every Monthly Guest */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="How We Vet Every Monthly Guest"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Proof over promises. Four standards apply to every stay, with no exceptions.
            </p>
          </AnimateOnScroll>

          <div className="mt-12 space-y-6">
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  1. ID and background checks
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  We ID-verify every guest with a matching selfie and background check before their stay.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  2. Detailed written stay agreements
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Each stay is covered by a written agreement that sets out the dates, house rules, and expectations in plain terms, so everyone knows the standard from day one.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  3. Mandatory damage waiver protection
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Every stay includes damage waiver protection. It is required, not optional.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.4}>
              <div className="rounded-xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>
                  4. Monthly cleanings that double as check-ins
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Every multi-month stay includes a mandatory monthly cleaning. It keeps the home fresh and gives our team a regular look inside during the stay.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Licensing, Tax and Compliance */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Licensing, Tax and Compliance, Handled"
          />
          <AnimateOnScroll delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Longer stays come with their own rules. We handle licensing, tax, and compliance for the homes we manage, and we check HOA rules on stays of 30+ nights before we list your home.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Track Record */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            title="A Track Record You Can Check"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimateOnScroll delay={0.1}>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <p className="text-3xl font-bold text-gold">4.9-star</p>
                <p className="mt-2 text-sm text-muted-foreground">guest rating in 2025</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <p className="text-3xl font-bold text-gold">Superhost</p>
                <p className="mt-2 text-sm text-muted-foreground">Airbnb Certified</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <p className="text-3xl font-bold text-gold">Premier</p>
                <p className="mt-2 text-sm text-muted-foreground">Vrbo Host</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.4}>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <p className="text-3xl font-bold text-gold">&lt; 20</p>
                <p className="mt-2 text-sm text-muted-foreground">fewer than 20 homes</p>
                <p className="mt-1 text-xs text-muted-foreground">so each one gets hands-on attention</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.5}>
              <div className="rounded-xl border border-border bg-background p-6 text-center">
                <p className="text-3xl font-bold text-gold">Since 2013</p>
                <p className="mt-2 text-sm text-muted-foreground">managing furnished homes in California</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* What Happens After You Reach Out */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <h2
              className="text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What Happens After You Reach Out
            </h2>
          </AnimateOnScroll>

          <ul className="mt-10 flex flex-col gap-4">
            <AnimateOnScroll delay={0.1}>
              <li className="flex gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-deep">
                  1
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary-foreground">Free income report.</h3>
                  <p className="mt-2 leading-relaxed text-primary-foreground/80">
                    Tell us about your home, and we'll send a free estimate of what it could earn from monthly stays, vacation stays, or a mix.
                  </p>
                </div>
              </li>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <li className="flex gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-deep">
                  2
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary-foreground">A short call.</h3>
                  <p className="mt-2 leading-relaxed text-primary-foreground/80">
                    We talk through your goals, your HOA, and the right stay length.
                  </p>
                </div>
              </li>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <li className="flex gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-deep">
                  3
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary-foreground">A plan for your home.</h3>
                  <p className="mt-2 leading-relaxed text-primary-foreground/80">
                    We put together the listing strategy, guest standards, and compliance steps for your home.
                  </p>
                </div>
              </li>
            </AnimateOnScroll>
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <AnimateOnScroll delay={0.4}>
              <a
                href={FREE_INCOME_REPORT_HREF}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-semibold text-navy-deep transition-all hover:bg-gold/90"
              >
                Get Free Income Report
              </a>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.45}>
              <a
                href={BOOK_A_CALL_HREF}
                className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-4 font-semibold text-gold transition-all hover:bg-gold/10"
              >
                Book a Call
              </a>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.5}>
              <a
                href={`tel:${PRIMARY_PHONE_E164}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-foreground/30 px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
            </AnimateOnScroll>
          </div>
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

      {/* CTA Band */}
      <CTABand
        headline="Ready to Start Hosting Monthly Guests?"
        subtitle="Get your free income report and see what your San Diego home could earn from furnished monthly stays."
        primaryCta={{ label: 'Get Free Income Report', href: FREE_INCOME_REPORT_HREF }}
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
