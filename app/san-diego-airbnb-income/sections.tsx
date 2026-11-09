import Link from 'next/link'
import { Fragment } from 'react'
import { Hero } from '@/components/sections/hero'
import { ContentSection, FeatureCard } from '@/components/sections/content-section'
import { SectionHeading } from '@/components/section-heading'
import { SiteButton } from '@/components/site-button'
import { cn } from '@/lib/utils'
import { incomeContent as c } from './content'

const linkClass = 'underline decoration-gold underline-offset-4 hover:text-gold-dark'

function ExampleInput({ text }: { text: string }) {
  const parts = text.split('example input')
  return <>{parts.map((part, i) => <Fragment key={i}>{part}{i < parts.length - 1 && <strong className="font-semibold text-navy-deep">example input</strong>}</Fragment>)}</>
}

function IncomeCta({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <SiteButton href={c.cta.primaryHref}>{c.cta.primary}</SiteButton>
      <p className={cn('text-sm', dark ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{c.cta.microcopy}</p>
      <p className={cn('text-sm', dark ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
        {c.cta.secondaryLead}{' '}
        <a href={c.cta.secondaryHref} className="font-semibold underline underline-offset-4">{c.cta.secondary}</a>
        {' · '}
        <a href={c.cta.phoneHref} className="font-semibold underline underline-offset-4">{c.cta.phone}</a>
      </p>
    </div>
  )
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return <div className="mx-auto flex max-w-3xl flex-col gap-6">{paragraphs.map(p => <p key={p} className="text-lg leading-relaxed text-muted-foreground">{p}</p>)}</div>
}

export function IncomeHero() {
  return <>
    <div id="top" tabIndex={-1}>
      <Hero image="/images/hero-home.jpg" title={c.title} primaryCta={{ label: c.cta.primary, href: c.cta.primaryHref }} secondaryCta={{ label: c.cta.secondary, href: c.cta.secondaryHref }} />
    </div>
    <div aria-label="Allura credentials" className="bg-navy-deep py-8 text-primary-foreground">
      <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-6 text-sm">
        {c.trust.map((item, i) => <li key={item}>{i === 1 ? <a href={c.superhostHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{item}</a> : item}</li>)}
      </ul>
    </div>
    <ContentSection muted>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm">
            <li><Link href="/" className={linkClass}>Home</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{c.breadcrumb}</li>
          </ol>
        </nav>
        <p className="text-sm italic text-muted-foreground">
          By Mike Corrales, founder, Allura Homes · Updated <time dateTime={c.datePublished}>October 14, 2026</time>
        </p>
        <p data-speakable="answer-card" className="text-lg leading-relaxed text-navy-deep">{c.answer}</p>
        <div className="mt-2"><IncomeCta /></div>
      </div>
    </ContentSection>
  </>
}

export function IncomeRecommendation() {
  return <>
    <ContentSection>
      <SectionHeading title={c.recommendation.title} />
      <Prose paragraphs={c.recommendation.paragraphs} />
    </ContentSection>
    <ContentSection muted>
      <SectionHeading title={c.grossNet.title} />
      <Prose paragraphs={c.grossNet.paragraphs} />
    </ContentSection>
    <ContentSection>
      <SectionHeading title={c.market.title} subtitle={c.market.lede} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {c.market.stats.map(stat => (
          <li key={stat.label} className="flex flex-col gap-2 rounded-xl bg-card p-6 text-center text-card-foreground shadow-sm">
            <strong className="font-headline text-3xl font-bold text-navy-deep">{stat.value}</strong>
            <span className="text-sm leading-relaxed text-muted-foreground">{stat.label}</span>
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
        <p className="text-sm italic leading-relaxed text-muted-foreground">{c.market.source}</p>
        <p className="text-lg leading-relaxed text-muted-foreground">{c.market.note}</p>
      </div>
    </ContentSection>
  </>
}

export function IncomeExample() {
  const e = c.example
  return (
    <ContentSection muted id="worked-example">
      <SectionHeading title={e.title} />
      <div className="mx-auto flex max-w-4xl flex-col gap-6 leading-relaxed text-muted-foreground">
        <aside className="rounded-xl border border-gold bg-card p-6 text-card-foreground">
          <p><strong className="text-navy-deep">{e.disclaimerStrong}</strong> {e.disclaimer.split('example input').map((part, i, arr) => <Fragment key={i}>{part}{i < arr.length - 1 && <strong className="text-navy-deep">example input</strong>}</Fragment>)}</p>
        </aside>
        <div className="flex flex-col gap-3">
          <p><strong className="text-navy-deep">{e.pricingLead}</strong> {e.pricing}</p>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            {e.pricingPoints.map(point => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <p><strong className="text-navy-deep">{e.calendarLead}</strong> {e.calendar}</p>
        <p><strong className="text-navy-deep">{e.mathLead}</strong> {e.math}</p>
      </div>
      <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-xl border border-border bg-card text-card-foreground">
        <table className="w-full min-w-3xl text-left text-sm">
          <caption className="sr-only">{e.title}</caption>
          <thead className="bg-navy-deep text-primary-foreground">
            <tr>
              <td className="p-4" />
              {e.headers.map((label, i) => <th key={label} scope="col" className={cn('p-4 align-bottom', i === 1 && 'text-gold-light')}>{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {e.rows.map(row => (
              <tr key={row.label} className={cn('border-t border-border', row.strong && 'bg-offwhite')}>
                <th scope="row" className={cn('p-4 leading-relaxed', row.strong ? 'font-bold text-navy-deep' : 'font-medium')}>{row.label}</th>
                {row.cells.map((cell, i) => <td key={i} className={cn('p-4 leading-relaxed', row.strong ? 'font-bold text-navy-deep' : 'text-muted-foreground')}><ExampleInput text={cell} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 leading-relaxed text-muted-foreground">
        <h3 className="font-headline text-lg font-semibold text-navy-deep">{e.notesTitle}</h3>
        <ul className="flex list-disc flex-col gap-2 pl-6">
          {e.notes.map(note => {
            const source = 'sandiego.gov/treasurer/short-term-residential-occupancy'
            if (!note.includes(source)) return <li key={note}>{note}</li>
            const [before, after] = note.split(source)
            return <li key={note}>{before}<a href={e.licenseSourceHref} target="_blank" rel="noopener noreferrer" className={linkClass}>{source}</a>{after}</li>
          })}
        </ul>
        <p className="text-sm italic">
          {e.footnote.lead}{' '}
          {e.footnote.sources.map(s => <Fragment key={s.href}>{s.label} <a href={s.href} target="_blank" rel="noopener noreferrer" className={cn(linkClass, 'break-all')}>{s.href}</a>, {s.after} </Fragment>)}
        </p>
      </div>
      <div className="mt-12"><IncomeCta /></div>
    </ContentSection>
  )
}

export function IncomeComparison() {
  const cmp = c.comparison
  const r = c.regulations
  return <>
    <ContentSection>
      <SectionHeading title={cmp.title} />
      <div className="mx-auto max-w-5xl overflow-x-auto rounded-xl border border-border bg-card text-card-foreground">
        <table className="w-full min-w-2xl text-left text-sm">
          <caption className="sr-only">{cmp.title}</caption>
          <thead className="bg-navy-deep text-primary-foreground">
            <tr><td className="p-4" />{cmp.headers.map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr>
          </thead>
          <tbody>
            {cmp.rows.map(([label, short, monthly]) => (
              <tr key={label} className="border-t border-border">
                <th scope="row" className="p-4 font-semibold text-navy-deep">{label}</th>
                <td className="p-4 leading-relaxed text-muted-foreground">{short}</td>
                <td className="p-4 leading-relaxed text-muted-foreground">{monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {cmp.paths.map(path => <FeatureCard key={path.title} title={path.title}>{path.body}</FeatureCard>)}
      </div>
    </ContentSection>
    <ContentSection muted>
      <SectionHeading title={r.title} />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
        <p>{r.body}</p>
        <p>{r.guideLead} <Link href={r.guideHref} className={linkClass}>{r.guideLabel}</Link>. <em>{r.disclaimer}</em></p>
      </div>
    </ContentSection>
  </>
}

export function IncomeFees() {
  const f = c.fees
  return (
    <ContentSection>
      <SectionHeading title={f.title} />
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <ul className="flex flex-col gap-3 text-lg leading-relaxed text-muted-foreground">
          {f.pricing.map(item => <li key={item.lead}><strong className="text-navy-deep">{item.lead}</strong> {item.body}</li>)}
        </ul>
        <div className="flex flex-col gap-6">
          <h3 className="font-headline text-xl font-semibold text-navy-deep">{f.includedTitle}</h3>
          <ul className="grid gap-6 sm:grid-cols-2">
            {f.included.map(item => <li key={item.title}><FeatureCard title={item.title}>{item.body}</FeatureCard></li>)}
          </ul>
        </div>
        <p className="leading-relaxed text-muted-foreground"><strong className="text-navy-deep">{f.markupLead}</strong> {f.markup}</p>
      </div>
      <div className="mt-12"><IncomeCta /></div>
    </ContentSection>
  )
}

export function IncomeFAQ() {
  return (
    <ContentSection muted id="faq">
      <SectionHeading title={c.faq.title} />
      <dl className="mx-auto flex max-w-3xl flex-col gap-4">
        {c.faq.items.map(faq => (
          <div key={faq.question} className="rounded-xl border border-border bg-card p-6 text-card-foreground">
            <dt className="font-headline text-lg font-semibold text-navy-deep">{faq.question}</dt>
            <dd className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </ContentSection>
  )
}

export function IncomeClosing() {
  const cl = c.closing
  return <>
    <ContentSection dark>
      <SectionHeading title={cl.title} dark />
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <p className="text-center text-lg leading-relaxed text-primary-foreground/80">{cl.body}</p>
        <ol className="flex list-decimal flex-col gap-4 pl-6 leading-relaxed text-primary-foreground/80">
          <li><a href={c.cta.primaryHref} className="font-semibold text-gold-light underline underline-offset-4">{c.cta.primary}</a>: {cl.estimateDetail}</li>
          <li><strong className="text-primary-foreground">{c.cta.secondaryLead}</strong> <a href={c.cta.secondaryHref} className="underline underline-offset-4">{c.cta.secondary}</a> or call <a href={c.cta.phoneHref} className="underline underline-offset-4">{c.cta.phone}</a>.</li>
        </ol>
        <div className="flex justify-center"><SiteButton href={c.cta.primaryHref}>{c.cta.primary}</SiteButton></div>
      </div>
    </ContentSection>
    <nav aria-label="Related" className="bg-background py-10 text-foreground">
      <p className="mx-auto max-w-4xl px-6 text-base leading-relaxed text-pretty">
        Related:{' '}
        {c.related.map((link, i) => <Fragment key={link.href}>{i > 0 && ' · '}<Link href={link.href} className="font-semibold text-gold-dark underline underline-offset-4 hover:text-foreground">{link.label}</Link></Fragment>)}
      </p>
    </nav>
  </>
}
