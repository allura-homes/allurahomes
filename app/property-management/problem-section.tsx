'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { AlertTriangle, PhoneOff, TrendingDown, ClipboardX, ShieldAlert, Users } from 'lucide-react'

const painPoints = [
  {
    icon: PhoneOff,
    title: 'Unreachable When It Matters',
    description:
      'Your current manager disappears when guests have issues, leaving you to handle complaints at 2 AM.',
  },
  {
    icon: TrendingDown,
    title: 'Revenue is Stagnant',
    description:
      'Static pricing, poor listing optimization, and no market analysis means you are leaving thousands on the table.',
  },
  {
    icon: ClipboardX,
    title: 'Inconsistent Quality',
    description:
      'Cleanings are hit or miss, maintenance gets deferred, and your reviews start slipping.',
  },
  {
    icon: ShieldAlert,
    title: 'Compliance Confusion',
    description:
      'STR permits, TOT taxes, HOA rules -- your manager does not track any of it, putting your investment at risk.',
  },
  {
    icon: Users,
    title: 'Just Another Number',
    description:
      'Big-box managers run 200+ properties. Your home gets a junior coordinator who is spread impossibly thin.',
  },
  {
    icon: AlertTriangle,
    title: 'Zero Transparency',
    description:
      'You do not know your occupancy rate, nightly rate trends, or where your money is going each month.',
  },
]

export function ProblemSection() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            accent="Sound Familiar?"
            title="The Property Management Problem"
            subtitle="Most vacation rental owners share the same frustrations. If any of these sound like your experience, it is time for a change."
          />
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <AnimateOnScroll key={point.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-cream p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-navy-deep/5">
                    <Icon className="size-6 text-navy-deep/60" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="font-headline text-base font-semibold uppercase tracking-wider text-navy-deep"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
