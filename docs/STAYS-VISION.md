# Allura Homes — Unified Booking Experience Vision

## Overview

The `/stays` section transforms allurahomes.com from a property management marketing site into a full direct booking platform. Guests discover, explore, and book luxury California vacation rentals without leaving the Allura Homes domain — creating a seamless brand experience that builds trust and captures direct bookings.

---

## Design Inspiration

The experience draws from the best luxury vacation rental platforms:

| Platform | What We're Taking |
|----------|-------------------|
| **[Wander.com](https://wander.com)** | Immersive property detail pages with cinematic hero imagery, floating booking widgets, and curated local recommendations |
| **[OneLuxeStay.com](https://oneluxestay.com)** | Elegant grid layouts with generous whitespace and sophisticated typography |
| **[StayFieldTrip.com](https://stayfieldtrip.com)** | Modern filter UI, location-focused browsing, and boutique hospitality feel |
| **[StayPorter.com](https://stayporter.com)** | Clean property cards with clear pricing and capacity at a glance |
| **[MVP Vacation Homes](https://mvpvacationhomes.com)** | Professional property management positioning with guest-facing booking |

---

## Key Differentiators

### 1. Cinematic Video Tours
Every property can feature:
- **Drone fly-over videos** — Aerial footage showing the property and surrounding area (like the Hollywood Hills video from Veo)
- **Matterport 3D tours** — Interactive walk-throughs guests can explore themselves
- **Property walkthrough videos** — Hosted tours highlighting key features

This is a major competitive advantage over OTAs like Airbnb/VRBO where video is limited or non-existent.

### 2. Direct Booking Benefits
- No OTA fees (typically 12-15% savings)
- Direct relationship with Allura Homes team
- Loyalty perks for repeat guests
- Flexible policies vs rigid OTA rules

### 3. Curated California Collection
- Handpicked properties across San Diego, Temecula Wine Country, Palm Springs, and LA
- Consistent 5-star hospitality standards
- Professional photography and staging
- 24/7 guest support from local team

---

## Current Implementation (Phase 2.1)

### `/stays` — Property Grid
- Navy hero section with "Luxury Vacation Rentals" headline
- Filter bar: Location, Guests, Bedrooms, Sort by
- Responsive property card grid
- Cards show: Hero image, title, location, capacity (beds/baths/guests), starting price
- Empty state for no results
- Pagination for large inventory

### `/stays/[slug]` — Property Detail Page
- **Photo Gallery**: Bento-style grid with lightbox viewer
- **Video Tour Section**: Space for drone videos and Matterport embeds
- **Property Overview**: Title, location, capacity badges, description
- **Amenities Grid**: Categorized icons (Kitchen, Entertainment, Outdoor, etc.)
- **House Rules**: Accordion with check-in/out, policies, etc.
- **Booking Widget**: Sticky sidebar with date picker, guest selector, price summary
- **"Book Now" Button**: Opens Guesty checkout in new tab with pre-filled dates

### Technical Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    allurahomes.com/stays                     │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router                                          │
│  ├── /app/stays/page.tsx (grid)                             │
│  ├── /app/stays/[slug]/page.tsx (detail)                    │
│  └── /app/api/guesty/* (proxy routes)                       │
├─────────────────────────────────────────────────────────────┤
│  Guesty API Layer (lib/guesty/)                             │
│  ├── OAuth2 with Neon-backed token cache                    │
│  ├── Listings fetch + normalization                         │
│  └── Availability/calendar data                             │
├─────────────────────────────────────────────────────────────┤
│  Checkout: Guesty Hosted Booking Engine                     │
│  └── reservations.allurahomes.com/en/properties/{id}/checkout│
└─────────────────────────────────────────────────────────────┘
```

---

## Future Phases

### Phase 2.2 — Earnings Calculator Tool
Interactive widget for property owners to estimate rental income:
- Address input with autocomplete
- Property details (beds, baths, pool, etc.)
- Market data integration (AirDNA or similar)
- Projected monthly/annual revenue
- Comparison: self-managed vs. Allura-managed
- Lead capture integration

### Phase 2.3 — Enhanced Property Pages
- **Neighborhood Guide**: Local restaurants, activities, attractions
- **Seasonal Pricing Calendar**: Visual heat map of rates
- **Reviews Integration**: Pull reviews from Guesty/Airbnb
- **Similar Properties**: "You might also like" carousel
- **Instant Book vs. Inquiry**: Support both booking flows

### Phase 2.4 — Guest Portal
- Booking confirmation and details
- Digital check-in instructions
- House manual and WiFi info
- Local recommendations
- Direct messaging with Allura team
- Review submission

### Phase 2.5 — Full Checkout on Domain (Optional)
If we want complete brand control:
- Guesty Quotes API for real-time pricing
- Stripe integration for payment processing
- Reservation creation via Guesty API
- Confirmation emails from Allura domain
- This eliminates the redirect to reservations.allurahomes.com

---

## Content Strategy

### Property Listings Need:
- [ ] Professional photography (minimum 20 photos per property)
- [ ] Drone/aerial video where possible
- [ ] Matterport 3D tour (priority properties)
- [ ] Detailed amenity list in Guesty
- [ ] Compelling property description
- [ ] House rules and policies
- [ ] Check-in/check-out instructions
- [ ] Local area guide content

### Video Tour Production:
- Partner with Veo or similar for drone footage
- Matterport scanning for interior tours
- Consistent intro/outro branding
- Background music licensing
- Hosting via Cloudinary or native video

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Direct booking conversion rate | 3-5% of property page views |
| Average time on property page | 2+ minutes |
| Video tour engagement | 40%+ of visitors watch |
| Bounce rate from /stays | < 40% |
| Mobile booking completion | Parity with desktop |
| OTA fee savings | Track $ saved vs. Airbnb/VRBO |

---

## Brand Guidelines for /stays

### Colors
- **Navy Deep** `#0d1f3c` — Headers, hero backgrounds
- **Gold** `#d4af37` — CTAs, accents, price highlights
- **Cream** `#faf9f6` — Card backgrounds, content areas
- **White** `#ffffff` — Page backgrounds

### Typography
- **Headlines**: Playfair Display (serif) or Rock Salt (script accent)
- **Body**: Montserrat (clean, readable)
- **Property titles**: Playfair Display, 24-32px
- **Prices**: Montserrat Bold with gold accent

### Photography Style
- Bright, airy, natural light
- Hero shots at golden hour
- Lifestyle imagery (wine on patio, family by pool)
- Consistent editing/color grading across portfolio

---

## Technical Notes

### Guesty API Integration
- OAuth2 client credentials flow
- Token cached in Neon to prevent rate limits
- Listings endpoint: `/v1/listings`
- Availability endpoint: `/v1/availability-pricing/api/calendar/listings/{id}`
- Images served from `assets.guesty.com` (Cloudinary CDN)

### SEO Considerations
- Dynamic meta tags per property
- JSON-LD structured data for vacation rentals
- Canonical URLs to prevent duplicate content
- Image alt text from property descriptions
- Fast LCP with optimized hero images

### Performance
- ISR (Incremental Static Regeneration) for property pages
- SWR for client-side data freshness
- Image optimization via Next.js (when domains permit)
- Lazy loading for below-fold images and video

---

*Last updated: March 2026*
