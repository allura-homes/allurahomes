import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronDown } from 'lucide-react'
import { switchContent as c } from './content'
import { SwitchActions, SwitchBody, SwitchCard, SwitchHeading } from './page-elements'
import { FREE_INCOME_REPORT_HREF } from '@/lib/site-config'
import { AnalysisForm } from './analysis-form'

const container = 'mx-auto max-w-7xl px-6'
const section = 'py-16 md:py-20 lg:py-28'

export function SwitchHero() {
  return (
    <>
      <section id="top" className="bg-navy-deep pb-16 pt-28 text-primary-foreground md:pb-20 md:pt-36">
        <div className={`${container} flex flex-col gap-12`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
            <Link href="/" className="hover:text-gold">Home</Link><span aria-hidden="true">/</span><Link href="/property-management" className="hover:text-gold">Property Management</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-gold">Switch Managers in San Diego</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">{c.hero.eyebrow}</p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-balance md:text-5xl lg:text-4xl xl:text-6xl">{c.hero.title}<span className="mt-3 block font-medium italic text-gold-light">{c.hero.emphasis}</span></h1>
              <p className="text-lg font-medium leading-relaxed text-pretty md:text-xl">{c.hero.lede}</p>
              <p className="text-sm leading-relaxed text-primary-foreground/80 md:text-base">{c.hero.body}</p>
              <SwitchActions dark />
              <div className="flex flex-col gap-2"><p className="text-sm font-semibold text-gold-light">{c.promise.line}</p><p className="text-sm text-primary-foreground/80">{c.promise.callNote}</p></div>
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gold/40 lg:aspect-[4/5]">
                <Image src="/images/switch-managers/hero.jpg" alt={c.hero.imageAlt} priority fill sizes="(max-width: 1023px) 100vw, 45vw" className="hidden object-cover object-[38%_50%] lg:block" />
                <Image src="/images/switch-managers/hero-mobile.jpg" alt={c.hero.imageAlt} priority fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover lg:hidden" />
              </div>
              <div className="z-10 -mt-12 ml-6 flex w-fit flex-col gap-1 rounded-xl bg-card px-8 py-5 text-card-foreground shadow-xl">
                <p className="font-display text-4xl font-semibold text-navy-deep">{c.hero.badge}</p>
                <p className="text-sm uppercase tracking-widest text-muted-foreground">{c.hero.badgeLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Allura credentials" className="border-y border-gold/25 bg-navy-deep py-8 text-primary-foreground">
        <ul className={`${container} flex flex-wrap items-center justify-center gap-x-8 gap-y-4`}>
          {c.trust.map((item, i) => <li key={item} className="flex items-center gap-3 text-center text-sm font-medium"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-gold" />{i === 1 ? <a href={c.superhostHref} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">{item}</a> : item}</li>)}
        </ul>
      </section>
      <section className="bg-muted py-12 md:py-16">
        <div className={container}><div data-speakable="answer-card" className="mx-auto max-w-5xl rounded-2xl bg-card p-8 text-card-foreground shadow-sm md:p-12"><p className="font-display text-xl leading-relaxed text-navy-deep md:text-2xl">{c.answer}</p></div></div>
      </section>
    </>
  )
}

export function SwitchProcess() {
  return (
    <>
      <section className={`${section} bg-background`}><div className={`${container} flex flex-col gap-12`}>
        <SwitchHeading eyebrow={c.pain.eyebrow} title={c.pain.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{c.pain.items.map((item) => <SwitchCard key={item.title} {...item} />)}</div>
      </div></section>
      <section className={`${section} bg-muted`}><div className={`${container} flex flex-col gap-12`}>
        <SwitchHeading eyebrow={c.steps.eyebrow} title={c.steps.title} />
        <ol className="grid gap-5 lg:grid-cols-2">{c.steps.items.map((item, i) => <li key={item.title} className="flex flex-col gap-5 rounded-xl border border-border bg-card p-7 text-card-foreground sm:flex-row"><span aria-hidden="true" className="font-display text-4xl text-gold-dark">{String(i + 1).padStart(2, '0')}</span><div className="flex flex-col gap-3"><h3 className="font-display text-xl font-semibold leading-snug">{i === 2 ? <Link href={FREE_INCOME_REPORT_HREF} className="underline decoration-gold underline-offset-4">{item.title}</Link> : item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground"><SwitchBody text={item.body} /></p></div></li>)}</ol>
        <div className="flex justify-center"><SwitchActions /></div>
      </div></section>
      <section className={`${section} bg-background`}><div className={`${container} flex flex-col gap-12`}>
        <SwitchHeading eyebrow={c.services.eyebrow} title={c.services.title} subtitle={<SwitchBody text={c.services.lede} />} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{c.services.items.map((item) => <SwitchCard key={item.title} {...item} />)}</div>
        <div className="flex justify-center"><SwitchActions /></div>
      </div></section>
    </>
  )
}

export function SwitchFeesAndProof() {
  return (
    <>
      <section className={`${section} bg-muted`}><div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        <div className="flex flex-col gap-8"><SwitchHeading eyebrow={c.fees.eyebrow} title={c.fees.title} left /><p className="font-display text-2xl italic text-navy-deep">{c.fees.lede}</p><SwitchActions vertical /></div>
        <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">{c.fees.title}</caption><thead className="bg-navy-deep text-primary-foreground"><tr>{c.fees.headers.map((label) => <th key={label} scope="col" className="p-4 font-semibold first:w-2/5 md:p-6">{label}</th>)}</tr></thead><tbody>{c.fees.rows.map(([item, amount]) => <tr key={item} className="border-t border-border"><th scope="row" className="p-4 font-medium leading-relaxed md:p-6">{item}</th><td className="p-4 leading-relaxed text-muted-foreground md:p-6">{amount}</td></tr>)}</tbody></table></div>
      </div></section>
      <section className={`${section} bg-navy-deep text-primary-foreground`}><div className={`${container} flex max-w-4xl flex-col items-center gap-8 text-center`}>
        <SwitchHeading eyebrow={c.promise.eyebrow} title={c.promise.title} dark />
        <p className="font-display text-4xl leading-tight text-gold-light md:text-6xl">{c.promise.line.split('. ')[0] + '.'}<br />{c.promise.line.split('. ')[1]}</p>
        <p className="text-sm leading-relaxed text-primary-foreground/80">{c.promise.callNote}</p>
        <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/80">{c.promise.body}</p>
      </div></section>
      <section className={`${section} bg-background`}><div className={`${container} flex flex-col gap-12`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <figure className="flex flex-col gap-6 rounded-2xl bg-muted p-8 text-foreground md:p-10">
            <span aria-hidden="true" className="h-10 font-display text-7xl leading-none text-gold-dark">“</span>
            <blockquote className="font-display text-2xl leading-relaxed text-navy-deep">{c.proof.quote}</blockquote>
            <figcaption className="text-sm font-semibold text-navy-deep">{c.proof.author}</figcaption>
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5"><span aria-hidden="true" className="flex gap-1 text-gold-dark">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" />)}</span><p className="text-sm">{c.proof.rating}</p></div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">{c.proof.note}</p>
          </figure>
          <div className="flex flex-col gap-6"><p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">{c.proof.eyebrow}</p><p className="font-display text-3xl font-semibold leading-tight text-balance text-navy-deep md:text-4xl">{c.proof.title}</p><p className="leading-relaxed text-muted-foreground">{c.proof.body}</p></div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">{c.proof.items.map((item) => <SwitchCard key={item.title} {...item} />)}</div>
      </div></section>
    </>
  )
}

export function SwitchFAQAndAnalysis() {
  return (
    <>
      <section id="faq" className={`${section} bg-muted`}><div className={`${container} flex flex-col gap-12`}>
        <SwitchHeading eyebrow={c.faq.eyebrow} title={c.faq.title} />
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">{c.faq.items.map((faq, i) => <details key={faq.question} open={i === 0} className="group rounded-xl border border-border bg-card text-card-foreground"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-display text-lg font-semibold leading-snug md:text-xl"><span>{faq.question}</span><ChevronDown aria-hidden="true" className="size-5 shrink-0 text-gold-dark transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="flex flex-col gap-4 px-6 pb-6">{faq.paragraphs.map((p) => <p key={p} className="text-sm leading-relaxed text-muted-foreground md:text-base"><SwitchBody text={p} /></p>)}</div></details>)}
          <div className="flex flex-col gap-4 pt-4 text-sm leading-relaxed text-muted-foreground"><p><strong>{c.faq.disclaimer}</strong> {c.faq.jurisdiction} More answers in our <Link href="/faq" className="text-navy-deep underline decoration-gold underline-offset-4">FAQ</Link>.</p><div className="flex flex-wrap gap-x-6 gap-y-3">{c.faq.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="text-navy-deep underline decoration-gold underline-offset-4">{source.label}</a>)}</div></div>
        </div>
      </div></section>
      <section id="analysis" className={`${section} scroll-mt-24 bg-navy-deep text-primary-foreground`}><div className={`${container} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div className="flex flex-col gap-8 lg:sticky lg:top-32"><SwitchHeading eyebrow={c.closing.eyebrow} title={c.closing.title} dark left /><p className="text-lg leading-relaxed text-primary-foreground/80">{c.closing.body}</p><div className="flex flex-col gap-2"><p className="font-display text-2xl text-gold-light">{c.promise.line}</p><p className="text-sm text-primary-foreground/80">{c.promise.callNote}</p></div></div>
        <AnalysisForm />
      </div></section>
    </>
  )
}
