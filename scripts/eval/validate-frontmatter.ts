/**
 * Validate frontmatter in Sharp End Marketing content collections.
 *
 * Checks blog and case-studies markdown files against the schemas
 * defined in src/content/config.ts.
 *
 * Usage: npx tsx scripts/eval/validate-frontmatter.ts
 */

import { readFileSync } from 'node:fs'
import { basename, relative, resolve } from 'node:path'
import { collectFiles } from './utils'

// ---------------------------------------------------------------------------
// Schema definitions (mirrors src/content/config.ts)
// ---------------------------------------------------------------------------

const BLOG_CATEGORIES = [
  'digital-marketing',
  'seo',
  'social-media',
  'workflow-optimization',
  'data-analytics',
  'brand-strategy',
  'paid-advertising',
  'creative-design',
] as const

interface BlogFrontmatter {
  title?: string
  description?: string
  author?: string
  publishedAt?: string
  updatedAt?: string
  category?: string
  tags?: string[]
  hero?: {
    title?: string
    lead?: string
    image?: string
    imageAlt?: string
  }
  seo?: {
    ogImage?: string
    canonical?: string
    noIndex?: boolean
  }
  draft?: boolean
}

interface CaseStudyFrontmatter {
  title?: string
  client?: string
  category?: string
  description?: string
  metrics?: Array<{ label?: string; value?: string }>
  hero?: {
    title?: string
    lead?: string
    image?: string
  }
  duration?: string
  seo?: {
    ogImage?: string
    canonical?: string
    noIndex?: boolean
  }
  draft?: boolean
  publishedAt?: string
}

// ---------------------------------------------------------------------------
// Frontmatter parser
// ---------------------------------------------------------------------------

function parseFrontmatter(raw: string): Record<string, unknown> | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const block = match[1]
  const result: Record<string, unknown> = {}
  let currentKey = ''
  let currentIndent = 0
  let currentObj: Record<string, unknown> | null = null
  let currentArray: unknown[] | null = null
  let currentArrayKey = ''
  let arrayItemObj: Record<string, unknown> | null = null

  for (const line of block.split('\n')) {
    const trimmed = line.trimEnd()
    if (!trimmed || trimmed.startsWith('#')) continue

    const indent = line.length - line.trimStart().length

    // Array item with object fields: "  - label: foo"
    if (currentArray !== null && trimmed.trimStart().startsWith('- ')) {
      const itemContent = trimmed.trimStart().slice(2)
      if (itemContent.includes(':')) {
        // Start a new object in the array
        arrayItemObj = {}
        const [k, ...rest] = itemContent.split(':')
        const v = rest.join(':').trim()
        arrayItemObj[k.trim()] = parseYamlValue(v)
        currentArray.push(arrayItemObj)
      } else {
        arrayItemObj = null
        currentArray.push(parseYamlValue(itemContent))
      }
      continue
    }

    // Continuation of array item object: "    value: bar"
    if (arrayItemObj !== null && indent > currentIndent + 2) {
      if (trimmed.includes(':')) {
        const [k, ...rest] = trimmed.trim().split(':')
        const v = rest.join(':').trim()
        arrayItemObj[k.trim()] = parseYamlValue(v)
      }
      continue
    }

    // Top-level or nested key: value
    if (trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':')
      const key = trimmed.slice(0, colonIdx).trim()
      const value = trimmed.slice(colonIdx + 1).trim()

      if (indent === 0) {
        // Reset nested context
        currentObj = null
        currentArray = null
        currentArrayKey = ''
        arrayItemObj = null

        if (value === '') {
          // Could be a nested object or array — peek ahead handled by next iterations
          currentKey = key
          currentIndent = 0
          currentObj = {}
          result[key] = currentObj
        } else {
          result[key] = parseYamlValue(value)
          currentKey = key
        }
      } else if (currentObj !== null) {
        // Nested field within an object
        if (value === '') {
          // Sub-array
          currentArray = []
          currentArrayKey = key
          currentObj[key] = currentArray
          currentIndent = indent
          arrayItemObj = null
        } else {
          currentObj[key] = parseYamlValue(value)
        }
      }
      continue
    }

    // Array item at top level: "  - value"
    if (trimmed.trimStart().startsWith('- ') && indent > 0) {
      const itemValue = trimmed.trimStart().slice(2).trim()
      if (currentKey && Array.isArray(result[currentKey])) {
        ;(result[currentKey] as unknown[]).push(parseYamlValue(itemValue))
      } else if (currentKey) {
        result[currentKey] = [parseYamlValue(itemValue)]
      }
      continue
    }
  }

  return result
}

function parseYamlValue(raw: string): unknown {
  if (raw === 'true') return true
  if (raw === 'false') return false
  if (raw === 'null' || raw === '~') return null
  // Strip quotes
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1)
  }
  // Array shorthand: [a, b, c]
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return raw
      .slice(1, -1)
      .split(',')
      .map((s) => parseYamlValue(s.trim()))
  }
  const num = Number(raw)
  if (!Number.isNaN(num) && raw !== '') return num
  return raw
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

interface ValidationError {
  file: string
  field: string
  message: string
}

function validateBlog(fm: Record<string, unknown>, file: string): ValidationError[] {
  const errors: ValidationError[] = []
  const rel = relative(process.cwd(), file)

  // title
  if (typeof fm.title !== 'string' || fm.title.length === 0) {
    errors.push({ file: rel, field: 'title', message: 'Required string (1-100 chars)' })
  } else if (fm.title.length > 100) {
    errors.push({ file: rel, field: 'title', message: `Too long: ${fm.title.length}/100 chars` })
  }

  // description
  if (typeof fm.description !== 'string' || fm.description.length < 20) {
    errors.push({ file: rel, field: 'description', message: 'Required string (20-300 chars)' })
  } else if (fm.description.length > 300) {
    errors.push({ file: rel, field: 'description', message: `Too long: ${fm.description.length}/300 chars` })
  }

  // author
  if (typeof fm.author !== 'string' || fm.author.length === 0) {
    errors.push({ file: rel, field: 'author', message: 'Required string' })
  }

  // publishedAt
  if (!fm.publishedAt) {
    errors.push({ file: rel, field: 'publishedAt', message: 'Required date' })
  } else if (Number.isNaN(Date.parse(String(fm.publishedAt)))) {
    errors.push({ file: rel, field: 'publishedAt', message: 'Invalid date format' })
  }

  // category
  if (!fm.category || !BLOG_CATEGORIES.includes(fm.category as (typeof BLOG_CATEGORIES)[number])) {
    errors.push({
      file: rel,
      field: 'category',
      message: `Must be one of: ${BLOG_CATEGORIES.join(', ')}`,
    })
  }

  // tags (optional, but must be array if present)
  if (fm.tags !== undefined && !Array.isArray(fm.tags)) {
    errors.push({ file: rel, field: 'tags', message: 'Must be an array of strings' })
  }

  // hero
  const hero = fm.hero as BlogFrontmatter['hero']
  if (!hero || typeof hero !== 'object') {
    errors.push({ file: rel, field: 'hero', message: 'Required object with title and lead' })
  } else {
    if (typeof hero.title !== 'string' || hero.title.length === 0) {
      errors.push({ file: rel, field: 'hero.title', message: 'Required string' })
    }
    if (typeof hero.lead !== 'string' || hero.lead.length === 0) {
      errors.push({ file: rel, field: 'hero.lead', message: 'Required string' })
    }
  }

  // seo (optional object)
  if (fm.seo !== undefined && typeof fm.seo !== 'object') {
    errors.push({ file: rel, field: 'seo', message: 'Must be an object' })
  } else if (fm.seo && typeof fm.seo === 'object') {
    const seo = fm.seo as BlogFrontmatter['seo']
    if (seo?.canonical && !/^https?:\/\//.test(String(seo.canonical))) {
      errors.push({ file: rel, field: 'seo.canonical', message: 'Must be a valid URL' })
    }
  }

  // draft (optional boolean)
  if (fm.draft !== undefined && typeof fm.draft !== 'boolean') {
    errors.push({ file: rel, field: 'draft', message: 'Must be a boolean' })
  }

  return errors
}

function validateCaseStudy(fm: Record<string, unknown>, file: string): ValidationError[] {
  const errors: ValidationError[] = []
  const rel = relative(process.cwd(), file)

  // title
  if (typeof fm.title !== 'string' || fm.title.length === 0) {
    errors.push({ file: rel, field: 'title', message: 'Required string (1-100 chars)' })
  } else if (fm.title.length > 100) {
    errors.push({ file: rel, field: 'title', message: `Too long: ${fm.title.length}/100 chars` })
  }

  // client
  if (typeof fm.client !== 'string' || fm.client.length === 0) {
    errors.push({ file: rel, field: 'client', message: 'Required string' })
  }

  // category
  if (typeof fm.category !== 'string' || fm.category.length === 0) {
    errors.push({ file: rel, field: 'category', message: 'Required string' })
  }

  // description
  if (typeof fm.description !== 'string' || fm.description.length < 20) {
    errors.push({ file: rel, field: 'description', message: 'Required string (20-300 chars)' })
  } else if (fm.description.length > 300) {
    errors.push({ file: rel, field: 'description', message: `Too long: ${fm.description.length}/300 chars` })
  }

  // metrics (optional array of {label, value})
  if (fm.metrics !== undefined) {
    if (!Array.isArray(fm.metrics)) {
      errors.push({ file: rel, field: 'metrics', message: 'Must be an array of {label, value}' })
    } else {
      for (let i = 0; i < fm.metrics.length; i++) {
        const m = fm.metrics[i] as Record<string, unknown>
        if (typeof m?.label !== 'string' || m.label.length === 0) {
          errors.push({ file: rel, field: `metrics[${i}].label`, message: 'Required string' })
        }
        if (typeof m?.value !== 'string' && typeof m?.value !== 'number') {
          errors.push({ file: rel, field: `metrics[${i}].value`, message: 'Required string' })
        }
      }
    }
  }

  // hero
  const hero = fm.hero as CaseStudyFrontmatter['hero']
  if (!hero || typeof hero !== 'object') {
    errors.push({ file: rel, field: 'hero', message: 'Required object with title and lead' })
  } else {
    if (typeof hero.title !== 'string' || hero.title.length === 0) {
      errors.push({ file: rel, field: 'hero.title', message: 'Required string' })
    }
    if (typeof hero.lead !== 'string' || hero.lead.length === 0) {
      errors.push({ file: rel, field: 'hero.lead', message: 'Required string' })
    }
  }

  // duration (optional string)
  if (fm.duration !== undefined && typeof fm.duration !== 'string') {
    errors.push({ file: rel, field: 'duration', message: 'Must be a string' })
  }

  // seo (optional object)
  if (fm.seo !== undefined && typeof fm.seo !== 'object') {
    errors.push({ file: rel, field: 'seo', message: 'Must be an object' })
  } else if (fm.seo && typeof fm.seo === 'object') {
    const seo = fm.seo as CaseStudyFrontmatter['seo']
    if (seo?.canonical && !/^https?:\/\//.test(String(seo.canonical))) {
      errors.push({ file: rel, field: 'seo.canonical', message: 'Must be a valid URL' })
    }
  }

  // draft (optional boolean)
  if (fm.draft !== undefined && typeof fm.draft !== 'boolean') {
    errors.push({ file: rel, field: 'draft', message: 'Must be a boolean' })
  }

  // publishedAt (optional date)
  if (fm.publishedAt !== undefined && Number.isNaN(Date.parse(String(fm.publishedAt)))) {
    errors.push({ file: rel, field: 'publishedAt', message: 'Invalid date format' })
  }

  return errors
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

interface CollectionConfig {
  name: string
  dir: string
  validate: (fm: Record<string, unknown>, file: string) => ValidationError[]
}

function run(): void {
  const root = resolve(process.cwd())

  const collections: CollectionConfig[] = [
    {
      name: 'blog',
      dir: resolve(root, 'src/content/blog'),
      validate: validateBlog,
    },
    {
      name: 'case-studies',
      dir: resolve(root, 'src/content/case-studies'),
      validate: validateCaseStudy,
    },
  ]

  let totalFiles = 0
  let totalErrors = 0
  const allErrors: ValidationError[] = []

  for (const collection of collections) {
    const files = collectFiles(collection.dir, '.md')
      .concat(collectFiles(collection.dir, '.mdx'))

    if (files.length === 0) {
      console.log(`\n📂 ${collection.name}: no content files found`)
      continue
    }

    console.log(`\n📂 ${collection.name}: checking ${files.length} file(s)`)
    totalFiles += files.length

    for (const file of files) {
      const raw = readFileSync(file, 'utf-8')
      const fm = parseFrontmatter(raw)

      if (!fm) {
        allErrors.push({
          file: relative(root, file),
          field: 'frontmatter',
          message: 'Missing or invalid frontmatter block (no --- delimiters)',
        })
        totalErrors++
        continue
      }

      const errors = collection.validate(fm, file)
      allErrors.push(...errors)
      totalErrors += errors.length
    }
  }

  // Report
  console.log('\n' + '='.repeat(60))
  console.log('Frontmatter Validation Report')
  console.log('='.repeat(60))

  if (allErrors.length === 0) {
    console.log(`\n✅ All ${totalFiles} file(s) passed validation.`)
  } else {
    console.log(`\n❌ ${totalErrors} error(s) in ${totalFiles} file(s):\n`)
    for (const err of allErrors) {
      console.log(`  ${err.file}`)
      console.log(`    → ${err.field}: ${err.message}`)
    }
  }

  console.log('')
  process.exit(totalErrors > 0 ? 1 : 0)
}

run()
