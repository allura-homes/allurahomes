'use client'

import { TrendingUp, Layers, Users, Shield, Globe, BarChart3, type LucideIcon } from 'lucide-react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { SERVICE_PILLARS } from '@/lib/constants'

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Layers,
  Users,
  Shield,
  Globe,
  BarChart3,
}

export function FeatureGrid() {
  return (
    <section className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            accent="The Allura Advantage"
            title="Why Owners Choose Us"
            subtitle="We combine cutting-edge technology with hands-on hospitality. Every property in our portfolio receives the attention it deserves."
          />
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PILLARS.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || TrendingUp
            return (
              <AnimateOnScroll key={pillar.title} delay={i * 0.08}>
                <div className="group rounded-xl bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-navy-deep/5">
                    <Icon className="size-7 text-gold-dark" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="font-headline text-lg font-semibold uppercase tracking-wider text-navy-deep"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
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
