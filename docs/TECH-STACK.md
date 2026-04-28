# Allura Homes — Technology Stack & Integration Reference

This document describes every service, integration, and third-party connection in the Allura Homes platform as of the MVP checkpoint.

---

## Core Framework

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Package manager | pnpm |
| Deployment | Vercel |
| Analytics | Vercel Analytics + Google Analytics 4 |

---

## Hosting & Deployment

**Platform:** Vercel
- Auto-deploys on every push to the connected GitHub repository
- Environment variables managed in Vercel project settings (also editable via the v0 Vars sidebar)
- ISR (Incremental Static Regeneration) used for all blog pages — 5-minute revalidation window, plus on-demand revalidation via webhook

**Domain:**
- Production: `https://allurahomes.com` (TLD cutover from Squarespace pending)
- `www.allurahomes.com` redirects to apex

---

## Headless WordPress (Blog)

**Instance:** `http://blog.allurahomes.com`
**WordPress permalink structure:** `/%category%/%postname%/`

This maps directly to the Next.js dynamic routes:
- `/[category]` → category index page
- `/[category]/[slug]` → individual post page

### Environment Variable
```
WORDPRESS_API_URL=http://blog.allurahomes.com
```
Note: `blog.allurahomes.com` runs HTTP only (no SSL). Vercel server-side fetches support HTTP. Do not normalize to HTTPS — it will break the connection.

### Active Blog Categories
| WP Slug | URL | Content |
|---------|-----|---------|
| `hosting` | `/hosting` | Host tips, revenue strategy, guest experience |
| `regulations` | `/regulations` | STR permits, TOT, local compliance by city |
| `ai` | `/ai` | AI pricing tools, smart home tech, automation |

### API Layer
All WordPress data fetching is in `lib/wordpress/api.ts`. Key functions:
- `getCategories()` — fetches all categories; falls back to DEMO_CATEGORIES if WP unreachable
- `getCategoryBySlug(slug)` — resolves a single category
- `getPostsByCategory(slug, page, perPage)` — paginates posts, reads `X-WP-Total` and `X-WP-TotalPages` headers for accurate pagination
- `getPostBySlug(slug)` — fetches a single post with embedded media
- `getAllPosts()` — used for sitemap generation

### On-Demand Revalidation Webhook
**Endpoint:** `POST /api/revalidate?secret=YOUR_SECRET`
- Configured in WordPress via **WP Webhooks** plugin
- Triggers: Post Created, Post Updated
- Clears all blog-related ISR caches instantly when a post is published or updated
- **Environment variable required:** `REVALIDATE_SECRET=your-secret-value`

### Demo / Fallback Data
When `WORDPRESS_API_URL` is not set or the WP instance is unreachable, the API layer returns `DEMO_POSTS` and `DEMO_CATEGORIES` from `lib/wordpress/api.ts`. This keeps the v0 preview functional even though the sandbox cannot reach external HTTP servers.

---

## Booking & Reservations (Guesty / Rentals United)

**Current setup (MVP):** The booking site is a fully separate service hosted at a subdomain.

| URL | Service |
|-----|---------|
| `https://reservations.allurahomes.com` | Guesty-powered booking site (via Rentals United / Guesty Direct) |

All "Browse Homes" and "Book Now" links on the main site point to this subdomain. City-filtered deep links use the pattern:
```
https://reservations.allurahomes.com/en/properties?city=Palm+Springs&country=United+States&minOccupancy=1
```

### Phase 2: Guesty API Integration
The next major milestone is building a native booking experience within `allurahomes.com` using the Guesty Public API. This will replace the subdomain redirect entirely.

**Guesty API Docs:** https://open-api.guesty.com/
**Auth:** OAuth 2.0 — requires `GUESTY_CLIENT_ID` and `GUESTY_CLIENT_SECRET` env vars
**Planned routes:**
- `/browse` — property listing grid with filters (city, bedrooms, dates, guests)
- `/properties/[id]` — individual property detail page with photo gallery, amenities, availability calendar
- `/book/[id]` — booking flow (dates → guests → quote → checkout)

**Env vars to add for Phase 2:**
```
GUESTY_CLIENT_ID=
GUESTY_CLIENT_SECRET=
GUESTY_API_BASE=https://open-api.guesty.com/v1
```

---

## Analytics

### Google Analytics 4
- **Measurement ID:** `G-WHT06K3ZFQ`
- Implemented in `app/layout.tsx` via `next/script` with `strategy="afterInteractive"`
- Fires on every page automatically — no per-page code needed
- Tracks `page_path` on each navigation

### Vercel Analytics
- Implemented via `<Analytics />` component from `@vercel/analytics/next` in `app/layout.tsx`
- Tracks Core Web Vitals and page views in the Vercel dashboard

---

## Forms

Contact and lead-gen forms use **Formspree** for serverless form handling.

**Status at MVP:** Both form endpoints still use placeholder IDs in `lib/constants.ts` — replace before launch.

```ts
// lib/constants.ts — update these:
formspreeIncomeReport: 'https://formspree.io/f/YOUR_FORM_ID',
formspreeContact: 'https://formspree.io/f/YOUR_FORM_ID',
```

| Form | Page | Purpose |
|------|------|---------|
| Income Report | `/free-income-report` | Lead capture — property owner interested in management |
| Contact | `/contact` | General inquiries from owners and guests |

---

## Scheduling

**Book a Call page** (`/book-a-call`) embeds a **Cal.com** scheduling widget. The Cal.com username/event URL is configured directly in `app/book-a-call/content.tsx`.

---

## Image Optimization

Configured in `next.config.ts`:
- **Formats:** AVIF first, WebP fallback — Next.js Image component handles format negotiation automatically
- **Cache TTL:** 1 year (`minimumCacheTTL: 31,536,000`)
- **Device sizes:** `[640, 750, 828, 1080, 1200, 1920, 2048]`
- **Remote patterns allowed:**
  - `hebbkx1anhila5yf.public.blob.vercel-storage.com` (Vercel Blob — logos, demo assets)
  - `**.allurahomes.com` (WordPress media, future Guesty images)
  - `images.unsplash.com` (development placeholders)
  - `i0.wp.com` (WordPress Jetpack CDN)

---

## SEO Infrastructure

| Feature | Implementation |
|---------|---------------|
| Meta tags | Per-page `metadata` export in every `page.tsx` |
| Canonical URLs | `alternates.canonical` in every page metadata |
| OG / Twitter cards | Set globally in `app/layout.tsx`, overridden per page |
| JSON-LD | Organization + WebSite + LocalBusiness on homepage |
| Sitemap | `app/sitemap.ts` — auto-generated, includes all static + metro + blog routes |
| Robots | `app/robots.ts` — all pages indexed, `/api/` and `/_next/` disallowed |
| Google Search Console | Verified via meta tag: `b8NtDhn1jK2lxxMbNYVuh6aGID9Jt-rIKwqvYGGR2QQ` |
| GA4 | `G-WHT06K3ZFQ` — fires on every page via root layout |

---

## Social Media Accounts

Configured in `BRAND.social` in `lib/constants.ts`:

| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/allurahomes |
| Facebook | https://www.facebook.com/allurahomes.us |
| X (Twitter) | https://x.com/AlluraHomes |
| LinkedIn | https://www.linkedin.com/company/allurahomes/ |

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `WORDPRESS_API_URL` | Yes | WordPress REST API base URL — `http://blog.allurahomes.com` |
| `REVALIDATE_SECRET` | Yes | Secret token for WP webhook revalidation endpoint |
| `GUESTY_CLIENT_ID` | Phase 2 | Guesty OAuth client ID |
| `GUESTY_CLIENT_SECRET` | Phase 2 | Guesty OAuth client secret |
| `GUESTY_API_BASE` | Phase 2 | `https://open-api.guesty.com/v1` |

---

## Repository Structure

```
app/
  [category]/           # Blog category + post routes (headless WP)
  property-management/
    [slug]/             # Geo metro area pages (dynamic, data-driven)
  api/
    revalidate/         # WP on-demand ISR webhook
  layout.tsx            # Root layout — fonts, GA, nav, footer
  globals.css           # Design tokens, btn-gold, prose-allura

components/
  layout/               # navbar, footer, mobile-cta-bar
  sections/             # hero, stats-bar, cta-band, testimonials, etc.
  forms/                # income-report-form, contact-form

lib/
  constants.ts          # BRAND, NAV_ITEMS, TRUST_STATS, TESTIMONIALS, etc.
  metro-areas.ts        # Geo metro area data (cities, SEO, content)
  wordpress/
    api.ts              # WP REST API fetcher + demo data fallback
    types.ts            # WPPost, WPCategory, BlogPost types

public/
  videos/               # hero-pm.mp4, hero-la.mp4, 404-background.mp4
  images/               # Local property photos, author headshots

docs/                   # This documentation folder
```
