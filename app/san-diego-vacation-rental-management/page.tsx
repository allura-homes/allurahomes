import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { boutiqueContent as c, boutiqueStructuredData } from './content'
import { BoutiqueHero, BoutiqueProof, BoutiqueHousing, BoutiqueServices, BoutiqueFeesAndPromise, BoutiqueFAQ, BoutiqueClosing } from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  keywords: [c.hero.eyebrow, 'boutique vacation rental manager San Diego', c.housing.eyebrow],
  alternates: { canonical: c.seo.url },
  // TODO: switch to index/follow ONLY after Mike approves launch.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: 'website', url: c.seo.url, siteName: 'Allura Homes', title: c.seo.title, description: metaDescription(c.seo.description),
    images: [SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: c.seo.title, description: metaDescription(c.seo.description), images: [SHARE_IMAGE.url] },
}

export default function BoutiqueManagementPage() {
  return <div className="font-sans text-foreground">
    <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-6 focus:py-3 focus:text-card-foreground">Skip to content</a>
    <div>
      <BoutiqueHero />
      <BoutiqueProof />
      <BoutiqueHousing />
      <BoutiqueServices />
      <BoutiqueFeesAndPromise />
      <BoutiqueFAQ />
      <BoutiqueClosing />
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boutiqueStructuredData).replace(/</g, '\\u003c') }} />
  </div>
}
