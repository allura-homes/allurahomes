import { getImageProps } from 'next/image'
import { AIRBNB_PROFILE_HREF, BOOK_A_CALL_HREF, FREE_INCOME_REPORT_HREF, SHOW_FEES, SHOW_TRIAL, SWITCH_PAGE_HREF } from '@/lib/site-config'
import { boutiqueContent as c, boutiqueFAQs, type ContentItem } from './content'

function SectionHeading({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return <div className={centered ? 'b-section-head b-center' : 'b-section-head'}><p className="b-eyebrow">{eyebrow}</p><div className="b-rule" aria-hidden="true" /><h2 className="font-display text-balance">{title}</h2></div>
}

function CTAButtons() {
  return <div className="b-cta-row"><a className="b-button btn-gold" href={FREE_INCOME_REPORT_HREF}>{c.cta.primary}</a><a className="b-button b-secondary" href={BOOK_A_CALL_HREF} target="_blank" rel="noopener noreferrer">{c.cta.secondary}</a></div>
}

function Cards({ items, className }: { items: ContentItem[]; className: string }) {
  return <div className={className}>{items.map(item => <article className="b-card" key={item.title}><div className="b-card-rule" aria-hidden="true" /><h3 className="font-display">{item.title}</h3><p>{item.body}</p></article>)}</div>
}

export function BoutiqueHero() {
  const common = { alt: c.hero.imageAlt, sizes: '(max-width: 960px) 100vw, 45vw', priority: true, fetchPriority: 'high' as const }
  const desktop = getImageProps({ ...common, src: '/images/boutique/hero.jpg', width: 1536, height: 1024 }).props
  const mobile = getImageProps({ ...common, src: '/images/boutique/hero-mobile.jpg', width: 1200, height: 750 }).props
  return <>
    <section id="top" className="b-hero b-dark" tabIndex={-1}><div className="b-wrap b-hero-grid">
      <div><p className="b-eyebrow">{c.hero.eyebrow}</p><h1 className="font-display">{c.hero.title}{' '}<em>{c.hero.emphasis}</em></h1><p className="b-lede">{c.hero.lede}</p><p className="b-hero-body">{c.hero.body}</p><CTAButtons />{SHOW_TRIAL && <p className="b-micro b-trial" data-removable="trial">{c.promise.line}</p>}</div>
      <div className="b-photo-wrap"><div className="b-photo"><picture><source media="(max-width: 960px)" srcSet={mobile.srcSet} sizes={mobile.sizes} width={1200} height={750} /><img {...desktop} alt={c.hero.imageAlt} /></picture><div className="b-photo-inset" aria-hidden="true" /></div><div className="b-hero-badge"><strong className="font-display">{c.hero.badge}</strong><span>{c.hero.badgeLabel}</span></div></div>
    </div></section>
    <div className="b-trust"><ul className="b-wrap">{c.trust.map((item, index) => <li key={item}><span className="b-diamond" aria-hidden="true" />{index === 1 ? <a href={AIRBNB_PROFILE_HREF} target="_blank" rel="noopener noreferrer">{item}</a> : <span className={index === 2 ? 'b-vrbo' : undefined}>{item}</span>}</li>)}</ul></div>
    <section className="b-answer"><div className="b-wrap"><div className="b-answer-card" data-speakable="answer-card"><p className="font-display">{c.answer}</p></div></div></section>
  </>
}

export function BoutiqueProof() {
  return <section><div className="b-wrap"><SectionHeading {...c.boutique} /><Cards items={c.boutique.items} className="b-boutique-grid" /><div className="b-proof-grid">
    <figure className="b-quote"><span className="b-quote-mark font-display" aria-hidden="true">{'“'}</span><blockquote className="font-display">{c.proof.quote}</blockquote><figcaption><cite>{c.proof.author}</cite><p className="b-rating"><span aria-hidden="true">★★★★★</span> {c.proof.rating}</p><p className="b-case-note">{c.proof.note}</p></figcaption></figure>
    <div className="b-proof-copy"><p className="b-eyebrow">{c.proof.eyebrow}</p><div className="b-rule" aria-hidden="true" /><p className="b-contrast font-display">{c.proof.title} <em>{c.proof.emphasis}</em></p><p className="b-muted">{c.proof.body}</p></div>
  </div><div className="b-after-grid"><CTAButtons /></div></div></section>
}

export function BoutiqueHousing() {
  // NEEDS-DATA: insurer direct billing, adjuster relationships, corporate contracts, typical stay lengths,
  // what a furnished stay includes, pet policy, and a confirmed "No 1-year leases" policy statement.
  return <section id="housing" className="b-dark"><div className="b-wrap"><div className="b-housing-grid"><div className="b-housing-copy"><SectionHeading {...c.housing} />{c.housing.paragraphs.map(p => <p key={p}>{p}</p>)}<p className="b-evaluation font-display">{c.housing.evaluation}</p>{SHOW_FEES && <p data-removable="fees">{c.housing.feeLine}</p>}<p className="b-legal-line">{c.housing.legal} Source: <a href={c.sources[1].href} target="_blank" rel="noopener noreferrer">{c.housing.sourceLabel}</a>. {c.housing.disclaimer}</p></div><Cards items={c.housing.items} className="b-housing-cards" /></div><div className="b-housing-cta"><CTAButtons /></div></div></section>
}

export function BoutiqueServices() {
  return <section><div className="b-wrap"><SectionHeading {...c.services} /><p className="b-service-lede">{c.services.lede}</p><Cards items={c.services.items} className="b-service-grid" /><p className="b-more">Learn more about <a href="/property-management">{c.services.linkText}</a>.</p></div></section>
}

export function BoutiqueFeesAndPromise() {
  return <>
    {/* REMOVABLE: public use of fees needs Mike sign-off. */}
    {SHOW_FEES && <section className="b-warm" data-removable="fees"><div className="b-wrap b-fee-grid"><div><SectionHeading {...c.fees} /><p className="b-fee-line font-display">{c.fees.lede}</p><p className="b-muted">{c.housing.evaluation}</p></div><table><caption className="sr-only">{c.fees.title}</caption><thead><tr>{c.fees.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{c.fees.rows.map(([label, value]) => <tr key={label}><th scope="row" className="font-display">{label}</th><td>{value}</td></tr>)}</tbody></table></div></section>}
    {/* REMOVABLE: public use of the trial needs Mike sign-off. */}
    {SHOW_TRIAL && <section className="b-promise b-dark" data-removable="trial"><span className="b-promise-number font-display" aria-hidden="true">90</span><div className="b-wrap"><SectionHeading {...c.promise} centered /><p className="b-promise-line font-display">{c.promise.lines[0]}<br />{c.promise.lines[1]}</p><p>{c.promise.body}</p></div></section>}
  </>
}

export function BoutiqueFAQ() {
  // TODO(Mike): active markets beyond San Diego are unconfirmed. Do NOT list any other city or region until confirmed.
  return <>
    <section className="b-where"><div className="b-wrap b-where-grid"><SectionHeading {...c.where} /><p className="b-muted">{c.where.body}</p></div></section>
    <section className="b-warm" id="faq"><div className="b-wrap"><SectionHeading {...c.faq} centered /><div className="b-faq">{boutiqueFAQs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><h3 className="font-display">{faq.question}</h3><span className="b-faq-toggle" aria-hidden="true" /></summary><div className="b-faq-answer">{faq.paragraphs.map((p, pIndex) => <p key={p}>{p}{faq.link && pIndex === faq.paragraphs.length - 1 && <> <a href={faq.link.href}>{faq.link.text}</a>.</>}</p>)}</div></details>)}</div><div className="b-legal"><p><strong>{c.faq.disclaimer}</strong> {c.faq.legal}</p><ul>{c.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></div></div></section>
  </>
}

export function BoutiqueClosing() {
  return <section id="start" className="b-closing b-dark"><div className="b-wrap b-closing-grid"><div><SectionHeading {...c.closing} /><p className="b-closing-body">{c.closing.body}</p>{SHOW_TRIAL && <div data-removable="trial"><p className="b-closing-promise font-display">{c.promise.line}</p><p className="b-closing-body">{c.closing.trialBody}</p></div>}</div><div className="b-start-card"><h3 className="font-display">{c.closing.cardTitle}</h3><p className="b-hint">{c.closing.hint}</p><p className="b-step-label">{c.closing.labels[0]}</p><a className="b-button btn-gold" href={FREE_INCOME_REPORT_HREF}>{c.cta.primary}</a><p className="b-step-label b-step-two">{c.closing.labels[1]}</p><a className="b-button b-secondary" href={BOOK_A_CALL_HREF} target="_blank" rel="noopener noreferrer">{c.cta.secondary}</a><p className="b-switch-link">{c.closing.switchIntro} <a href={SWITCH_PAGE_HREF}>{c.closing.switchLink}</a>.</p></div></div></section>
}
