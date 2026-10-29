import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { solanaBeachContent as c, solanaBeachStructuredData } from './content'
import {
  SolanaBeachHero,
  SolanaBeachAnswer,
  SolanaBeachHighlights,
  SolanaBeachRequirements,
  SolanaBeachRenewal,
  SolanaBeachSwitching,
  SolanaBeachWeeklyStays,
  SolanaBeachManagement,
  SolanaBeachFees,
  SolanaBeachFAQ,
  SolanaBeachClosing,
  SolanaBeachRelated,
} from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  keywords: [
    'Solana Beach vacation rental management',
    'Solana Beach STVR permit',
    'Solana Beach 7-night minimum',
    'Solana Beach property management',
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

export default function SolanaBeachPage() {
  return (
    <main>
      <SolanaBeachHero />
      <SolanaBeachAnswer />
      <SolanaBeachHighlights />
      <SolanaBeachRequirements />
      <SolanaBeachRenewal />
      <SolanaBeachSwitching />
      <SolanaBeachWeeklyStays />
      <SolanaBeachManagement />
      <SolanaBeachFees />
      <SolanaBeachFAQ />
      <SolanaBeachClosing />
      <SolanaBeachRelated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solanaBeachStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}
