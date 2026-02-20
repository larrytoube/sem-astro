# Examples - Reference Implementations

This directory contains annotated reference implementations for the Sharp End Marketing site. These are **templates, not live content** — they demonstrate correct structure, component usage, and content patterns.

## How to use this directory

1. **Read the spec first** — Check `.specs/` for rules, constraints, and schemas before writing content.
2. **Study the example** — Find the matching page type in `examples/` and read the comments to understand WHY patterns are used.
3. **Produce content** — Write into `content/raw/` for review, following the example structure.

## Directory structure

```
examples/
  README.md               # This file
  pages/
    homepage.mdx           # Homepage reference with all required sections
    service-page.mdx       # Service page structure
    case-study-page.mdx    # Case study page (challenge → approach → results)
    blog-post.mdx          # Blog post structure
  components/
    hero-patterns.mdx      # Hero component variations
    cta-patterns.mdx       # CTA section variations
    card-patterns.mdx      # Service, case study, and team card variations
```

## Reference chain

| Source | Contains | When to use |
|--------|----------|-------------|
| `.specs/schemas.md` | Frontmatter field definitions | Structuring frontmatter |
| `.specs/content-strategy.md` | Voice, CTA library | Writing copy |
| `.specs/brand.md` | Terminology, formatting | Word choice and style |
| `.specs/design.md` | Component inventory, color tokens | Choosing components |
| `.specs/domain.md` | Page type requirements | Page architecture |
| `examples/` (this dir) | Working examples | Seeing patterns in action |

## Rules

- Lead with outcomes, not features
- Every page needs a CTA above the fold and at the bottom
- Use SEM components — never apply font tokens directly
- Import components from relative paths to `src/components/`
