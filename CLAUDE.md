# CLAUDE.md

Instructions for Claude Code working in this repository.

## What this repo is

Static HTML mockups of redesigned pages for **webspidersolutions.com**. The live site exists; the
client rejected its design and wants a redesign. Everything here is a design artifact for client
approval — not production code, not a deployable app. See [README.md](README.md) for scope, site
map, and brand details.

Consequences of that:

- Designs get judged visually. Fidelity of layout, spacing, and type matters more than
  architecture.
- Nothing needs to actually work. Forms, search, and auth are presentational.
- Do not add build tooling, package managers, frameworks, or a deploy pipeline unless asked.

## Stack and conventions

- Plain HTML5, hand-written CSS, vanilla JS. No CSS framework, no build step, no package
  manager — every file must render correctly when opened directly from disk. Google Fonts is the
  only external request and every font has a real fallback stack.
- CSS is split by responsibility, loaded in this order on every page:
  - `assets/css/tokens.css` — every design value as a custom property. Define a value once here;
    never hardcode a hex, size, or shadow twice.
  - `assets/css/base.css` — reset, typographic defaults, utilities (`.container`, `.section`,
    `.eyebrow`, `.reveal`, `.visually-hidden`, skip link), reduced-motion rules.
  - `assets/css/components.css` — header, navigation, dropdowns, mobile nav, buttons, cards, tags,
    forms, avatars, footer. Shared by every page.
  - `assets/css/<page>.css` — that page's section layouts only (`home.css` for the homepage).
- `assets/js/main.js` holds all interactions and is shared by every page. Dependency-free; every
  behaviour must degrade to a usable page without it.
- Class naming is BEM without prefixes (`.hero`, `.hero__title`, `.btn--primary`), state classes
  are `.is-open` / `.is-visible` / `.is-scrolled`. Inline styles are allowed only to pass per-item
  custom properties (`style="--i: 2"`, `style="--art: …"`).
- Images in `assets/img/`, brand logo and icon files in `assets/img/logo/`.
- One page per file: `index.html` at root, everything else under `pages/` as
  `pages/<page-name>.html` (kebab-case, e.g. `pages/seo-services.html`).
- Relative paths only, so files work from disk and from any served subdirectory.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`, one `h1` per page, real heading
  order. Alt text on every image.

## Brand: colors, logo, type

The Brandmark guide is the source of truth. Full detail, including RGB values and usage rules,
is in [README.md](README.md#brand-reference) — do not restate or re-derive it, read it.

```css
:root {
  --brand-bg:        #f2f3ef; /* Bone     — page background, ~50% of surface */
  --brand-fg:        #5a5e64; /* Slate    — secondary text, borders, ~20%    */
  --brand-ink:       #2f3237; /* Ink      — body text, and text on green     */
  --brand-surface:   #ffffff; /* Surface  — cards on Bone                    */
  --brand-accent:    #92c131; /* Spider Green — primary accent, ~10%         */
  --brand-accent-2:  #7fa042; /* Moss     — supporting, ~10%                 */
  --brand-accent-3:  #6d7f53; /* Olive    — supporting, ~10%                 */
}
```

Rules that are easy to get wrong, so follow them literally:

- **Green is never text.** Spider Green hits ~1.9:1 on Bone and white-on-green ~2.1:1 — both fail
  WCAG AA. Use green for fills, rules, icons, badges, and illustration only. On a green fill, text
  is `--brand-ink` (~6:1). Body copy is Ink or Slate on Bone or white.
- **One accent.** Spider Green is the accent. Moss and Olive are supporting tones for gradients,
  charts, and alternating sections — never a second and third button style.
- **Respect the ratios.** Roughly 50% Bone, 20% Slate, 30% split across the accents. A page that
  is mostly green is off-brand.
- **Logo files come from `assets/img/logo/`.** Never redraw the logo in CSS/SVG, never recolor it
  outside the provided variants, never stretch it. In page chrome use the `*-trimmed.svg` files
  (`logo-full-trimmed.svg` on light, `logo-full-white-trimmed.svg` on dark): they are the same
  artwork with the canvas cropped to the ink (2.53:1), so a 48px-tall header logo is 122px wide.
  The un-trimmed files carry ~60% padding and are for contexts that need it. Always give the
  `<img>` explicit `width` and `height`.
- **`icon.svg` is a W monogram, not the lockup's cloud symbol.** It is the brand's profile icon:
  use it for the favicon, app icons and avatars only. Never place it where the reader would expect
  the full logo — the collapsed mobile header uses the trimmed full logo at 40px.
- **Clear space:** ⅓ of the smaller dimension around the full logo; ⅓ of the unit square around
  the symbol. Nothing crowds it.
- **Type:** headings in Fraunces, body/UI in Inter, both from Google Fonts, with real fallback
  stacks. These stand in for the guide's "Brandmark Serif 40 Color", which is not a licensable web
  font. If the client supplies licensed fonts, they replace this pairing everywhere.

## Design rules

- Mobile-first and responsive at every breakpoint. Check ~375px, ~768px, ~1440px before calling a
  page done.
- Header, footer, and nav are identical across pages. When one changes, update every page that
  uses it — there is no include mechanism, so duplication is intentional and must stay in sync.
- Reuse existing components before inventing new ones. Read a finished page first and match its
  patterns rather than introducing a second style of button, card, or section.
- Sample content should be realistic and on-brand (real service names, plausible stats,
  India/Noida agency context). Never leave lorem ipsum in a page shown to the client.
- No fabricated client names, logos, awards, certifications, or testimonials attributed to real
  companies. Use clearly generic placeholders for anything unverified.
- Accessibility baseline: visible focus states, keyboard-reachable menus and modals, and text
  contrast of at least 4.5:1 (3:1 for large text). Check any new color pairing before shipping it
  — the brand accents fail as text, see above.

## Working agreements

- When asked for "a page," produce the complete page — header through footer, all sections, all
  breakpoints — not a section in isolation.
- The homepage sets the design language. Before designing any other page, read `index.html` and
  carry its type scale, spacing, color usage, and component styles forward.
- If a design decision is genuinely open (direction, palette, layout concept), present the options
  briefly and pick a recommendation — don't stall.
- Keep the status table in README.md current when a page is finished or approved.
- Don't touch the live production site or its content from here.

## Checking work

```powershell
python -m http.server 8000     # then open http://localhost:8000
```

Opening `index.html` straight from disk must also work (fonts fall back offline).

There are no tests and no linter. Verification is: open the page, resize it, click through it.
Check 375, 768, 1024 and 1440 widths; open every dropdown and the mobile menu with both mouse and
keyboard; tab through the page once. Headless Edge (`msedge --headless=new --screenshot=…`)
works for captures but clamps its window to ~481px wide — frame the page in an `<iframe>` of the
target width to see a true mobile render.
