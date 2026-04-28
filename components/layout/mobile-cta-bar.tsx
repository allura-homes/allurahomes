'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Phone } from 'lucide-react'
import { BRAND } from '@/lib/constants'

export function MobileCTABar() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on the income report page (they're already converting)
  const isIncomeReport = pathname === '/free-income-report'

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isIncomeReport) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-navy-deep/95 p-3 backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center gap-3">
            <Link
              href={BRAND.calendarUrl}
              className="btn-gold flex h-11 flex-1 items-center justify-center rounded-md font-headline text-xs font-semibold uppercase tracking-widest transition-all"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Book a Call
            </Link>
            <a
              href={`tel:${BRAND.phone.replace(/[^0-9+]/g, '')}`}
              className="flex size-11 items-center justify-center rounded-md border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
              aria-label="Call Allura Homes"
            >
              <Phone className="size-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
