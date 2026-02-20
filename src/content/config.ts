import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(20).max(300),
    author: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum([
      'digital-marketing',
      'seo',
      'social-media',
      'workflow-optimization',
      'data-analytics',
      'brand-strategy',
      'paid-advertising',
      'creative-design',
    ]),
    tags: z.array(z.string()).optional(),
    hero: z.object({
      title: z.string().min(1),
      lead: z.string().min(1),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    }),
    seo: z.object({
      ogImage: z.string().optional(),
      canonical: z.string().url().optional(),
      noIndex: z.boolean().default(false),
    }).default({}),
    draft: z.boolean().default(false),
  }),
})

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(100),
    client: z.string().min(1),
    category: z.string().min(1),
    description: z.string().min(20).max(300),
    metrics: z.array(z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    })).optional(),
    hero: z.object({
      title: z.string().min(1),
      lead: z.string().min(1),
      image: z.string().optional(),
    }),
    duration: z.string().optional(),
    seo: z.object({
      ogImage: z.string().optional(),
      canonical: z.string().url().optional(),
      noIndex: z.boolean().default(false),
    }).default({}),
    draft: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
  }),
})

export const collections = { blog, 'case-studies': caseStudies }
