import Link from 'next/link'
import Image from 'next/image'
import { BRAND } from '@/lib/constants'
import {
  FORM_URL,
  BOOK_CALL_URL,
  GUEST_BOOKING_HREF,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_E164,
  MARKETS,
} from '@/lib/site-config'
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

const footerColumns = [
  {
    title: 'For Owners',
    links: [
      { label: 'Property Management', href: '/property-management' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Free Income Report', href: FORM_URL },
      { label: 'Book a Call', href: BOOK_CALL_URL },
    ],
  },
  {
    title: 'For Guests',
    links: [{ label: 'Browse Homes', href: GUEST_BOOKING_HREF, external: true }],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Hosting Resources', href: '/hosting' },
      { label: 'STR Regulations', href: '/regulations' },
      { label: 'AI & Technology', href: '/ai' },
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { label: 'General Inquiries', href: '/contact' },
      { label: 'Free Income Report', href: FORM_URL },
      { label: 'Apply to Work with Us', href: '/contact' },
      { label: 'Referral Program', href: '/referrals' },
      { label: 'Book a Free Consultation', href: BOOK_CALL_URL },
    ],
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="border-t border-gold/20 bg-navy-deep px-6 py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
          <p className="font-display text-xl tracking-widest text-gold">ALLURA HOMES</p>
          <p className="text-sm text-primary-foreground/70">© {CURRENT_YEAR} Allura Homes</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-navy-deep text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="relative h-32 w-[142px]">
              <Image
                src={BRAND.logos.stacked}
                alt="Allura Homes - Distinguished by Design"
                fill
                sizes="142px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              A boutique vacation rental management company serving California property owners with Superhost-certified hospitality.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={BRAND.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Follow us on X"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
                </svg>
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Property Management / Service Areas */}
          <div className="lg:col-span-2">
            <h3
              className="font-headline text-sm font-semibold uppercase tracking-widest text-gold"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Markets We Serve
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-primary-foreground/60">
              {MARKETS.map((market) => (
                <li key={market}>
                  <a
                    href={`${GUEST_BOOKING_HREF}/s?${new URLSearchParams({ city: market, state: 'California', country: 'US' })}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    {market}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3
                className="font-headline text-sm font-semibold uppercase tracking-widest text-gold"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                {column.title}
              </h3>
              {column.title === 'Contact Us' && (
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-4 block text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                >
                  {BRAND.email}
                </a>
              )}
              <ul className={`${column.title === 'Contact Us' ? 'mt-3' : 'mt-4'} flex flex-col gap-3`}>
                {column.links.map((link) => {
                  const isDisabled = 'disabled' in link && link.disabled
                  const isExternal = 'external' in link && link.external

                  if (isDisabled) {
                    return (
                      <li key={link.label}>
                        <span className="cursor-not-allowed text-sm text-primary-foreground/30">
                          {link.label}
                          <span className="ml-1.5 text-xs">(Coming Soon)</span>
                        </span>
                      </li>
                    )
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-xs text-primary-foreground/40 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href={`tel:${PRIMARY_PHONE_E164}`} className="flex items-center gap-1.5 hover:text-gold">
              <Phone className="size-3" />
              {PRIMARY_PHONE_DISPLAY}
            </a>
            <span className="flex items-center gap-1.5">
              <Mail className="size-3" />
              {BRAND.email}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3" />
              California
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-gold">
              Terms of Use
            </Link>
            <span>
              &copy; {CURRENT_YEAR} {BRAND.name}. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
