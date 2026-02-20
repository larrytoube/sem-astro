# Sharp End Marketing Site - Technical Specification

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Astro | 5.x | Static-first, Islands architecture |
| Styling | Tailwind CSS | 4.x | Utility-first CSS with design tokens |
| Interactive | React | 19.x | Islands for contact form |
| Content | MDX | - | Rich content with embedded components |
| Deployment | Vercel | - | Edge network, preview deployments |
| CI/CD | GitHub Actions | - | Build, type-check, eval pipeline |
| Type Safety | TypeScript | 5.x | Strict mode |

## Architecture

### Islands Architecture

- All pages are static HTML by default (zero JS shipped)
- React used only for contact form with `client:visible`
- Prefer Astro components (`.astro`) over React components (`.tsx`)

### Content Collections

- Astro Content Collections with Zod schemas
- Collections: `blog`, `case-studies`
- Schemas defined in `src/content/config.ts`

### Deployment

- **Production**: Vercel, triggered by merge to `main`
- **Preview**: Vercel preview deployments for each PR
- **Build**: `pnpm build` → static output to `dist/`
- **Node version**: 22.x

## Performance Budgets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | >= 90 | Lighthouse CI |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Total Blocking Time (TBT) | < 200ms | Lighthouse |
| JavaScript bundle | < 200 KB | Build output |
| CSS (critical) | < 100 KB | Build output |

## Verification

### Build-time Checks

1. `pnpm build` — Astro static build succeeds
2. `pnpm astro check` — TypeScript and Astro type checking
3. `validate-frontmatter` — MDX frontmatter matches Zod schemas
4. `brand-check` — Design token compliance
5. `a11y-check` — Accessibility validation
6. `seo-check` — Meta tags, OG, structured data
7. `perf-check` — Performance budgets

### Preview Checks

1. Lighthouse CI against preview URL
2. axe-core against preview URL
