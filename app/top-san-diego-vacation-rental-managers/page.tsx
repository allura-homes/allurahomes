import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { comparisonContent as c, comparisonStructuredData } from './content'
import {
  ComparisonHero,
  ComparisonDisclosure,
  ComparisonIntro,
  ComparisonHowWeBuilt,
  ComparisonCompaniesIncluded,
  ComparisonCompanyEntries,
  ComparisonTable,
  ComparisonHowToUse,
  ComparisonFAQ,
} from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  alternates: { canonical: c.seo.url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'article',
    url: c.seo.url,
    siteName: 'Allura Homes',
    title: c.seo.title,
    description: metaDescription(c.seo.description),
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: c.seo.title,
    description: metaDescription(c.seo.description),
    images: [SHARE_IMAGE.url],
  },
}

export default function ComparisonPage() {
  return (
    <div className="font-sans text-foreground">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-6 focus:py-3 focus:text-card-foreground"
      >
        Skip to content
      </a>
      <div id="top" tabIndex={-1}>
        <ComparisonHero />
        <ComparisonDisclosure />
        <ComparisonIntro />
        <ComparisonHowWeBuilt />
        <ComparisonCompaniesIncluded />
        <ComparisonCompanyEntries />
        <ComparisonTable />
        <ComparisonHowToUse />
        <ComparisonFAQ />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  )
}
