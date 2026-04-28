'use client'

import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { cn } from '@/lib/utils'

type CTABandProps = {
  headline: string
  subtitle?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: 'gold' | 'navy'
}

export function CTABand({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'gold',
}: CTABandProps) {
  const isGold = variant === 'gold'

  return (
    <section
      className={cn(
        'py-20',
        isGold ? 'gold-gradient' : 'bg-navy-deep'
      )}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <AnimateOnScroll>
          <h2
            className={cn(
              'text-3xl font-bold md:text-4xl lg:text-5xl',
              isGold ? 'text-navy-deep' : 'text-primary-foreground'
            )}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {headline}
          </h2>
          {subtitle && (
            <p
              className={cn(
                'mx-auto mt-4 max-w-2xl text-lg leading-relaxed',
                isGold ? 'text-navy-deep/80' : 'text-primary-foreground/80'
              )}
            >
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryCta.href}
              className={cn(
                'inline-flex h-12 items-center rounded-md px-8 font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]',
                isGold
                  ? 'bg-navy-deep text-primary-foreground hover:bg-navy'
                  : 'btn-gold'
              )}
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  'inline-flex h-12 items-center rounded-md border-2 px-8 font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]',
                  isGold
                    ? 'border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-primary-foreground'
                    : 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy-deep'
                )}
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
