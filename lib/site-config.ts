// Single source of truth for destinations and contact details that are
// repeated across the homepage. Update a value here, not in the components.
import { BRAND } from './constants'

// TODO(Mike): NEEDS CONFIRMATION. Verify /free-income-report is the correct
// owner lead form before launch. If the real form lives elsewhere, change
// ONLY this constant.
export const FREE_INCOME_REPORT_HREF = '/free-income-report'

export const BOOK_A_CALL_HREF = BRAND.calendarUrl

export const GUEST_BOOKING_HREF = BRAND.bookingUrl

// PLACEHOLDER CONSTANT. Mike has not confirmed the primary phone number yet.
// The value below only mirrors what the footer already displays today -- it
// is not a decision. Do not guess a different number or hardcode a phone
// anywhere outside this file.
// Numbers seen across the current site: (619) 333-4553 (footer),
// +1 858-244-9400 (JSON-LD / contact metadata), +1 858-244-9750 (contact page).
export const PRIMARY_PHONE_CONFIRMED = false
export const PRIMARY_PHONE_DISPLAY = '(619) 333-4553' // PLACEHOLDER, keep in sync with the line below
export const PRIMARY_PHONE_E164 = '+16193334553' // PLACEHOLDER, keep in sync with the line above

// TODO(Mike): NEEDS CONFIRMATION. Footer city links currently open generic
// reservation searches that may return zero results for unconfirmed markets.
// Replace with the markets Allura actually serves.
export const FOOTER_MARKETS: Record<string, { name: string; bookable: boolean }[]> = {
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
