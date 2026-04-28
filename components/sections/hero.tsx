'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type HeroProps = {
  image?: string
  video?: string
  title: string
  subtitle?: string
  accent?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  overlay?: 'dark' | 'medium' | 'light'
  fullHeight?: boolean
}

export function Hero({
  image,
  video,
  title,
  subtitle,
  accent,
  primaryCta,
  secondaryCta,
  overlay = 'dark',
  fullHeight = false,
}: HeroProps) {
  const overlayOpacity = {
    dark: 'bg-navy-deep/70',
    medium: 'bg-navy-deep/55',
    light: 'bg-navy-deep/40',
  }

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden',
        fullHeight ? 'min-h-screen' : 'min-h-[70vh]'
      )}
    >
      {/* Background Video or Image */}
      <div className="absolute inset-0">
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover"
          />
        ) : null}
        <div className={cn('absolute inset-0', overlayOpacity[overlay])} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          {accent && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 block font-serif text-base tracking-wide text-gold-light md:text-xl lg:text-2xl"
            >
              {accent}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="btn-gold group inline-flex h-13 items-center gap-2 rounded-md px-8 font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {primaryCta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-13 items-center rounded-md border-2 border-primary-foreground/40 px-8 font-headline text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:scale-[1.02] hover:border-gold hover:text-gold"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-deep/30 to-transparent" />
    </section>
  )
}
