import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { incomeContent as c, incomeStructuredData } from './content'
import { IncomeHero, IncomeRecommendation, IncomeExample, IncomeComparison, IncomeFees, IncomeFAQ, IncomeClosing } from './sections'
import './income-page.css'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  alternates: { canonical: c.seo.url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  authors: [{ name: 'Mike Corrales' }],
  openGraph: {
    type: 'article', url: c.seo.url, siteName: 'Allura Homes', title: c.seo.title, description: metaDescription(c.seo.description),
    publishedTime: c.datePublished, modifiedTime: c.datePublished, authors: ['Mike Corrales'],
    images: [SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: c.seo.title, description: metaDescription(c.seo.description), images: [SHARE_IMAGE.url] },
}

export default function SanDiegoAirbnbIncomePage() {
  return (
    <div className="income-page bg-background font-sans text-foreground">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-6 focus:py-3 focus:text-card-foreground">Skip to content</a>
      <article>
        <IncomeHero />
        <IncomeRecommendation />
        <IncomeExample />
        <IncomeComparison />
        <IncomeFees />
        <IncomeFAQ />
        <IncomeClosing />
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(incomeStructuredData).replace(/</g, '\\u003c') }} />
    </div>
  )
}
