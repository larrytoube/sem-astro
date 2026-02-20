# Brand Compliance Evaluation

Rubric for evaluating Sharp End Marketing content against brand guidelines.

## Criteria

### 1. Voice Consistency (1-5)

Does the content maintain the SEM brand voice?

| Score | Description |
|-------|-------------|
| 5 | Conversational, direct, results-focused, storytelling-first throughout |
| 4 | Consistent voice with minor deviations in 1-2 sentences |
| 3 | Generally on-brand but includes generic marketing language in places |
| 2 | Inconsistent — alternates between brand voice and generic copy |
| 1 | Off-brand — reads like corporate boilerplate or aggressive sales copy |

**What to look for:**
- Conversational: Reads like a trusted advisor, not a salesperson
- Direct: No jargon, no fluff, gets to the point
- Results-focused: Leads with outcomes, not promises
- Storytelling-first: Content tells a story, not just lists features

### 2. Terminology (1-5)

Correct and consistent use of SEM terms, avoidance of banned words.

| Score | Description |
|-------|-------------|
| 5 | All terms correct, zero banned words, consistent naming |
| 4 | One minor terminology inconsistency, no banned words |
| 3 | 1-2 banned words or notable terminology errors |
| 2 | Multiple banned words and inconsistent service naming |
| 1 | Pervasive misuse of terminology |

**Banned words:** leverage, synergy, disrupt, guaranteed, promise, best, cheap, affordable, discount, holistic, seamless, cutting-edge

**Preferred words:** partner, collaborate, grow, strategy, storytelling, results, authentic, meaningful, engagement, discover, create, analyze

### 3. Value Proposition Alignment (1-5)

Content maps to SEM's defined positioning and differentiators.

| Score | Description |
|-------|-------------|
| 5 | Every section reinforces SEM's positioning with evidence |
| 4 | Clear alignment, one section could be stronger |
| 3 | Value props present but not consistently supported with evidence |
| 2 | Generic benefits not tied to SEM's specific positioning |
| 1 | No identifiable connection to brand value propositions |

**Core value propositions:**
- Boutique attention: Personal, strategic partnership — not a faceless agency
- Results-driven: We show what we've achieved, not what we promise
- Strategic depth: Marketing starts with strategy and finishes with storytelling
- Process methodology: Discover → Create → Analyze
- Local expertise: Vancouver's North Shore, serving BC and beyond

### 4. Visual Language (1-5)

Correct component usage, design token compliance.

| Score | Description |
|-------|-------------|
| 5 | All components match design system, tokens used correctly, no violations |
| 4 | Minor deviation (e.g., one non-standard spacing value) |
| 3 | Several deviations from design tokens but overall look is on-brand |
| 2 | Significant departures from design system |
| 1 | Ignores design system entirely |

**What to check:**
- Teal (`rgba(8,109,114,0.82)` / `#086d72`) for CTAs and links
- Dark teal (`#013941`) for footer and dark sections
- font-heading (Comfortaa) for headings, font-body (Inter Variable) for body, font-accent (Comfortaa) for logo/accent
- Buttons use asymmetric border-radius: `0px 7px`
- Design token utilities used (no arbitrary Tailwind values)
- SEM section components used where available

## Pass/Fail Threshold

- **Pass:** Average score >= 4.0 AND no individual score < 3
- **Fail:** Average < 4.0 OR any individual score < 3

## Example Scoring

**Passing example (avg 4.25):**
- Voice: 4 — Strong but one paragraph uses hedging language
- Terminology: 5 — All terms correct, no banned words
- Value Props: 4 — Well-aligned but could emphasize boutique advantage more
- Visual: 4 — Minor spacing deviation in one card component

**Failing example (avg 2.75):**
- Voice: 3 — Generic marketing tone in multiple sections
- Terminology: 2 — Uses "leverage" and "cutting-edge," inconsistent service naming
- Value Props: 3 — Benefits mentioned but not tied to SEM positioning
- Visual: 3 — Several arbitrary color values, missing font-accent usage

## Reference

- Brand guidelines: `.specs/brand.md`
- Content strategy: `.specs/content-strategy.md`
- Design system: `.specs/design.md`
- Brand voice: `content/raw/brand/brand-voice.md`
