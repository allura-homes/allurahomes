import { NextRequest, NextResponse } from 'next/server'
import {
  getQuote,
  getMockQuote,
  MOCK_MODE,
  type QuoteRequest,
} from '@/lib/guesty/booking-engine'

/**
 * POST /api/guesty/quotes
 * Get a real-time price quote from Guesty Booking Engine API
 * 
 * Request body:
 * {
 *   listingId: string
 *   checkIn: string (YYYY-MM-DD)
 *   checkOut: string (YYYY-MM-DD)
 *   guests: number
 *   ratePlanId?: string
 * }
 * 
 * Response: Quote object with exact pricing breakdown
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { listingId, checkIn, checkOut, guests } = body
    if (!listingId || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['listingId', 'checkIn', 'checkOut', 'guests'],
        },
        { status: 400 }
      )
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(checkIn) || !dateRegex.test(checkOut)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Validate date range
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      )
    }

    const quoteRequest: QuoteRequest = {
      listingId,
      checkIn,
      checkOut,
      guests: Number(guests),
      ratePlanId: body.ratePlanId,
    }

    // Use mock or real API based on environment
    const quote = MOCK_MODE
      ? await getMockQuote(quoteRequest)
      : await getQuote(quoteRequest)

    return NextResponse.json({ quote })
  } catch (error) {
    console.error('[Quote API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to get quote',
        message: error instanceof Error ? error.message : 'Unknown error',
        mockMode: MOCK_MODE,
      },
      { status: 500 }
    )
  }
}
