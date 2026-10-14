// WordPress posts consolidated into site pages. Drives the 301s in next.config.ts,
// sitemap exclusion, and blog-card link repointing so all three stay in sync.
export const RETIRED_POST_REDIRECTS: Record<string, string> = {
  '/hosting/how-to-calculate-airbnb-profit-2026-str-guide': '/san-diego-airbnb-income',
  '/hosting/passive-income-from-airbnb-in-san-diego-a-2026-owners-guide': '/san-diego-airbnb-income',
}

export function resolvePostHref(path: string): string {
  return RETIRED_POST_REDIRECTS[path] ?? path
}
