'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBookingUrl } from '@/lib/guesty/api'
import { AvailabilityCalendar } from './availability-calendar'
import type { Property } from '@/lib/guesty/types'

interface BookingWidgetProps {
  property: Property
}

interface AvailabilityDay {
  date: string
  status: string
  price?: number
}

interface TaxConfig {
  percentage: number
  maxNights?: number
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [showCalendar, setShowCalendar] = useState(true)
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([])
  const [taxConfig, setTaxConfig] = useState<TaxConfig>({ percentage: 12, maxNights: 30 })

  // Fetch tax configuration from Guesty
  useEffect(() => {
    async function fetchTaxConfig() {
      try {
        const res = await fetch(`/api/guesty/tax/${property.id}`)
        if (res.ok) {
          const data = await res.json()
          if (data.tax) {
            setTaxConfig({
              percentage: data.tax.percentage || 12,
              maxNights: data.tax.maxNights || 30,
            })
          }
        }
      } catch {
        // Use default tax config on error
      }
    }
    fetchTaxConfig()
  }, [property.id])

  const canBook = checkIn && checkOut

  const handleBookNow = () => {
    if (!canBook) return
    const url = getBookingUrl(property.id, checkIn, checkOut, guests)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Format date for display
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Select date'
    const date = new Date(dateStr + 'T12:00:00')
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Calculate number of nights
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // Calculate real dynamic pricing from availability data
  // Sum the actual nightly prices for each selected date
  const { dynamicNightlyTotal, avgNightlyRate } = (() => {
    if (!checkIn || !checkOut || nights === 0 || availabilityDays.length === 0) {
      return { dynamicNightlyTotal: property.pricing.basePrice * nights, avgNightlyRate: property.pricing.basePrice }
    }
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const dayMap = new Map(availabilityDays.map(d => [d.date, d.price]))
    let total = 0
    let count = 0
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0]
      const price = dayMap.get(key) ?? property.pricing.basePrice
      total += price
      count++
    }
    return { dynamicNightlyTotal: total, avgNightlyRate: count > 0 ? Math.round(total / count) : property.pricing.basePrice }
  })()

  const estimatedTotal = nights > 0
    ? dynamicNightlyTotal + (property.pricing.cleaningFee || 0)
    : 0

  // Calculate taxes based on Guesty tax configuration
  // Transient occupancy tax typically does NOT apply to stays over the configured max nights
  const isLongTermStay = taxConfig.maxNights ? nights > taxConfig.maxNights : false
  const taxRate = taxConfig.percentage / 100
  const estimatedTax = isLongTermStay ? 0 : Math.round(estimatedTotal * taxRate * 100) / 100
  const estimatedTotalWithTax = estimatedTotal + estimatedTax

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

      {/* Price Breakdown (when dates selected) */}
      {nights > 0 && (
        <div className="mb-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              ${avgNightlyRate} avg x {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span className="text-foreground">
              ${dynamicNightlyTotal.toFixed(0)}
            </span>
          </div>
          {property.pricing.cleaningFee && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cleaning fee</span>
              <span className="text-foreground">${property.pricing.cleaningFee}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">Subtotal before taxes</span>
            <span className="text-foreground">${estimatedTotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isLongTermStay 
                ? `Taxes (exempt ${taxConfig.maxNights}+ nights)` 
                : `Taxes (~${taxConfig.percentage}%)`}
            </span>
            <span className="text-foreground">
              {isLongTermStay ? '$0.00' : `$${estimatedTax.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border font-semibold">
            <span>Estimated total</span>
            <span>${estimatedTotalWithTax.toFixed(0)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Final price and taxes calculated at checkout
          </p>
        </div>
      )}

      {/* Book Button */}
      <Button
        onClick={handleBookNow}
        disabled={!canBook}
        className="btn-gold w-full h-14 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {canBook ? (
          <>
            Book Now
            <ExternalLink className="size-4" />
          </>
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
          Free cancellation available. You won&apos;t be charged yet.
        </p>
      </div>
    </div>
  )
}
