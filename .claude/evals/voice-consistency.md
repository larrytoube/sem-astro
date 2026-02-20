# Voice Consistency Evaluation

Rubric for evaluating whether content matches the intended audience, maintains consistent voice throughout, and aligns with SEM's brand personality. This eval catches the gap between "technically correct brand voice" and "actually resonates with the target reader."

## When to Apply

Apply this eval to any content that targets a specific persona or audience segment. It supplements the generic voice criterion in `.claude/evals/brand-compliance.md` with persona-specific and structural voice analysis.

## Context Files

Before scoring, read:
- `content/raw/brand/brand-voice.md` — voice attributes and tone by context
- `content/raw/audience/personas.md` — persona goals, pain points, decision criteria
- `.specs/content-strategy.md` — content pillars, CTA library, content rules

## Criteria

### 1. Persona Fit (1-5)

Does the content speak to the declared target persona's concerns, vocabulary, and expertise level?

| Score | Description |
|-------|-------------|
| 5 | Every section addresses the persona's specific pain points, uses their vocabulary, and matches their expertise level |
| 4 | Strong persona fit with one section that drifts to a different audience |
| 3 | Generally appropriate but mixes vocabulary or concerns from multiple personas without clear intent |
| 2 | Written for a generic "business owner" rather than a specific persona |
| 1 | Complete mismatch — e.g., technical marketing jargon on a page targeting non-marketing business owners |

**Scoring guide by persona:**

- **Small Business Owner:** Expects practical ROI language, personal attention emphasis, "we understand your budget" empathy, clear process explanation. Red flag: marketing jargon, overwhelming options, aggressive upselling.
- **Entrepreneur/Startup Founder:** Expects energy, speed, brand-building excitement, educational value, quick wins. Red flag: slow bureaucratic language, enterprise-speak, high-cost assumptions.
- **Marketing Manager:** Expects KPI language, reporting capabilities, specialized expertise, process documentation. Red flag: oversimplification, ignoring their existing knowledge, missing metrics.

### 2. Voice Stability (1-5)

Does the voice remain consistent from section to section, or does it shift unpredictably?

| Score | Description |
|-------|-------------|
| 5 | Uniform voice throughout — reads like one author with one clear perspective |
| 4 | Consistent voice with one tonal shift (e.g., hero is confident, one body section hedges) |
| 3 | Noticeable shifts between sections — hero sounds different from features, features sound different from CTA |
| 2 | Alternates between conversational copy and formal corporate language without clear intent |
| 1 | No consistent voice — reads like multiple authors pasted sections together |

**Common instability patterns:**
- Hero is warm and personal, body sections revert to corporate-speak
- Technical sections suddenly become overly casual mid-paragraph
- CTA section shifts to aggressive sales language that doesn't match the rest

### 3. Content Pillar Alignment (1-5)

Does the content align with SEM's five content pillars?

| Score | Description |
|-------|-------------|
| 5 | Every section maps to a defined content pillar with supporting evidence |
| 4 | Strong alignment; one section could better connect to a pillar |
| 3 | References the right themes but uses generic framing instead of SEM-specific language |
| 2 | Themes present but framed generically, not connected to SEM pillars |
| 1 | No connection to content pillars — generic or off-strategy messaging |

**Content pillars:**
1. Brand Strategy & Storytelling
2. Digital Marketing Expertise
3. AI & Innovation
4. Client Success Stories
5. Boutique Advantage

### 4. Evidence Appropriateness (1-5)

Are proof points and evidence types matched to what the persona values?

| Score | Description |
|-------|-------------|
| 5 | Every proof point matches the persona's preferred evidence type |
| 4 | Strong evidence match with one proof point that would resonate more with a different persona |
| 3 | Evidence is present but generic — not tailored to what this persona would find convincing |
| 2 | Evidence types mismatched to persona |
| 1 | No evidence, or evidence is irrelevant to the target audience |

**Evidence preferences by persona:**
- **Small Business Owner:** ROI in real numbers, client testimonials from similar businesses, before/after case studies, process clarity
- **Entrepreneur/Startup Founder:** Speed metrics, brand transformation examples, educational insights, quick-win demonstrations
- **Marketing Manager:** KPI improvements, reporting examples, process documentation, specialized expertise demonstrations

### 5. Anti-Pattern Detection (1-5)

Absence of common voice failures.

| Score | Description |
|-------|-------------|
| 5 | Zero anti-patterns detected |
| 4 | One minor anti-pattern |
| 3 | 2-3 anti-patterns present |
| 2 | Pervasive anti-patterns undermine the voice |
| 1 | Content is dominated by anti-patterns |

**Anti-patterns to flag:**
- Hedging language when the voice should be direct ("may help," "could potentially")
- Unsupported superlatives ("best," "leading," "most advanced")
- Feature dumps without outcome framing
- Persona-inappropriate vocabulary
- Tonal inconsistency between adjacent sections
- Generic CTAs ("Learn more," "Contact us") when specific CTAs are available
- Banned words (leverage, synergy, disrupt, holistic, seamless, cutting-edge)

## Pass/Fail Threshold

- **Pass:** Average score >= 4.0 AND persona fit >= 4 AND voice stability >= 3
- **Fail:** Average < 4.0 OR persona fit < 4 OR voice stability < 3

Persona fit is weighted higher because content that doesn't resonate with its intended reader fails regardless of other quality signals.

## Reference

- Brand voice: `content/raw/brand/brand-voice.md`
- Personas: `content/raw/audience/personas.md`
- Content strategy: `.specs/content-strategy.md`
- Brand terminology: `.specs/brand.md`
- Content quality: `.claude/evals/content-quality.md`
