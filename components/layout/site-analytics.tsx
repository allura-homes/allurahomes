'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { BOUTIQUE_PAGE_PATH } from '@/lib/site-config'
import { configureCrossDomainTracking } from '@/lib/analytics/gtm'

const GA_ID = 'G-WHT06K3ZFQ'

export function SiteAnalytics() {
  const pathname = usePathname()
  const excluded = pathname === BOUTIQUE_PAGE_PATH

  useEffect(() => {
    // Disable an already-loaded GA instance when arriving via client-side navigation.
    const gaWindow = window as unknown as Record<string, unknown>
    gaWindow[`ga-disable-${GA_ID}`] = excluded
  }, [excluded])

  if (excluded) return null

  return <>
    <Script src="https://cdn.bookingscloud.ai/scripts/analytics.min.js" strategy="afterInteractive" />
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      // Configure cross-domain tracking for allurahomes.com hosts
      gtag('config', '${GA_ID}', {
        page_path: window.location.pathname,
        linker: {
          domains: ['allurahomes.com', 'www.allurahomes.com', 'reservations.allurahomes.com'],
          accept_incoming: true
        }
      });
    `}</Script>
    <Script id="cross-domain-setup" strategy="afterInteractive">{`
      // Initialize cross-domain tracking helper
      if (typeof window !== 'undefined') {
        ${configureCrossDomainTracking.toString()}
        configureCrossDomainTracking();
      }
    `}</Script>
    <Analytics beforeSend={event => new URL(event.url).pathname === BOUTIQUE_PAGE_PATH ? null : event} />
  </>
}
