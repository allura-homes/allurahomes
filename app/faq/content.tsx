'use client'

import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { CTABand } from '@/components/sections/cta-band'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Commission and Costs',
    answer: (
      <>
        <p className="mb-4">
          Our commission structure is straightforward and transparent, designed to build trust. We
          charge <strong>20% of the accommodation fare</strong> the guest pays for their rental
          (a.k.a. rental fees).
        </p>
        <p className="mb-4">
          Other minimal costs may include home and cleaning supplies, a small property management
          platform fee, and approved maintenance needed to keep the home rentable.
        </p>
        <p>
          All supply purchases are not marked up, and receipt copies will be provided monthly with
          the owner&apos;s statements.
        </p>
      </>
    ),
  },
  {
    question: 'Marketing',
    answer: (
      <>
        <p className="mb-4">
          Our knowledge of booking channels and direct marketing opportunities means your property
          will be found in more places by more people searching.
        </p>
        <p className="mb-4">
          <strong>Brand and website development</strong> specific to your property to drive as many
          direct bookings as possible (without 3rd party commissions.)
        </p>
        <p className="mb-4">
          We distribute your property on dozens of <strong>Online Travel Agency websites</strong>{' '}
          (OTAs) like Airbnb, VRBO, Booking.com, Google Vacation Rentals, Hopper, Expedia, and
          more.
        </p>
        <p>
          With dozens of years of digital marketing experience, our in-house marketing team
          prioritizes world-class search engine optimization, copywriting, search engine marketing,
          and re-marketing.
        </p>
      </>
    ),
  },
  {
    question: 'Cleaning and Maintenance',
    answer: (
      <>
        <p className="mb-4">
          We manage housekeeping and maintenance scheduling, supply delivery, and supply
          replenishment scheduling. We employ A+ field crews to deliver the quality care your home
          deserves and the 5-star experience our guests expect.
        </p>
        <p className="mb-4">
          We ensure optimal care for your home by providing our team with the technology and tools
          to maximize performance and efficiency.
        </p>
        <p className="mb-4">
          We can and will schedule mid-stay deliveries to go above and beyond should any supplies
          run out during a guest&apos;s stay.
        </p>
        <p>
          Our unique relationships with local vendors provide unique guest experiences and options
          that improve the overall guest experience.
        </p>
      </>
    ),
  },
  {
    question: 'What Makes Us Different?',
    answer: (
      <>
        <p className="mb-4">
          <strong>We are hyper-local.</strong> We live in the neighborhoods where your guests stay,
          so our number one priority is your home and our neighborhood, and it&apos;s our greatest
          pleasure to show guests why they are so special to us.
        </p>
        <p>
          At the same time, we have partnered with a company, HostGenius, with an international
          footprint that rivals some of the biggest short-term rental management companies on earth
          to do US-based guest support 24/7 by Airbnb Superhost support agents, maximize booking
          revenue with full-time revenue management by former Airbnb Revenue Managers, and marketing
          your property to optimize for direct bookings but also get you front and center on the
          Online Travel Agent websites (OTAs) like Airbnb, VRBO, Booking.com, Google Vacation
          Rentals, Hopper, Expedia, and dozens of others where your potential guests are searching.
        </p>
      </>
    ),
  },
  {
    question: 'Technology',
    answer: (
      <>
        <p className="mb-4">
          We employ the most advanced Revenue Management software as part of our overall revenue
          management strategy. We have seen year-over-year revenue gains on properties under
          management as high as <strong>120%</strong> by using the technology to constantly improve
          our Revenue Per Available Room (RevPar), Average Daily Rates, and Occupancy Rates.
          Ultimately, resulting in significantly more revenue for our homeowner clients.
        </p>
        <p>
          From digital guidebooks to digital smart locks, internet-connected device management,
          decibel sound monitoring, and SMS/Email/App Push updates and check-ins for guests before
          during, and after their stay combine to protect your home and provide a memorable 5-star
          stay experience for your guests.
        </p>
      </>
    ),
  },
  {
    question: 'Safety & Compliance',
    answer: (
      <>
        <p className="mb-4">
          We ensure that your home is always managed in accordance with local, state, and federal
          laws. We will assist you in applying for permits, tax certificates, and even remitting
          short-term rental taxes.
        </p>
        <p className="mb-4">
          <strong>Safety and security hardening</strong> as a major part of our pre-rental setup
          process. Our biggest concern is making sure we have good guests, that they follow the
          rules, and that they behave properly during their stay. We also have fallbacks in place,
          in the form of damage protection insurance, so that if there is damage or bad behavior,
          you have recourse and mitigation to protect your investment and keep it pristine.
        </p>
        <p className="mb-4">
          If there is guest damage, we file all damage claims with the damage protection underwriter
          on your behalf. Often, we can repair or replace the damage before your claim is
          adjudicated and paid out.
        </p>
        <p>
          If you have home automation or smart appliances, like smart thermostats, pool automation
          equipment, smart TVs, Internet-connected stereos, etc. we also provide remote guest
          support. When problems arise, including connectivity issues, we are there to fix them.
        </p>
      </>
    ),
  },
  {
    question: 'Communication and Reporting',
    answer: (
      <>
        <p className="mb-4">
          We can answer your questions 24/7, but we&apos;ll connect with you at least monthly and
          have quarterly intensive reviews of performance.
        </p>
        <p className="mb-4">
          We provide you with your official owner statements and monthly payouts for the previous
          month by the <strong>10th of each month</strong>.
        </p>
        <p>
          However, we also provide you with a very detailed owner portal that represents the current
          state of your bookings, guest information, monthly trends, and financial status. Your
          owner portal is updated in real-time and is your private view into our management
          platform. It ensures full transparency.
        </p>
      </>
    ),
  },
  {
    question: 'Guest Damage',
    answer: (
      <>
        <p className="mb-4">
          Unfortunately, things do get broken from time to time. Even with the best guests,
          accidents can happen. When it does, our goal is to give you complete peace of mind that we
          have you covered. We require that all guests buy a damage protection insurance policy,
          covering them for the first <strong>$1,500</strong> of any damage caused during their
          stay.
        </p>
        <p className="mb-4">
          Certain booking platforms cover up to <strong>$3 million</strong> in damage protection. We
          will always work with the guest, and the insurance provider to sufficiently repair or
          replace any guest damage promptly.
        </p>
        <p>Most damage claims are adjudicated and paid in less than two weeks.</p>
      </>
    ),
  },
  {
    question: 'Revenue Management',
    answer: (
      <>
        <p>
          We use a combination of a <strong>full-time revenue manager</strong> (a human being) who
          sets the strategy for your property to earn to its highest potential with dynamic pricing
          software to look at supply and demand factors and price your property so you can
          outperform others in your market.
        </p>
      </>
    ),
  },
]

export function FAQContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-deep py-24 lg:py-32">
        <div className="container relative z-10">
          <AnimateOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="mb-4 font-serif text-base tracking-wide text-gold-light"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Questions & Answers
              </p>
              <h1
                className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                You&apos;ve Got Questions.
                <br />
                We&apos;ve Got Answers.
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Everything you need to know about our property management services, pricing,
                technology, and more.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Decorative gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/95 to-navy-deep" />
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <AnimateOnScroll>
              <SectionHeading
                accent="Everything You Need to Know"
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about our services, pricing, and processes. Can't find what you're looking for? Book a call with us."
                centered
              />
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="mt-12">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border/60">
                      <AccordionTrigger className="py-6 text-left font-headline text-lg font-semibold uppercase tracking-wider text-navy-deep hover:text-gold-dark hover:no-underline lg:text-xl">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pt-2 text-base leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTABand
        headline="Still Got Questions?"
        subtitle="Schedule a chat with us. We're here to help you understand how we can maximize your property's potential."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
        variant="gold"
      />
    </>
  )
}
