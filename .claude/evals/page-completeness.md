# Page Completeness Evaluation

Checklist for evaluating whether a page has all required structural elements.

## Criteria

All checks are pass/fail. Every check must pass for the page to pass.

### 1. Required Sections Present

Verify the page includes all sections defined for its type (reference `.specs/domain.md`).

**Homepage:**
- [ ] Hero with tagline and CTA
- [ ] Services grid (7 numbered service tiles)
- [ ] Why Sharp End section (storytelling positioning)
- [ ] Process section (Discover, Create, Analyze)
- [ ] Success stories (featured case studies)
- [ ] Blog preview (recent articles)
- [ ] Bottom CTA section

**Service pages must include:**
- [ ] Hero section with service name and tagline
- [ ] What We Offer section (4 specific deliverables)
- [ ] Why This Matters section (value explanation)
- [ ] CTA section linking to /contact

**Case study pages must include:**
- [ ] Hero with client name and project summary
- [ ] Overview section (client background)
- [ ] Challenge section (problem statement)
- [ ] Approach section (solution description)
- [ ] Results section (metrics and outcomes)
- [ ] CTA section ("Have a Similar Challenge?")

**About page must include:**
- [ ] Hero section
- [ ] Agency description
- [ ] Qualifying questions or differentiators
- [ ] Why Sharp End Marketing section
- [ ] Team cards (at least 2 team members)
- [ ] CTA section

**Blog posts must include:**
- [ ] Title and lead
- [ ] Structured body content with H2/H3 hierarchy
- [ ] Key takeaways or conclusion
- [ ] Related content links

**Contact page must include:**
- [ ] Heading and description
- [ ] Contact form (React, client:visible)

### 2. CTA Placement

- [ ] **CTA above the fold:** A call-to-action appears in the hero section or first visible section
- [ ] **CTA at page bottom:** A call-to-action appears in the final section before the footer

### 3. Internal Linking

- [ ] **2+ internal links:** The page body contains at least 2 links to other pages on the site
- [ ] Links use descriptive anchor text (not "click here" or bare URLs)

### 4. Metadata Complete

- [ ] Title tag present and within 50-60 characters
- [ ] Meta description present and within 150-160 characters
- [ ] OG image specified or inherited from defaults
- [ ] Canonical URL set

## Pass/Fail Threshold

- **Pass:** ALL checks must pass for the page type
- **Fail:** Any single check failure fails the page

## Evaluation Process

1. Identify the page type (homepage, service, case-study, about, blog, contact)
2. Run through the corresponding required sections checklist
3. Check CTA placement (above fold and bottom)
4. Count internal links in the page body
5. Confirm metadata completeness

## Reference

- Domain model: `.specs/domain.md`
- Schemas: `.specs/schemas.md`
- Sitemap: `.specs/sitemap.md`
