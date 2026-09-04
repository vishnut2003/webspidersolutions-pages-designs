# Web Spider Solutions — Page Design Mockups

Static page designs for the **webspidersolutions.com** redesign, built for client review and
sign-off before any production build begins.

## Background

webspidersolutions.com is live today. The client is unhappy with the current design and has asked
for a full redesign. This repository is **not** the production website — it holds standalone,
clickable HTML mockups of each page so the client can see, compare, and approve a direction. Only
after a design is approved does it move into the production codebase.

## Scope

| In scope | Out of scope |
| --- | --- |
| Visual design of each page as static HTML/CSS | CMS / backend integration |
| Responsive layouts (mobile → desktop) | Real form submissions, analytics, tracking |
| Copy placeholders and realistic sample content | Final production copy and SEO metadata |
| Design system: colors, type, spacing, components | Build tooling, deploys, CI |

## Site map to design

Taken from the live site's information architecture. Pages are designed in priority order; the
homepage and one service page settle the design language, the rest follow it.

- **Home** — hero, partner logos, service showcase with stats, testimonials, case studies, team,
  blog previews, free-audit CTA, award badges
- **Company** — About Us, Careers, Portfolio
- **Services** — SEO, App Marketing, Content Marketing, Paid Marketing (PPC, Remarketing, Mobile
  Ads, Amazon Ads), Design & Development, Digital Marketing (Social, YouTube, Ecommerce,
  Affiliate, Email)
- **Industry** — SaaS, B2B, BFSI, Healthcare, iGaming, Education, Law
- **Blog** — listing and article detail
- **Contact**

## Brand reference

Source of truth: the Brandmark brand guide —
<https://app.brandmark.io/v3/brand/brand-guide/?id=225C9338861840C2A8227568535BDE89>

- Positioning: *"Next-Generation Digital Marketing to Generate Real Revenue"* — AI-powered,
  data-driven agency; enterprise SEO outsourcing; measurable ROI
- Phone: +91-885-107-1512
- Email: info@webspidersolutions.com
- Address: Unit 415, Tower 1, Assotech Business Cresterra, Sector 135, Noida, Uttar Pradesh
- Social: LinkedIn, X, Instagram, Facebook, YouTube, Pinterest

### Color palette

| Role | Name | Hex | RGB | Share | Token |
| --- | --- | --- | --- | --- | --- |
| Background | Bone | `#f2f3ef` | 242, 243, 239 | 50% | `--brand-bg` |
| Foreground | Slate | `#5a5e64` | 90, 94, 100 | 20% | `--brand-fg` |
| Accent 1 | Spider Green | `#92c131` | 146, 193, 49 | 10% | `--brand-accent` |
| Accent 2 | Moss | `#7fa042` | 127, 160, 66 | 10% | `--brand-accent-2` |
| Accent 3 | Olive | `#6d7f53` | 109, 127, 83 | 10% | `--brand-accent-3` |

The logo itself uses only two of these: **Spider Green `#92c131`** and **Slate `#5a5e64`**. Spider
Green is the single primary accent; Moss and Olive are supporting tones for charts, gradients, and
section variation — not second and third buttons.

Two additions are needed because the guide's five colors alone cannot carry a full web UI. Both
are derived from the brand, not invented alongside it:

| Role | Hex | Why |
| --- | --- | --- |
| Ink (body text, text on green) | `#2f3237` | Darker shade of Slate. See contrast note below. |
| Surface (cards on Bone) | `#ffffff` | Lifts cards off the `#f2f3ef` background. |

**Contrast — this constrains the design.** Against the Bone background, Slate `#5a5e64` reaches
about 5.9:1 (passes AA for body text), but Spider Green is only about 1.9:1 and Moss about 2.7:1 —
both fail as text at any size. White on Spider Green is roughly 2.1:1 and also fails. So green is
a *shape* color, not a text color: use it for fills, rules, icons, and badges, and put Ink
`#2f3237` on top of green fills (about 6:1, passes AA). Body copy is Ink or Slate on Bone/white.

### Typography

The brand guide names **"Brandmark Serif 40 Color"** for headings and subtitles. That is a
Brandmark-internal display face, not a licensable web font — and the logo's wordmark is already
outlined as vector paths, so it needs no font at all. A real pairing has to stand in for it:

- Headings — **Fraunces** (Google Fonts), a modern serif matching the guide's serif intent
- Body / UI — **Inter** (Google Fonts)

Confirmed as the working pairing on 2026-09-04. It is not from the brand guide, so if the client
supplies licensed fonts they replace it everywhere via `--font-display` / `--font-body` in
`tokens.css`.

### Logo assets

Downloaded from the brand guide into [assets/img/logo/](assets/img/logo/):

| File | Use |
| --- | --- |
| `logo-full.svg` | Primary full logo (stacked lockup: cloud symbol over wordmark), brand colors, transparent. Canvas is a padded 4:3 viewBox — the artwork fills only ~74% × 38% of it. |
| `logo-full-trimmed.svg` | **Use this in page chrome.** Same artwork, viewBox cropped to the ink (2.53:1). Header at 48px tall → 122px wide. |
| `logo-full-white.svg` / `logo-full-white-trimmed.svg` | Solid white — dark backgrounds, footer, overlays |
| `logo-full-black.svg` | Solid black — print, single-color contexts |
| `logo-full-accent.svg` | Solid Spider Green `#92c131` — shape use only; it fails contrast on Bone/white |
| `logo-full.png` / `logo-full-white.png` | 1600×624 raster, trimmed to the artwork (OG images, email, decks). Note the PNGs are trimmed while the untrimmed SVGs are padded — don't swap one for the other in the same box. |
| `icon.svg` | **W monogram with a green dot** — the brand's profile icon. Flat two-tone (`#5a5e64` + `#92c131`; its gradient defs are unused). This is *not* the cloud symbol from the lockup. |
| `icon-black.svg` / `icon-white.svg` | Monogram, solid black / solid white |
| `icon-accent1.svg` / `icon-accent2.svg` / `icon-accent3.svg` | Monogram in each accent color |
| `icon-512.png` / `icon-white-512.png` / `icon-accent1-512.png` | 512×512 raster — app icons, avatars |
| `../favicon.svg` | Monogram with the viewBox recentred to a square around the ink — the site favicon |

Usage rules from the guide:

- Clear space around the full logo: at least **R**, where R = ⅓ × the logo's smaller dimension.
- Clear space around the symbol: at least **r**, where r = ⅓ of the unit square around the icon.
- Prefer the full logo. Use the monogram alone only in constrained spaces — favicons, app icons,
  profile images. The mobile header keeps the full (trimmed) logo at 40px.

## Stack

Plain static HTML, hand-written CSS and vanilla JS. No framework, no build step, no dependencies —
open a file in a browser and it works. Google Fonts (Fraunces + Inter) is the only external
request; everything else is on disk. Confirmed with the team on 2026-09-04.

Design tokens live in `assets/css/tokens.css`; shared components in `assets/css/components.css`;
each page adds its own layout stylesheet (`assets/css/home.css`). Interactions are in
`assets/js/main.js` and the page stays fully usable without them.

## Structure

```
/
├── index.html              # Homepage design
├── pages/                  # One file per further page design (created as pages are built)
├── assets/
│   ├── css/
│   │   ├── tokens.css      # Design tokens — colors, type scale, spacing, shadows, motion
│   │   ├── base.css        # Reset, typography, utilities, reduced-motion
│   │   ├── components.css  # Header, nav, buttons, cards, forms, footer
│   │   └── home.css        # Homepage section layouts
│   ├── js/
│   │   └── main.js         # Nav, dropdowns, reveal, count-up, testimonials, form intercept
│   └── img/
│       ├── favicon.svg     # W monogram, square-cropped
│       └── logo/           # Brand logo and icon assets (SVG + PNG)
├── README.md
└── CLAUDE.md               # Working instructions for Claude Code
```

## Viewing the designs

Open `index.html` directly in a browser, or serve the folder:

```powershell
python -m http.server 8000
```

## Approval workflow

1. Design a page as a static mockup on a branch.
2. Share for internal review, then client review.
3. Client feedback is applied as revisions on the same page.
4. Approved pages are marked in this README and handed to production.

### Status

| Page | Status |
| --- | --- |
| Home | Draft complete — awaiting internal review, then client review |
| Services (template) | Not started |
| Industry (template) | Not started |
| About / Careers / Portfolio | Not started |
| Blog listing + article | Not started |
| Contact | Not started |

### Needs client confirmation

Items in the homepage mockup that are placeholders or that the client must verify before
production:

- **Partner logos** — official artwork supplied by the client in `assets/img/brands-logos/`
  (Google Cloud, Meta Business, Google, Shopify, TikTok). Files are ~30px tall, so they will look
  soft on high-DPI screens; request 2× versions (or SVG) before production.
- **Award badges** — still typographic (Clutch, BBB, Expertise, Local Excellence Award). Official
  badge artwork and permission to use it come from the client.
- **Testimonials** — quotes are verbatim from the live site (one typo corrected). The two authors,
  "Edward Kennedy" and "Olivia Hayes", are both titled "Director, Client Experience" and read like
  template placeholders. Confirm real names, titles and companies, or replace.
- **Third case study** — "Developing Leadership Qualities" has no metric on the live site; its
  tags (Brand, Content) are placeholders.
- **Hero dashboard chart** — the curve is illustrative; the figures on it (+120%, 4–6× ROAS,
  7.8M leads) are the client's own published numbers.
- **Service sub-links in the mega menu** — taken from the live navigation where known; a few
  labels (e.g. "App Install Campaigns") are reasonable stand-ins for items the live menu names
  differently.
- **Fonts** — Fraunces + Inter stand in for the brand guide's non-licensable display face.
