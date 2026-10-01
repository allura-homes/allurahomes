'use client'

import { TrendingUp, Layers, Users, Shield, Globe, BarChart3, type LucideIcon } from 'lucide-react'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { SectionHeading } from '@/components/section-heading'
import { ContentSection, FeatureCard } from '@/components/sections/content-section'
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
    <ContentSection muted>
        <AnimateOnScroll>
          <SectionHeading
            accent="The Allura Advantage"
            title="Why Owners Choose Us"
            subtitle="A small team, under 20 homes, and a real-time owner portal. Every home gets the attention we give our own."
          />
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PILLARS.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || TrendingUp
            return (
              <AnimateOnScroll key={pillar.title} delay={i * 0.08}>
                <FeatureCard title={pillar.title} icon={<Icon className="size-7 text-gold-dark" strokeWidth={1.5} />}>{pillar.description}</FeatureCard>
              </AnimateOnScroll>
            )
          })}
        </div>
    </ContentSection>
  )
}
