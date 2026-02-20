# Sharp End Marketing Site - Architectural Decisions

Append-only log. Never edit or remove previous entries.

---

## ADR-001: Astro with Islands Architecture

**Date**: 2026-02-19
**Status**: Accepted
**Context**: Need a marketing site framework that prioritizes performance and SEO.
**Decision**: Use Astro with Islands architecture. Static HTML by default, React island only for contact form.
**Rationale**: Marketing pages are content-heavy and read-only. Astro ships zero JS by default. React island handles the contact form without hydrating the entire page.
**Consequences**: Cannot use React for layout/navigation. Contact form is the only interactive element.

---

## ADR-002: Tailwind CSS v4 with Design Tokens

**Date**: 2026-02-19
**Status**: Accepted
**Context**: Need consistent styling that enforces brand compliance.
**Decision**: Use Tailwind CSS v4 with custom `@theme` tokens in `src/styles/global.css`.
**Rationale**: Tokens ensure brand colors, typography, and spacing are consistent. Tailwind v4 CSS theme support avoids a config file.
**Consequences**: All brand values must be defined as tokens.

---

## ADR-003: Webflow to Astro Migration

**Date**: 2026-02-19
**Status**: Accepted
**Context**: Existing site on Webflow is limited in customization and performance.
**Decision**: Rebuild site in Astro, deployed to Vercel. Match existing Webflow content and design.
**Rationale**: Astro provides better performance, full code control, and free hosting on Vercel. Infrastructure patterns proven in impact-iq-astro project.
**Consequences**: Must recreate all Webflow content. DNS cutover needed at launch.

---

## ADR-004: Content Collections for Blog and Case Studies

**Date**: 2026-02-19
**Status**: Accepted
**Context**: Blog and case studies need structured, type-safe content.
**Decision**: Use Astro Content Collections with Zod schemas for blog and case-studies.
**Rationale**: Zod schemas catch errors at build time. Collections provide type-safe querying. MDX allows rich content.
**Consequences**: All content must pass Zod validation.
