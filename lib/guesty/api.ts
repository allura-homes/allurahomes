import { neon } from '@neondatabase/serverless'
import type {
  GuestyListing,
  GuestyListingsResponse,
  GuestyCalendarDay,
  Property,
  PropertyFilters,
} from './types'

// ─── OAuth2 Token Management with Persistent Neon Cache ───────

const GUESTY_AUTH_URL = 'https://open-api.guesty.com/oauth2/token'
const GUESTY_API_URL = 'https://open-api.guesty.com/v1'
const TOKEN_CACHE_KEY = 'guesty_access_token'

// In-memory cache for current request lifecycle
let memoryCache: { accessToken: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // 1. Check in-memory cache first (same request/warm function)
  if (memoryCache && memoryCache.expiresAt > Date.now() + 5 * 60 * 1000) {
    return memoryCache.accessToken
  }

  const sql = neon(process.env.DATABASE_URL!)

  // 2. Check persistent Neon cache (survives cold starts)
  // Table schema: id (text), access_token (text), expires_at (bigint - Unix ms)
  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000
  const cached = await sql`
    SELECT access_token, expires_at 
    FROM guesty_token_cache 
    WHERE id = ${TOKEN_CACHE_KEY}
    AND expires_at > ${fiveMinutesFromNow}
    LIMIT 1
  `

  if (cached.length > 0) {
    const { access_token, expires_at } = cached[0]
    memoryCache = {
      accessToken: access_token,
      expiresAt: Number(expires_at),
    }
    return access_token
  }

  // 3. Fetch new token from Guesty
  const clientId = process.env.GUESTY_CLIENT_ID
  const clientSecret = process.env.GUESTY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Guesty credentials not configured')
  }

  const res = await fetch(GUESTY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'open-api',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[Guesty] Token request failed:', res.status, error)
    throw new Error(`Guesty auth failed: ${res.status}`)
  }

  const data = await res.json()
  const expiresAtMs = Date.now() + (data.expires_in - 60) * 1000

  // 4. Store in Neon for persistence across cold starts
  // Table schema: id (text PK), access_token (text), expires_at (bigint - Unix ms)
  await sql`
    INSERT INTO guesty_token_cache (id, access_token, expires_at)
    VALUES (${TOKEN_CACHE_KEY}, ${data.access_token}, ${expiresAtMs})
    ON CONFLICT (id) DO UPDATE SET
      access_token = EXCLUDED.access_token,
      expires_at = EXCLUDED.expires_at,
      updated_at = NOW()
  `

  // 5. Update in-memory cache
  memoryCache = {
    accessToken: data.access_token,
    expiresAt: expiresAtMs,
  }

  return data.access_token
}

// ─── API Fetcher ─────────────────────────────────────────────

async function guestyFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T | null> {
  try {
    const token = await getAccessToken()
    const url = new URL(`${GUESTY_API_URL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        url.searchParams.set(key, String(val))
      })
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      next: { revalidate: 300 }, // 5-minute cache
    })

    if (!res.ok) {
      console.error('[Guesty] API error:', res.status, endpoint)
      return null
    }

    return res.json()
  } catch (err) {
    console.error('[Guesty] Fetch error:', err)
    return null
  }
}

// ─── Normalizers ─────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizeListing(listing: GuestyListing): Property {
  // Extract listing rooms (bedroom data with bed types)
  const listingRooms = (listing as any).listingRooms as Array<{
    _id: string
    roomNumber: number
    beds: Array<{ type: string; quantity: number }>
  }> | undefined
  
  // Look for video/3D tour in custom fields
  let videoTourUrl = listing.videoTourUrl
  let matterportUrl = listing.matterportUrl

  if (listing.customFields) {
    for (const field of listing.customFields) {
      const value = String(field.value || '')
      if (value.includes('matterport') || value.includes('my.matterport')) {
        matterportUrl = value
      } else if (
        value.includes('youtube') ||
        value.includes('vimeo') ||
        value.includes('.mp4') ||
        value.includes('.mov')
      ) {
        videoTourUrl = value
      }
    }
  }

  return {
    id: listing._id,
    slug: slugify(listing.nickname || listing.title),
    title: listing.title,
    nickname: listing.nickname || listing.title,
    propertyType: listing.propertyType,
    location: {
      full: listing.address.full,
      city: listing.address.city,
      state: listing.address.state,
      lat: listing.address.lat,
      lng: listing.address.lng,
    },
    guests: listing.accommodates,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    bathrooms: listing.bathrooms,
    images: listing.pictures.map((pic) => ({
      id: pic._id,
      url: pic.original,
      thumbnail: pic.thumbnail,
      caption: pic.caption,
    })),
    amenities: listing.amenities || [],
    description: {
      summary: listing.publicDescription?.summary || '',
      space: listing.publicDescription?.space,
      access: listing.publicDescription?.access,
      neighborhood: listing.publicDescription?.neighborhood,
      houseRules: listing.publicDescription?.houseRules,
    },
    pricing: {
      basePrice: listing.prices.basePrice,
      currency: listing.prices.currency || 'USD',
      cleaningFee: listing.prices.cleaningFee,
    },
    minNights: listing.terms?.minNights || 1,
    maxNights: listing.terms?.maxNights,
    cancellationPolicy: listing.terms?.cancellation,
    videoTourUrl,
    matterportUrl,
    // Mark as guest favorite if property has high-quality attributes
    // (4+ bedrooms, premium amenities, or top-rated)
    isGuestFavorite: listing.bedrooms >= 4 || listing.accommodates >= 8,
    // Bedroom data with bed types for "Where you'll sleep" section
    listingRooms: listingRooms?.filter(room => 
      // Only include rooms with beds (actual bedrooms, not bathrooms)
      room.beds && room.beds.length > 0
    ).map(room => ({
      id: room._id,
      roomNumber: room.roomNumber,
      beds: room.beds.map(bed => ({
        type: bed.type,
        quantity: bed.quantity,
      })),
    })) || [],
  }
}

// ─── Public API Functions ────────────────────────────────────

export async function getListings(
  filters?: PropertyFilters
): Promise<{ properties: Property[]; total: number }> {
  const params: Record<string, string | number> = {
    limit: 50,
    skip: 0,
    active: 'true',
    listed: 'true',
  }

  // Add city filter if provided
  if (filters?.city) {
    params['address.city'] = filters.city
  }

  const data = await guestyFetch<GuestyListingsResponse>('/listings', params)

  if (!data) {
    return { properties: [], total: 0 }
  }

  let properties = data.results.map(normalizeListing)

  // Client-side filtering for guests/bedrooms (Guesty doesn't support these filters)
  if (filters?.minGuests) {
    properties = properties.filter((p) => p.guests >= filters.minGuests!)
  }
  if (filters?.minBedrooms) {
    properties = properties.filter((p) => p.bedrooms >= filters.minBedrooms!)
  }

  // Sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        properties.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice)
        break
      case 'price-desc':
        properties.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice)
        break
      case 'bedrooms':
        properties.sort((a, b) => b.bedrooms - a.bedrooms)
        break
      case 'guests':
        properties.sort((a, b) => b.guests - a.guests)
        break
    }
  }

  return { properties, total: data.count }
}

export async function getListingById(id: string): Promise<Property | null> {
  const data = await guestyFetch<GuestyListing>(`/listings/${id}`)
  if (!data) return null
  return normalizeListing(data)
}

export async function getListingBySlug(slug: string): Promise<Property | null> {
  // Fetch all listings and find by slug (Guesty doesn't support slug lookup)
  const { properties } = await getListings()
  return properties.find((p) => p.slug === slug) || null
}

export async function getListingAvailability(
  listingId: string,
  startDate: string,
  endDate: string
): Promise<GuestyCalendarDay[]> {
  try {
    const data = await guestyFetch<{ data?: { days?: GuestyCalendarDay[] } }>(
      `/availability-pricing/api/calendar/listings/${listingId}`,
      { startDate, endDate }
    )
    // Guesty returns { data: { days: [...] } }
    return data?.data?.days || []
  } catch (error) {
    // If availability fetch fails, return empty array - calendar will show all dates as available
    // (User can still book, Guesty checkout will validate actual availability)
    console.error('[Guesty] Availability fetch failed for listing:', listingId, error)
    return []
  }
}

export async function getAllCities(): Promise<string[]> {
  const { properties } = await getListings()
  const cities = [...new Set(properties.map((p) => p.location.city))]
  return cities.filter(Boolean).sort()
}

// ─── Booking URL Generator ───────────────────────────────────

// ─── Tax Configuration ───────────────────────────────────────

interface GuestyTaxConfig {
  taxes?: Array<{
    type: string
    amount: number
    units: 'percentage' | 'fixed'
    conditionalOverrides?: Array<{
      conditions: {
        minNights?: number
        maxNights?: number
      }
      values: {
        amount?: number
        isDisabled?: boolean
      }
    }>
  }>
}

export async function getListingTaxConfig(
  listingId: string
): Promise<{ percentage: number; minNights?: number; maxNights?: number } | null> {
  try {
    const data = await guestyFetch<GuestyTaxConfig>(
      `/taxes/unit-type/${listingId}/actual`
    )
    
    if (!data?.taxes?.length) return null
    
    // Find the percentage-based tax (transient occupancy tax)
    const percentageTax = data.taxes.find(t => t.units === 'percentage')
    if (!percentageTax) return null
    
    // Check for conditional overrides (e.g., no tax over 30 nights)
    let maxNightsExempt: number | undefined
    if (percentageTax.conditionalOverrides) {
      for (const override of percentageTax.conditionalOverrides) {
        if (override.values.isDisabled && override.conditions.minNights) {
          // If tax is disabled starting at N nights, exempt stays >= N nights
          maxNightsExempt = override.conditions.minNights - 1
          break
        }
      }
    }
    
    return {
      percentage: percentageTax.amount,
      maxNights: maxNightsExempt,
    }
  } catch (error) {
    console.error('[Guesty] Tax config fetch failed for listing:', listingId, error)
    // Default to 12% with 30-night exemption for California properties
    return { percentage: 12, maxNights: 30 }
  }
}

export function getBookingUrl(
  listingId: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number
): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_GUESTY_BOOKING_URL ||
    'https://reservations.allurahomes.com'

  // Guesty booking engine URL format (goes directly to checkout with dates pre-filled)
  // /en/properties/{id} with checkIn/checkOut pre-selects dates and goes to checkout
  const url = new URL(`${baseUrl}/en/properties/${listingId}`)
  url.searchParams.set('minOccupancy', String(guests || 1))
  if (checkIn) url.searchParams.set('checkIn', checkIn)
  if (checkOut) url.searchParams.set('checkOut', checkOut)

  return url.toString()
}
