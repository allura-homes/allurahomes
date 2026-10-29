# City Guide URL Audit Report

## Executive Summary

**Date:** October 29, 2026  
**Scope:** All city guide URLs under `/regulations/` and `/hosting/` paths

### Issues Found
- 2 dead URLs (404) that needed redirects:
  - `/regulations/rancho-santa-fe-caliornia` (misspelled)
  - `/regulations/rancho-santa-fe-california` (short variant)

### Actions Taken
1. Added 308 permanent redirects for both dead RSF short URLs → `/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california`
2. Verified sitemap contains only live URLs (dynamically generated from WordPress)
3. Confirmed no internal code links point to dead URLs

## Complete URL Audit

| URL | Status | Action | Redirect Target |
|-----|--------|--------|----------------|
| `/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-del-mar-california` | ✅ 200 | None | N/A |
| `/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-carlsbad-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-encinitas-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-oceanside-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-san-marcos-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-solana-beach-california` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-unincorporated-san-diego-county` | ✅ 200 | None | N/A |
| `/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-vista-california` | ✅ 200 | None | N/A |
| `/regulations/rancho-santa-fe-caliornia` | ❌ 404 | **Redirect added** | `/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california` |
| `/regulations/rancho-santa-fe-california` | ❌ 404 | **Redirect added** | `/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california` |
| `/regulations/san-diego-california` | ✅ 200 | None | N/A |
| `/regulations/chula-vista-ca` | ✅ 200 | None | N/A |
| `/regulations/airbnb-carlsbad-regulations` | ✅ 200 | None | N/A |
| `/regulations/get-started-registering-your-airbnb-for-a-short-term-rental-permit-in-chula-vista-california` | ✅ 200 | None | N/A |

## Notes

1. **Both `/hosting/` and `/regulations/` versions work**: The Next.js app renders posts by slug regardless of category in URL, so the RSF comprehensive guide works at both paths. The redirect points to `/hosting/` as requested.

2. **Sitemap is correct**: The sitemap is dynamically generated from WordPress posts and already excludes dead URLs. No changes needed.

3. **No internal links broken**: No code in the repository links to the dead short-URL variants.

4. **Redirect type**: Used 308 (Permanent Redirect) as requested, which preserves the HTTP method (better for SEO than 301 for POST requests, though these are GET requests).

5. **Rancho Santa Fe misspelling**: The misspelled variant `rancho-santa-fe-caliornia` was mentioned in the issue as getting search impressions, suggesting it exists in external backlinks or search results.
