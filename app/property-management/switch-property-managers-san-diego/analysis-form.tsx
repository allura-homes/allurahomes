'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { switchContent as c } from './content'

const controlClass = 'min-h-12 w-full rounded-md border border-input bg-muted px-3 py-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

// TODO(Mike/dev): wire this form to HubSpot (Forms API or embedded HubSpot form). Do NOT collect real data until connected. Map optional qualifying fields to HubSpot properties.
export function AnalysisForm() {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    form.reset()
    setSuccess(true)
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border-t-4 border-gold bg-card p-6 text-card-foreground shadow-xl md:p-10">
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-2xl font-semibold text-navy-deep">{c.form.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{c.form.hint}</p>
        <p id="switch-demo-note" className="rounded-md bg-muted p-3 text-sm leading-relaxed text-muted-foreground">{c.form.demo}</p>
      </div>
      {success ? (
        <div role="status" className="flex flex-col gap-3 rounded-lg border border-gold p-6">
          <p className="font-display text-2xl text-navy-deep">{c.form.success}</p>
          <p className="text-sm text-muted-foreground">{c.form.successNote}</p>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} aria-describedby="switch-demo-note" className="flex flex-col gap-5">
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
          <button type="submit" className="btn-gold min-h-14 w-full rounded-md px-4 py-4 text-sm font-semibold">{c.cta.primary}</button>
        </form>
      )}
      <Link href={c.cta.callHref} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center rounded-md border-2 border-navy-deep px-4 py-4 text-center text-sm font-semibold text-navy-deep transition-colors hover:bg-navy-deep hover:text-primary-foreground">{c.cta.secondary}</Link>
    </div>
  )
}
