interface MetaInput {
  title: string
  description: string
  url: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedAt?: Date
  updatedAt?: Date
  author?: string
}

interface MetaTag {
  name?: string
  property?: string
  content: string
}

export function generateMeta(input: MetaInput): MetaTag[] {
  const tags: MetaTag[] = [
    { name: 'description', content: input.description },
    { property: 'og:title', content: input.title },
    { property: 'og:description', content: input.description },
    { property: 'og:type', content: input.type ?? 'website' },
    { property: 'og:url', content: input.url },
    { property: 'og:site_name', content: 'Sharp End Marketing' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: input.title },
    { name: 'twitter:description', content: input.description },
  ]

  if (input.ogImage) {
    tags.push(
      { property: 'og:image', content: input.ogImage },
      { name: 'twitter:image', content: input.ogImage },
    )
  }

  if (input.noIndex) {
    tags.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  if (input.publishedAt) {
    tags.push({ property: 'article:published_time', content: input.publishedAt.toISOString() })
  }

  if (input.updatedAt) {
    tags.push({ property: 'article:modified_time', content: input.updatedAt.toISOString() })
  }

  if (input.author) {
    tags.push({ property: 'article:author', content: input.author })
  }

  return tags
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface JsonLdOrganization {
  type: 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
}

interface JsonLdWebPage {
  type: 'WebPage'
  name: string
  description: string
  url: string
  breadcrumbs?: BreadcrumbItem[]
}

interface JsonLdArticle {
  type: 'Article'
  headline: string
  description: string
  url: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  image?: string
}

interface JsonLdBreadcrumbList {
  type: 'BreadcrumbList'
  items: BreadcrumbItem[]
}

type JsonLdInput = JsonLdOrganization | JsonLdWebPage | JsonLdArticle | JsonLdBreadcrumbList

export function generateJsonLd(input: JsonLdInput): string {
  switch (input.type) {
    case 'Organization':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: input.name,
        url: input.url,
        ...(input.logo ? { logo: input.logo } : {}),
        ...(input.description ? { description: input.description } : {}),
      })

    case 'WebPage':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: input.name,
        description: input.description,
        url: input.url,
        ...(input.breadcrumbs ? {
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: input.breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
        } : {}),
      })

    case 'Article':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: input.headline,
        description: input.description,
        url: input.url,
        author: {
          '@type': 'Person',
          name: input.author,
        },
        datePublished: input.publishedAt.toISOString(),
        ...(input.updatedAt ? { dateModified: input.updatedAt.toISOString() } : {}),
        ...(input.image ? { image: input.image } : {}),
      })

    case 'BreadcrumbList':
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: input.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      })
  }
}
