# SEO Quality Evaluation

Rubric for evaluating search engine optimization quality of Sharp End Marketing pages.

## Criteria

### 1. Keyword Integration (1-5)

Natural use of target keywords throughout the page content.

| Score | Description |
|-------|-------------|
| 5 | Primary keyword in title, h1, first paragraph, and 2+ subheadings; secondary keywords distributed naturally |
| 4 | Primary keyword well-placed; one missed opportunity for secondary keywords |
| 3 | Keywords present but placement feels forced or limited to metadata only |
| 2 | Keywords appear but are stuffed or poorly integrated |
| 1 | Target keywords missing from content or severely over-optimized |

**What to check:**
- Primary keyword appears in: title tag, h1, first 100 words, at least one h2
- Secondary keywords appear in body text and subheadings
- Keyword density is natural (1-3% for primary, not forced)
- Long-tail variations used where appropriate

### 2. Meta Description Quality (1-5)

Compelling, accurate meta descriptions that drive click-through.

| Score | Description |
|-------|-------------|
| 5 | Compelling, includes primary keyword, has clear value proposition, 150-160 chars |
| 4 | Accurate and well-written; slightly outside ideal length or could be more compelling |
| 3 | Present and accurate but generic; doesn't differentiate from competitors |
| 2 | Present but misleading, too short, or keyword-stuffed |
| 1 | Missing or auto-generated (truncated page content) |

**Good meta description elements:**
- Includes primary keyword naturally
- States a specific benefit or outcome
- Creates urgency or curiosity
- Includes a soft CTA ("Learn how," "See why," "Discover")
- 150-160 characters

### 3. Structured Data (1-5)

Correct implementation of JSON-LD and schema.org markup.

| Score | Description |
|-------|-------------|
| 5 | Correct JSON-LD with appropriate schema.org type, all required fields, validates without errors |
| 4 | Valid structured data with minor missing optional fields |
| 3 | Structured data present but using less specific type or missing key fields |
| 2 | Structured data has validation errors or wrong type |
| 1 | No structured data present |

**Expected schema types by page:**
- Homepage: Organization, WebSite
- Service pages: Service
- Case studies: Article or CreativeWork
- Blog posts: Article with author, datePublished, dateModified
- About page: Organization
- Contact: ContactPage, LocalBusiness

### 4. Anchor Text Quality (1-5)

Descriptive internal link text that provides context.

| Score | Description |
|-------|-------------|
| 5 | All internal links use descriptive, keyword-relevant anchor text |
| 4 | Most links descriptive; one generic link text |
| 3 | Mix of descriptive and generic ("learn more," "read more") |
| 2 | Mostly generic anchor text |
| 1 | Bare URLs, "click here," or no internal links |

**Good anchor text:**
- "See how we helped SmartyPantz build their escape room brand" (descriptive + keyword)
- "Explore our SEO services" (specific topic)
- "How we grew Jack Storms' engagement by 40%" (contextual + stat)

**Bad anchor text:**
- "Click here" (no context)
- "Learn more" (generic)
- "here" (meaningless)

## Pass/Fail Threshold

- **Pass:** Average score >= 4.0
- **Fail:** Average < 4.0

## Reference

- SEO keywords: `.specs/content-strategy.md`
- SEO guidelines: `content/raw/channels/seo-guidelines.md`
- URL structure: `.specs/sitemap.md`
- Schemas: `.specs/schemas.md`
