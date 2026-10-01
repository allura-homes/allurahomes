import type { Metadata } from 'next'
import { boutiqueContent as c, boutiqueStructuredData } from './content'
import { BoutiqueHeader, BoutiqueHero, BoutiqueProof, BoutiqueHousing, BoutiqueServices, BoutiqueFeesAndPromise, BoutiqueFAQ, BoutiqueClosing, BoutiqueFooter } from './sections'
import './boutique-page.css'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: c.seo.description,
  keywords: [c.hero.eyebrow, 'boutique vacation rental manager San Diego', c.housing.eyebrow],
  alternates: { canonical: c.seo.url },
  // TODO: switch to index/follow ONLY after Mike approves launch.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: 'website', url: c.seo.url, siteName: 'Allura Homes', title: c.seo.title, description: c.seo.description,
    images: [{ url: '/images/boutique/og-image.jpg', width: 1200, height: 630, alt: 'A modern single-story home on a hillside at golden hour, with a pool and palm trees' }],
  },
  twitter: { card: 'summary_large_image', title: c.seo.title, description: c.seo.description, images: ['/images/boutique/og-image.jpg'] },
}

export default function BoutiqueManagementPage() {
  return <div className="boutique-page font-sans">
    <a href="#top" className="b-skip-link">Skip to content</a>
    <BoutiqueHeader />
    <main>
      <BoutiqueHero />
      <BoutiqueProof />
      <BoutiqueHousing />
      <BoutiqueServices />
      <BoutiqueFeesAndPromise />
      <BoutiqueFAQ />
      <BoutiqueClosing />
    </main>
    <BoutiqueFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boutiqueStructuredData).replace(/</g, '\\u003c') }} />
  </div>
}
