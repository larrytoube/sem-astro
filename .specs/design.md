# Sharp End Marketing - Design System

## Overview

Light, professional aesthetic targeting small business owners. Inter for readability, Comfortaa for brand personality. Teal accent color for trust and professionalism.

## Color Tokens

Defined in `src/styles/global.css` via Tailwind v4 `@theme`:

- `--color-teal`: rgba(8, 109, 114, 0.82) (primary accent / buttons)
- `--color-teal-solid`: #086d72 (links, highlights)
- `--color-teal-dark`: #013941 (dark backgrounds: footer, CTA sections)
- `--color-teal-accent`: #009688 (decorative text accent)
- `--color-heading`: #0A0D14 (heading text)
- `--color-text-body`: #525866 (body text)
- `--color-text-muted`: rgba(10, 13, 20, 0.45) (secondary text)
- `--color-bg-white`: #ffffff (main background)
- `--color-bg-light`: #F6F8FA (section backgrounds)
- `--color-border`: rgba(9, 14, 29, 0.1) (borders)
- `--color-danger`: #dc2626 (form errors)

## Typography

### Font Stack

- Body: Inter Variable (weight 400)
- Headings: Comfortaa (weight 500) — also used for accent/logo
- Accent: Comfortaa (weight 400, 500, 700)

### Scale

- Hero: 4rem (64px) / 1.1 / Comfortaa 500
- H1: 3.5rem (56px) / 1.1 / Comfortaa 500
- H2: 3.5rem (56px) / 1.15 / Comfortaa 500
- H3: 2rem (32px) / 1.25 / Comfortaa 500
- H4: 1.5rem (24px) / 1.3 / Comfortaa 500
- Lead: 1.25rem (20px) / 1.6
- Body Large: 1.125rem (18px) / 1.7
- Body: 1rem (16px) / 1.7
- Caption: 0.875rem (14px) / 1.5

### Letter Spacing

- Text: -0.01em (-1%)
- Headings: -0.02em

## Button Style

- Border radius: `0px 7px` (asymmetric, brand-specific)
- Background: `var(--color-teal)` (rgba(8, 109, 114, 0.82))
- Text: white, font-body, text-sm, font-medium
- Hover: `var(--color-teal-solid)` (#086d72)
- Class: `.btn-sem`

## Section Labels

- Uppercase, text-xs, font-medium, text-teal-solid
- Preceded by sparkle/star SVG icon
- Used with SEMSectionHeader `label` prop and SEMHero `label` prop
- Class: `.section-label`

## Components

All SEM components in `src/components/sem/`:

| Component | Purpose |
|-----------|---------|
| `SEMHeader` | Sticky nav with logo, links, mobile hamburger |
| `SEMFooter` | Dark teal footer with links and social icons |
| `SEMHero` | Hero section with label, Comfortaa title, highlight word, CTA |
| `SEMServiceCard` | Numbered service card with hover "Learn More" reveal |
| `SEMProcessStep` | Teal bordered circle + title + description |
| `SEMCaseStudyCard` | Placeholder + category + title + "View Now" button |
| `SEMTestimonial` | Quote block with author attribution |
| `SEMCTASection` | Full-width dark teal CTA with heading + button |
| `SEMSectionHeader` | Label + centered Comfortaa title + optional subtitle |
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
