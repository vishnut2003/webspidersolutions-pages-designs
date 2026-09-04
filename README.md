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

> Assumption, flagged for confirmation: this pairing is a proposal, not from the brand guide. If
> the client has licensed fonts or a preferred pairing, swap it before the first page is built.

### Logo assets

Downloaded from the brand guide into [assets/img/logo/](assets/img/logo/):

| File | Use |
| --- | --- |
| `logo-full.svg` | Primary full logo, brand colors, transparent background — the default |
| `logo-full-white.svg` | Full logo, solid white — dark backgrounds, footers, overlays |
| `logo-full-black.svg` | Full logo, solid black — print, single-color contexts |
| `logo-full-accent.svg` | Full logo in Spider Green `#92c131` |
| `logo-full.png` / `logo-full-white.png` | 1600px raster fallbacks (OG images, email, decks) |
| `icon.svg` | Spider symbol, full-color gradient treatment |
| `icon-black.svg` / `icon-white.svg` | Symbol, solid black / solid white |
| `icon-accent1.svg` / `icon-accent2.svg` / `icon-accent3.svg` | Symbol in each accent color |
| `icon-512.png` / `icon-white-512.png` / `icon-accent1-512.png` | 512×512 raster — favicons, app icons, avatars |

Usage rules from the guide:

- Clear space around the full logo: at least **R**, where R = ⅓ × the logo's smaller dimension.
- Clear space around the symbol: at least **r**, where r = ⅓ of the unit square around the icon.
- Prefer the full logo. Use the symbol alone only in constrained spaces — favicons, app icons,
  profile images, and the collapsed mobile header.

## Stack

Plain static HTML with Tailwind CSS (CDN) and vanilla JS. No build step, no dependencies — open a
file in a browser and it works. This keeps mockups fast to produce and trivial to share.

> Assumption, flagged for confirmation: if the redesign is meant to go straight into Next.js (or
> the existing production stack), say so and this repo's approach changes before any page is built.

## Structure

```
/
├── index.html          # Homepage design
├── pages/              # One file per page design
├── assets/
│   ├── css/            # Shared styles / design tokens
│   ├── js/             # Shared interactions
│   └── img/
│       └── logo/       # Brand logo and icon assets (SVG + PNG)
├── README.md
└── CLAUDE.md           # Working instructions for Claude Code
```

## Viewing the designs

Open `index.html` directly in a browser, or serve the folder:

```powershell
npx serve .
# or
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
| Home | Not started |
| Services (template) | Not started |
| Industry (template) | Not started |
| About / Careers / Portfolio | Not started |
| Blog listing + article | Not started |
| Contact | Not started |
