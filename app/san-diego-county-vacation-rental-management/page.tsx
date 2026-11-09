import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription } from '@/lib/seo'
import { sanDiegoCountyContent as c, sanDiegoCountyStructuredData } from './content'
import {
  SanDiegoCountyHero,
  SanDiegoCountyAnswer,
  SanDiegoCountyHighlights,
  SanDiegoCountyIsUnincorporated,
  SanDiegoCountyRequirements,
  SanDiegoCountyEnforcement,
  SanDiegoCountryHomes,
  SanDiegoCountyManagement,
  SanDiegoCountyFees,
  SanDiegoCountyFAQ,
  SanDiegoCountyClosing,
  SanDiegoCountyRelated,
} from './sections'

export const metadata: Metadata = {
  title: { absolute: c.seo.title },
  description: metaDescription(c.seo.description),
  keywords: [
    'Fallbrook vacation rental management',
    'Bonsall property management',
    'Julian vacation rental',
    'Ramona rental management',
    'unincorporated San Diego County',
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

export default function SanDiegoCountyPage() {
  return (
    <main>
      <SanDiegoCountyHero />
      <SanDiegoCountyAnswer />
      <SanDiegoCountyHighlights />
      <SanDiegoCountyIsUnincorporated />
      <SanDiegoCountyRequirements />
      <SanDiegoCountyEnforcement />
      <SanDiegoCountryHomes />
      <SanDiegoCountyManagement />
      <SanDiegoCountyFees />
      <SanDiegoCountyFAQ />
      <SanDiegoCountyClosing />
      <SanDiegoCountyRelated />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanDiegoCountyStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  )
}
