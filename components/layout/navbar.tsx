'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { BRAND, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const showSolid = scrolled || !isHome

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          showSolid
            ? 'bg-navy-deep/95 shadow-lg backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="relative block h-12 w-[202px] shrink-0 md:h-[58px] md:w-[240px]" aria-label="Allura Homes Home">
            <Image
              src={BRAND.logos.horizontalGold}
              alt="Allura Homes"
              fill
              sizes="200px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const hasChildren = 'children' in item && item.children
              const isExternal = 'external' in item && item.external

              if (hasChildren) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 rounded-md px-4 py-2 font-headline text-sm font-medium uppercase tracking-wider transition-colors',
                        showSolid
                          ? 'text-primary-foreground/90 hover:text-gold'
                          : 'text-primary-foreground/90 hover:text-gold'
                      )}
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5" />
                    </Link>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-1 min-w-[240px] overflow-hidden rounded-lg bg-navy-deep shadow-xl ring-1 ring-gold/20"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center px-5 py-3 text-sm text-primary-foreground/80 transition-colors hover:bg-navy hover:text-gold"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-4 py-2 font-headline text-sm font-medium uppercase tracking-wider transition-colors',
                    showSolid
                      ? 'text-primary-foreground/90 hover:text-gold'
                      : 'text-primary-foreground/90 hover:text-gold'
                  )}
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {item.label}
                  {isExternal && <ExternalLink className="size-3" />}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Link
              href={BRAND.calendarUrl}
              className="btn-gold inline-flex h-10 items-center rounded-md px-6 font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center rounded-md text-primary-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-deep/98 pt-20 lg:hidden"
          >
            <nav className="flex flex-col gap-2 px-6 py-8">
              {NAV_ITEMS.map((item, i) => {
                const hasChildren = 'children' in item && item.children
                const isExternal = 'external' in item && item.external

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.label ? null : item.label
                            )
                          }
                          className="flex w-full items-center justify-between py-3 font-headline text-lg font-medium uppercase tracking-wider text-primary-foreground"
                          style={{ fontFamily: 'var(--font-headline)' }}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'size-5 transition-transform',
                              openDropdown === item.label && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="block py-2.5 text-primary-foreground/70 hover:text-gold"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2 py-3 font-headline text-lg font-medium uppercase tracking-wider text-primary-foreground hover:text-gold"
                        style={{ fontFamily: 'var(--font-headline)' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                        {isExternal && <ExternalLink className="size-4" />}
                      </Link>
                    )}
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 border-t border-gold/20 pt-6"
              >
                <Link
                  href={BRAND.calendarUrl}
                  className="btn-gold flex h-12 w-full items-center justify-center rounded-md font-headline text-sm font-semibold uppercase tracking-widest transition-all"
                  style={{ fontFamily: 'var(--font-headline)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
