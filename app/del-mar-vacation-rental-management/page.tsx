import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { delMarContent as c, delMarStructuredData } from './content'
import {
  DelMarHero,
  DelMarAnswer,
  DelMarHighlights,
  DelMarPermitRules,
  DelMarKeepPermit,
  DelMarBuying,
  DelMarRequirements,
  DelMarLongTerm,
  DelMarManagement,
  DelMarFees,
  DelMarFAQ,
  DelMarClosing,
  DelMarRelated,
} from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  keywords: [
    'Del Mar vacation rental management',
    'Del Mar STR permit',
    'Del Mar 3-night minimum',
    'Del Mar property management',
  ],
  alternates: { canonical: c.seo.url },
  openGraph: {
    images: [SHARE_IMAGE],
    title: c.seo.title,
    description: metaDescription(c.seo.description),
    url: c.seo.url,
  },
  twitter: {
    title: c.seo.title,
    description: metaDescription(c.seo.description),
  },
}

export default function DelMarPage() {
  return (
    <main>
      <DelMarHero />
      <DelMarAnswer />
      <DelMarHighlights />
      <DelMarPermitRules />
      <DelMarKeepPermit />
      <DelMarBuying />
      <DelMarRequirements />
      <DelMarLongTerm />
      <DelMarManagement />
      <DelMarFees />
      <DelMarFAQ />
      <DelMarClosing />
      <DelMarRelated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(delMarStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}
