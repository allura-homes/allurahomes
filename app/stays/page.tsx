import type { Metadata } from 'next'
import { getListings, getAllCities } from '@/lib/guesty/api'
import type { PropertyFilters } from '@/lib/guesty/types'
import { StaysContent } from './content'

export const metadata: Metadata = {
  title: 'Luxury Vacation Rentals | Book Your Stay | Allura Homes',
  description:
    'Browse and book handpicked luxury vacation rentals across California. Professionally managed properties with 5-star hospitality and premium amenities.',
  openGraph: {
    title: 'Luxury Vacation Rentals | Allura Homes',
    description:
      'Discover handpicked luxury vacation homes across California. Book your perfect getaway today.',
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

  return <StaysContent properties={properties} total={total} cities={cities} />
}
