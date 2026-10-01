import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { switchContent as c } from './content'

export function SwitchHeading({ eyebrow, title, subtitle, dark = false, left = false }: { eyebrow: string; title: string; subtitle?: string; dark?: boolean; left?: boolean }) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-5', !left && 'mx-auto items-center text-center')}>
      <p className={cn('text-sm font-semibold uppercase tracking-widest', dark ? 'text-gold' : 'text-gold-dark')}>{eyebrow}</p>
      <h2 className={cn('font-display text-3xl font-semibold leading-tight text-balance md:text-4xl lg:text-5xl', dark ? 'text-primary-foreground' : 'text-navy-deep')}>{title}</h2>
      <span aria-hidden="true" className="h-0.5 w-16 bg-gold" />
      {subtitle && <p className={cn('text-lg leading-relaxed text-pretty', dark ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{subtitle}</p>}
    </div>
  )
}

export function SwitchActions({ dark = false, vertical = false }: { dark?: boolean; vertical?: boolean }) {
  return (
    <div className={cn('flex flex-col gap-3', !vertical && 'sm:flex-row sm:flex-wrap')}>
      <a href="#analysis" className="btn-gold inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-center text-sm font-semibold sm:w-auto">
        {c.cta.primary}<ArrowRight aria-hidden="true" className="size-4 shrink-0" />
      </a>
      <Link href={c.cta.callHref} target="_blank" rel="noopener noreferrer" className={cn('inline-flex min-h-14 w-full items-center justify-center rounded-md border-2 px-6 py-4 text-center text-sm font-semibold transition-colors sm:w-auto', dark ? 'border-primary-foreground/40 text-primary-foreground hover:border-gold hover:text-gold' : 'border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-primary-foreground')}>
        {c.cta.secondary}
      </Link>
    </div>
  )
}

export function SwitchCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-7 text-card-foreground">
      <span aria-hidden="true" className="h-0.5 w-8 bg-gold" />
      <h3 className="font-display text-xl font-semibold leading-snug text-navy-deep">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  )
}
