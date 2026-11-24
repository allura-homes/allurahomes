'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, Calendar, Users, MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackPurchase } from '@/lib/analytics/gtm'

interface ConfirmationData {
  reservationId: string
  confirmationCode: string
  listingId: string
  listingTitle: string
  listingCity: string
  bedrooms: number
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  total: number
  currency: string
  guestEmail: string
}

export function ConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<ConfirmationData | null>(null)

  useEffect(() => {
    // Parse confirmation data from URL params
    const reservationId = searchParams.get('reservationId')
    const confirmationCode = searchParams.get('confirmationCode')
    const listingId = searchParams.get('listingId')
    const listingTitle = searchParams.get('listingTitle')
    const listingCity = searchParams.get('listingCity')
    const bedrooms = searchParams.get('bedrooms')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')
    const nights = searchParams.get('nights')
    const total = searchParams.get('total')
    const currency = searchParams.get('currency') || 'USD'
    const guestEmail = searchParams.get('guestEmail')

    if (
      !reservationId ||
      !confirmationCode ||
      !listingId ||
      !listingTitle ||
      !listingCity ||
      !bedrooms ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !nights ||
      !total ||
      !guestEmail
    ) {
      // Missing data, redirect to stays
      router.push('/stays')
      return
    }

    const confirmationData: ConfirmationData = {
      reservationId,
      confirmationCode,
      listingId,
      listingTitle,
      listingCity,
      bedrooms: Number(bedrooms),
      checkIn,
      checkOut,
      guests: Number(guests),
      nights: Number(nights),
      total: Number(total),
      currency,
      guestEmail,
    }

    setData(confirmationData)

    // Track GA4 purchase event (once per transaction)
    trackPurchase(
      confirmationCode, // Use confirmation code as transaction ID
      listingId,
      listingTitle,
      listingCity,
      Number(bedrooms),
      Number(total),
      Number(nights),
      currency
    )
  }, [searchParams, router])

  if (!data) {
    return null
  }

  const checkInDate = new Date(data.checkIn)
  const checkOutDate = new Date(data.checkOut)

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 mb-8 text-center">
          <div className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Your reservation has been successfully processed
          </p>
          <div className="inline-block bg-white px-6 py-3 rounded-lg border-2 border-green-500">
            <p className="text-sm text-muted-foreground mb-1">
              Confirmation Code
            </p>
            <p className="text-2xl font-bold text-green-700">
              {data.confirmationCode}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{data.listingTitle}</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Calendar className="size-5 text-accent mt-1" />
              <div>
                <p className="font-semibold">Check-in & Check-out</p>
                <p className="text-muted-foreground">
                  {checkInDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {checkOutDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.nights} night{data.nights !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="size-5 text-accent mt-1" />
              <div>
                <p className="font-semibold">Guests</p>
                <p className="text-muted-foreground">
                  {data.guests} guest{data.guests !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="size-5 text-accent mt-1" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-muted-foreground">{data.listingCity}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Paid</span>
              <span className="text-2xl font-bold text-accent">
                ${data.total.toFixed(2)} {data.currency}
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">What&apos;s Next?</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">
                  Confirmation Email
                </p>
                <p className="text-sm">
                  We&apos;ve sent a detailed confirmation to{' '}
                  <span className="font-medium text-foreground">
                    {data.guestEmail}
                  </span>
                  . Check your inbox for check-in instructions and property
                  details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">
                  Need Assistance?
                </p>
                <p className="text-sm">
                  Our team is here to help! Contact us at{' '}
                  <a
                    href="tel:+18582449400"
                    className="font-medium text-accent hover:underline"
                  >
                    (858) 244-9400
                  </a>{' '}
                  or reply to your confirmation email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/stays')}
            variant="outline"
            className="flex-1 h-12"
          >
            Browse More Properties
          </Button>
          <Button
            onClick={() => window.print()}
            className="btn-gold flex-1 h-12"
          >
            Print Confirmation
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-6 bg-muted/30 rounded-xl text-center text-sm text-muted-foreground">
          <p>
            Managed by{' '}
            <span className="font-semibold text-foreground">
              Allura Homes LLC
            </span>
          </p>
          <p className="mt-1">3643 Grim Avenue, San Diego, CA 92104</p>
        </div>
      </div>
    </div>
  )
}
