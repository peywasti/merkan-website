# Agent Handoff Document — Merkan Website

> **Purpose:** This file exists so every agent (human or AI) who works on this codebase can quickly understand the project, its conventions, and what has already been done. **Update this file whenever you make architectural or workflow changes.**

---

## 1. Project Overview

**Merkan** is a multilingual business-consulting website for a company that helps foreign businesses enter the Iranian market. The site is built as a static marketing site with a contact form and SEO-friendly pages.

- **Production domain:** `https://merkan.ir`
- **Repository:** `github.com:peywasti/merkan-website`
- **Default branch:** `main`

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | [Astro](https://astro.build) v7 | Static-site generation, no client-side JS framework |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 | Uses `@theme` block in `global.css` — no `tailwind.config.js` |
| Icons | [`lucide-astro`](https://lucide.dev) | Astro wrapper for Lucide icons |
| i18n | Custom TypeScript modules | No external i18n library; see §4 |
| Package manager | pnpm | `pnpm-lock.yaml` present |

### Tailwind CSS v4 specifics
- Theme colors are defined as CSS custom properties inside `@theme` in `src/styles/global.css`.
- Tailwind utility classes map directly to `--color-<name>-<scale>` variables.
- **Do not create a `tailwind.config.js`** — Tailwind v4 does not use it by default.

---

## 3. Project Structure

```
├── public/
│   └── hero-abstract.svg          # Homepage hero background image
├── src/
│   ├── assets/
│   │   ├── merkan-logo.svg        # Brand logo (source of accent colors)
│   │   ├── merkan-logo.png
│   │   ├── favicon.svg
│   │   └── fonts/
│   │       └── AradVF.woff2       # Persian variable font
│   ├── components/
│   │   ├── Header.astro           # Sticky header with nav & language switcher
│   │   └── Footer.astro           # Simple footer
│   ├── i18n/                      # Translation modules (see §4)
│   │   ├── index.ts               # Aggregates all translations
│   │   ├── common.ts              # Shared strings (nav, footer, meta)
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── services.ts
│   │   ├── why.ts
│   │   ├── steps.ts               # "How we work" page
│   │   └── contact.ts
│   ├── layouts/
│   │   └── Layout.astro           # Root HTML layout (SEO meta, fonts, RTL)
│   ├── pages/
│   │   ├── index.astro            # Root redirect → /en/
│   │   ├── robots.txt.ts          # Dynamic robots.txt
│   │   ├── sitemap.xml.ts         # Dynamic sitemap
│   │   └── [lang]/                # Localized routes
│   │       ├── index.astro        # Homepage
│   │       ├── about.astro
│   │       ├── services.astro
│   │       ├── how-we-work.astro
│   │       └── contact.astro
│   └── styles/
│       └── global.css             # Tailwind import, theme, utilities, keyframes
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── pnpm-workspace.yaml
```

---

## 4. Internationalization (i18n)

### Supported languages
| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | `ltr` |
| `fa` | Persian (Farsi) | `rtl` |
| `tr` | Turkish | `ltr` |

### How translations work
1. Each page/topic has its own module (e.g. `src/i18n/home.ts`) exporting `en`, `fa`, and `tr` objects.
2. `src/i18n/index.ts` merges `common.ts` + all page-specific objects into a single `translations[lang]` tree.
3. `src/i18n/index.ts` exports:
   - `translations` — full nested object
   - `Lang` type — `"en" | "fa" | "tr"`
   - `defaultLang` — `"fa"`
   - `langs` — array of supported codes
   - `isLang(value)` — type guard
4. Every page receives the current `lang` from `Astro.params`, validates it with `isLang()`, then reads `const t = translations[safeLang]`.
5. The `Layout.astro` component sets `<html lang={lang} dir={dir}>` where `dir` is `"rtl"` for `fa`.

### Adding a new language
1. Add the code to `Lang`, `defaultLang`, `langs` in `src/i18n/index.ts`.
2. Add a translation object to **every** file in `src/i18n/`.
3. Add the language to `getStaticPaths()` in every `[lang]/` page.

---

## 5. Color Palette & Brand Identity

The brand identity is built around the logo (`src/assets/merkan-logo.svg`), which contains warm orange–red gradients (`#cc3733` → `#ec9523`).

### Theme naming convention
| Old name | New name | Role |
|----------|----------|------|
| `navy-*` | **`primary-*`** | Dark backgrounds, headings, primary UI |
| `gold-*` | **`accent-*`** | CTAs, highlights, decorative elements |

> ⚠️ **Do not use `navy-*` or `gold-*` in new code.** They were fully replaced across all `.astro` files and `global.css`.

### Primary (deep navy blue — complements orange)
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | `#f0f4f8` | Light backgrounds |
| 100 | `#d9e2ec` | Subtle borders |
| 200 | `#bcccdc` | Muted text |
| 300 | `#9fb3c8` | Secondary text |
| 400 | `#829ab1` | Icons |
| 500 | `#627d98` | Medium elements |
| 600 | `#486581` | Active states |
| 700 | `#334e68` | Strong UI |
| 800 | `#1e3a5a` | Dark sections |
| 900 | `#0f2642` | Hero sections, footer bg |
| 950 | `#061220` | Deepest dark, overlays |

### Accent (warm orange-red — derived from logo)
| Scale | Hex | Usage |
|-------|-----|-------|
| 50 | `#fff7f4` | Very light tint |
| 100 | `#fde8db` | Light backgrounds, icon circles |
| 200 | `#faceb3` | Hover rings, subtle highlights |
| 300 | `#f5a07a` | Text on dark backgrounds |
| 400 | `#eb7d4d` | Decorative text, hover states |
| 500 | `#e05d2e` | **Main brand color — CTAs, buttons** |
| 600 | `#cc4a2a` | Icon text, secondary CTAs |
| 700 | `#a93a26` | Dark icons |
| 800 | `#8a3126` | Heavy accents |
| 900 | `#5c1f1c` | Deepest accent |

### Where colors are defined
`src/styles/global.css` inside the `@theme` block:
```css
@theme {
  --color-primary-50: #f0f4f8;
  /* ... */
  --color-accent-500: #e05d2e;
  /* ... */
}
```

### Custom utility classes in `global.css`
| Class | Effect |
|-------|--------|
| `.gradient-hero` | Diagonal gradient using `primary-950` → `primary-800` → `primary-900` |
| `.gradient-accent` | Diagonal gradient using `accent-500` → `accent-300` |
| `.text-gradient` | Gradient text using `accent-300` → `accent-500` |
| `.glass` | Frosted-glass backdrop blur |
| `.card-hover` | Lift + shadow on hover |
| `.animate-fade-in` | Fade-in-up entrance animation |
| `.step-line` | Vertical gradient line for step timelines |

### RTL support
Many utilities have `[dir="rtl"]` overrides in `global.css` (e.g. `.step-line`).

---

## 6. Homepage Hero Background

The homepage hero (`src/pages/[lang]/index.astro`) uses an abstract SVG background instead of a CSS gradient.

- **File:** `public/hero-abstract.svg`
- **Reference in page:**
  ```astro
  <section
    class="text-white py-24 lg:py-32 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    style="background-image: url('/hero-abstract.svg');"
  >
    <div class="absolute inset-0 bg-primary-950/30"></div>
    <!-- content ... -->
  </section>
  ```

The SVG is built with the brand colors:
- Deep navy base gradient (`primary-950` → `primary-900`)
- Large soft orbs in `accent-500` and `accent-600` at low opacity
- Flowing curved lines
- Small geometric diamond shapes
- Subtle dot-grid pattern at 4% opacity

**Guideline for agents:** If you need to adjust the hero background, edit the SVG directly or create a new one in `public/` and update the `background-image` URL. Keep text readability in mind — the overlay `bg-primary-950/30` ensures white text stays crisp.

---

## 7. SEO / Search Console Files

| File | Route | Purpose |
|------|-------|---------|
| `src/pages/robots.txt.ts` | `/robots.txt` | Allows all crawlers, points to sitemap |
| `src/pages/sitemap.xml.ts` | `/sitemap.xml` | Lists all localized pages for Google Search Console |

The sitemap is generated dynamically from the list of languages and pages. If you add a new page, update `sitemap.xml.ts`.

---

## 8. Git Workflow

### Branches
- `main` — production-ready code
- `new-theme` — feature branch for theme/color changes (where the most recent work lives)

### Commit convention
We use conventional commits:
```
feat: add sitemap.xml for Google Search Console
feat: rebrand color palette and add abstract hero background
```

### Known pre-existing issue
`npm run build` currently fails with an Astro internal error:
```
Named export 'parseCookie' not found. The requested module 'cookie' is a CommonJS module...
```
This is a dependency incompatibility between Astro v7 and the `cookie` package, **not** related to any code in this repository. Do not try to "fix" this by changing application code. It likely needs an Astro or dependency upgrade.

---

## 9. Agent Guidelines

### Before making changes
1. **Read this file.**
2. Run `git status` to know which branch you're on.
3. Check `git log --oneline -5` to see recent context.

### When adding new pages
1. Create the `.astro` file in `src/pages/[lang]/`.
2. Add `getStaticPaths()` returning `{ params: { lang } }` for every supported language.
3. Add translations in a new `src/i18n/<topic>.ts` file and wire it into `src/i18n/index.ts`.
4. Use `Layout` and follow existing section patterns (hero → content → CTA).
5. Update `sitemap.xml.ts` if the page should be indexed.

### When changing colors
1. Edit `src/styles/global.css` inside the `@theme` block.
2. Update **all** color references in `.astro` files — search for `primary-` / `accent-` to find usage patterns.
3. Update SVG assets (like `hero-abstract.svg`) if they use hardcoded brand colors.
4. Run `grep -r "color-navy-\|color-gold-\|navy-\d\+\|gold-\d\+" src/` to catch stragglers.

### When adding images
- **Static images** (backgrounds, logos): place in `public/` and reference with root path `/file.ext`.
- **Optimizable images** (content images): place in `src/assets/` and import them so Astro can optimize.

### RTL / i18n reminders
- The `fa` (Persian) layout is `rtl`. Check `Layout.astro` for `dir={dir}`.
- Test visual changes mentally for both LTR and RTL.
- `text-start` / `text-end` are preferred over `text-left` / `text-right`.

---

## 10. Session History

### Session 1 — Sitemap & robots.txt
- Added `src/pages/sitemap.xml.ts` for Google Search Console.
- Added `src/pages/robots.txt.ts`.
- Updated `astro.config.mjs` with `site: 'https://merkan.ir'`.
- **Commit:** `949b326`

### Session 2 — Color rebrand + abstract hero background
- Replaced old `navy-*` / `gold-*` palette with semantic `primary-*` / `accent-*`.
  - `accent-*` derived from `merkan-logo.svg` orange-red gradients.
  - `primary-*` kept as deep navy blue (slightly adjusted for better contrast with orange).
- Ran bulk `sed` replacement across all `.astro` components.
- Updated `src/styles/global.css` `@theme` block and utility classes.
- Created `public/hero-abstract.svg` — abstract background with brand-colored orbs, lines, and geometry.
- Updated `src/pages/[lang]/index.astro` hero to use the SVG background with subtle overlay.
- Removed unused starter assets (`src/assets/astro.svg`, `src/assets/background.svg`).
- **Commit:** `234aa77`
- **Pushed to:** `new-theme` branch on GitHub

---

*Last updated: 2026-07-22*
