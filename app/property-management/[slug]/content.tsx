'use client'

import Link from 'next/link'
import {
  Sun, Wine, Briefcase, Calendar, Music, Thermometer, Heart, Home,
  Users, Film, DollarSign, Layers, Laptop, Globe, MapPin, ExternalLink,
  ShieldCheck, ArrowRight,
} from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { SectionHeading } from '@/components/section-heading'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { CTABand } from '@/components/sections/cta-band'
import { BRAND } from '@/lib/constants'
import type { MetroArea } from '@/lib/metro-areas'
import { getMetroCityBookingUrl } from '@/lib/metro-areas'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Sun, Wine, Briefcase, Calendar, Music, Thermometer, Heart, Home,
  Users, Film, DollarSign, Layers, Laptop, Globe,
}

export function MetroAreaContent({ metro }: { metro: MetroArea }) {
  return (
    <main>
      {/* Hero */}
      <Hero
        video={metro.heroVideo ?? '/videos/hero-pm.mp4'}
        image="/images/hero-pm.jpg"
        accent={metro.heroAccent}
        title={metro.heroTitle}
        subtitle={metro.heroSubtitle}
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Free Income Report', href: '/free-income-report' }}
        fullHeight
      />

      {/* Intro Section */}
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

      {/* Market Highlights Grid */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            accent={`Why ${metro.name}`}
            title="Market Highlights"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {metro.highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || Globe
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

      {/* Cities We Serve */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            accent={metro.region}
            title={`Cities We Serve in ${metro.name}`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {metro.cities.map((city, i) => (
              <AnimateOnScroll key={city.name} delay={i * 0.05}>
                {city.bookable ? (
                  <a
                    href={getMetroCityBookingUrl(city.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all hover:border-gold hover:shadow-md"
                  >
                    <MapPin className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
                    <span className="font-medium text-navy-deep">{city.name}</span>
                    <ExternalLink className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-5">
                    <MapPin className="size-5 shrink-0 text-muted-foreground/50" strokeWidth={1.5} />
                    <span className="font-medium text-navy-deep/70">{city.name}</span>
                  </div>
                )}
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={0.3}>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Cities with active listings link directly to our booking site. Contact us about managing your property in any of these areas.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Regulations */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="size-8 text-gold" strokeWidth={1.5} />
              <h2
                className="text-3xl font-bold text-primary-foreground md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {metro.regulations.heading}
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="mt-4 text-center text-lg leading-relaxed text-primary-foreground/70">
              Staying compliant is critical. Allura monitors regulatory changes and handles all permitting on your behalf.
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
        </div>
      </section>

      {/* Explore Other Markets */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            accent="Allura Markets"
            title="Explore Our Other Markets"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'San Diego & Temecula', slug: 'san-diego-temecula', tagline: 'Coastal bluffs to wine country' },
              { name: 'Coachella Valley', slug: 'coachella-valley', tagline: 'Palm Springs & desert luxury' },
              { name: 'Los Angeles', slug: 'los-angeles', tagline: 'Hollywood Hills & beyond' },
              { name: 'SF/Oakland Bay Area', slug: 'sf-bay-area', tagline: 'Bay Area & wine country' },
            ]
              .filter((m) => m.slug !== metro.slug)
              .map((m, i) => (
                <AnimateOnScroll key={m.slug} delay={i * 0.1}>
                  <Link
                    href={`/property-management/${m.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-background p-8 transition-all hover:border-gold hover:shadow-lg"
                  >
                    <div>
                      <h3
                        className="text-xl font-semibold uppercase tracking-wide text-navy-deep"
                        style={{ fontFamily: 'var(--font-headline)' }}
                      >
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                    </div>
                    <ArrowRight className="size-5 text-gold opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </AnimateOnScroll>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline={`Ready to Maximize Your ${metro.name} Rental Income?`}
        subtitle={`Join property owners across ${metro.name} who trust Allura Homes to deliver exceptional returns and peace of mind.`}
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Free Income Report', href: '/free-income-report' }}
      />
    </main>
  )
}
