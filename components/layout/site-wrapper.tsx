'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MobileCTABar } from '@/components/layout/mobile-cta-bar'
import { BOOK_A_CALL_HREF, BOUTIQUE_PAGE_PATH, SWITCH_PAGE_PATH } from '@/lib/site-config'

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show main site chrome on admin or command routes
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/command')
  
  if (isAdminRoute || pathname === BOUTIQUE_PAGE_PATH) {
    return <>{children}</>
  }
  
  return (
    <>
      <Navbar
        primaryCta={pathname === SWITCH_PAGE_PATH ? { label: 'Get My Free Switch Analysis', href: '#analysis' } : undefined}
        secondaryCta={pathname === SWITCH_PAGE_PATH ? { label: 'Book a Call', href: BOOK_A_CALL_HREF } : undefined}
      />
      <main>{children}</main>
      <Footer />
      {pathname !== SWITCH_PAGE_PATH && <MobileCTABar />}
    </>
  )
}
