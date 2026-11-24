'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Loader2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AvailabilityCalendar } from './availability-calendar'
import { CheckoutModal } from './checkout-modal'
import type { Property } from '@/lib/guesty/types'
import type { Quote } from '@/lib/guesty/booking-engine'
import { trackBeginCheckout } from '@/lib/analytics/gtm'
import { useRouter } from 'next/navigation'

interface BookingWidgetProps {
  property: Property
}

interface AvailabilityDay {
  date: string
  status: string
  price?: number
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [showCalendar, setShowCalendar] = useState(true)
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([])
  
  // Quote state
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const [quoteError, setQuoteError] = useState<string | null>(null)
  
  // Checkout state
  const [showCheckout, setShowCheckout] = useState(false)

  // Fetch real quote when dates change
  useEffect(() => {
    if (!checkIn || !checkOut) {
      setQuote(null)
      setQuoteError(null)
      return
    }

    const fetchQuote = async () => {
      setLoadingQuote(true)
      setQuoteError(null)

      try {
        const res = await fetch('/api/guesty/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            listingId: property.id,
            checkIn,
            checkOut,
            guests,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to get quote')
        }

        setQuote(data.quote)
      } catch (error) {
        console.error('Quote error:', error)
        setQuoteError(
          error instanceof Error
            ? error.message
            : 'Unable to get quote. Please try different dates.'
        )
        setQuote(null)
      } finally {
        setLoadingQuote(false)
      }
    }

    fetchQuote()
  }, [checkIn, checkOut, guests, property.id])

  const canBook = checkIn && checkOut && quote && !loadingQuote

  const handleBookNow = () => {
    if (!canBook) return
    
    // Track GA4 begin_checkout event
    trackBeginCheckout(
      property.id,
      property.title,
      property.location.city,
      property.bedrooms,
      quote.total,
      quote.nights,
      quote.currency
    )
    
    setShowCheckout(true)
  }

  const handleCheckoutComplete = (
    reservationId: string,
    confirmationCode: string
  ) => {
    setShowCheckout(false)
    
    // Navigate to confirmation page with data
    const params = new URLSearchParams({
      reservationId,
      confirmationCode,
      listingId: property.id,
      listingTitle: property.title,
      listingCity: property.location.city,
      bedrooms: String(property.bedrooms),
      checkIn: quote!.checkIn,
      checkOut: quote!.checkOut,
      guests: String(quote!.guests),
      nights: String(quote!.nights),
      total: String(quote!.total),
      currency: quote!.currency,
      guestEmail: 'guest@example.com', // This will be from checkout form
    })
    
    router.push(`/stays/${property.slug}/confirmation?${params}`)
  }

  // Format date for display
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Select date'
    const date = new Date(dateStr + 'T12:00:00')
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-xl">
      {/* Price */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-muted-foreground">from</span>
        <span className="text-3xl font-bold text-foreground">
          ${property.pricing.basePrice}
        </span>
        <span className="text-muted-foreground">/ night</span>
      </div>

      {/* Date Selection Summary */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div 
          className="cursor-pointer rounded-lg border border-border p-3 hover:border-accent transition-colors"
          onClick={() => setShowCalendar(true)}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Check-in
          </p>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span className={checkIn ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {formatDate(checkIn)}
            </span>
          </div>
        </div>
        <div 
          className="cursor-pointer rounded-lg border border-border p-3 hover:border-accent transition-colors"
          onClick={() => setShowCalendar(true)}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Check-out
          </p>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span className={checkOut ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {formatDate(checkOut)}
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Toggle */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full flex items-center justify-center gap-2 text-sm text-accent mb-4 hover:underline"
      >
        {showCalendar ? (
          <>
            <ChevronUp className="size-4" />
            Hide calendar
          </>
        ) : (
          <>
            <ChevronDown className="size-4" />
            Show availability calendar
          </>
        )}
      </button>

      {/* Availability Calendar */}
      {showCalendar && (
        <div className="mb-6 p-4 bg-muted/30 rounded-xl">
          <AvailabilityCalendar
            propertyId={property.id}
            selectedCheckIn={checkIn}
            selectedCheckOut={checkOut}
            onSelectCheckIn={setCheckIn}
            onSelectCheckOut={setCheckOut}
            onAvailabilityLoaded={setAvailabilityDays}
            minNights={property.minNights}
          />
        </div>
      )}

      {/* Guests */}
      <div className="mb-6 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Guests
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full appearance-none rounded-lg border border-border bg-background py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} guest{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Breakdown - Real Quote from Guesty */}
      {loadingQuote && checkIn && checkOut && (
        <div className="mb-6 py-8 flex flex-col items-center justify-center gap-3">
          <Loader2 className="size-6 text-accent animate-spin" />
          <p className="text-sm text-muted-foreground">Getting exact pricing...</p>
        </div>
      )}

      {quoteError && checkIn && checkOut && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700 font-medium">Unable to get quote</p>
            <p className="text-xs text-red-600 mt-1">{quoteError}</p>
          </div>
        </div>
      )}

      {quote && !loadingQuote && (
        <div className="mb-6 space-y-2 text-sm">
          {quote.lineItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="text-foreground">
                ${item.amount.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${quote.subtotal.toFixed(2)}</span>
          </div>
          {quote.taxes > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span className="text-foreground">${quote.taxes.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border font-semibold text-base">
            <span>Total</span>
            <span>${quote.total.toFixed(2)} {quote.currency}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            ✓ Exact pricing from Guesty • No hidden fees
          </p>
        </div>
      )}

      {/* Book Button */}
      <Button
        onClick={handleBookNow}
        disabled={!canBook}
        className="btn-gold w-full h-14 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingQuote ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </>
        ) : canBook ? (
          'Book Now'
        ) : (
          'Select Dates to Book'
        )}
      </Button>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        {property.minNights > 1 && (
          <p className="flex justify-between">
            <span>Minimum stay</span>
            <span className="font-medium text-foreground">
              {property.minNights} nights
            </span>
          </p>
        )}
      </div>

      {/* Reassurance */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          {quote?.cancellationPolicy?.type 
            ? `${quote.cancellationPolicy.type.charAt(0).toUpperCase() + quote.cancellationPolicy.type.slice(1)} cancellation`
            : 'Flexible cancellation available'
          }
        </p>
      </div>

      {/* Checkout Modal */}
      {showCheckout && quote && (
        <CheckoutModal
          property={property}
          quote={quote}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  )
}
