# Sharp End Marketing Site - Issue Inventory

## P0 — Foundation (Complete)

- [x] **SEM-001**: Scaffold Astro project with Tailwind v4, React, MDX
- [x] **SEM-002**: Create BaseLayout with SEO Head component
- [x] **SEM-003**: Create SEMLayout with Header/Footer
- [x] **SEM-004**: Build SEMHeader with navigation and mobile menu
- [x] **SEM-005**: Build SEMFooter with links and social icons
- [x] **SEM-006**: Create design system (global.css with SEM tokens)

## P0 — Components (Complete)

- [x] **COMP-001**: Build SEMHero component
- [x] **COMP-002**: Build SEMServiceCard component
- [x] **COMP-003**: Build SEMProcessStep component
- [x] **COMP-004**: Build SEMCaseStudyCard component
- [x] **COMP-005**: Build SEMTestimonial component
- [x] **COMP-006**: Build SEMCTASection component
- [x] **COMP-007**: Build SEMSectionHeader component
- [x] **COMP-008**: Build SEMTeamCard component
- [x] **COMP-009**: Build ContactForm (React)

## P0 — Pages (Complete)

- [x] **PAGE-001**: Homepage with all sections
- [x] **PAGE-002**: About Us page
- [x] **PAGE-003**: Contact page with form
- [x] **PAGE-004**: Services index + 7 individual service pages
- [x] **PAGE-005**: Case Studies index + 5 case study pages
- [x] **PAGE-006**: Blog index page

## P0 — Infrastructure (Complete)

- [x] **INFRA-001**: CI workflow (build + type check)
- [x] **INFRA-002**: Deploy preview workflow (Lighthouse + axe-core)
- [x] **INFRA-003**: Lighthouse performance budgets

## P0 — CMS (Partial)

- [x] **CMS-001**: Set up Keystatic CMS with custom Astro 5 integration
- [x] **CMS-002**: Blog collection in Keystatic (7 posts, directory format, image management)
- [x] **CMS-003**: Case studies collection in Keystatic (5 studies, directory format, gallery/related)
- [x] **CMS-004**: Install Vercel adapter for SSR Keystatic routes
- [x] **CMS-005**: Dual-mode storage config (local dev / GitHub production)
- [ ] **CMS-006**: Complete Keystatic GitHub App setup (manual steps — see below)

### CMS-006: Keystatic GitHub OAuth Setup (Manual Steps)

Code changes are complete. These manual steps remain:

1. **Create GitHub App via Keystatic wizard**
   - Run `pnpm dev`, visit `http://127.0.0.1:4322/keystatic`
   - Keystatic detects the GitHub storage config and shows a setup wizard
   - Follow prompts — it creates a GitHub App and writes credentials to `.env`
   - Grant the app access to `larrytoube/sem-astro` repository

2. **Configure Vercel environment variables**
   - Go to Vercel Dashboard > sem-astro > Settings > Environment Variables
   - Add from `.env` (generated in step 1):
     - `KEYSTATIC_GITHUB_CLIENT_ID` (Production)
     - `KEYSTATIC_GITHUB_CLIENT_SECRET` (Production, sensitive)
     - `KEYSTATIC_SECRET` (Production, sensitive)
     - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (Production)

3. **Add OAuth callback URL to GitHub App settings**
   - In GitHub > Settings > Developer Settings > GitHub Apps > your app
   - Add callback: `https://your-domain.com/api/keystatic/github/oauth/callback`

4. **Redeploy on Vercel** to pick up new env vars

After completing these steps, `https://your-domain.com/keystatic` will require GitHub login and content edits become commits to the repo.

## P1 — Quality

- [x] **QUAL-001**: Eval scripts (validate-frontmatter, brand-check, a11y, seo, perf, consistency)
- [ ] **QUAL-002**: Add eval scripts to CI workflow
- [ ] **QUAL-003**: Content directory structure for approved assets

## P2 — Content Enhancement

- [x] **CONTENT-001**: Add real blog posts as Markdoc content (7 posts via Keystatic)
- [x] **CONTENT-002**: Add real case study content as Markdoc (5 studies via Keystatic)
- [ ] **CONTENT-003**: Add real images (team photos, case study images, logo)
- [ ] **CONTENT-004**: Write privacy policy page

## P2 — Optimization

- [ ] **OPT-001**: Performance audit and optimization
- [ ] **OPT-002**: SEO audit and keyword optimization
- [ ] **OPT-003**: Analytics integration (GA4)
- [ ] **OPT-004**: Contact form backend integration
