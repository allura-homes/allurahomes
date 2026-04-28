'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { TRUST_STATS } from '@/lib/constants'
import { Award, Star, BadgeCheck, Trophy } from 'lucide-react'

const icons = [Award, Star, BadgeCheck, Trophy]

export function StatsBar() {
  return (
    <section className="bg-navy-deep py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 md:justify-between md:gap-4">
        {TRUST_STATS.map((stat, i) => {
          const Icon = icons[i]
          return (
            <AnimateOnScroll key={stat.label} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-3 text-center md:text-left">
                <Icon className="size-8 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-headline text-2xl font-bold uppercase tracking-wider text-gold" style={{ fontFamily: 'var(--font-headline)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )
        })}
      </div>
    </section>
  )
}
