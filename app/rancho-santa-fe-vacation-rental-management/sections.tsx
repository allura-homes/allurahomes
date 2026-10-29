import { Hero } from '@/components/sections/hero'
import { SectionHeading } from '@/components/section-heading'
import { SiteButton } from '@/components/site-button'
import { ContentSection, FeatureCard } from '@/components/sections/content-section'
import { BOOK_A_CALL_HREF, FREE_INCOME_REPORT_HREF, PRIMARY_PHONE_DISPLAY, SWITCH_PAGE_HREF } from '@/lib/site-config'
import { ranchoSantaFeContent as c, ranchoSantaFeFAQs } from './content'
import { Home, Shield, Calendar, FileText, CheckCircle2 } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Shield,
  Calendar,
  FileText,
}

function CTAButtons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <SiteButton href={FREE_INCOME_REPORT_HREF}>Get My Free Earnings Report</SiteButton>
      <SiteButton href={BOOK_A_CALL_HREF} variant="secondary" dark={dark} target="_blank">
        Book a Call
      </SiteButton>
    </div>
  )
}

export function RanchoSantaFeHero() {
  return (
    <Hero
      image="/images/hero-pm.jpg"
      accent={c.hero.eyebrow}
      title={c.hero.title}
      subtitle={c.hero.subtitle}
      primaryCta={{ label: 'Get Free Earnings Report', href: FREE_INCOME_REPORT_HREF }}
      secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }}
      fullHeight
    />
  )
}

export function RanchoSantaFeAnswer() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-border bg-off-white p-8">
          <p className="text-lg leading-relaxed text-navy-deep">{c.answer.text}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{c.answer.updated}</span>
            <span>•</span>
            <span>{c.answer.author}</span>
          </div>
        </div>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeHighlights() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2">
          {c.highlights.map((h, i) => {
            const Icon = iconMap[h.icon] || Home
            return (
              <div
                key={h.title}
                className="flex gap-5 rounded-2xl border border-border bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
              >
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
                  <p className="mt-2 leading-relaxed text-muted-foreground">{h.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeLayers() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.layers.title} />
        <p className="mt-4 leading-relaxed text-muted-foreground">{c.layers.intro}</p>
        <div className="mt-8 space-y-6">
          {c.layers.items.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-off-white p-6">
              <h3 className="text-lg font-semibold text-navy-deep">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeRequirements() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.requirements.title} />
        <p className="mt-4 leading-relaxed text-muted-foreground">{c.requirements.intro}</p>
        <ol className="mt-8 space-y-4">
          {c.requirements.items.map((item, i) => (
            <li key={i} className="flex gap-4 rounded-xl border border-border bg-background p-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy-deep">
                {i + 1}
              </span>
              <p className="leading-relaxed text-muted-foreground">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeEstates() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.estates.title} />
        <p className="mt-4 leading-relaxed text-muted-foreground">{c.estates.body}</p>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeManagement() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.management.title} subtitle={c.management.intro} />
        <div className="mt-8 rounded-2xl border border-border bg-background p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {c.management.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {c.management.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-navy-deep"
              >
                {badge}
              </span>
            ))}
          </div>
          <ul className="mt-6 space-y-3">
            {c.management.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-gold" strokeWidth={2} />
                <span className="leading-relaxed text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center leading-relaxed text-muted-foreground">
          Learn more:{' '}
          <a href={SWITCH_PAGE_HREF} className="text-gold hover:underline">
            Switch Property Managers San Diego
          </a>
        </p>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeFees() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.fees.title} />
        <div className="mt-8 rounded-2xl border border-border bg-off-white p-8">
          <div className="space-y-4">
            {c.fees.items.map((item) => (
              <div key={item.label}>
                <p className="text-lg font-semibold text-navy-deep">{item.label}:</p>
                <p className="mt-1 text-muted-foreground">{item.value}.</p>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <p className="font-semibold text-navy-deep">{c.fees.note}</p>
              <p className="mt-2 text-muted-foreground">
                Tell us about your Rancho Santa Fe or Fairbanks Ranch estate and we'll show you what it
                can earn.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center">
          <a href="/san-diego-airbnb-management-fees" className="text-gold hover:underline">
            Learn more about our fees
          </a>
        </p>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeFAQ() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-12 space-y-6">
          {ranchoSantaFeFAQs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-8">
              <h3 className="text-lg font-semibold text-navy-deep">{faq.question}</h3>
              {faq.paragraphs.map((p, pIndex) => (
                <p key={pIndex} className="mt-3 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeClosing() {
  return (
    <ContentSection dark>
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="text-3xl font-bold text-primary-foreground md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Get Your Free Earnings Report
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
          Tell us about your Rancho Santa Fe or Fairbanks Ranch estate and we'll show you what it can
          earn. Or call us at{' '}
          <a href={`tel:${PRIMARY_PHONE_DISPLAY}`} className="font-medium text-gold hover:underline">
            {PRIMARY_PHONE_DISPLAY}
          </a>
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButtons dark />
        </div>
      </div>
    </ContentSection>
  )
}

export function RanchoSantaFeRelated() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <h3
          className="text-xl font-semibold text-navy-deep"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Related Resources
        </h3>
        <div className="mt-6 flex flex-col gap-3">
          <a href="/del-mar-vacation-rental-management" className="text-gold hover:underline">
            Del Mar Vacation Rental Management
          </a>
          <a href="/solana-beach-vacation-rental-management" className="text-gold hover:underline">
            Solana Beach Vacation Rental Management
          </a>
          <a
            href="/san-diego-county-vacation-rental-management"
            className="text-gold hover:underline"
          >
            San Diego County Vacation Rental Management
          </a>
          <a href={SWITCH_PAGE_HREF} className="text-gold hover:underline">
            Switch Property Managers San Diego
          </a>
          <a
            href="/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california"
            className="text-gold hover:underline"
          >
            Rancho Santa Fe Short-Term Rental Rules Guide
          </a>
        </div>
      </div>
    </ContentSection>
  )
}
