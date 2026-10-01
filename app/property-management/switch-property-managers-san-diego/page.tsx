import type { Metadata } from 'next'
import { switchContent as c, switchStructuredData } from './content'
import { SwitchHero, SwitchProcess, SwitchFeesAndProof, SwitchFAQAndAnalysis } from './sections'
import './switch-page.css'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: c.seo.description,
  alternates: { canonical: c.seo.url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website', url: c.seo.url, siteName: 'Allura Homes', title: c.seo.title, description: c.seo.description,
    images: [{ url: '/images/switch-managers/og-image.jpg', width: 1200, height: 630, alt: c.hero.imageAlt }],
  },
  twitter: { card: 'summary_large_image', title: c.seo.title, description: c.seo.description, images: ['/images/switch-managers/og-image.jpg'] },
}

export default function SwitchManagersPage() {
  return (
    <div className="switch-page bg-background font-sans text-foreground">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-6 focus:py-3 focus:text-card-foreground">Skip to content</a>
      <SwitchHero />
      <SwitchProcess />
      <SwitchFeesAndProof />
      <SwitchFAQAndAnalysis />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(switchStructuredData).replace(/</g, '\\u003c') }} />
    </div>
  )
}
