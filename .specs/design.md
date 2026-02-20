# Sharp End Marketing - Design System

## Overview

Light, professional aesthetic targeting small business owners. Open Sans for readability, Comfortaa for brand personality. Blue accent color for trust and professionalism.

## Color Tokens

Defined in `src/styles/global.css` via Tailwind v4 `@theme`:

- `--color-accent-blue`: #4d65ff (primary accent)
- `--color-accent-blue-dark`: #3a4fd6 (hover states)
- `--color-dark-navy`: #1a1a2e (dark backgrounds)
- `--color-text-dark`: #1a1a1a (headings)
- `--color-text-body`: #333333 (body text)
- `--color-bg-white`: #ffffff (main background)
- `--color-bg-light`: #f5f5f5 (section backgrounds)
- `--color-border`: #e5e5e5 (borders)

## Typography

### Font Stack

- Headings: Open Sans Variable (weight 700)
- Body: Open Sans Variable (weight 400)
- Accent: Comfortaa (weight 400, 700) — logo, section titles

### Scale

- Hero: 3.5rem / 1.1 / Comfortaa 700
- H1: 2.5rem / 1.2 / Comfortaa 700
- H2: 2rem / 1.25 / Comfortaa 700
- H3: 1.5rem / 1.3
- H4: 1.25rem / 1.4
- Lead: 1.25rem / 1.6
- Body Large: 1.125rem / 1.7
- Caption: 0.875rem / 1.5

## Components

All SEM components in `src/components/sem/`:

| Component | Purpose |
|-----------|---------|
| `SEMHeader` | Sticky nav with logo, links, mobile hamburger |
| `SEMFooter` | Dark navy footer with links and social icons |
| `SEMHero` | Hero section with Comfortaa title, subtitle, CTA |
| `SEMServiceCard` | Numbered service card with hover effect |
| `SEMProcessStep` | Numbered circle + title + description |
| `SEMCaseStudyCard` | Image placeholder + category + title + description |
| `SEMTestimonial` | Quote block with author attribution |
| `SEMCTASection` | Full-width dark navy CTA with heading + button |
| `SEMSectionHeader` | Centered Comfortaa title + optional subtitle |
| `SEMTeamCard` | Avatar placeholder + name + role |
| `ContactForm` | React form with validation (client:visible) |

## Shadows

- `--shadow-card`: Subtle card shadow
- `--shadow-card-hover`: Elevated hover shadow
- `--shadow-nav`: Navigation shadow

## Layout Patterns

- Max width: 7xl (1280px)
- Section padding: px-6 py-20
- Card grid: responsive columns (sm:2, md:3, lg:4)
- Generous spacing between sections
