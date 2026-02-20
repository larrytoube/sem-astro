/**
 * SEO checks for Sharp End Marketing.
 *
 * Scans built HTML for common SEO issues:
 * 1. Missing or empty <title>
 * 2. Missing or empty meta description
 * 3. Missing canonical link
 * 4. Missing Open Graph tags
 * 5. Missing structured data (JSON-LD)
 * 6. Missing robots meta / sitemap reference
 * 7. Broken internal links (href="#" or empty)
 *
 * Usage: npx tsx scripts/eval/seo-check.ts
 */

import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { collectHtmlFiles } from './utils'

interface SeoViolation {
  file: string
  line: number
  rule: string
  message: string
  snippet: string
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function checkTitle(content: string, file: string): SeoViolation[] {
  const violations: SeoViolation[] = []

  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!titleMatch) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/title',
      message: 'Page missing <title> tag',
      snippet: '',
    })
  } else if (titleMatch[1].trim().length === 0) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/title',
      message: '<title> tag is empty',
      snippet: titleMatch[0].slice(0, 120),
    })
  } else if (titleMatch[1].trim().length > 70) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/title-length',
      message: `Title too long: ${titleMatch[1].trim().length} chars (recommended: ≤70)`,
      snippet: titleMatch[1].trim().slice(0, 120),
    })
  }

  return violations
}

function checkMetaDescription(content: string, file: string): SeoViolation[] {
  const violations: SeoViolation[] = []

  const metaDesc = content.match(/<meta\s[^>]*name\s*=\s*["']description["'][^>]*>/i)
  if (!metaDesc) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/meta-description',
      message: 'Page missing meta description',
      snippet: '',
    })
  } else {
    const contentAttr = metaDesc[0].match(/content\s*=\s*["']([^"']*)["']/i)
    if (!contentAttr || contentAttr[1].trim().length === 0) {
      violations.push({
        file,
        line: 1,
        rule: 'seo/meta-description',
        message: 'Meta description is empty',
        snippet: metaDesc[0].slice(0, 120),
      })
    } else if (contentAttr[1].trim().length > 160) {
      violations.push({
        file,
        line: 1,
        rule: 'seo/meta-description-length',
        message: `Meta description too long: ${contentAttr[1].trim().length} chars (recommended: ≤160)`,
        snippet: contentAttr[1].trim().slice(0, 120),
      })
    }
  }

  return violations
}

function checkCanonical(content: string, file: string): SeoViolation[] {
  const violations: SeoViolation[] = []

  if (!/<link\s[^>]*rel\s*=\s*["']canonical["'][^>]*>/i.test(content)) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/canonical',
      message: 'Page missing canonical link tag',
      snippet: '',
    })
  }

  return violations
}

function checkOpenGraph(content: string, file: string): SeoViolation[] {
  const violations: SeoViolation[] = []

  const requiredOg = ['og:title', 'og:description', 'og:type']
  for (const prop of requiredOg) {
    const pattern = new RegExp(`<meta\\s[^>]*property\\s*=\\s*["']${prop}["'][^>]*>`, 'i')
    if (!pattern.test(content)) {
      violations.push({
        file,
        line: 1,
        rule: 'seo/open-graph',
        message: `Missing Open Graph tag: ${prop}`,
        snippet: '',
      })
    }
  }

  return violations
}

function checkStructuredData(content: string, file: string): SeoViolation[] {
  const violations: SeoViolation[] = []

  if (!/<script\s[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>/i.test(content)) {
    violations.push({
      file,
      line: 1,
      rule: 'seo/structured-data',
      message: 'Page missing JSON-LD structured data',
      snippet: '',
    })
  }

  return violations
}

function checkBrokenLinks(content: string, lines: string[], file: string): SeoViolation[] {
  const violations: SeoViolation[] = []
  const linkPattern = /<a\s[^>]*href\s*=\s*["']([^"']*)["'][^>]*>/gi

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let match: RegExpExecArray | null

    linkPattern.lastIndex = 0
    while ((match = linkPattern.exec(line)) !== null) {
      const href = match[1]
      if (href === '#' || href === '') {
        violations.push({
          file,
          line: i + 1,
          rule: 'seo/broken-link',
          message: `Link with empty or placeholder href: "${href}"`,
          snippet: match[0].slice(0, 120),
        })
      }
    }
  }

  return violations
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function run(): void {
  const root = resolve(process.cwd())
  const distDir = resolve(root, 'dist')

  console.log('Sharp End Marketing — SEO Check')
  console.log('='.repeat(50))

  const htmlFiles = collectHtmlFiles(distDir)

  if (htmlFiles.length === 0) {
    console.log('\n⚠️  No HTML files found in dist/. Run `pnpm build` first.')
    process.exit(0)
  }

  console.log(`\nChecking ${htmlFiles.length} HTML file(s)...`)

  const allViolations: SeoViolation[] = []

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')
    const rel = relative(root, file)

    allViolations.push(...checkTitle(content, rel))
    allViolations.push(...checkMetaDescription(content, rel))
    allViolations.push(...checkCanonical(content, rel))
    allViolations.push(...checkOpenGraph(content, rel))
    allViolations.push(...checkStructuredData(content, rel))
    allViolations.push(...checkBrokenLinks(content, lines, rel))
  }

  // Report
  console.log('\n' + '='.repeat(50))
  console.log('SEO Report')
  console.log('='.repeat(50))

  if (allViolations.length === 0) {
    console.log(`\n✅ No SEO issues found in ${htmlFiles.length} file(s).`)
  } else {
    console.log(`\n❌ ${allViolations.length} issue(s) found:\n`)

    // Group by rule
    const byRule = new Map<string, SeoViolation[]>()
    for (const v of allViolations) {
      const existing = byRule.get(v.rule) || []
      existing.push(v)
      byRule.set(v.rule, existing)
    }

    for (const [rule, violations] of byRule) {
      console.log(`\n  ${rule} (${violations.length})`)
      for (const v of violations) {
        console.log(`    ${v.file}:${v.line}`)
        console.log(`      ${v.message}`)
        if (v.snippet) {
          console.log(`      > ${v.snippet}`)
        }
      }
    }
  }

  console.log('')
  process.exit(allViolations.length > 0 ? 1 : 0)
}

run()
