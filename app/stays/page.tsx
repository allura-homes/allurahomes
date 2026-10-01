import type { Metadata } from 'next'
import { SHARE_IMAGE } from '@/lib/seo'
import { getListings, getAllCities } from '@/lib/guesty/api'
import type { PropertyFilters } from '@/lib/guesty/types'
import { StaysContent } from './content'

export const metadata: Metadata = {
  title: 'Boutique Vacation Rentals | Book Your Stay | Allura Homes',
  description:
    'Browse and book handpicked boutique vacation rentals across California. Professionally managed properties with 5-star hospitality and premium amenities.',
  alternates: { canonical: 'https://www.allurahomes.com/stays' },
  openGraph: {
    images: [SHARE_IMAGE],
    title: 'Boutique Vacation Rentals | Allura Homes',
    description:
      'Discover handpicked boutique vacation homes across California. Book your perfect getaway today.',
  },
}

interface StaysPageProps {
  searchParams: Promise<{
    city?: string
    guests?: string
    bedrooms?: string
    sort?: string
    checkIn?: string
    checkOut?: string
  }>
}

export default async function StaysPage({ searchParams }: StaysPageProps) {
  const params = await searchParams

  const filters: PropertyFilters = {
    city: params.city,
    minGuests: params.guests ? Number(params.guests) : undefined,
    minBedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
    sortBy: params.sort as PropertyFilters['sortBy'],
    checkIn: params.checkIn,
    checkOut: params.checkOut,
  }

  const [{ properties, total }, cities] = await Promise.all([
    getListings(filters),
    getAllCities(),
  ])

  const propertyCards = properties.map(property => ({ ...property, description: { summary: '' } }))
  return <StaysContent properties={propertyCards} total={total} cities={cities} />
}
