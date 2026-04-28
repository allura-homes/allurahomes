'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'
import {
  Home,
  Building2,
  HelpCircle,
  Phone,
  CalendarDays,
  BookOpen,
  ArrowRight,
} from 'lucide-react'

const quickLinks = [
  {
    icon: Home,
    label: 'Home',
    href: '/',
    description: 'Back to the homepage',
  },
  {
    icon: Building2,
    label: 'Property Management',
    href: '/property-management',
    description: 'Our full-service management',
  },
  {
    icon: CalendarDays,
    label: 'Book a Call',
    href: '/book-a-call',
    description: 'Schedule a free consultation',
  },
  {
    icon: BookOpen,
    label: 'How It Works',
    href: '/how-it-works',
    description: 'Our simple onboarding process',
  },
  {
    icon: HelpCircle,
    label: 'FAQ',
    href: '/faq',
    description: 'Answers to common questions',
  },
  {
    icon: Phone,
    label: 'Contact Us',
    href: '/contact',
    description: 'Get in touch with our team',
  },
]

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover"
        >
          <source src="/videos/404-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-navy-deep/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto mb-10 h-20 w-[170px]"
          >
            <Image
              src={BRAND.logos.stacked}
              alt="Allura Homes"
              fill
              sizes="170px"
              className="object-contain"
            />
          </motion.div>

          {/* 404 Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-8xl font-bold text-gold md:text-9xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-xl text-primary-foreground/80 md:text-2xl"
          >
            This page seems to have checked out early.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-primary-foreground/50"
          >
            {"Don't worry -- here are some places you might want to visit instead."}
          </motion.p>
        </div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-primary-foreground/10"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <link.icon className="size-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors group-hover:text-gold"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {link.label}
                  </span>
                  <ArrowRight className="size-3.5 text-primary-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
                </div>
                <p className="mt-1 text-sm text-primary-foreground/50">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Browse Homes CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-10 text-center"
        >
          <p className="mb-4 text-sm text-primary-foreground/40">
            Looking to book a stay?
          </p>
          <a
            href={BRAND.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Browse Homes
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
