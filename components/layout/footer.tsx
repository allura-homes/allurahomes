import Link from 'next/link'
import Image from 'next/image'
import { BRAND } from '@/lib/constants'
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

function cityBookingUrl(city: string) {
  return `https://reservations.allurahomes.com/en/properties?city=${encodeURIComponent(city)}&country=United+States&minOccupancy=1`
}

const serviceAreas = {
  'Southern California': [
    { name: 'Carlsbad', bookable: false },
    { name: 'Cathedral City', bookable: true },
    { name: 'Chula Vista', bookable: false },
    { name: 'Del Mar', bookable: false },
    { name: 'Encinitas', bookable: false },
    { name: 'Fallbrook', bookable: false },
    { name: 'Hollywood Hills', bookable: false },
    { name: 'La Jolla', bookable: false },
    { name: 'Little Italy', bookable: false },
    { name: 'Los Angeles', bookable: true },
    { name: 'Menifee', bookable: true },
    { name: 'Murrieta', bookable: true },
    { name: 'Oceanside', bookable: false },
    { name: 'Ojai', bookable: true },
    { name: 'Palm Desert', bookable: true },
    { name: 'Palm Springs', bookable: true },
    { name: 'San Diego', bookable: true },
    { name: 'San Marcos', bookable: false },
    { name: 'Solana Beach', bookable: false },
    { name: 'Temecula', bookable: false },
    { name: 'Vista', bookable: false },
    { name: 'Winchester', bookable: false },
    { name: 'Woodland Hills', bookable: false },
  ],
  'Northern California': [
    { name: 'Napa', bookable: true },
    { name: 'Oakland', bookable: true },
    { name: 'San Francisco', bookable: false },
    { name: 'Sonoma', bookable: false },
  ],
}

const footerColumns = [
  {
    title: 'For Owners',
    links: [
      { label: 'Property Management', href: '/property-management' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Free Income Report', href: '/free-income-report' },
      { label: 'Book a Call', href: BRAND.calendarUrl },
    ],
  },
  {
    title: 'For Guests',
    links: [
      { label: 'Browse Homes', href: BRAND.bookingUrl, external: true },
      { label: 'Reviews', href: '#', disabled: true },
    ],
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
      { label: 'Free Income Report', href: '/free-income-report' },
      { label: 'Apply to Work with Us', href: '/contact' },
      { label: 'Referral Program', href: '/referrals' },
      { label: 'Book a Free Consultation', href: BRAND.calendarUrl },
    ],
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-7">
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
              California&apos;s premier boutique vacation rental management company.
              13+ years of Superhost-certified hospitality excellence.
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
              Property Management
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {Object.entries(serviceAreas).map(([region, cities]) => (
                <div key={region}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
                    {region}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {cities.map((city) => (
                      <li key={city.name}>
                        {city.bookable ? (
                          <a
                            href={cityBookingUrl(city.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                          >
                            {city.name}
                          </a>
                        ) : (
                          <span className="text-sm text-primary-foreground/40">
                            {city.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
            <span className="flex items-center gap-1.5">
              <Phone className="size-3" />
              {BRAND.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="size-3" />
              {BRAND.email}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3" />
              San Diego | Coachella Valley | Los Angeles | SF Bay Area
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
