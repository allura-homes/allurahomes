'use client'

import { useRef, useState, type FormEvent } from 'react'
import { BOOK_A_CALL_HREF } from '@/lib/site-config'
import { switchAnalysisSchema } from '@/lib/switch-analysis'
import { SiteButton } from '@/components/site-button'
import { switchContent as c } from './content'

const controlClass = 'min-h-12 w-full rounded-md border border-input bg-muted px-3 py-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

export function AnalysisForm() {
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const requestId = useRef('')
  const submitting = useRef(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors = {
      name: String(data.get('name') ?? '').trim() ? undefined : c.form.nameError,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') ?? '').trim()) ? undefined : c.form.emailError,
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email) {
      form.querySelector<HTMLInputElement>(nextErrors.name ? '#switch-name' : '#switch-email')?.focus()
      return
    }
    if (submitting.current) return
    requestId.current ||= crypto.randomUUID()
    const parsed = switchAnalysisSchema.safeParse({ ...Object.fromEntries(data), requestId: requestId.current })
    if (!parsed.success) {
      setSubmitError('Please check your phone number and fee percentage, then try again.')
      return
    }
    submitting.current = true
    setPending(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/switch-analysis', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.error || 'We could not complete your request. Please try again.')
      form.reset()
      setSuccess(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not complete your request. Please try again.')
    } finally {
      submitting.current = false
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card p-8 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-3">
        <h3 className="font-headline text-2xl font-semibold uppercase tracking-wider text-navy-deep">{c.form.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{c.form.hint}</p>
      </div>
      {success ? (
        <div role="status" className="flex flex-col gap-3 rounded-lg border border-gold p-6">
          <p className="font-display text-2xl text-navy-deep">{c.form.success}</p>
          <SiteButton href={BOOK_A_CALL_HREF}>Book a Call</SiteButton>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} onChange={() => { if (!pending) requestId.current = '' }} aria-busy={pending} className="flex flex-col gap-5">
          {submitError && <p role="alert" className="rounded-md border border-destructive bg-muted p-3 text-sm text-foreground">{submitError}</p>}
          <div hidden aria-hidden="true"><label htmlFor="switch-website">Website</label><input id="switch-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <fieldset disabled={pending} className="flex min-w-0 flex-col gap-5 border-0 p-0">
          <div className="grid gap-5 sm:grid-cols-2">
            <label htmlFor="switch-name" className="flex flex-col gap-2 text-sm font-medium">
              {c.form.labels.name}
              <input id="switch-name" name="name" autoComplete="off" placeholder={c.form.placeholders.name} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'switch-name-error' : undefined} className={controlClass} />
              {errors.name && <span id="switch-name-error" role="alert" className="text-sm">{errors.name}</span>}
            </label>
            <label htmlFor="switch-email" className="flex flex-col gap-2 text-sm font-medium">
              {c.form.labels.email}
              <input id="switch-email" name="email" type="email" autoComplete="off" placeholder={c.form.placeholders.email} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'switch-email-error' : undefined} className={controlClass} />
              {errors.email && <span id="switch-email-error" role="alert" className="text-sm">{errors.email}</span>}
            </label>
            <label htmlFor="switch-phone" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.phone}<input id="switch-phone" name="phone" type="tel" autoComplete="off" className={controlClass} /></label>
            <label htmlFor="switch-address" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.address}<input id="switch-address" name="address" autoComplete="off" placeholder={c.form.placeholders.address} className={controlClass} /></label>
          </div>
          <label htmlFor="switch-managed" className="flex flex-col gap-2 text-sm font-medium">
            {c.form.labels.managed}
            <select id="switch-managed" name="managed" defaultValue="Another management company" className={controlClass}>{c.form.managedOptions.map((option) => <option key={option}>{option}</option>)}</select>
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label htmlFor="switch-fee" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.fee}<input id="switch-fee" name="fee" inputMode="decimal" placeholder={c.form.placeholders.fee} className={controlClass} /></label>
            <label htmlFor="switch-notice" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.notice}<input id="switch-notice" name="notice" placeholder={c.form.placeholders.notice} className={controlClass} /></label>
            <label htmlFor="switch-listing" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.listing}<select id="switch-listing" name="listing" defaultValue="" className={controlClass}><option value="">{c.form.optionalPlaceholder}</option>{c.form.ownershipOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label htmlFor="switch-license" className="flex flex-col gap-2 text-sm font-medium">{c.form.labels.license}<select id="switch-license" name="license" defaultValue="" className={controlClass}><option value="">{c.form.optionalPlaceholder}</option>{c.form.licenseOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          </div>
          <SiteButton type="submit" disabled={pending}>{pending ? 'Sending…' : c.cta.primary}</SiteButton>
          </fieldset>
        </form>
      )}
      <SiteButton href={c.cta.callHref} target="_blank" variant="secondary" dark={false}>{c.cta.secondary}</SiteButton>
    </div>
  )
}
