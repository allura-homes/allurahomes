'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { CTABand } from '@/components/sections/cta-band'
import {
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  CheckCircle2,
  Home,
} from 'lucide-react'

const whyAllura = [
  {
    icon: Globe,
    title: "We're Hyper-Local",
    description:
      'We live and work in your neighborhoods -- on-the-ground 24/7.',
  },
  {
    icon: TrendingUp,
    title: 'We Drive More Revenue',
    description:
      'Our full-time revenue management outperforms competitors on ADR and RevPAR by 20%+.',
  },
  {
    icon: Users,
    title: "We're Boutique, Not Bulky",
    description:
      "You'll get the personal service national companies can't match. Every home, every owner -- never just a number.",
  },
  {
    icon: Globe,
    title: "We're Everywhere Guests Search",
    description:
      '20+ OTA and distribution partnerships ensure maximum visibility and bookings.',
  },
  {
    icon: Shield,
    title: 'We Deliver Peace of Mind',
    description:
      'From guest support to owner care, every detail is handled with precision -- 24/7.',
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'Refer a Homeowner',
    description:
      'Share your unique referral or introduce us directly. The homeowner connects with our team for a free consultation.',
  },
  {
    step: 2,
    title: 'They Sign & Go Live',
    description:
      'Once your referral signs their management contract and their home goes live on our platform, you earn $500.',
  },
  {
    step: 3,
    title: 'Earn the Bonus',
    description:
      'After six months under management, you earn an additional $250 per bedroom. That\'s up to $3,000 per referral.',
  },
]

const examples = [
  { bedrooms: 2, signup: 500, bonus: 500, total: 1000 },
  { bedrooms: 3, signup: 500, bonus: 750, total: 1250 },
  { bedrooms: 4, signup: 500, bonus: 1000, total: 1500 },
  { bedrooms: 6, signup: 500, bonus: 1500, total: 2000 },
]

const faqItems = [
  {
    question: 'Who is eligible for the referral program?',
    answer:
      'Anyone with a U.S. tax ID who refers a homeowner who signs an Allura Homes management agreement and remains active for at least six months (in states allowing payment of referral fees to unlicensed persons).',
  },
  {
    question: 'How will the referral fee be paid?',
    answer:
      'Eligible referrers receive up to $3,000 USD (based on property size and market), paid via ACH or check once we receive a completed W-9. Please allow 4-6 weeks for processing after eligibility.',
  },
]

export function ReferralsContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-deep px-6 py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2"
          >
            <DollarSign className="size-4 text-gold" />
            <span className="text-sm font-medium text-gold">Referral Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Earn Up to $3,000 for Every Homeowner Referral
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70"
          >
            Turn your connections into commissions. When you introduce a homeowner who
            joins Allura Homes, everyone wins -- they get white-glove management and higher
            returns, and you earn up to $3,000 in referral rewards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="btn-gold inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Refer a Homeowner
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={BRAND.calendarUrl}
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-primary-foreground/30 px-8 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:border-gold hover:text-gold"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll>
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-navy-deep md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                How It Works
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
            </div>
          </AnimateOnScroll>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, i) => (
              <AnimateOnScroll key={item.step} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-navy-deep text-2xl font-bold text-gold">
                    {item.step}
                  </div>
                  <h3
                    className="mt-6 text-lg font-semibold uppercase tracking-wider text-navy-deep"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Payout Breakdown */}
          <AnimateOnScroll delay={0.2}>
            <div className="mt-16 rounded-2xl border border-border bg-off-white p-8 lg:p-12">
              <h3
                className="text-center text-xl font-semibold uppercase tracking-wider text-navy-deep"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Payout Breakdown
              </h3>
              <p className="mt-2 text-center text-muted-foreground">
                $500 at sign-up + $250 per bedroom after 6 months
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {examples.map((ex) => (
                  <div
                    key={ex.bedrooms}
                    className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <Home className="size-6 text-gold" strokeWidth={1.5} />
                    <span className="mt-3 text-sm text-muted-foreground">
                      {ex.bedrooms}-Bedroom Home
                    </span>
                    <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                      <span>${ex.signup.toLocaleString()} at sign-up</span>
                      <span>+ ${ex.bonus.toLocaleString()} after 6 months</span>
                    </div>
                    <div
                      className="mt-4 text-3xl font-bold text-navy-deep"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      ${ex.total.toLocaleString()}
                    </div>
                    <span className="text-xs text-muted-foreground">total</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Some large homes can earn up to <strong className="text-navy-deep">$3,000</strong> per referral.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Why Allura Homes */}
      <section className="bg-off-white px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll>
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-navy-deep md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Why Allura Homes?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                When you refer a homeowner to Allura, you are connecting them with the best.
              </p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
            </div>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyAllura.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <item.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider text-navy-deep"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <AnimateOnScroll>
            <div className="text-center">
              <h2
                className="text-3xl font-bold text-navy-deep md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Referral FAQ
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
            </div>
          </AnimateOnScroll>

          <div className="mt-12 flex flex-col gap-6">
            {faqItems.map((faq, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider text-navy-deep"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="bg-navy-deep px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll>
            <Heart className="mx-auto size-10 text-gold" strokeWidth={1.5} />
            <h2
              className="mt-6 text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {"It's Partnership That Pays"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
              Your referral gets best-in-class care, proven revenue management, and peace
              of mind. You get paid for helping them find it.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-gold inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Refer a Homeowner
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={BRAND.calendarUrl}
                className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-primary-foreground/30 px-8 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:border-gold hover:text-gold"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Book a Call
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
