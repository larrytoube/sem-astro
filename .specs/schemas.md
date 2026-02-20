# Sharp End Marketing - Content Schemas

## Overview

Content collections use Astro Content Collections with Zod validation. Schemas defined in `src/content/config.ts`.

## Blog Schema

```typescript
{
  title: string              // Post title (1-100 chars)
  description: string        // Meta description (20-300 chars)
  author: string             // Author name
  publishedAt: Date          // Publication date (required)
  updatedAt?: Date           // Last update date
  category: 'digital-marketing' | 'seo' | 'social-media' | 'workflow-optimization' | 'data-analytics' | 'brand-strategy' | 'paid-advertising' | 'creative-design'
  tags?: string[]            // Topic tags
  hero: {
    title: string            // Article title
    lead: string             // Article introduction
    image?: string           // Hero image path
    imageAlt?: string        // Hero image alt text
  }
  seo: {
    ogImage?: string
    canonical?: string
    noIndex?: boolean        // Default: false
  }
  draft?: boolean            // Default: false
}
```

## Case Study Schema

```typescript
{
  title: string              // Case study title (1-100 chars)
  client: string             // Client name
  category: string           // Service category
  description: string        // Summary (20-300 chars)
  metrics?: Array<{
    label: string            // e.g., "Increase in Engagement"
    value: string            // e.g., "40%"
  }>
  hero: {
    title: string
    lead: string
    image?: string
  }
  duration?: string          // Project duration
  seo: {
    ogImage?: string
    canonical?: string
    noIndex?: boolean
  }
  draft?: boolean
  publishedAt?: Date
}
```
