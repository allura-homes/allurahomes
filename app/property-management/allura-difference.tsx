'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { Check } from 'lucide-react'

const differentiators = [
  {
    title: 'Boutique Portfolio, Senior Team',
    description:
      'We intentionally keep our portfolio small so every property receives executive-level attention. Your dedicated manager has 5+ years of experience.',
    points: [
      'Dedicated senior property manager',
      'Direct phone and text access',
      'Same-day response guarantee',
    ],
  },
  {
    title: 'Revenue-Obsessed Strategy',
    description:
      'We do not just list your property and hope for bookings. We actively manage pricing, demand signals, and channel distribution to maximize every night.',
    points: [
      'Dynamic pricing updated daily',
      'Multi-channel distribution optimization',
      'Seasonal strategy adjustments',
    ],
  },
  {
    title: 'Operationally Deep',
    description:
      'From professional photography to interior design consulting, deep cleaning protocols to preventative maintenance -- we manage the full operation.',
    points: [
      'Professional staging and photography',
      'Rigorous cleaning standards',
      'Preventative maintenance programs',
    ],
  },
  {
    title: 'Compliance & Risk Fluency',
    description:
      'We stay ahead of every regulatory change. STR permits, TOT registration, insurance requirements, HOA coordination -- all handled.',
    points: [
      'Permit and license management',
      'Tax collection and remittance',
      'Insurance verification and claims',
    ],
  },
]

export function AlluraDifference() {
  return (
    <section className="bg-navy-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            accent="A Different Approach"
            title="The Allura Difference"
            subtitle="We built Allura Homes to be the management company we wished existed when we were property owners ourselves."
            dark
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 0.1}>
              <div className="rounded-xl border border-primary-foreground/10 bg-navy/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/20">
                <h3
                  className="font-headline text-xl font-semibold uppercase tracking-wider text-gold"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-primary-foreground/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
