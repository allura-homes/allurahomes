import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SiteButton({ children, href, variant = 'primary', dark = true, className, target, disabled, type = 'button' }: { children: ReactNode; href?: string; variant?: 'primary' | 'secondary'; dark?: boolean; className?: string; target?: '_blank'; disabled?: boolean; type?: 'button' | 'submit' }) {
  const classes = cn(
    'group inline-flex w-full min-h-13 items-center justify-center gap-2 rounded-md px-8 py-3 text-center font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02] sm:w-auto disabled:opacity-60',
    variant === 'primary' ? 'btn-gold' : 'border-2',
    variant === 'secondary' && (dark ? 'border-primary-foreground/40 text-primary-foreground hover:border-gold hover:text-gold' : 'border-navy-deep/40 text-navy-deep hover:border-gold hover:text-gold-dark'),
    className,
  )
  const content = <>{children}{variant === 'primary' && <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}</>
  return href ? <Link href={href} target={target} rel={target ? 'noopener noreferrer' : undefined} className={classes} style={{ fontFamily: 'var(--font-headline)' }}>{content}</Link> : <button type={type} disabled={disabled} className={classes} style={{ fontFamily: 'var(--font-headline)' }}>{content}</button>
}
