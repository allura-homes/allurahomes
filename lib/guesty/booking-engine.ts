import { neon } from '@neondatabase/serverless'

// ─── Guesty Booking Engine API Integration ───────────────────
// Documentation: https://booking-api-docs.guesty.com/docs/booking-flow
// Migration guide: https://open-api-docs.guesty.com/docs/moving-your-website-from-guestys-legacy-api-to-booking-engine-api

const GUESTY_BE_AUTH_URL = 'https://booking-api.guesty.com/oauth2/token'
const GUESTY_BE_API_URL = 'https://booking-api.guesty.com/api'
const BE_TOKEN_CACHE_KEY = 'guesty_be_access_token'

// In-memory cache for current request lifecycle
let beMemoryCache: { accessToken: string; expiresAt: number } | null = null

// ─── Types ────────────────────────────────────────────────────

export interface BookingEngineListingSearchParams {
  checkIn: string // YYYY-MM-DD
  checkOut: string // YYYY-MM-DD
  guests: number
  listingIds?: string[]
}

export interface BookingEngineListingResult {
  id: string
  title: string
  images: Array<{ url: string; caption?: string }>
  accommodates: number
  bedrooms: number
  bathrooms: number
  address: {
    city: string
    state: string
    country: string
  }
  available: boolean
  ratePlans: Array<{
    id: string
    name: string
    totalPrice: number
    currency: string
  }>
}

export interface QuoteRequest {
  listingId: string
  checkIn: string // YYYY-MM-DD
  checkOut: string // YYYY-MM-DD
  guests: number
  ratePlanId?: string
}

export interface QuoteLineItem {
  type: 'nightly' | 'cleaning' | 'fee' | 'tax' | 'discount'
  name: string
  amount: number
  quantity?: number
  currency: string
}

export interface Quote {
  quoteId: string
  listingId: string
  ratePlanId: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  lineItems: QuoteLineItem[]
  subtotal: number
  taxes: number
  total: number
  currency: string
  cancellationPolicy?: {
    type: string
    description: string
    refundableUntil?: string
  }
  expiresAt: string
}

export interface ReservationRequest {
  quoteId: string
  ratePlanId: string
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  paymentToken: string
  paymentMethod: 'guesty_pay' | 'stripe'
  specialRequests?: string
}

export interface Reservation {
  reservationId: string
  confirmationCode: string
  status: 'confirmed' | 'pending' | 'failed'
  listingId: string
  checkIn: string
  checkOut: string
  guests: number
  total: number
  currency: string
  guestEmail: string
}

// ─── OAuth2 Token Management ──────────────────────────────────

async function getBookingEngineToken(): Promise<string> {
  // 1. Check in-memory cache first
  if (beMemoryCache && beMemoryCache.expiresAt > Date.now() + 5 * 60 * 1000) {
    return beMemoryCache.accessToken
  }

  const sql = neon(process.env.DATABASE_URL!)

  // 2. Check persistent Neon cache
  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000
  const cached = await sql`
    SELECT access_token, expires_at 
    FROM guesty_token_cache 
    WHERE id = ${BE_TOKEN_CACHE_KEY}
    AND expires_at > ${fiveMinutesFromNow}
    LIMIT 1
  `

  if (cached.length > 0) {
    const { access_token, expires_at } = cached[0]
    beMemoryCache = {
      accessToken: access_token,
      expiresAt: Number(expires_at),
    }
    return access_token
  }

  // 3. Fetch new token from Guesty Booking Engine API
  const clientId = process.env.GUESTY_BE_CLIENT_ID
  const clientSecret = process.env.GUESTY_BE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Guesty Booking Engine credentials not configured')
  }

  const res = await fetch(GUESTY_BE_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[Guesty BE] Token request failed:', res.status, error)
    throw new Error(`Guesty Booking Engine auth failed: ${res.status}`)
  }

  const data = await res.json()
  const expiresAtMs = Date.now() + (data.expires_in - 60) * 1000

  // 4. Store in Neon
  await sql`
    INSERT INTO guesty_token_cache (id, access_token, expires_at)
    VALUES (${BE_TOKEN_CACHE_KEY}, ${data.access_token}, ${expiresAtMs})
    ON CONFLICT (id) DO UPDATE SET
      access_token = EXCLUDED.access_token,
      expires_at = EXCLUDED.expires_at,
      updated_at = NOW()
  `

  // 5. Update in-memory cache
  beMemoryCache = {
    accessToken: data.access_token,
    expiresAt: expiresAtMs,
  }

  return data.access_token
}

// ─── API Fetcher ──────────────────────────────────────────────

async function bookingEngineFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = await getBookingEngineToken()
  const url = `${GUESTY_BE_API_URL}${endpoint}`

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[Guesty BE] API error:', res.status, endpoint, error)
    throw new Error(`Guesty Booking Engine API error: ${res.status}`)
  }

  return res.json()
}

// ─── Public API Functions ─────────────────────────────────────

/**
 * Search listings with availability for given dates and guest count
 */
export async function searchListings(
  params: BookingEngineListingSearchParams
): Promise<BookingEngineListingResult[]> {
  const query = new URLSearchParams({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: String(params.guests),
  })

  if (params.listingIds?.length) {
    params.listingIds.forEach((id) => query.append('listingIds', id))
  }

  const response = await bookingEngineFetch<{
    results: BookingEngineListingResult[]
  }>(`/listings/search?${query}`)

  return response.results
}

/**
 * Get a real-time quote with exact pricing breakdown
 * This is the source of truth for all pricing displayed to guests
 */
export async function getQuote(request: QuoteRequest): Promise<Quote> {
  const response = await bookingEngineFetch<{
    quoteId: string
    ratePlanId: string
    pricing: {
      nightlyRates: Array<{ date: string; amount: number }>
      cleaningFee: number
      fees: Array<{ name: string; amount: number }>
      taxes: Array<{ name: string; amount: number }>
      subtotal: number
      taxesTotal: number
      total: number
      currency: string
    }
    cancellationPolicy?: {
      type: string
      description: string
      refundableUntil?: string
    }
    expiresAt: string
  }>('/reservations/quotes', {
    method: 'POST',
    body: JSON.stringify({
      listingId: request.listingId,
      checkIn: request.checkIn,
      checkOut: request.checkOut,
      guests: request.guests,
      ratePlanId: request.ratePlanId,
    }),
  })

  // Normalize to our Quote format
  const lineItems: QuoteLineItem[] = []

  // Nightly rates
  if (response.pricing.nightlyRates?.length) {
    const totalNightly = response.pricing.nightlyRates.reduce(
      (sum, day) => sum + day.amount,
      0
    )
    lineItems.push({
      type: 'nightly',
      name: `${response.pricing.nightlyRates.length} nights`,
      amount: totalNightly,
      quantity: response.pricing.nightlyRates.length,
      currency: response.pricing.currency,
    })
  }

  // Cleaning fee
  if (response.pricing.cleaningFee > 0) {
    lineItems.push({
      type: 'cleaning',
      name: 'Cleaning fee',
      amount: response.pricing.cleaningFee,
      currency: response.pricing.currency,
    })
  }

  // Additional fees
  response.pricing.fees?.forEach((fee) => {
    lineItems.push({
      type: 'fee',
      name: fee.name,
      amount: fee.amount,
      currency: response.pricing.currency,
    })
  })

  // Taxes
  response.pricing.taxes?.forEach((tax) => {
    lineItems.push({
      type: 'tax',
      name: tax.name,
      amount: tax.amount,
      currency: response.pricing.currency,
    })
  })

  const nights = response.pricing.nightlyRates?.length || 0

  return {
    quoteId: response.quoteId,
    listingId: request.listingId,
    ratePlanId: response.ratePlanId,
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    guests: request.guests,
    nights,
    lineItems,
    subtotal: response.pricing.subtotal,
    taxes: response.pricing.taxesTotal,
    total: response.pricing.total,
    currency: response.pricing.currency,
    cancellationPolicy: response.cancellationPolicy,
    expiresAt: response.expiresAt,
  }
}

/**
 * Create a reservation from a quote with payment
 */
export async function createReservation(
  request: ReservationRequest
): Promise<Reservation> {
  const response = await bookingEngineFetch<{
    reservationId: string
    confirmationCode: string
    status: string
    listing: {
      id: string
    }
    checkIn: string
    checkOut: string
    guests: number
    payment: {
      total: number
      currency: string
    }
    guest: {
      email: string
    }
  }>('/reservations', {
    method: 'POST',
    body: JSON.stringify({
      quoteId: request.quoteId,
      ratePlanId: request.ratePlanId,
      guest: request.guest,
      payment: {
        token: request.paymentToken,
        method: request.paymentMethod,
      },
      specialRequests: request.specialRequests,
    }),
  })

  return {
    reservationId: response.reservationId,
    confirmationCode: response.confirmationCode,
    status: response.status as 'confirmed' | 'pending' | 'failed',
    listingId: response.listing.id,
    checkIn: response.checkIn,
    checkOut: response.checkOut,
    guests: response.guests,
    total: response.payment.total,
    currency: response.payment.currency,
    guestEmail: response.guest.email,
  }
}

/**
 * Mock implementations for development/testing without real credentials
 */
export const MOCK_MODE = !process.env.GUESTY_BE_CLIENT_ID

export async function getMockQuote(request: QuoteRequest): Promise<Quote> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const checkInDate = new Date(request.checkIn)
  const checkOutDate = new Date(request.checkOut)
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Generate realistic pricing
  const baseNightlyRate = 250 + Math.floor(Math.random() * 150)
  const nightlyTotal = baseNightlyRate * nights
  const cleaningFee = 150
  const subtotal = nightlyTotal + cleaningFee

  // Tax calculation (12% for stays under 30 nights in CA)
  const taxRate = nights >= 30 ? 0 : 0.12
  const taxes = Math.round(subtotal * taxRate * 100) / 100
  const total = subtotal + taxes

  const lineItems: QuoteLineItem[] = [
    {
      type: 'nightly',
      name: `${nights} nights`,
      amount: nightlyTotal,
      quantity: nights,
      currency: 'USD',
    },
    {
      type: 'cleaning',
      name: 'Cleaning fee',
      amount: cleaningFee,
      currency: 'USD',
    },
  ]

  if (taxes > 0) {
    lineItems.push({
      type: 'tax',
      name: 'Transient Occupancy Tax (12%)',
      amount: taxes,
      currency: 'USD',
    })
  }

  return {
    quoteId: `mock-quote-${Date.now()}`,
    listingId: request.listingId,
    ratePlanId: request.ratePlanId || 'default-rate-plan',
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    guests: request.guests,
    nights,
    lineItems,
    subtotal,
    taxes,
    total,
    currency: 'USD',
    cancellationPolicy: {
      type: 'flexible',
      description:
        'Free cancellation up to 48 hours before check-in. After that, 50% refund if cancelled 7+ days before check-in.',
      refundableUntil: new Date(
        checkInDate.getTime() - 48 * 60 * 60 * 1000
      ).toISOString(),
    },
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
  }
}

export async function createMockReservation(
  request: ReservationRequest
): Promise<Reservation> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Parse quote ID to extract dates (from getMockQuote format)
  const confirmationCode = `ALH${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return {
    reservationId: `mock-reservation-${Date.now()}`,
    confirmationCode,
    status: 'confirmed',
    listingId: 'mock-listing',
    checkIn: '2026-12-01',
    checkOut: '2026-12-05',
    guests: 2,
    total: 1250,
    currency: 'USD',
    guestEmail: request.guest.email,
  }
}
