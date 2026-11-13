import { SectionHeading } from '@/components/section-heading'
import { ContentSection } from '@/components/sections/content-section'
import { comparisonContent as c, companies, comparisonTableData, faqs } from './content'

export function ComparisonHero() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className="text-4xl font-bold md:text-5xl lg:text-6xl text-navy-deep"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {c.hero.title}
        </h1>
        <div className="mt-4 h-0.5 w-16 mx-auto bg-gold" />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.hero.subhead}</p>
        <p className="mt-4 text-sm font-medium uppercase tracking-wide text-gold-dark">{c.hero.updated}</p>
      </div>
    </ContentSection>
  )
}

export function ComparisonDisclosure() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-gold/30 bg-card p-6 text-card-foreground shadow-sm">
          <p className="text-sm leading-relaxed">{c.disclosure}</p>
        </div>
      </div>
    </ContentSection>
  )
}

export function ComparisonIntro() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <p className="text-lg leading-relaxed text-foreground">{c.intro}</p>
      </div>
    </ContentSection>
  )
}

export function ComparisonHowWeBuilt() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.howWeBuilt.title} alignment="left" />
        <div className="space-y-6 text-foreground">
          <div>
            <p className="leading-relaxed">{c.howWeBuilt.intro}</p>
            <ol className="mt-3 space-y-2 pl-6">
              {c.howWeBuilt.criteria.map((item, index) => (
                <li key={index} className="list-decimal leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="leading-relaxed">{c.howWeBuilt.recorded}</p>
            <ul className="mt-3 space-y-2 pl-6">
              {c.howWeBuilt.recordedItems.map((item, index) => (
                <li key={index} className="list-disc leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="leading-relaxed">{c.howWeBuilt.disclaimer}</p>
          <p className="leading-relaxed">{c.howWeBuilt.summary}</p>
        </div>
      </div>
    </ContentSection>
  )
}

export function ComparisonCompaniesIncluded() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.companiesIncluded.title} alignment="left" />
        <p className="leading-relaxed text-foreground">{c.companiesIncluded.list}</p>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>{c.companiesIncluded.alluraNote}</p>
          <p>{c.companiesIncluded.entriesNote}</p>
        </div>
      </div>
    </ContentSection>
  )
}

export function ComparisonCompanyEntries() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl space-y-8">
        {companies.map(company => (
          <article key={company.name} className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <h3
              className="font-headline text-2xl font-semibold text-navy-deep"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {company.name}
            </h3>
            {company.name === 'Allura Homes' && (
              <p className="mt-2 text-sm italic text-muted-foreground">Allura Homes publishes this page.</p>
            )}
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="font-semibold text-navy-deep">Model:</span>{' '}
                <span className="text-foreground">{company.model}</span>
              </div>
              <div>
                <span className="font-semibold text-navy-deep">Service area (as stated):</span>{' '}
                <span className="text-foreground">{company.serviceArea}</span>
              </div>
              <div>
                <span className="font-semibold text-navy-deep">Published fee:</span>{' '}
                <span className="text-foreground">{company.publishedFee}</span>
              </div>
              <div>
                <span className="font-semibold text-navy-deep">Google rating:</span>{' '}
                <span className="text-foreground">{company.googleRating}</span>
              </div>
              {company.otherFacts && (
                <div>
                  <span className="font-semibold text-navy-deep">Other published facts:</span>{' '}
                  <span className="text-foreground">{company.otherFacts}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-navy-deep">Source{company.sources.length > 1 ? 's' : ''}:</span>{' '}
                {company.sources.map((source, index) => (
                  <span key={source.href}>
                    {index > 0 && ' and '}
                    <a
                      href={source.href}
                      className="text-navy-deep underline decoration-gold underline-offset-2 hover:text-gold-dark"
                      rel={source.href.startsWith('/') ? undefined : 'nofollow noopener'}
                      target={source.href.startsWith('/') ? undefined : '_blank'}
                    >
                      {source.label}
                    </a>
                  </span>
                ))}
                , checked Nov 13, 2026.
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentSection>
  )
}

export function ComparisonTable() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Comparison table" alignment="left" />
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{comparisonTableData.intro}</p>
        <div className="overflow-x-auto rounded-xl border border-border shadow-md">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Comparison of San Diego vacation rental managers</caption>
            <thead className="bg-navy-deep text-primary-foreground">
              <tr>
                {comparisonTableData.headers.map((header, index) => (
                  <th
                    key={header}
                    scope="col"
                    className="p-4 font-headline text-xs font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: 'var(--font-headline)',
                      minWidth: index === 0 ? '180px' : index === 3 || index === 4 ? '220px' : '200px',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card">
              {comparisonTableData.rows.map((row, rowIndex) => (
                <tr key={row[0]} className={rowIndex !== comparisonTableData.rows.length - 1 ? 'border-b border-border' : ''}>
                  {row.map((cell, cellIndex) => {
                    const Tag = cellIndex === 0 ? 'th' : 'td'
                    return (
                      <Tag
                        key={cellIndex}
                        scope={cellIndex === 0 ? 'row' : undefined}
                        className={`p-4 align-top ${cellIndex === 0 ? 'font-semibold text-navy-deep' : 'text-foreground'}`}
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentSection>
  )
}

export function ComparisonHowToUse() {
  return (
    <ContentSection muted>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={c.howToUse.title} alignment="left" />
        <p className="leading-relaxed text-foreground">{c.howToUse.body}</p>
      </div>
    </ContentSection>
  )
}

export function ComparisonFAQ() {
  return (
    <ContentSection>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Frequently asked questions" alignment="left" />
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0} className="group rounded-xl border border-border bg-card text-card-foreground">
              <summary className="flex cursor-pointer items-start justify-between p-6 font-headline text-lg font-semibold text-navy-deep">
                <span className="pr-8">{faq.question}</span>
                <span className="flex-shrink-0 text-2xl font-normal text-gold-dark transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="space-y-3 border-t border-border px-6 pb-6 pt-4">
                {faq.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </ContentSection>
  )
}
