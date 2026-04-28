'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const inputClasses =
  'w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20'
const labelClasses = 'mb-1.5 block text-sm font-medium text-foreground'
const errorClasses = 'mt-1 text-xs text-destructive'

export function ContactForm() {
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
          Message Sent!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          {"Thank you for reaching out. We'll get back to you within one business day."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            placeholder="John Smith"
            className={cn(inputClasses, errors.name && 'border-destructive')}
            {...register('name')}
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            className={cn(inputClasses, errors.email && 'border-destructive')}
            {...register('email')}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="(619) 555-0123"
            className={inputClasses}
            {...register('phone')}
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject <span className="text-destructive">*</span>
          </label>
          <select
            id="subject"
            className={cn(inputClasses, errors.subject && 'border-destructive')}
            defaultValue=""
            {...register('subject')}
          >
            <option value="" disabled>Select a topic...</option>
            <option value="property-management">Property Management Inquiry</option>
            <option value="guest-inquiry">Guest Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="media">Media / Press</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p className={errorClasses}>{errors.subject.message}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClasses}>
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us how we can help..."
          className={cn(inputClasses, 'resize-none', errors.message && 'border-destructive')}
          {...register('message')}
        />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
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
          'Send Message'
        )}
      </button>
    </form>
  )
}
