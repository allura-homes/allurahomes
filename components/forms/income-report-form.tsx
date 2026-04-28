'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  propertyAddress: z.string().min(5, 'Property address is required'),
  propertyType: z.string().min(1, 'Please select a property type'),
  currentlyManaged: z.string().optional(),
  referralSource: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const inputClasses =
  'w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20'
const labelClasses = 'mb-1.5 block text-sm font-medium text-foreground'
const errorClasses = 'mt-1 text-xs text-destructive'

export function IncomeReportForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/income-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          propertyAddress: data.propertyAddress,
          bedrooms: data.propertyType,
          currentlyListed: data.currentlyManaged,
          currentPlatform: data.referralSource,
        }),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-xl border border-gold/20 bg-card p-12 text-center">
        <CheckCircle2 className="mb-4 size-16 text-gold" />
        <h3
          className="font-headline text-2xl font-semibold uppercase tracking-wider text-navy-deep"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          Thank You!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          {"We've received your request. Our team will prepare your custom income report and reach out within 24 hours."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            id="firstName"
            placeholder="John"
            className={cn(inputClasses, errors.firstName && 'border-destructive')}
            {...register('firstName')}
          />
          {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name <span className="text-destructive">*</span>
          </label>
          <input
            id="lastName"
            placeholder="Smith"
            className={cn(inputClasses, errors.lastName && 'border-destructive')}
            {...register('lastName')}
          />
          {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={cn(inputClasses, errors.email && 'border-destructive')}
            {...register('email')}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(619) 555-0123"
            className={cn(inputClasses, errors.phone && 'border-destructive')}
            {...register('phone')}
          />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="propertyAddress" className={labelClasses}>
          Property Address <span className="text-destructive">*</span>
        </label>
        <input
          id="propertyAddress"
          placeholder="123 Ocean Blvd, San Diego, CA 92109"
          className={cn(inputClasses, errors.propertyAddress && 'border-destructive')}
          {...register('propertyAddress')}
        />
        {errors.propertyAddress && <p className={errorClasses}>{errors.propertyAddress.message}</p>}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="propertyType" className={labelClasses}>
            Property Type <span className="text-destructive">*</span>
          </label>
          <select
            id="propertyType"
            className={cn(inputClasses, errors.propertyType && 'border-destructive')}
            defaultValue=""
            {...register('propertyType')}
          >
            <option value="" disabled>Select type...</option>
            <option value="single-family">Single Family Home</option>
            <option value="condo">Condo / Townhouse</option>
            <option value="multi-unit">Multi-Unit</option>
            <option value="luxury-estate">Luxury Estate</option>
            <option value="cabin">Cabin / Mountain Home</option>
            <option value="other">Other</option>
          </select>
          {errors.propertyType && <p className={errorClasses}>{errors.propertyType.message}</p>}
        </div>
        <div>
          <label htmlFor="currentlyManaged" className={labelClasses}>
            Currently Managed?
          </label>
          <select
            id="currentlyManaged"
            className={inputClasses}
            defaultValue=""
            {...register('currentlyManaged')}
          >
            <option value="">Select...</option>
            <option value="self">Self-managing</option>
            <option value="other-manager">Another management company</option>
            <option value="not-renting">Not currently renting</option>
            <option value="new-purchase">New purchase / considering STR</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="referralSource" className={labelClasses}>
          How Did You Hear About Us?
        </label>
        <select
          id="referralSource"
          className={inputClasses}
          defaultValue=""
          {...register('referralSource')}
        >
          <option value="">Select...</option>
          <option value="google">Google Search</option>
          <option value="referral">Referral / Word of Mouth</option>
          <option value="social">Social Media</option>
          <option value="airbnb">Airbnb / VRBO</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClasses}>
          Anything Else We Should Know?
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Tell us about your goals, concerns, or questions..."
          className={cn(inputClasses, 'resize-none')}
          {...register('message')}
        />
      </div>

      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold mt-6 flex h-12 w-full items-center justify-center rounded-md font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.01] disabled:opacity-50"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {status === 'loading' ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          'Get My Free Income Report'
        )}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        No commitment required. Your information is kept confidential.
      </p>
    </form>
  )
}
