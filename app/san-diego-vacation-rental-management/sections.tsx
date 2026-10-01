import { Hero } from '@/components/sections/hero'
import { SectionHeading } from '@/components/section-heading'
import { SiteButton } from '@/components/site-button'
import { ContentSection, FeatureCard } from '@/components/sections/content-section'
import { AIRBNB_PROFILE_HREF, BOOK_A_CALL_HREF, FREE_INCOME_REPORT_HREF, SHOW_FEES, SHOW_TRIAL, SWITCH_PAGE_HREF } from '@/lib/site-config'
import { boutiqueContent as c, boutiqueFAQs, type ContentItem } from './content'

function CTAButtons({ dark = false }: { dark?: boolean }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"><SiteButton href={FREE_INCOME_REPORT_HREF}>{c.cta.primary}</SiteButton><SiteButton href={BOOK_A_CALL_HREF} variant="secondary" dark={dark} target="_blank">{c.cta.secondary}</SiteButton></div>
}

function Cards({ items }: { items: ContentItem[] }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <FeatureCard key={item.title} title={item.title}>{item.body}</FeatureCard>)}</div>
}

export function BoutiqueHero() {
  return <><div id="top" tabIndex={-1}><Hero image="/images/boutique/hero.jpg" accent={c.hero.eyebrow} title={`${c.hero.title} ${c.hero.emphasis}`} subtitle={c.hero.lede} primaryCta={{ label: 'Get Your Free Income Report', href: FREE_INCOME_REPORT_HREF }} secondaryCta={{ label: 'Book a Call', href: BOOK_A_CALL_HREF }} /></div><div className="bg-navy-deep py-8 text-primary-foreground"><ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-6 text-sm">{c.trust.map((item, index) => <li key={item}>{index === 1 ? <a href={AIRBNB_PROFILE_HREF} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{item}</a> : item}</li>)}</ul></div><ContentSection muted><div className="mx-auto flex max-w-3xl flex-col gap-6"><p data-speakable="answer-card" className="text-lg leading-relaxed text-navy-deep">{c.answer}</p><p className="leading-relaxed text-muted-foreground">{c.hero.body}</p>{SHOW_TRIAL && <p className="font-semibold text-navy-deep">{c.promise.line}</p>}</div></ContentSection></>
}

export function BoutiqueProof() {
  return <ContentSection><SectionHeading accent={c.boutique.eyebrow} title={c.boutique.title} /><Cards items={c.boutique.items} /><div className="mt-12 grid items-center gap-12 lg:grid-cols-2"><figure className="rounded-xl bg-offwhite p-8 text-foreground"><blockquote className="text-xl leading-relaxed text-navy-deep">{c.proof.quote}</blockquote><figcaption className="mt-6 flex flex-col gap-3 text-sm"><cite className="not-italic font-semibold">{c.proof.author}</cite><p>{c.proof.rating}</p><p className="text-muted-foreground">{c.proof.note}</p></figcaption></figure><div><SectionHeading accent={c.proof.eyebrow} title={`${c.proof.title} ${c.proof.emphasis}`} alignment="left" /><p className="leading-relaxed text-muted-foreground">{c.proof.body}</p></div></div><div className="mt-12 flex justify-center"><CTAButtons /></div></ContentSection>
}

export function BoutiqueHousing() {
  // NEEDS-DATA: insurer direct billing, adjuster relationships, corporate contracts, typical stay lengths,
  // what a furnished stay includes, pet policy, and a confirmed "No 1-year leases" policy statement.
  return <ContentSection id="housing" dark><SectionHeading accent={c.housing.eyebrow} title={c.housing.title} dark /><div className="mx-auto mb-12 flex max-w-3xl flex-col gap-6 leading-relaxed text-primary-foreground/80">{c.housing.paragraphs.map(p => <p key={p}>{p}</p>)}<p>{c.housing.evaluation}</p>{SHOW_FEES && <p>{c.housing.feeLine}</p>}<p className="text-sm">{c.housing.legal} Source: <a href={c.sources[1].href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{c.housing.sourceLabel}</a>. {c.housing.disclaimer}</p></div><Cards items={c.housing.items} /><div className="mt-12 flex justify-center"><CTAButtons dark /></div></ContentSection>
}

export function BoutiqueServices() {
  return <ContentSection><SectionHeading accent={c.services.eyebrow} title={c.services.title} subtitle={c.services.lede} /><Cards items={c.services.items} /><p className="mt-8 text-center leading-relaxed text-muted-foreground">Learn more about <a href="/property-management" className="underline underline-offset-4">{c.services.linkText}</a>.</p></ContentSection>
}

export function BoutiqueFeesAndPromise() {
  return <>
    {/* REMOVABLE: public use of fees needs Mike sign-off. */}
    {SHOW_FEES && <ContentSection muted><SectionHeading accent={c.fees.eyebrow} title={c.fees.title} subtitle={c.fees.lede} /><div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground"><table className="w-full text-left text-sm"><caption className="sr-only">{c.fees.title}</caption><thead className="bg-navy-deep text-primary-foreground"><tr>{c.fees.headers.map(header => <th key={header} scope="col" className="p-6">{header}</th>)}</tr></thead><tbody>{c.fees.rows.map(([label, value]) => <tr key={label} className="border-t border-border"><th scope="row" className="p-6 font-medium">{label}</th><td className="p-6 leading-relaxed text-muted-foreground">{value}</td></tr>)}</tbody></table></div></ContentSection>}
    {/* REMOVABLE: public use of the trial needs Mike sign-off. */}
    {SHOW_TRIAL && <ContentSection dark><SectionHeading accent={c.promise.eyebrow} title={c.promise.title} dark /><div className="flex flex-col items-center gap-6 text-center"><p className="font-headline text-3xl font-semibold text-gold-light md:text-4xl">{c.promise.line}</p><p className="leading-relaxed text-primary-foreground/80">{c.promise.body}</p></div></ContentSection>}
  </>
}

export function BoutiqueFAQ() {
  return <><ContentSection><SectionHeading accent={c.where.eyebrow} title={c.where.title} subtitle={c.where.body} /></ContentSection><ContentSection muted id="faq"><SectionHeading accent={c.faq.eyebrow} title={c.faq.title} /><div className="mx-auto flex max-w-4xl flex-col gap-4">{boutiqueFAQs.map((faq, index) => <details key={faq.question} open={index === 0} className="rounded-xl border border-border bg-card text-card-foreground"><summary className="cursor-pointer p-6 font-headline text-lg font-semibold text-navy-deep">{faq.question}</summary><div className="flex flex-col gap-4 px-6 pb-6">{faq.paragraphs.map((p, pIndex) => <p key={p} className="leading-relaxed text-muted-foreground">{p}{faq.link && pIndex === faq.paragraphs.length - 1 && <> <a href={faq.link.href} className="underline underline-offset-4">{faq.link.text}</a>.</>}</p>)}</div></details>)}<p className="text-sm leading-relaxed text-muted-foreground"><strong>{c.faq.disclaimer}</strong> {c.faq.legal}</p><ul className="flex flex-wrap gap-6 text-sm">{c.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul></div></ContentSection></>
}

export function BoutiqueClosing() {
  return <ContentSection id="start" dark><SectionHeading accent={c.closing.eyebrow} title={c.closing.title} subtitle={c.closing.body} dark /><div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">{SHOW_TRIAL && <><p>{c.promise.line}</p><p className="leading-relaxed text-primary-foreground/80">{c.closing.trialBody}</p></>}<h3 className="font-headline text-xl font-semibold uppercase tracking-wider">{c.closing.cardTitle}</h3><p className="text-sm text-primary-foreground/80">{c.closing.hint}</p><CTAButtons dark /><p className="text-sm leading-relaxed">{c.closing.switchIntro} <a href={SWITCH_PAGE_HREF} className="underline underline-offset-4">{c.closing.switchLink}</a>.</p></div></ContentSection>
}
