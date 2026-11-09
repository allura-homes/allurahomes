import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { ranchoSantaFeContent as c, ranchoSantaFeStructuredData } from './content'
import {
  RanchoSantaFeHero,
  RanchoSantaFeAnswer,
  RanchoSantaFeHighlights,
  RanchoSantaFeLayers,
  RanchoSantaFeRequirements,
  RanchoSantaFeEstates,
  RanchoSantaFeManagement,
  RanchoSantaFeFees,
  RanchoSantaFeFAQ,
  RanchoSantaFeClosing,
  RanchoSantaFeRelated,
} from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  keywords: [
    'Rancho Santa Fe vacation rental management',
    'Fairbanks Ranch property management',
    'RSF Covenant rental rules',
    'luxury estate management',
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

export default function RanchoSantaFePage() {
  return (
    <main>
      <RanchoSantaFeHero />
      <RanchoSantaFeAnswer />
      <RanchoSantaFeHighlights />
      <RanchoSantaFeLayers />
      <RanchoSantaFeRequirements />
      <RanchoSantaFeEstates />
      <RanchoSantaFeManagement />
      <RanchoSantaFeFees />
      <RanchoSantaFeFAQ />
      <RanchoSantaFeClosing />
      <RanchoSantaFeRelated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ranchoSantaFeStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}
