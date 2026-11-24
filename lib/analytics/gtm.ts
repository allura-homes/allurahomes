/**
 * Google Analytics 4 / Google Tag Manager Helper Functions
 * GA4 Property: G-WHT06K3ZFQ (Allura Homes - All Properties)
 * 
 * Implements GA4 Enhanced Ecommerce events for the booking flow:
 * - view_item: Property detail page view
 * - begin_checkout: Guest starts booking process
 * - add_payment_info: Payment details entered
 * - purchase: Reservation confirmed
 */

// Extend Window to include gtag and dataLayer
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void
    dataLayer?: Array<Record<string, any>>
  }
}

export interface GA4Item {
  item_id: string // Guesty listing ID
  item_name: string // Property title
  item_category?: string // e.g., "Vacation Rental"
  item_category2?: string // e.g., "San Diego"
  item_category3?: string // e.g., "3 Bedrooms"
  price: number // Total price (not per night)
  quantity: number // Number of nights
}

export interface GA4EcommerceParams {
  currency: string
  value: number
  items: GA4Item[]
}

export interface GA4PurchaseParams extends GA4EcommerceParams {
  transaction_id: string
}

/**
 * Send GA4 event (works with gtag.js or GTM)
 */
function sendGA4Event(
  eventName: string,
  params: Record<string, any>
): void {
  if (typeof window === 'undefined') return

  // Try gtag first (direct GA4 implementation)
  if (window.gtag) {
    window.gtag('event', eventName, params)
    console.log('[GA4]', eventName, params)
    return
  }

  // Fallback to dataLayer push (GTM)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    })
    console.log('[GA4 dataLayer]', eventName, params)
    return
  }

  console.warn('[GA4] Neither gtag nor dataLayer found. Event not sent:', eventName)
}

/**
 * Track property page view (view_item event)
 * Fire on /stays/[slug] page load
 */
export function trackViewItem(
  listingId: string,
  title: string,
  city: string,
  bedrooms: number,
  totalPrice: number,
  nights: number = 1,
  currency: string = 'USD'
): void {
  const item: GA4Item = {
    item_id: listingId,
    item_name: title,
    item_category: 'Vacation Rental',
    item_category2: city,
    item_category3: `${bedrooms} Bedrooms`,
    price: totalPrice,
    quantity: nights,
  }

  sendGA4Event('view_item', {
    currency,
    value: totalPrice,
    items: [item],
  })
}

/**
 * Track checkout initiation (begin_checkout event)
 * Fire when guest clicks "Book Now" and starts checkout process
 */
export function trackBeginCheckout(
  listingId: string,
  title: string,
  city: string,
  bedrooms: number,
  totalPrice: number,
  nights: number,
  currency: string = 'USD'
): void {
  const item: GA4Item = {
    item_id: listingId,
    item_name: title,
    item_category: 'Vacation Rental',
    item_category2: city,
    item_category3: `${bedrooms} Bedrooms`,
    price: totalPrice,
    quantity: nights,
  }

  sendGA4Event('begin_checkout', {
    currency,
    value: totalPrice,
    items: [item],
  })
}

/**
 * Track payment info submission (add_payment_info event)
 * Fire when guest enters payment details
 */
export function trackAddPaymentInfo(
  listingId: string,
  title: string,
  city: string,
  bedrooms: number,
  totalPrice: number,
  nights: number,
  paymentMethod: string,
  currency: string = 'USD'
): void {
  const item: GA4Item = {
    item_id: listingId,
    item_name: title,
    item_category: 'Vacation Rental',
    item_category2: city,
    item_category3: `${bedrooms} Bedrooms`,
    price: totalPrice,
    quantity: nights,
  }

  sendGA4Event('add_payment_info', {
    currency,
    value: totalPrice,
    items: [item],
    payment_type: paymentMethod,
  })
}

/**
 * Track completed reservation (purchase event)
 * Fire ONCE on confirmation page load
 * Uses sessionStorage to prevent duplicate events on reload
 */
export function trackPurchase(
  transactionId: string,
  listingId: string,
  title: string,
  city: string,
  bedrooms: number,
  totalPrice: number,
  nights: number,
  currency: string = 'USD'
): void {
  if (typeof window === 'undefined') return

  // Check if this transaction was already tracked
  const storageKey = `ga4_purchase_tracked_${transactionId}`
  if (sessionStorage.getItem(storageKey)) {
    console.log('[GA4] Purchase already tracked for transaction:', transactionId)
    return
  }

  const item: GA4Item = {
    item_id: listingId,
    item_name: title,
    item_category: 'Vacation Rental',
    item_category2: city,
    item_category3: `${bedrooms} Bedrooms`,
    price: totalPrice,
    quantity: nights,
  }

  sendGA4Event('purchase', {
    transaction_id: transactionId,
    currency,
    value: totalPrice,
    items: [item],
    affiliation: 'Allura Homes',
  })

  // Mark as tracked
  sessionStorage.setItem(storageKey, 'true')
}

/**
 * Configure cross-domain tracking for Allura Homes domains
 * Call this in the main app layout before analytics initialization
 * 
 * Domains:
 * - allurahomes.com (marketing site)
 * - www.allurahomes.com (www redirect)
 * - reservations.allurahomes.com (Guesty booking engine - legacy fallback)
 */
export function configureCrossDomainTracking(): void {
  if (typeof window === 'undefined') return

  // Set up linker for cross-domain tracking
  if (window.gtag) {
    window.gtag('set', 'linker', {
      domains: [
        'allurahomes.com',
        'www.allurahomes.com',
        'reservations.allurahomes.com',
      ],
      accept_incoming: true,
    })
    console.log('[GA4] Cross-domain tracking configured')
  }
}

/**
 * Key Events to configure in GA4 Admin (document in PR):
 * 
 * 1. view_item - Track property page engagement
 * 2. begin_checkout - Track checkout funnel starts
 * 3. add_payment_info - Track payment submission
 * 4. purchase - Track completed bookings (conversion)
 * 
 * To set up in GA4:
 * 1. Go to Admin > Events
 * 2. Find each event name in the list
 * 3. Toggle "Mark as key event"
 * 4. Set up conversion funnels: Home → Property → Checkout → Payment → Purchase
 */
