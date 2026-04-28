# Allura Homes — MVP Checkpoint
**Date:** February 2026
**Status:** Production-ready. Ready for TLD cutover from Squarespace to Vercel.

---

## What Was Built

This is a full Next.js 16 (App Router) website replacing the Squarespace site at `allurahomes.com`. It is deployed on Vercel and connected to a headless WordPress instance for blog content.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero video, stats bar, service pillars, featured properties, testimonials, audience split, CTA |
| `/property-management` | Main PM landing page |
| `/property-management/san-diego-temecula` | San Diego & Temecula geo page |
| `/property-management/coachella-valley` | Coachella Valley geo page |
| `/property-management/los-angeles` | LA geo page — uses Hollywood Hills hero video |
| `/property-management/sf-bay-area` | SF/Oakland Bay Area geo page |
| `/how-it-works` | 3-step onboarding explainer |
| `/about` | Company & founder story |
| `/contact` | Contact form (Formspree) |
| `/free-income-report` | Lead gen form (Formspree) |
| `/book-a-call` | Cal.com embed for scheduling |
| `/faq` | FAQ accordion |
| `/referrals` | Referral program page |
| `/privacy` | Privacy policy |
| `/terms-of-use` | Terms of use |
| `/[category]` | WordPress blog category index (hosting / regulations / ai) |
| `/[category]/[slug]` | Individual WordPress blog post |
| `/not-found` (404) | Custom 404 with Hollywood Hills video background |
| `/api/revalidate` | Webhook endpoint for on-demand ISR revalidation |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | robots.ts — all pages indexed, /api/ and /_next/ blocked |

---

## TLD Cutover Checklist

Before pointing `allurahomes.com` DNS to Vercel:

- [ ] Deploy latest build from v0 (click Publish)
- [ ] In Vercel project settings → Domains → add `allurahomes.com` and `www.allurahomes.com`
- [ ] Update DNS at your registrar: point A record to Vercel's IP, add CNAME for www
- [ ] Confirm Squarespace domain is disconnected (do NOT delete Squarespace account immediately — keep as backup for 30 days)
- [ ] Verify SSL certificate auto-provisions on Vercel (usually within 5 minutes)
- [ ] Visit `https://allurahomes.com/hosting` — confirm live WordPress posts appear
- [ ] Visit `https://allurahomes.com/sitemap.xml` — confirm all routes are listed
- [ ] Verify Google Analytics is firing: open Chrome DevTools Network tab, filter for `google-analytics` or `gtag`
- [ ] Submit updated sitemap in Google Search Console: `https://allurahomes.com/sitemap.xml`
- [ ] Confirm `REVALIDATE_SECRET` env var is set in Vercel project settings
- [ ] Test the WP webhook: publish or update a post in WordPress, verify it appears on site within seconds

---

## Known Limitations at MVP

- `BRAND.formspreeIncomeReport` and `BRAND.formspreeContact` in `lib/constants.ts` both still say `'YOUR_FORM_ID'` — replace with real Formspree endpoint IDs
- Featured properties on homepage use placeholder images and placeholder Guesty/reservation links — will be replaced by Guesty API integration in Phase 2
- The v0 preview sandbox cannot reach `http://blog.allurahomes.com` (sandbox network restriction) — blog content shows demo data in preview only; live Vercel deployment fetches real content correctly
- `blog.allurahomes.com` does not have SSL (runs on HTTP only) — for production hardening, adding a free SSL cert via Let's Encrypt or Cloudflare proxy is recommended

---

## Phase 2: Booking Site (Next Milestone)

Build an MVP booking experience powered directly by the **Guesty API**, replacing the current subdomain redirect to `reservations.allurahomes.com`. See `docs/TECH-STACK.md` for Guesty API connection details.
