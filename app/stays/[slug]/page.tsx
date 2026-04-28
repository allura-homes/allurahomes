import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug, getListings } from '@/lib/guesty/api'
import { PropertyDetailContent } from './content'

// Allow on-demand generation for paths not returned by generateStaticParams
export const dynamicParams = true

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { properties } = await getListings()
    return properties.map((p) => ({ slug: p.slug }))
  } catch {
    // If Guesty API fails at build time, don't pre-generate pages
    // They will be generated on-demand at runtime instead
    return []
  }
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) {
    return { title: 'Property Not Found | Allura Homes' }
  }

  return {
    title: `${property.title} | Allura Homes`,
    description:
      property.description.summary?.slice(0, 160) ||
      `${property.bedrooms} bedroom vacation rental in ${property.location.city}, ${property.location.state}. Sleeps ${property.guests}. Book your luxury getaway today.`,
    openGraph: {
      title: property.title,
      description:
        property.description.summary?.slice(0, 160) ||
        `Luxury vacation rental in ${property.location.city}`,
      images: property.images[0]
        ? [{ url: property.images[0].url, width: 1200, height: 630 }]
        : undefined,
    },
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetailContent property={property} />
}
