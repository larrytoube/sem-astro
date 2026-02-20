# Accessibility Quality Evaluation

Checklist for evaluating the accessibility quality of Sharp End Marketing pages.

## Criteria

All checks are pass/fail. Every check must pass for the page to pass.

### 1. Alt Text Quality

Images have meaningful alt text that describes function, not just appearance.

- [ ] **All images have alt attributes** (no missing alt)
- [ ] **Alt text describes purpose:** "Team photo of Chris Ricard and Larry Toube" not "photo"
- [ ] **Decorative images use empty alt:** `alt=""` for spacers, backgrounds, decorative dividers
- [ ] **Alt text avoids redundancy:** Does not start with "image of" or "picture of"
- [ ] **Alt text is concise:** Under 125 characters but meaningful
- [ ] **Complex images have extended descriptions:** Charts, diagrams, infographics include detailed text alternative nearby or via aria-describedby

### 2. Reading Order

Content makes sense when read linearly (as screen readers and keyboard users experience it).

- [ ] **Visual order matches DOM order:** Content displayed left-to-right/top-to-bottom matches the HTML source order
- [ ] **No CSS-only reordering:** `order`, `flex-direction: row-reverse`, or `grid` placement does not create confusing reading sequence
- [ ] **Skip navigation link present:** First focusable element is a "Skip to main content" link
- [ ] **Focus order is logical:** Tab order follows visual layout without jumping
- [ ] **Related content is adjacent:** Not separated by unrelated sections

### 3. ARIA Patterns

Correct use of ARIA roles, labels, and live regions.

- [ ] **No ARIA is better than bad ARIA:** Native HTML elements used where possible (`<button>` not `<div role="button">`)
- [ ] **aria-label used on icon-only buttons:** Buttons with only icons or SVGs have text alternatives
- [ ] **aria-expanded on toggles:** Mobile menu toggle uses `aria-expanded`
- [ ] **aria-current on navigation:** Active page in nav uses `aria-current="page"`
- [ ] **Live regions for dynamic content:** Form submission feedback uses `aria-live="polite"` or `role="alert"`
- [ ] **No redundant ARIA:** `role="button"` not applied to `<button>`, `role="navigation"` not applied to `<nav>`

### 4. Link Text Quality

All links have descriptive text that makes sense out of context.

- [ ] **No bare URLs:** All links have human-readable text
- [ ] **No "click here" or "here":** Link text describes the destination or action
- [ ] **No "read more" without context:** If "read more" is used, it has `aria-label` with full context
- [ ] **Links are distinguishable:** Link text is unique or contextually distinct
- [ ] **External links indicated:** Links to external sites have visual and accessible indication
- [ ] **Adjacent links to same destination are combined:** Not two separate links to the same page

### 5. Color and Contrast

- [ ] **Text contrast meets WCAG AA:** 4.5:1 ratio for normal text, 3:1 for large text (18px+ or 14px bold)
- [ ] **Accent blue (#4d65ff) contrast verified:** This color must meet AA on its background
- [ ] **Information not conveyed by color alone:** Error states, status indicators have text or icon in addition to color
- [ ] **Focus indicators visible:** Interactive elements have visible focus outlines with sufficient contrast

### 6. Semantic HTML

- [ ] **Heading hierarchy correct:** h1 > h2 > h3, no skipped levels
- [ ] **Single H1 per page**
- [ ] **Headings describe section content:** Not used for styling purposes
- [ ] **Landmark regions present:** `<nav>`, `<main>`, `<footer>`, `<header>` used
- [ ] **Lists use list elements:** Groups of items use `<ul>`/`<ol>` + `<li>`, not `<div>` chains
- [ ] **Tables have headers:** Data tables use `<th>` with `scope` attributes
- [ ] **Forms have labels:** All form inputs have associated `<label>` elements or `aria-label`

## Pass/Fail Threshold

- **Pass:** ALL checks must pass
- **Fail:** Any single check failure fails the page

## Evaluation Process

1. Check all images for alt text presence and quality
2. Compare visual layout to DOM order for reading sequence
3. Inspect interactive elements for correct ARIA usage
4. Review all link text for descriptive quality
5. Verify color contrast on text elements, especially accent blue usage
6. Confirm semantic HTML structure (headings, landmarks, lists, forms)

## Reference

- Accessibility requirements: `CLAUDE.md` (Accessibility section)
- Design constraints: `.specs/brand.md` (Accessibility Constraints)
- WCAG 2.1 AA guidelines
