import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { ContentSection, FeatureCard } from '@/components/sections/content-section'
import { FeaturedProperties } from '@/components/sections/featured-properties'
import { SiteButton } from '@/components/site-button'
import { switchContent as c } from './content'
import { SwitchActions, SwitchBody, SwitchCard, SwitchHeading } from './page-elements'
import { FREE_INCOME_REPORT_HREF } from '@/lib/site-config'
import { AnalysisForm } from './analysis-form'

export function SwitchHero() {
  return <>
    <div id="top" tabIndex={-1}><Hero image="/images/switch-managers/hero.jpg" accent={c.hero.eyebrow} title={`${c.hero.title} ${c.hero.emphasis}`} subtitle={c.hero.lede} primaryCta={{ label: 'Get Your Free Income Report', href: FREE_INCOME_REPORT_HREF }} secondaryCta={{ label: 'Book a Call', href: c.cta.callHref }} /></div>
    <div aria-label="Allura credentials" className="bg-navy-deep py-8 text-primary-foreground"><ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-6 text-sm">{c.trust.map((item, i) => <li key={item}>{i === 1 ? <a href={c.superhostHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{item}</a> : item}</li>)}</ul></div>
    <ContentSection muted><div className="mx-auto flex max-w-3xl flex-col gap-6"><nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/property-management">Property Management</Link><span aria-hidden="true">/</span><span aria-current="page">Switch Managers in San Diego</span></nav><div data-speakable="answer-first" className="space-y-6"><h2 className="font-headline text-sm font-semibold uppercase tracking-wider text-gold-dark">{c.answerFirst.eyebrow}</h2><h3 className="font-headline text-2xl font-bold text-navy-deep md:text-3xl">{c.answerFirst.title}</h3><p data-speakable="answer-card" className="text-lg leading-relaxed text-navy-deep">{c.answerFirst.proseAnswer}</p><div className="space-y-6"><h4 className="font-headline text-base font-semibold uppercase tracking-wider text-navy-deep">{c.answerFirst.checklist.title}</h4><ol className="space-y-4">{c.answerFirst.checklist.items.map((item, i) => <li key={item.title} className="text-sm"><span className="font-medium text-navy-deep">{i + 1}. {item.title}:</span> <span className="text-muted-foreground">{item.body}</span></li>)}</ol></div><div className="space-y-3"><h4 className="font-headline text-base font-semibold uppercase tracking-wider text-navy-deep">{c.answerFirst.fees.title}</h4><ul className="space-y-2 text-sm">{c.answerFirst.fees.items.map(item => <li key={item.label}><span className="font-medium text-navy-deep">{item.label}:</span> <span className="text-muted-foreground">{item.value}</span></li>)}</ul></div><div className="rounded-lg border border-gold/30 bg-cream px-4 py-3"><p className="text-xs font-medium uppercase tracking-wide text-gold-dark">{c.answerFirst.updated}</p></div><div className="flex flex-col gap-4 sm:flex-row"><SiteButton href={FREE_INCOME_REPORT_HREF}>Get Your Free Income Report</SiteButton><SiteButton href={c.cta.callHref} variant="secondary" target="_blank">Book a Call</SiteButton></div></div><p className="mt-6 leading-relaxed text-muted-foreground">{c.hero.body}</p></div></ContentSection>
  </>
}

export function SwitchProcess() {
  return <>
    <ContentSection><SwitchHeading eyebrow={c.pain.eyebrow} title={c.pain.title} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{c.pain.items.map(item => <SwitchCard key={item.title} {...item} />)}</div></ContentSection>
    <ContentSection muted><SwitchHeading eyebrow={c.steps.eyebrow} title={c.steps.title} /><ol className="grid gap-6 lg:grid-cols-2">{c.steps.items.map((item, i) => <li key={item.title}><FeatureCard title={`${i + 1}. ${item.title}`}><SwitchBody text={item.body} />{i === 2 && <> <Link href={FREE_INCOME_REPORT_HREF} className="underline underline-offset-4">Get your free income report</Link>.</>}</FeatureCard></li>)}</ol><div className="mt-12 flex justify-center"><SwitchActions /></div></ContentSection>
    <ContentSection><SwitchHeading eyebrow={c.services.eyebrow} title={c.services.title} subtitle={<SwitchBody text={c.services.lede} />} /><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{c.services.items.map(item => <SwitchCard key={item.title} {...item} />)}</div><div className="mt-12 flex justify-center"><SwitchActions /></div></ContentSection>
  </>
}

export function SwitchFeesAndProof() {
  return <>
    <ContentSection muted><SwitchHeading eyebrow={c.fees.eyebrow} title={c.fees.title} subtitle={c.fees.lede} /><div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">{c.fees.title}</caption><thead className="bg-navy-deep text-primary-foreground"><tr>{c.fees.headers.map(label => <th key={label} scope="col" className="p-6 first:w-2/5">{label}</th>)}</tr></thead><tbody>{c.fees.rows.map(([item, amount]) => <tr key={item} className="border-t border-border"><th scope="row" className="p-6 font-medium leading-relaxed">{item}</th><td className="p-6 leading-relaxed text-muted-foreground">{amount}</td></tr>)}</tbody></table></div><div className="mt-12 flex justify-center"><SwitchActions /></div></ContentSection>
    <ContentSection><div className="grid items-center gap-12 lg:grid-cols-2"><figure className="rounded-xl bg-offwhite p-8 text-foreground"><blockquote className="text-xl leading-relaxed text-navy-deep">{c.proof.quote}</blockquote><figcaption className="mt-6 flex flex-col gap-3 text-sm"><cite className="not-italic font-semibold">{c.proof.author}</cite><p>{c.proof.rating}</p></figcaption></figure><div><SwitchHeading eyebrow={c.proof.eyebrow} title={c.proof.title} left /><p className="leading-relaxed text-muted-foreground">{c.proof.body}</p></div></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{c.proof.items.map(item => <SwitchCard key={item.title} {...item} />)}</div></ContentSection>
    <FeaturedProperties />
  </>
}

export function SwitchFAQAndAnalysis() {
  return <>
    <ContentSection id="faq" muted><SwitchHeading eyebrow={c.faq.eyebrow} title={c.faq.title} /><div className="mx-auto flex max-w-4xl flex-col gap-4">{c.faq.items.map((faq, i) => <details key={faq.question} open={i === 0} className="group rounded-xl border border-border bg-card text-card-foreground"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-headline text-lg font-semibold text-navy-deep"><span>{faq.question}</span><ChevronDown aria-hidden="true" className="size-5 shrink-0 text-gold-dark transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="flex flex-col gap-4 px-6 pb-6">{faq.paragraphs.map(p => <p key={p} className="leading-relaxed text-muted-foreground"><SwitchBody text={p} /></p>)}</div></details>)}<p className="text-sm leading-relaxed text-muted-foreground"><strong>{c.faq.disclaimer}</strong> {c.faq.jurisdiction} More answers in our <Link href="/faq" className="underline underline-offset-4">FAQ</Link>.</p><ul className="flex flex-wrap gap-6 text-sm">{c.faq.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul></div></ContentSection>
    <ContentSection id="analysis" dark><div className="grid items-start gap-12 lg:grid-cols-2"><div><SwitchHeading eyebrow={c.closing.eyebrow} title={c.closing.title} dark left /><p className="text-lg leading-relaxed text-primary-foreground/80">{c.closing.body}</p></div><AnalysisForm /></div></ContentSection>
  </>
}
