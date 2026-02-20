/**
 * Accessibility checks for Sharp End Marketing.
 *
 * Scans built HTML for common a11y issues:
 * 1. Images missing alt attributes
 * 2. Missing landmark regions
 * 3. Empty links / buttons
 * 4. Missing lang attribute on <html>
 * 5. Skipped heading levels
 * 6. Missing form labels
 *
 * Usage: npx tsx scripts/eval/a11y-check.ts
 */

import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { collectHtmlFiles } from './utils'

interface A11yViolation {
  file: string
  line: number
  rule: string
  message: string
  snippet: string
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function checkImagesAlt(content: string, lines: string[], file: string): A11yViolation[] {
  const violations: A11yViolation[] = []
  const imgPattern = /<img\s[^>]*>/gi

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let match: RegExpExecArray | null

    imgPattern.lastIndex = 0
    while ((match = imgPattern.exec(line)) !== null) {
      const tag = match[0]
      // Check for alt attribute (alt="" is valid for decorative images)
      if (!/\salt[=\s>]/i.test(tag)) {
        violations.push({
          file,
          line: i + 1,
          rule: 'a11y/img-alt',
          message: 'Image missing alt attribute',
          snippet: tag.slice(0, 120),
        })
      }
    }
  }

  return violations
}

function checkLandmarks(content: string, file: string): A11yViolation[] {
  const violations: A11yViolation[] = []

  if (!/<main[\s>]/i.test(content)) {
    violations.push({
      file,
      line: 1,
      rule: 'a11y/landmark-main',
      message: 'Page missing <main> landmark region',
      snippet: '',
    })
  }

  return violations
}

function checkEmptyInteractive(content: string, lines: string[], file: string): A11yViolation[] {
  const violations: A11yViolation[] = []

  // Check for empty links: <a...></a> or <a...> </a>
  const emptyLinkPattern = /<a\s[^>]*>\s*<\/a>/gi
  for (let i = 0; i < lines.length; i++) {
    emptyLinkPattern.lastIndex = 0
    if (emptyLinkPattern.test(lines[i])) {
      // Verify it doesn't have aria-label
      const linkMatch = lines[i].match(/<a\s[^>]*>\s*<\/a>/i)
      if (linkMatch && !/aria-label/i.test(linkMatch[0])) {
        violations.push({
          file,
          line: i + 1,
          rule: 'a11y/empty-link',
          message: 'Empty link — add text content or aria-label',
          snippet: lines[i].trim().slice(0, 120),
        })
      }
    }
  }

  // Check for empty buttons: <button...></button>
  const emptyBtnPattern = /<button\s[^>]*>\s*<\/button>/gi
  for (let i = 0; i < lines.length; i++) {
    emptyBtnPattern.lastIndex = 0
    if (emptyBtnPattern.test(lines[i])) {
      const btnMatch = lines[i].match(/<button\s[^>]*>\s*<\/button>/i)
      if (btnMatch && !/aria-label/i.test(btnMatch[0])) {
        violations.push({
          file,
          line: i + 1,
          rule: 'a11y/empty-button',
          message: 'Empty button — add text content or aria-label',
          snippet: lines[i].trim().slice(0, 120),
        })
      }
    }
  }

  return violations
}

function checkHtmlLang(content: string, file: string): A11yViolation[] {
  const violations: A11yViolation[] = []

  // Only check if this is a full HTML document
  if (/<html[\s>]/i.test(content)) {
    if (!/< html[^>]+lang\s*=/i.test(content) && !/<html\s+lang/i.test(content)) {
      // More permissive check
      const htmlTag = content.match(/<html[^>]*>/i)
      if (htmlTag && !/lang\s*=/i.test(htmlTag[0])) {
        violations.push({
          file,
          line: 1,
          rule: 'a11y/html-lang',
          message: '<html> element missing lang attribute',
          snippet: (htmlTag[0] || '').slice(0, 120),
        })
      }
    }
  }

  return violations
}

function checkHeadingOrder(content: string, lines: string[], file: string): A11yViolation[] {
  const violations: A11yViolation[] = []
  const headingPattern = /<h([1-6])[\s>]/gi
  let lastLevel = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let match: RegExpExecArray | null

    headingPattern.lastIndex = 0
    while ((match = headingPattern.exec(line)) !== null) {
      const level = parseInt(match[1], 10)
      if (lastLevel > 0 && level > lastLevel + 1) {
        violations.push({
          file,
          line: i + 1,
          rule: 'a11y/heading-order',
          message: `Heading level skipped: h${lastLevel} → h${level} (expected h${lastLevel + 1} or lower)`,
          snippet: line.trim().slice(0, 120),
        })
      }
      lastLevel = level
    }
  }

  return violations
}

function checkFormLabels(content: string, lines: string[], file: string): A11yViolation[] {
  const violations: A11yViolation[] = []
  const inputPattern = /<input\s[^>]*>/gi

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let match: RegExpExecArray | null

    inputPattern.lastIndex = 0
    while ((match = inputPattern.exec(line)) !== null) {
      const tag = match[0]
      // Skip hidden inputs and submit/button types
      if (/type\s*=\s*["']?hidden/i.test(tag)) continue
      if (/type\s*=\s*["']?submit/i.test(tag)) continue
      if (/type\s*=\s*["']?button/i.test(tag)) continue

      // Check for associated label mechanisms
      const hasAriaLabel = /aria-label\s*=/i.test(tag)
      const hasAriaLabelledBy = /aria-labelledby\s*=/i.test(tag)
      const hasId = /\sid\s*=\s*["']([^"']+)/i.exec(tag)
      const hasTitle = /\stitle\s*=/i.test(tag)

      if (!hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
        if (hasId) {
          // Check if there's a matching <label for="...">
          const inputId = hasId[1]
          const labelForPattern = new RegExp(`<label[^>]+for\\s*=\\s*["']${inputId}["']`, 'i')
          if (!labelForPattern.test(content)) {
            violations.push({
              file,
              line: i + 1,
              rule: 'a11y/form-label',
              message: `Input#${inputId} has no associated <label>, aria-label, or aria-labelledby`,
              snippet: tag.slice(0, 120),
            })
          }
        } else {
          violations.push({
            file,
            line: i + 1,
            rule: 'a11y/form-label',
            message: 'Input has no id, aria-label, or aria-labelledby for labelling',
            snippet: tag.slice(0, 120),
          })
        }
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

  console.log('Sharp End Marketing — Accessibility Check')
  console.log('='.repeat(50))

  const htmlFiles = collectHtmlFiles(distDir)

  if (htmlFiles.length === 0) {
    console.log('\n⚠️  No HTML files found in dist/. Run `pnpm build` first.')
    process.exit(0)
  }

  console.log(`\nChecking ${htmlFiles.length} HTML file(s)...`)

  const allViolations: A11yViolation[] = []

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')
    const rel = relative(root, file)

    allViolations.push(...checkImagesAlt(content, lines, rel))
    allViolations.push(...checkLandmarks(content, rel))
    allViolations.push(...checkEmptyInteractive(content, lines, rel))
    allViolations.push(...checkHtmlLang(content, rel))
    allViolations.push(...checkHeadingOrder(content, lines, rel))
    allViolations.push(...checkFormLabels(content, lines, rel))
  }

  // Report
  console.log('\n' + '='.repeat(50))
  console.log('Accessibility Report')
  console.log('='.repeat(50))

  if (allViolations.length === 0) {
    console.log(`\n✅ No a11y violations found in ${htmlFiles.length} file(s).`)
  } else {
    console.log(`\n❌ ${allViolations.length} violation(s) found:\n`)

    // Group by rule
    const byRule = new Map<string, A11yViolation[]>()
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
