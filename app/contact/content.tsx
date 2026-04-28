'use client'

import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { ContactForm } from '@/components/forms/contact-form'
import { BRAND } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react'

const contactDetails = [
  {
    icon: Phone,
    label: '24-Hour Support',
    value: '+1 (858) 244-9400',
    href: 'tel:+18582449400',
  },
  {
    icon: Phone,
    label: 'Office',
    value: '+1 (858) 244-9750',
    href: 'tel:+18582449750',
  },
  {
    icon: Mail,
    label: 'Email',
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'California (Pacific Time Zone)',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 1 Business Day',
    href: null,
  },
]

export function ContactContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AnimateOnScroll>
              <span className="mb-3 block font-serif text-sm tracking-wide text-gold-light">
                {"Let's Connect"}
              </span>
              <h1
                className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Get in Touch
              </h1>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">
                Whether you are a homeowner exploring management options or a guest with
                a question, we would love to hear from you.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Form + Details */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll>
                <ContactForm />
              </AnimateOnScroll>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2">
              <AnimateOnScroll delay={0.2}>
                <div className="rounded-xl bg-navy-deep p-8 lg:p-10">
                  <h2
                    className="text-xl font-semibold text-primary-foreground"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Contact Details
                  </h2>
                  <div className="mt-2 h-0.5 w-10 bg-gold" />

                  <div className="mt-8 flex flex-col gap-6">
                    {contactDetails.map((item) => {
                      const Icon = item.icon
                      const content = (
                        <div className="flex items-start gap-4">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/5">
                            <Icon className="size-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-sm text-primary-foreground">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      )

                      if (item.href) {
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            className="transition-opacity hover:opacity-80"
                          >
                            {content}
                          </a>
                        )
                      }

                      return <div key={item.label}>{content}</div>
                    })}
                  </div>

                  {/* Book a Call CTA */}
                  <div className="mt-10 border-t border-primary-foreground/10 pt-8">
                    <p className="text-sm text-primary-foreground/60">
                      Prefer to schedule a conversation?
                    </p>
                    <Link
                      href={BRAND.calendarUrl}
                      className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md border border-gold/40 font-headline text-sm font-semibold uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-navy-deep"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      <Calendar className="size-4" />
                      Book a Call
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
