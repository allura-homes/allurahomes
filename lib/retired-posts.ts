// WordPress posts consolidated into site pages. Drives the 301s in next.config.ts,
// sitemap exclusion, and blog-card link repointing so all three stay in sync.
export const RETIRED_POST_REDIRECTS: Record<string, string> = {
  '/hosting/how-to-calculate-airbnb-profit-2026-str-guide': '/san-diego-airbnb-income',
  '/hosting/passive-income-from-airbnb-in-san-diego-a-2026-owners-guide': '/san-diego-airbnb-income',
  '/hosting/how-to-get-5-star-airbnb-reviews-without-the-work-in-2026': '/hosting',
  '/hosting/prepare-for-a-home-takeover': '/hosting',
  '/hosting/lake-tahoe-vacation-rental-management-the-2026-guide-to-boutique-stewardship': '/property-management',
  '/hosting/temecula-vacation-rental-management-maximizing-roi-in-wine-country': '/property-management/san-diego-temecula',
  '/hosting/top-str-management-firms-2026-california-owners-guide': '/hosting',
  '/hosting/performance-tracking-short-term-rentals': '/hosting',
  '/hosting/successful-property-marketing-secrets': '/hosting/successful-property-marketing-sd',
  '/hosting/photography-services-airbnb-listing': '/hosting/airbnb-photography-in-napa-valley-guide-for-hosts',
  '/hosting/what-makes-the-best-short-term-rentals-successful-2': '/hosting/what-makes-the-best-short-term-rentals-successful',
}

export function resolvePostHref(path: string): string {
  return RETIRED_POST_REDIRECTS[path] ?? path
}
