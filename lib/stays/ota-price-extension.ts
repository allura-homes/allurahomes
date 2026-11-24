/**
 * OTA Price Comparison Extension Point
 * 
 * PLACEHOLDER for future "Compare vs OTA" feature.
 * DO NOT build Airbnb/Vrbo price scraping at this time.
 * 
 * This module provides the interface and hooks for displaying
 * OTA price comparisons when that data becomes available.
 * 
 * Future implementation could integrate with:
 * - AirDNA API for market data
 * - Transparent.ly or similar services
 * - Manual price entry by property managers
 * - Third-party price intelligence feeds
 */

export interface OTAPriceData {
  source: 'airbnb' | 'vrbo' | 'booking.com'
  price: number
  currency: string
  url?: string
  lastUpdated: Date
  savings?: number // vs direct booking
  savingsPercentage?: number
}

export interface PropertyOTAPrices {
  listingId: string
  checkIn: string
  checkOut: string
  guests: number
  directPrice: number
  otaPrices: OTAPriceData[]
  hasData: boolean
}

/**
 * Get OTA price comparison data for a property (not implemented)
 * Returns null when no data is available
 */
export async function getOTAPrices(
  listingId: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  directPrice: number
): Promise<PropertyOTAPrices | null> {
  // TODO: Implement when OTA price data source is determined
  // For now, always return null (no data available)
  return null
}

/**
 * React component hook for OTA price display
 * Returns null when no comparison data exists
 */
export function useOTAPriceComparison(
  listingId: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  directPrice: number
) {
  // TODO: Implement async data fetching when ready
  // For now, return null to hide the comparison UI
  return null
}

/**
 * Calculate savings vs OTA prices
 */
export function calculateSavings(
  directPrice: number,
  otaPrice: number
): { amount: number; percentage: number } {
  const amount = otaPrice - directPrice
  const percentage = (amount / otaPrice) * 100
  return { amount, percentage }
}

/**
 * Example UI component (placeholder)
 * 
 * Usage in booking widget:
 * 
 * ```tsx
 * const otaPrices = useOTAPriceComparison(
 *   property.id,
 *   checkIn,
 *   checkOut,
 *   guests,
 *   quote.total
 * )
 * 
 * {otaPrices && <OTAPriceComparison data={otaPrices} />}
 * ```
 * 
 * This component is not built yet. When OTA data becomes available:
 * 1. Implement the data fetching in getOTAPrices
 * 2. Build the OTAPriceComparison UI component
 * 3. Add it to the booking widget
 * 4. Display savings messaging (e.g., "Save 12% vs Airbnb")
 */

// Export placeholder for future UI component
export const OTAPriceComparison = null
