# Allura Homes — Design Language Reference
**Tagline:** Distinguished by Design™

This document is the source of truth for all visual and typographic decisions. When building new pages or components, refer here first.

---

## Brand Personality

Boutique luxury — not corporate. Warm, confident, California coastal. The aesthetic sits between a high-end hotel brand and a personal concierge service. Never busy, never trendy. Every decision should feel considered and timeless.

---

## Color System

Exactly 4 colors are used throughout the site. Do not introduce new colors without updating this doc.

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Navy Deep | `#012547` | `navy-deep` | Primary backgrounds, headings, nav, footer |
| Gold | `#c7ae6a` | `gold` | Accent color, dividers, icons, hover states |
| Gold Dark | `#9f7135` | `gold-dark` | Button shadows, text links in prose |
| Gold Light | `#d5c28f` | `gold-light` | Subtle highlights, hover states |
| Off White | `#f4f4f4` | `offwhite` | Section backgrounds, card backgrounds |
| Cream | `#faf8f4` | `cream` | Blockquote backgrounds, alternate sections |
| White | `#ffffff` | `background` | Page background, card surfaces |

### Design Token Mapping (globals.css)
```css
--navy-deep: #012547
--navy: #013f7a
--navy-light: #0159ad
--gold: #c7ae6a
--gold-light: #d5c28f
--gold-dark: #9f7135
--off-white: #f4f4f4
--cream: #faf8f4
```

### Color Application Rules
- Navy Deep (`#012547`) is the primary brand color — used for all dark sections, navbar, footer
- Gold is always an accent — never a background for large areas
- Text on navy backgrounds must be white or gold — never dark text on dark backgrounds
- Text on gold must be `#2a1a00` (deep brown-black) for contrast — never white
- Gradient accents use `linear-gradient(135deg, #9f7135, #d4c38e)` (`.gold-gradient` utility)

---

## Typography

Two font families, four weights. No more.

| Variable | Font | Usage |
|----------|------|-------|
| `--font-headline` | Oswald (Google Fonts) | H3–H6, nav items, button labels, caps labels, stats |
| `--font-display` | Playfair Display (Google Fonts) | H1, H2, hero titles, section headings |
| `--font-sans` | Montserrat (Google Fonts) | Body copy, paragraph text, form labels, captions |
| `--font-serif` | Rock Salt (Google Fonts) | Decorative accent only — "Distinguished by Design" tagline |

### Typography Rules
- H1, H2: `font-display` (Playfair Display) — elegant, editorial
- H3–H6: `font-headline` (Oswald) — uppercase, tracking-wider
- Body: `font-sans` (Montserrat) — base size `17px`, `line-height: 1.7`
- Button labels: `font-headline`, `uppercase`, `tracking-widest`, `font-semibold`
- Section eyebrow labels: `font-headline`, `uppercase`, `tracking-widest`, `text-gold`, `text-sm`

---

## Gold Button System

All primary CTAs use the `.btn-gold` CSS class. This class is defined in `globals.css` and must not be replicated with inline Tailwind.

**The gradient mimics the Allura Homes logo metallic sheen:**
- Dark antique bronze at edges (`#7a5c1e`)
- Warm medium gold through the middle (`#b8892a`)
- Bright champagne highlight at the center-top (`#f5e9a8`)
- Returns to bronze at the base

**Apply like this:**
```tsx
<Link href="/book-a-call" className="btn-gold inline-flex h-12 items-center rounded-md px-8 font-headline text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02]">
  Book a Call
</Link>
```

**Never use `bg-gold text-navy-deep` for primary buttons** — always use `btn-gold` instead.

Secondary / ghost buttons use: `border border-gold/40 text-gold hover:bg-gold/10`

---

## Layout Principles

- **Mobile-first** — all layouts start single column, expand with `md:` and `lg:` prefixes
- **Max content width:** `max-w-6xl mx-auto px-4 sm:px-6`
- **Section vertical padding:** `py-20 md:py-28`
- **Section backgrounds alternate:** white → off-white → navy → white
- **Flexbox first** — CSS Grid only for property card grids and city grids
- **No arbitrary Tailwind values** — use the spacing scale (`p-4`, `gap-6`) not `p-[16px]`

---

## Hero Sections

All page heroes use the `<Hero>` component (`components/sections/hero.tsx`).

| Prop | Type | Description |
|------|------|-------------|
| `video` | `string` | Path to looping background video |
| `image` | `string` | Fallback image if video doesn't load |
| `accent` | `string` | Small gold eyebrow text above title |
| `title` | `string` | Main H1 — Playfair Display |
| `subtitle` | `string` | Subheading paragraph |
| `cta` | `{label, href}[]` | Array of up to 2 CTA buttons |

### Hero Videos
| Page | Video File |
|------|-----------|
| Home, Property Management, Geo pages (default) | `/videos/hero-pm.mp4` |
| Los Angeles geo page | `/videos/hero-la.mp4` |
| 404 page | `/videos/404-background.mp4` |

---

## Animation

- **Ken Burns** (`.animate-ken-burns`): slow zoom on hero fallback images — 20s ease-in-out infinite alternate
- **Animate on scroll** (`<AnimateOnScroll>`): fade-in-up on section entry — used on all content sections
- **Hover states:** `transition-all` with `hover:scale-[1.02]` for CTAs, `hover:-translate-y-1` for cards
- **No decorative blobs, gradient circles, or abstract shapes** — Allura's aesthetic is architectural and clean

---

## Icons

Lucide React is the icon library. Consistent sizing:
- `size-4` (16px) — inline with text, footer social, button icons
- `size-5` (20px) — list items, feature bullets
- `size-6` (24px) — section feature cards, standalone icons

**X (Twitter) icon:** Uses a custom inline SVG path — NOT `lucide-react`'s `Twitter` component — because Lucide's Twitter icon is the old bird logo. The X SVG path is in `footer.tsx`.

---

## Component Reference

| Component | Path | Notes |
|-----------|------|-------|
| Navbar | `components/layout/navbar.tsx` | Reads from `NAV_ITEMS` in `lib/constants.ts` |
| Footer | `components/layout/footer.tsx` | Service areas with city booking links, social links |
| Hero | `components/sections/hero.tsx` | Video background with Ken Burns fallback |
| Stats Bar | `components/sections/stats-bar.tsx` | 4 trust stats on navy background |
| CTA Band | `components/sections/cta-band.tsx` | Full-width navy CTA section |
| Section Heading | `components/section-heading.tsx` | Eyebrow + title + subtitle pattern |
| Animate On Scroll | `components/animate-on-scroll.tsx` | Intersection Observer fade-in |
| Mobile CTA Bar | `components/layout/mobile-cta-bar.tsx` | Fixed bottom bar on mobile only |

---

## Logos

All logos are stored on Vercel Blob and referenced via URL in `BRAND.logos`:

| Key | Usage |
|-----|-------|
| `BRAND.logos.horizontal` | Multi-color horizontal — used in navbar |
| `BRAND.logos.horizontalGold` | All-gold horizontal — used in footer |
| `BRAND.logos.stacked` | All-gold stacked — used for large display |
| `BRAND.logos.bug` | Gold bug on navy — used as OG/social share image |

---

## SEO Pattern

Every page exports a `metadata` object with:
- Unique `title` (uses `%s | Allura Homes` template from root layout)
- Unique `description` (150–160 chars)
- `alternates.canonical` with full absolute URL
- `keywords` array relevant to that page
- `openGraph.url` matching the canonical
- `openGraph.title` and `openGraph.description`

Root layout (`app/layout.tsx`) provides global defaults for OG image, Twitter card, robots, and Google Search Console verification (`b8NtDhn1jK2lxxMbNYVuh6aGID9Jt-rIKwqvYGGR2QQ`).

JSON-LD structured data (Organization, WebSite, LocalBusiness) is on the homepage only.

---

## Prose Styles (WordPress Content)

Blog post content uses the `.prose-allura` CSS class in `globals.css`. It applies:
- Playfair Display for H1/H2, Oswald for H3–H6
- Gold left border on blockquotes
- Cream background on blockquotes
- Navy-deep code blocks
- Auto-rounded images
