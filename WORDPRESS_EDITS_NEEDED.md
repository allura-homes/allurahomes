# WordPress Content Edits Required

This document lists content changes that must be made in WordPress at blog.allurahomes.com, since regulations and hosting pages are rendered from headless WordPress content.

## What Was Done in Code (This PR)

### 1. ✅ /san-diego-airbnb-income (fully implemented)
- Updated title tag to: "How Much Can My San Diego Home Earn on Airbnb? | Allura" (59 chars)
- Updated meta description to: "What your San Diego home earns on Airbnb vs 30+ night rentals: real numbers after fees, taxes, and vacancy. Blended calendar net income calculator." (148 chars)
- Updated opening answer to include specific net income figures ($51,818 vs $49,698)
- Added internal link to switch page in related links section

### 2. ✅ /about (fully implemented)
- Added Organization/LocalBusiness JSON-LD schema to page
- Added identity block with who-we-are content
- Schema includes proper @id references (#organization, #localbusiness, #website)
- Includes links to Airbnb profile, X/Twitter, Instagram, Facebook, LinkedIn

### 3. ✅ Homepage schema fix (fully implemented)
- Changed LocalBusiness @id from `#organization` to `#localbusiness` to avoid ID collision

### 4. ⚠️ Chula Vista regulations page (partial - meta/schema only)
**What was done in code:**
- Custom title tag: "Chula Vista Airbnb Rules & Vacation Rental Management | Allura" (62 chars)
- Custom meta description: "Chula Vista Airbnb and short-term rental rules: STR permit, business license, TOT and limits. Need a manager? Allura Homes has hosted since 2013." (145 chars)
- FAQPage JSON-LD schema with one Q&A about management

---

## What Needs to Be Done in WordPress

### Page: /regulations/chula-vista-ca

**Current URL:** https://www.allurahomes.com/regulations/chula-vista-ca

#### Edit 1: Fix H1 grammar
**Location:** Page H1  
**Current:** "Comprehensive Guide to Operating a Airbnb or Short-Term Rental in Chula Vista, California"  
**Change to:** "Comprehensive Guide to Operating **an** Airbnb or Short-Term Rental in Chula Vista, California"

#### Edit 2: Add management CTA block
**Location:** Insert directly after the intro paragraph ("This comprehensive guide outlines…"), before the H2 "Required Permits and Licenses"

**Content to add:**
```html
<div class="management-cta-block">
  <h3>Need a manager for your Chula Vista home?</h3>
  <p>Allura Homes manages Chula Vista homes for owners who want the income without the daily work. We are a boutique team hosting since 2013, with less than 20 homes, Airbnb Superhost and Vrbo Premier Host status, and a 4.9 star rating in 2025. You get your local contact, available 24/7, with an under 5 minute average response time, and fees of 20% for short-term stays, from 15% for furnished 30+ night stays, and supplies at cost.</p>
  
  <p><strong><a href="https://www.allurahomes.com/free-income-report">Get My Free Income Report</a></strong> (primary CTA)<br>
  <a href="https://www.allurahomes.com/book-a-call">Book a Call</a> (secondary) · or call (858) 244-9400</p>
  
  <p><small>See <a href="/san-diego-vacation-rental-management">how our vacation rental management works</a> · <a href="/san-diego-airbnb-income">What could your home earn?</a> · Already have a manager? <a href="/property-management/switch-property-managers-san-diego">See how switching works</a></small></p>
</div>
```

**Optional line to add ONLY if confirmed:**
"Chula Vista requires a local contact available 24/7 who can respond within 60 minutes. Allura can serve in that role."
- ⚠️ **[CONFIRM]** This line requires verification that: (1) Chula Vista rule is still current, and (2) City allows a manager as local contact

#### Edit 3: Add FAQ section
**Location:** Insert after "Application Process" section, before "Conclusion"

**Content to add:**
```html
<h2>Frequently asked questions</h2>

<h3>Who can manage my Chula Vista vacation rental?</h3>
<p>Allura Homes manages Chula Vista vacation rentals. We are a boutique manager hosting since 2013, with less than 20 homes. Airbnb Superhost, Vrbo Premier Host, and a 4.9 star rating in 2025. Your local contact, available 24/7. Fees: 20% for short-term stays, from 15% for furnished 30+ night stays, supplies at cost.</p>
```

**Note:** The FAQ text MUST match the FAQPage schema word-for-word (schema is already added in code).

#### Edit 4: Add internal link to switch page
**Location:** If there's a generic footer CTA linking to `/property-management`, replace it with `/san-diego-vacation-rental-management`

---

### Internal Links Needed in Other WordPress Posts

The following pages need internal links added to `/property-management/switch-property-managers-san-diego`:

#### 1. /hosting/local-property-managers-vs-vacasa
**Location:** Add a contextual link in the conclusion or "alternatives" section  
**Suggested anchor text:** "switching property managers" or "see how to switch"

#### 2. /regulations/san-diego-california
**Location:** Add a link in management-related section  
**Suggested anchor text:** "switch property managers" or "switching to Allura"

#### 3. /regulations/unincorporated-san-diego-county
**Location:** Add a link in management-related section  
**Suggested anchor text:** "switch property managers" or "see how switching works"

#### 4. /regulations/carlsbad
**Location:** Add a link in management-related section  
**Suggested anchor text:** "switch property managers" or "switching to boutique management"

**Important:** Always link to the canonical URL `/property-management/switch-property-managers-san-diego`, never to `/switch-managers` (which 301 redirects).

---

## Content Guardrails (What NOT to Add)

As a reminder, do NOT include any of the following in WordPress edits:
- ❌ $500 onboarding fee or refund language
- ❌ $4,000 floor
- ❌ "71%" claim
- ❌ Competitor names in new visible copy (existing Vacasa post's own content stays as is)
- ❌ Anything about guest lists or booking domains

**Approved language:**
- ✅ Fees: 20% short-term, from 15% monthly, supplies at cost
- ✅ "Less than 20 homes"
- ✅ Phone: (858) 244-9400
- ✅ CTAs: free income report or form first, then book-a-call

---

## Verification Checklist

Before publishing WordPress edits:

- [ ] H1 grammar fixed on Chula Vista page
- [ ] Management CTA block added after intro paragraph
- [ ] FAQ section added with exact text matching schema
- [ ] Internal links to switch page added in 5 posts (income page + 4 WordPress posts)
- [ ] No guardrail violations (no forbidden content added)
- [ ] Schema validation: FAQ text in WordPress matches FAQPage JSON-LD word-for-word

---

## Questions or Clarifications Needed

1. **Free income report form:** Confirm the form at /free-income-report accepts Chula Vista addresses (referenced in CTA)
2. **Optional local-contact line:** Confirm Chula Vista's 24/7 local contact requirement is still current and that a manager may serve as the named contact
3. **Chula Vista duplicate URL:** There's a second Chula Vista URL at `/regulations/get-started-registering-your-airbnb-for-a-short-term-rental-permit-in-chula-vista-california` - decide whether to link to the main page or consolidate
4. **Footer markets list:** Consider adding Chula Vista to "Markets we serve" footer if appropriate
