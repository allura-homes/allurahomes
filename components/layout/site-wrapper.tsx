'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MobileCTABar } from '@/components/layout/mobile-cta-bar'

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show main site chrome on admin or command routes
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/command')
  
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  return (
    <>
      <Navbar primaryCta={pathname === '/property-management/switch-property-managers-san-diego' ? { label: 'Get My Free Switch Analysis', href: '#analysis' } : undefined} />
      <main>{children}</main>
      <Footer minimal={pathname === '/property-management/switch-property-managers-san-diego'} />
      {pathname !== '/property-management/switch-property-managers-san-diego' && <MobileCTABar />}
    </>
  )
}
