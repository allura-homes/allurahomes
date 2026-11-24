import { NextRequest, NextResponse } from 'next/server'
import {
  createReservation,
  createMockReservation,
  MOCK_MODE,
  type ReservationRequest,
} from '@/lib/guesty/booking-engine'

/**
 * POST /api/guesty/reservations
 * Create a reservation from a quote with payment
 * 
 * Request body:
 * {
 *   quoteId: string
 *   ratePlanId: string
 *   guest: {
 *     firstName: string
 *     lastName: string
 *     email: string
 *     phone: string
 *   }
 *   paymentToken: string
 *   paymentMethod: 'guesty_pay' | 'stripe'
 *   specialRequests?: string
 * }
 * 
 * Response: Reservation object with confirmation code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { quoteId, ratePlanId, guest, paymentToken, paymentMethod } = body
    if (!quoteId || !ratePlanId || !guest || !paymentToken || !paymentMethod) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: [
            'quoteId',
            'ratePlanId',
            'guest',
            'paymentToken',
            'paymentMethod',
          ],
        },
        { status: 400 }
      )
    }

    // Validate guest fields
    const { firstName, lastName, email, phone } = guest
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        {
          error: 'Missing required guest fields',
          required: ['firstName', 'lastName', 'email', 'phone'],
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate payment method
    if (!['guesty_pay', 'stripe'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method. Must be guesty_pay or stripe' },
        { status: 400 }
      )
    }

    const reservationRequest: ReservationRequest = {
      quoteId,
      ratePlanId,
      guest: {
        firstName,
        lastName,
        email,
        phone,
      },
      paymentToken,
      paymentMethod,
      specialRequests: body.specialRequests,
    }

    // Use mock or real API based on environment
    const reservation = MOCK_MODE
      ? await createMockReservation(reservationRequest)
      : await createReservation(reservationRequest)

    return NextResponse.json({ reservation })
  } catch (error) {
    console.error('[Reservation API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create reservation',
        message: error instanceof Error ? error.message : 'Unknown error',
        mockMode: MOCK_MODE,
      },
      { status: 500 }
    )
  }
}
