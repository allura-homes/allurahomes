// ─── Guesty API Types ────────────────────────────────────────

export interface GuestyListing {
  _id: string
  title: string
  nickname?: string
  propertyType: string
  roomType?: string
  accommodates: number
  bedrooms: number
  beds: number
  bathrooms: number
  address: {
    full: string
    street: string
    city: string
    state: string
    zipcode: string
    country: string
    lat: number
    lng: number
  }
  pictures: Array<{
    _id: string
    original: string
    thumbnail: string
    caption?: string
  }>
  amenities: string[]
  publicDescription?: {
    summary?: string
    space?: string
    access?: string
    neighborhood?: string
    transit?: string
    notes?: string
    houseRules?: string
  }
  prices: {
    basePrice: number
    weeklyPriceFactor?: number
    monthlyPriceFactor?: number
    currency: string
    cleaningFee?: number
  }
  terms?: {
    minNights?: number
    maxNights?: number
    cancellation?: string
  }
  customFields?: Array<{
    fieldId: string
    value: string | number | boolean
  }>
  // Video tour and 3D tour custom fields
  videoTourUrl?: string
  matterportUrl?: string
  active: boolean
  listed: boolean
  createdAt: string
  updatedAt: string
}

export interface GuestyCalendarDay {
  date: string
  status: 'available' | 'booked' | 'blocked'
  price?: number
  minNights?: number
}

export interface GuestyListingsResponse {
  results: GuestyListing[]
  count: number
  limit: number
  skip: number
}

// ─── Normalized Types for UI ─────────────────────────────────

export interface Property {
  id: string
  slug: string
  title: string
  nickname: string
  propertyType: string
  location: {
    full: string
    city: string
    state: string
    lat: number
    lng: number
  }
  guests: number
  bedrooms: number
  beds: number
  bathrooms: number
  images: Array<{
    id: string
    url: string
    thumbnail: string
    caption?: string
  }>
  amenities: string[]
  description: {
    summary: string
    space?: string
    access?: string
    neighborhood?: string
    houseRules?: string
  }
  pricing: {
    basePrice: number
    currency: string
    cleaningFee?: number
  }
  minNights: number
  maxNights?: number
  cancellationPolicy?: string
  videoTourUrl?: string
  matterportUrl?: string
  isGuestFavorite?: boolean
  tax?: {
    percentage: number
    minNights?: number
    maxNights?: number
  }
  // Bedroom data for "Where you'll sleep" section
  listingRooms?: Array<{
    id: string
    roomNumber: number
    beds: Array<{
      type: string
      quantity: number
    }>
  }>
}

export interface PropertyFilters {
  city?: string
  minGuests?: number
  minBedrooms?: number
  checkIn?: string
  checkOut?: string
  sortBy?: 'price-asc' | 'price-desc' | 'bedrooms' | 'guests'
}
