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

- Plain HTML5, Tailwind CSS via CDN, vanilla JS. No build step — every file must render correctly
  when opened directly from disk.
- Shared design tokens (colors, fonts, spacing scale) live in `assets/css/tokens.css` and are
  consumed as CSS custom properties. Define a value once there; never hardcode a hex twice. If
  that file does not exist yet, create it from the brand palette below as the first step of the
  first page.
- Shared CSS in `assets/css/`, shared JS in `assets/js/`, images in `assets/img/`, brand logo and
  icon files in `assets/img/logo/`.
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
  outside the provided variants, never stretch it. `logo-full.svg` on light backgrounds,
  `logo-full-white.svg` on dark. Use `icon-*.svg` alone only for favicons, app icons, avatars, and
  the collapsed mobile header.
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
npx serve .        # then open http://localhost:3000
```

There are no tests and no linter. Verification is: open the page, resize it, click through it.
