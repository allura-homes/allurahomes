'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { IncomeReportForm } from '@/components/forms/income-report-form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TrendingUp, BarChart3, Target, Shield, FileText, Clock } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Custom Income Projection',
    description:
      'A detailed revenue estimate based on your specific property, location, amenities, and seasonal demand patterns.',
  },
  {
    icon: BarChart3,
    title: 'Market Comparisons',
    description:
      'See how comparable properties in your area are performing -- occupancy rates, nightly rates, and annual revenue.',
  },
  {
    icon: Target,
    title: 'Recommended Strategy',
    description:
      'A tailored pricing and positioning strategy designed to maximize your property\'s earning potential.',
  },
]

const faqs = [
  {
    question: 'How long does it take to receive my income report?',
    answer:
      'Our team typically delivers your custom income report within 24-48 hours of receiving your information. For complex properties, it may take up to 72 hours to ensure accuracy.',
  },
  {
    question: 'Is there any cost or obligation?',
    answer:
      'No. The income report is completely free with no strings attached. We believe in earning your trust with data, not pressure. If you decide Allura is the right fit, great. If not, you keep the report.',
  },
  {
    question: 'What information is included in the report?',
    answer:
      'Your report includes a custom income projection, local market comparisons, seasonal demand analysis, a recommended pricing strategy, and an overview of how Allura\'s management approach would specifically benefit your property.',
  },
  {
    question: 'Do I need to sign a contract to get started?',
    answer:
      'Not at all. The income report is the first step. If you decide to move forward, we will walk you through our flexible management agreement -- but there is zero pressure or commitment required to receive your report.',
  },
]

export function IncomeReportContent() {
  return (
    <>
      {/* Hero-style top section */}
      <section className="bg-navy-deep pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateOnScroll>
              <span className="mb-3 block font-serif text-sm tracking-wide text-gold-light">
                Free & No Obligation
              </span>
              <h1
                className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Find Out What Your Property Could Earn
              </h1>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">
                Get a personalized income projection based on real market data, local comps,
                and our proven management approach. No commitment required.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: What you get */}
            <div>
              <AnimateOnScroll>
                <h2
                  className="text-2xl font-bold text-navy-deep md:text-3xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {"What You'll Receive"}
                </h2>
                <div className="mt-3 h-0.5 w-12 bg-gold" />
              </AnimateOnScroll>

              <div className="mt-8 flex flex-col gap-6">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon
                  return (
                    <AnimateOnScroll key={benefit.title} delay={i * 0.1}>
                      <div className="flex gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-navy-deep/5">
                          <Icon className="size-6 text-gold-dark" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3
                            className="font-headline text-base font-semibold uppercase tracking-wider text-navy-deep"
                            style={{ fontFamily: 'var(--font-headline)' }}
                          >
                            {benefit.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  )
                })}
              </div>

              {/* Trust elements */}
              <AnimateOnScroll delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="size-4 text-gold-dark" />
                    No commitment required
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4 text-gold-dark" />
                    Report in 24-48 hours
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4 text-gold-dark" />
                    100% confidential
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right: Form */}
            <AnimateOnScroll delay={0.2}>
              <IncomeReportForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <AnimateOnScroll>
            <div className="mb-10 text-center">
              <h2
                className="text-2xl font-bold text-navy-deep md:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Frequently Asked Questions
              </h2>
              <div className="mx-auto mt-3 h-0.5 w-12 bg-gold" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium text-navy-deep hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
