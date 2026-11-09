# SEO/AEO Batch Implementation - Summary

**Date:** October 19, 2026  
**Branch:** `cursor/seo-aeo-batch-oct19-21b2`  
**Pull Request:** [#25](https://github.com/allura-homes/allurahomes/pull/25)  
**Status:** Draft PR - Ready for review, DO NOT MERGE until WordPress edits complete  
**Vercel Preview:** https://v0-allura-homes-website-redesign-nhljguey7.vercel.app

---

## ✅ What Was Completed

### 1. /san-diego-airbnb-income - CTR Optimization
**Goal:** Increase click-through rate from 0% (34 impressions at position 5.6)

**Changes Made:**
- ✅ Title tag updated to match owner intent: "How Much Can My San Diego Home Earn on Airbnb? | Allura" (59 chars)
- ✅ Meta description emphasizes real numbers and calculator: "What your San Diego home earns on Airbnb vs 30+ night rentals: real numbers after fees, taxes, and vacancy. Blended calendar net income calculator." (148 chars)
- ✅ Opening answer now includes specific net income figures ($51,818 for blended vs $49,698 for nightly-only)
- ✅ Internal link to switch page added in related articles section
- ✅ All numbers preserved exactly as in source documents

**Test URLs:**
- Live preview: https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/san-diego-airbnb-income
- Schema validation: https://search.google.com/test/rich-results?url=https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/san-diego-airbnb-income

### 2. /about - Organization Identity Schema
**Goal:** Stop AI tools from confusing Allura Homes with home builders

**Changes Made:**
- ✅ Comprehensive Organization/LocalBusiness JSON-LD schema implemented
- ✅ Proper @id references: `#organization`, `#localbusiness`, `#website`
- ✅ Schema includes all fields from spec (legal name, founding date, 8 cities, social profiles)
- ✅ Clear description: "Not a home builder or renovation company"
- ✅ Visible identity block added to page with who-we-are content
- ✅ Links to Airbnb profile, forms, and booking
- ✅ No unconfirmed fields included (followed spec exactly)

**Test URLs:**
- Live preview: https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/about
- Schema validation: https://search.google.com/test/rich-results?url=https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/about

### 3. Homepage Schema Fix
**Goal:** Prevent schema ID collisions

**Changes Made:**
- ✅ Changed LocalBusiness @id from `#organization` to `#localbusiness`
- ✅ Ensures proper entity separation for search engines
- ✅ All schema references updated consistently

**Test URL:**
- Live preview: https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/

### 4. Chula Vista Regulations Page (Partial)
**Goal:** Target Chula Vista management searches

**What Was Done in Code:**
- ✅ Custom title tag: "Chula Vista Airbnb Rules & Vacation Rental Management | Allura" (62 chars)
- ✅ Custom meta description (145 chars)
- ✅ FAQPage JSON-LD schema with management Q&A added

**Test URL:**
- Live preview: https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/regulations/chula-vista-ca
- Schema validation: https://search.google.com/test/rich-results?url=https://v0-allura-homes-website-redesign-nhljguey7.vercel.app/regulations/chula-vista-ca

### 5. Internal Links to Switch Page
**What Was Done:**
- ✅ Link added from /san-diego-airbnb-income page

---

## ⏳ What Requires WordPress Edits

**See full details in:** `WORDPRESS_EDITS_NEEDED.md`

### Critical WordPress Tasks

1. **Chula Vista page (`/regulations/chula-vista-ca`):**
   - Fix H1: "a Airbnb" → "an Airbnb"
   - Add management CTA block after intro paragraph
   - Add FAQ section with text matching schema exactly
   - Update footer CTA to link to SD management page

2. **Add internal links to switch page in 4 posts:**
   - `/hosting/local-property-managers-vs-vacasa`
   - `/regulations/san-diego-california`
   - `/regulations/unincorporated-san-diego-county`
   - `/regulations/carlsbad`

3. **Link to canonical URL:** Always use `/property-management/switch-property-managers-san-diego` (never `/switch-managers`)

---

## 📋 Content Guardrails

All content follows approved guidelines:
- ✅ No $500 fee/refund or $4,000 floor
- ✅ No "71%" claim
- ✅ No competitor names in new copy
- ✅ No guest list or booking domain claims
- ✅ Fees: 20% short-term, from 15% monthly, supplies at cost
- ✅ "Less than 20 homes" language used
- ✅ Phone: (858) 244-9400
- ✅ CTAs: income report first, then book-a-call

---

## 🧪 Testing Checklist

### Schema Validation
- [ ] Run all page URLs through https://validator.schema.org/
- [ ] Verify no schema errors or warnings
- [ ] Confirm FAQ text in WordPress matches schema word-for-word (after WP edits)

### Meta Tags
- [ ] Check title tag on income page: "How Much Can My San Diego Home Earn on Airbnb? | Allura"
- [ ] Verify meta description on Chula Vista page
- [ ] Confirm all meta tags are within character limits

### Content Verification
- [ ] Opening answer on income page shows specific figures
- [ ] Identity block visible on /about page
- [ ] Internal link to switch page works on income page
- [ ] After WP edits: CTA block appears on Chula Vista page
- [ ] After WP edits: FAQ section added to Chula Vista page
- [ ] After WP edits: All 5 internal links to switch page added

### Build Health
- [x] Vercel build passes
- [x] No TypeScript errors
- [x] All pages render successfully
- [x] Preview URL accessible

---

## 🚨 Important Notes

### DO NOT MERGE Until:
1. ✅ Vercel preview reviewed and approved
2. ⏳ Schema validated with no errors
3. ⏳ WordPress content edits completed per WORDPRESS_EDITS_NEEDED.md
4. ⏳ FAQ text verified to match schema word-for-word
5. ⏳ All internal links tested and working

### Overlap with Unmerged PRs
- PRs #21 and #22 (WordPress indexing fixes) are still open
- This PR branches from main as instructed
- No file conflicts expected
- All changes in Next.js app directory or isolated pages

### Rate Limiting
If testing live site, throttle to ~1 request per second with no bursts.

---

## 📁 Key Files Modified

1. `app/san-diego-airbnb-income/content.ts` - Meta, title, opening answer
2. `app/about/page.tsx` - Organization schema
3. `app/about/content.tsx` - Identity block component
4. `app/page.tsx` - Schema ID fix
5. `app/[category]/[slug]/page.tsx` - Chula Vista custom metadata and schema
6. `WORDPRESS_EDITS_NEEDED.md` - WordPress content documentation

---

## 🎯 Success Metrics

**After WordPress edits complete and PR merges:**

1. **Income page:** CTR should increase from 0% (baseline: 34 impressions at pos 5.6)
2. **About page:** AI tools should correctly identify Allura as property manager
3. **Chula Vista:** Should rank for "chula vista vacation rental management" (currently 2 impr, pos 4)
4. **Switch page:** Should receive more impressions from internal link juice (currently 3 impr, pos 33)

**Monitor in Search Console:**
- Income page CTR after 2 weeks
- Switch page position movement after 1 week
- Chula Vista management query impressions

---

## 📞 Next Actions

**For Mike/Team:**
1. Review Vercel preview at all test URLs above
2. Validate schemas using validator tools
3. Complete WordPress content edits per WORDPRESS_EDITS_NEEDED.md
4. Verify all internal links work
5. Approve PR for merge when ready

**After Merge:**
1. Monitor Search Console for CTR improvements
2. Check schema.org compliance in production
3. Track position changes for target keywords
4. Note any [CONFIRM] items in WORDPRESS_EDITS_NEEDED.md

---

**Questions?** See WORDPRESS_EDITS_NEEDED.md for detailed implementation notes or reach out with any clarifications needed.
