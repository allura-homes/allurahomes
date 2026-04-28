import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  accent?: string
  alignment?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  accent,
  alignment = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 max-w-3xl',
        alignment === 'center' && 'mx-auto text-center',
        alignment === 'left' && 'text-left',
        className
      )}
    >
      {accent && (
        <span
          className={cn(
            'mb-3 block font-serif text-sm tracking-wide',
            dark ? 'text-gold-light' : 'text-gold-dark'
          )}
        >
          {accent}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl font-bold md:text-4xl lg:text-5xl',
          dark ? 'text-primary-foreground' : 'text-navy-deep'
        )}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {/* Gold accent bar */}
      <div
        className={cn(
          'mt-4 h-0.5 w-16',
          alignment === 'center' && 'mx-auto',
          'bg-gold'
        )}
      />
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            dark ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
