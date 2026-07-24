# Merkan Website

Multilingual static marketing site for **Merkan** — a business consulting company that helps foreign businesses enter the Iranian market.

- **Production:** [https://merkan.ir](https://merkan.ir)
- **Repository:** `github.com:peywasti/merkan-website`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro](https://astro.build) v7 (static-site generation) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 — uses `@theme` block in `global.css`, no `tailwind.config.js` |
| Icons | [`lucide-astro`](https://lucide.dev) |
| i18n | Custom TypeScript modules (zero runtime cost) |
| Package manager | `pnpm` |

---

## Project Structure

```
├── public/
│   └── hero-abstract.svg          # Homepage hero background
├── src/
│   ├── assets/
│   │   ├── merkan-logo.svg        # Brand logo (source of accent colors)
│   │   ├── favicon.svg
│   │   └── fonts/
│   │       └── AradVF.woff2       # Persian variable font
│   ├── components/
│   │   ├── Header.astro           # Sticky header with nav & language switcher
│   │   └── Footer.astro
│   ├── i18n/                      # Translation modules (per page/topic)
│   │   ├── index.ts               # Aggregates all translations + helpers
│   │   ├── common.ts              # Shared strings (nav, footer, meta)
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── services.ts
│   │   ├── why.ts
│   │   ├── steps.ts               # "How we work"
│   │   └── contact.ts
│   ├── layouts/
│   │   └── Layout.astro           # Root HTML layout (SEO meta, fonts, RTL)
│   ├── pages/                     # Static routing — no dynamic params
│   │   ├── about.astro            # Persian (default, no prefix)
│   │   ├── contact.astro
│   │   ├── how-we-work.astro
│   │   ├── index.astro            # / → Persian homepage
│   │   ├── services.astro
│   │   ├── en/                    # English (/en/*)
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── services.astro
│   │   │   ├── how-we-work.astro
│   │   │   └── contact.astro
│   │   ├── tr/                    # Turkish (/tr/*)
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── services.astro
│   │   │   ├── how-we-work.astro
│   │   │   └── contact.astro
│   │   ├── robots.txt.ts
│   │   └── sitemap.xml.ts
│   └── styles/
│       └── global.css             # Tailwind import, theme tokens, utilities
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Internationalization

| Code | Language | Direction | URL pattern |
|------|----------|-----------|-------------|
| `fa` | Persian (Farsi) | `rtl` | `/*` (no prefix) |
| `en` | English | `ltr` | `/en/*` |
| `tr` | Turkish | `ltr` | `/tr/*` |

Translations live in `src/i18n/*.ts` as plain objects. Astro inlines them at build time — there is **zero client-side i18n overhead**.

Key helpers in `src/i18n/index.ts`:
- `getLocalePath(path, lang)` — prepend `\en` or `\tr` when needed
- `switchLangUrl(targetLang, currentPath)` — compute the equivalent page in another language

---

## Color Palette

Colors are derived from the brand logo (`src/assets/merkan-logo.svg`).

- **Primary (deep navy)** — `primary-50` … `primary-950` — dark backgrounds, headings, UI
- **Accent (warm orange-red)** — `accent-50` … `accent-900` — CTAs, buttons, highlights

Defined in `src/styles/global.css` inside the `@theme` block.

> Do **not** create a `tailwind.config.js` — Tailwind v4 is configured via CSS.

---

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev          # → localhost:4321

# Build for production
pnpm build        # → ./dist/

# Preview production build
pnpm preview
```

> This project uses `pnpm`. A `pnpm-lock.yaml` is present.

---

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `new-theme` | Color rebrand & abstract hero background |
| `fa-default` | Persian as default locale without URL prefix |

---

## Known Issues

`pnpm build` currently fails with an Astro internal error related to the `cookie` package CJS/ESM mismatch. This is a dependency issue between Astro v7 and `cookie`, **not** caused by application code. It likely requires an Astro or dependency upgrade.

---

## License

Proprietary — © Merkan
