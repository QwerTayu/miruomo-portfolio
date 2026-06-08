# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the ./dist/ build locally
npx astro check   # TypeScript type-check all .astro files
```

No test runner or linter is configured yet.

## Environment Variables

Copy `.env.example` → `.env`:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX        # Google Analytics 4
PUBLIC_CLARITY_ID=xxxxxxxxxx      # Microsoft Clarity
GITHUB_LANG_TOKEN=github_pat_...  # GitHub PAT for language stats (build-time only)
```

- Analytics run via **Partytown** (`type="text/partytown"`) in `src/layouts/layout.astro` — do not change this pattern.
- `GITHUB_LANG_TOKEN` is used only in Astro frontmatter at build time and never exposed to the browser. Fine-grained PAT with Metadata: Read-only + All repositories. Do NOT prefix with `PUBLIC_`.
- GitHub Actions Secrets must include all three: `PUBLIC_GA4_ID`, `PUBLIC_CLARITY_ID`, `GITHUB_LANG_TOKEN`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to **GitHub Pages** on:
- Every push to `main`
- Weekly cron: every Sunday 00:00 UTC (09:00 JST) — keeps GitHub language stats fresh

The `develop` branch is used for active development; PRs merge into `main` to trigger deploy.

## Architecture

### Phase plan

The site is built in two phases. See `doc/design-spec.md` for the full spec.

- **Phase 1 (current target):** Static SPA — all sections, CSS/GSAP animations, Works via Content Collections with modal, GitHub API skill bars (build-time), Zenn API articles, i18n skeleton with `lang='ja'` hardcoded.
- **Phase 2:** Three.js camera object (Hero + Works transition), GSAP ScrollTrigger, i18n `/en/` route enabled.

### Key design decisions

**Single-page layout:** One `/` route with `#hero`, `#about`, `#works`, `#timeline`, `#articles` anchor sections. No detail pages — articles link out to Zenn/Qiita externally.

**Works — Content Collections:** Works content lives in `src/content/works/{id}/index.md`. The frontmatter holds card data (title, tags, github, demo, year); the markdown body is the modal article. Images go in `src/content/works/{id}/figures/`. The schema is defined with Zod in `src/content/config.ts`. There is no `src/data/works.ts`.

**Works modal:** Clicking a Works card opens a modal that renders the markdown body of that work's `index.md`. `Works.tsx` is a React Island that handles card display + modal open/close.

**About skill bars:** Language percentages are fetched from the GitHub API at build time inside `About.astro`'s frontmatter using `GITHUB_LANG_TOKEN`. Owner repos (forks excluded) are aggregated, sorted, and top N shown. Manual skills (Figma, AtCoder, etc.) are defined in `src/data/skills.ts` and merged with the API result.

**Content data flow:** `doc/timeline.json` is a planning document; actual data is written directly in `src/data/timeline.ts`. `doc/` files are never imported by the build.

**i18n skeleton:** `src/i18n/ui.ts` defines all text strings via `t(lang, key)`. Never hardcode display strings in components. In Phase 1, `lang` is always `'ja'`. Hero name is `'miruomo.com'`; role is `'SOFTWARE ENGINEER'` (no PHOTOGRAPHER).

**Three.js placeholders:** `Hero.astro` contains `<div id="camera-mount" class="camera-placeholder">`. This must be preserved — Phase 2 replaces it with `<CameraScene client:only="react" />`.

**React Islands:** Only interactive components use `client:` directives. `Works.tsx` (card list + modal) is the main Island in Phase 1.

**Image locations:**
- `src/assets/about/` — avatar and other non-work images (Astro WebP optimization)
- `src/content/works/{id}/figures/` — work modal images (Astro WebP optimization)
- `public/icons/`, `public/favicon.*` — static files served as-is, no optimization

**Analytics:** GA4 and Microsoft Clarity use `type="text/partytown"` scripts in `src/layouts/layout.astro`.

### Directory structure (Phase 1)

```
src/
  content/
    config.ts              # Zod schema for Works collection
    works/
      {id}/
        index.md           # frontmatter (card data) + body (modal article)
        figures/           # images referenced in index.md
  components/
    sections/              # Hero.astro, About.astro, Works.tsx, Timeline.astro, Articles.astro
    ui/                    # NavBar.astro, LanguageSwitch.astro
    three/                 # Phase 2: CameraScene.tsx, camera.glb
  data/
    skills.ts              # manual skills (Figma, AtCoder, etc.)
    timeline.ts            # timeline events
  i18n/
    ui.ts                  # t() helper + ja strings
    en.ts                  # Phase 2
  styles/
    global.css             # all CSS custom properties
  pages/
    index.astro
    en/index.astro         # Phase 2 only
  assets/
    about/                 # avatar.jpg (500px+, square)
doc/
  design-spec.md
  timeline.json            # planning draft → transcribed to src/data/timeline.ts
public/
  icons/                   # SNS icons
  favicon.svg / favicon.ico
  CNAME
```

### Design tokens

All CSS custom properties are defined in `src/styles/global.css`. Key values:

- `--color-accent: #FF301D` (Film Red — primary accent)
- `--color-ink: #1A1714` (dark background)
- `--color-paper: #F7F4EF` (light section background)
- Fonts: DM Serif Display (headings), DM Mono (labels/code), Noto Sans JP (body)
- `--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`
