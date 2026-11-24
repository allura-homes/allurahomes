'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Quote } from '@/lib/guesty/booking-engine'
import type { Property } from '@/lib/guesty/types'
import { trackAddPaymentInfo } from '@/lib/analytics/gtm'

interface CheckoutModalProps {
  property: Property
  quote: Quote
  onClose: () => void
  onComplete: (reservationId: string, confirmationCode: string) => void
}

export function CheckoutModal({
  property,
  quote,
  onClose,
  onComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'guest-info' | 'payment' | 'processing'>(
    'guest-info'
  )
  const [error, setError] = useState<string | null>(null)

  // Guest info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Payment info (mock - real Stripe/GuestyPay integration would use tokenization)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [billingZip, setBillingZip] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleGuestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate
    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill in all required fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate payment info
    if (!cardNumber || !cardExpiry || !cardCvv || !billingZip) {
      setError('Please fill in all payment fields')
      return
    }

    // Track payment info submission
    trackAddPaymentInfo(
      property.id,
      property.title,
      property.location.city,
      property.bedrooms,
      quote.total,
      quote.nights,
      'card',
      quote.currency
    )

    setStep('processing')

    try {
      // In real implementation, tokenize payment with Stripe/GuestyPay
      // For now, use mock token
      const paymentToken = `mock_token_${Date.now()}`

      const res = await fetch('/api/guesty/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId: quote.quoteId,
          ratePlanId: quote.ratePlanId,
          guest: {
            firstName,
            lastName,
            email,
            phone,
          },
          paymentToken,
          paymentMethod: 'guesty_pay', // or 'stripe' based on config
          specialRequests,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create reservation')
      }

      const { reservation } = data
      onComplete(reservation.reservationId, reservation.confirmationCode)
    } catch (err) {
      console.error('Reservation error:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to complete booking. Please try again.'
      )
      setStep('payment')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Complete Your Booking</h2>
          <button
            onClick={onClose}
            disabled={step === 'processing'}
            className="p-2 hover:bg-muted rounded-full transition-colors disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded-full flex items-center justify-center ${
                  step === 'guest-info'
                    ? 'bg-accent text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {step === 'guest-info' ? '1' : <Check className="size-4" />}
              </div>
              <span className="text-sm font-medium">Guest Info</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded-full flex items-center justify-center ${
                  step === 'payment' || step === 'processing'
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Booking Summary */}
        <div className="px-6 py-4 bg-muted/30">
          <h3 className="font-semibold mb-2">{property.title}</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              {new Date(quote.checkIn).toLocaleDateString()} -{' '}
              {new Date(quote.checkOut).toLocaleDateString()}
            </p>
            <p>
              {quote.nights} night{quote.nights !== 1 ? 's' : ''} ·{' '}
              {quote.guests} guest{quote.guests !== 1 ? 's' : ''}
            </p>
            <p className="font-semibold text-foreground pt-2">
              Total: ${quote.total.toFixed(2)} {quote.currency}
            </p>
          </div>
        </div>

        {/* Guest Info Form */}
        {step === 'guest-info' && (
          <form onSubmit={handleGuestInfoSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-5555"
                required
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Early check-in, crib, high chair, etc."
                rows={3}
              />
            </div>

            {/* Cancellation Policy */}
            {quote.cancellationPolicy && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">
                  Cancellation Policy
                </h4>
                <p className="text-sm text-muted-foreground">
                  {quote.cancellationPolicy.description}
                </p>
              </div>
            )}

            <Button type="submit" className="btn-gold w-full h-12">
              Continue to Payment
            </Button>
          </form>
        )}

        {/* Payment Form */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
            <div>
              <Label htmlFor="cardNumber">
                Card Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="cardExpiry">
                  Expiry <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cardCvv">
                  CVV <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cardCvv"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="billingZip">
                Billing ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="billingZip"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
                placeholder="92104"
                required
              />
            </div>

            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">
                Secure Payment
              </p>
              <p>
                Your payment information is encrypted and secure. You will be
                charged ${quote.total.toFixed(2)} {quote.currency}.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep('guest-info')}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="btn-gold flex-1 h-12">
                Complete Booking
              </Button>
            </div>
          </form>
        )}

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="size-12 text-accent animate-spin" />
            <h3 className="text-xl font-semibold">Processing Your Booking</h3>
            <p className="text-muted-foreground text-center">
              Please wait while we confirm your reservation...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
