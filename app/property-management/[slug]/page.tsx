import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMetroArea, getAllMetroSlugs } from '@/lib/metro-areas'
import { MetroAreaContent } from './content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllMetroSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const metro = getMetroArea(slug)
  if (!metro) return {}

  return {
    title: metro.seo.title,
    description: metro.seo.description,
    keywords: metro.seo.keywords,
    alternates: { canonical: metro.seo.canonical },
    openGraph: {
      title: `${metro.seo.title} | Allura Homes`,
      description: metro.seo.description,
      url: metro.seo.canonical,
    },
    twitter: {
      title: `${metro.name} Property Management | Allura Homes`,
      description: metro.seo.description,
    },
  }
}

export default async function MetroAreaPage({ params }: Props) {
  const { slug } = await params
  const metro = getMetroArea(slug)
  if (!metro) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${metro.name} Vacation Rental Management`,
            provider: {
              '@type': 'Organization',
              name: 'Allura Homes',
              url: 'https://allurahomes.com',
            },
            areaServed: metro.cities.map((c) => ({
              '@type': 'City',
              name: c.name,
            })),
            description: metro.seo.description,
            url: metro.seo.canonical,
          }),
        }}
      />
      <MetroAreaContent metro={metro} />
    </>
  )
}
