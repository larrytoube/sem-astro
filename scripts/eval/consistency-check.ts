/**
 * Consistency checks for Sharp End Marketing.
 *
 * Validates internal consistency across specs, content, and eval rubrics:
 * 1. File references — checks that paths referenced in .specs/ and .claude/ exist
 * 2. Stat citations — checks that stats in content reference approved sources
 * 3. Eval rubrics — checks that eval scripts reference valid check functions
 *
 * Usage: npx tsx scripts/eval/consistency-check.ts
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { collectFiles } from './utils'

interface ConsistencyViolation {
  file: string
  line: number
  rule: string
  message: string
  snippet: string
}

// ---------------------------------------------------------------------------
// File reference checks
// ---------------------------------------------------------------------------

function checkFileReferences(): ConsistencyViolation[] {
  const violations: ConsistencyViolation[] = []
  const root = resolve(process.cwd())

  // Directories to scan for file references
  const dirsToScan = [
    resolve(root, '.specs'),
    resolve(root, '.claude'),
  ]

  // Pattern to match file references like `path/to/file.ext` or `./path/to/file`
  const fileRefPatterns = [
    // Markdown links: [text](path)
    /\[([^\]]*)\]\(([^)]+)\)/g,
    // Backtick paths: `path/to/file.ext`
    /`([^`]*\/[^`]+\.[a-zA-Z]+)`/g,
    // Bare paths that look like files: src/foo/bar.ts, ./scripts/eval/foo.ts
    /(?:^|\s)((?:\.\/|src\/|scripts\/|content\/|\.specs\/|\.claude\/)[^\s,)]+\.[a-zA-Z]+)/gm,
  ]

  for (const dir of dirsToScan) {
    if (!existsSync(dir)) continue

    const mdFiles = collectFiles(dir, '.md')
    const yamlFiles = collectFiles(dir, '.yaml').concat(collectFiles(dir, '.yml'))
    const allFiles = [...mdFiles, ...yamlFiles]

    for (const file of allFiles) {
      const content = readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        for (const pattern of fileRefPatterns) {
          pattern.lastIndex = 0
          let match: RegExpExecArray | null
          while ((match = pattern.exec(line)) !== null) {
            // Get the path — it's in group 2 for markdown links, group 1 for others
            const refPath = match[2] || match[1]

            // Skip URLs, anchors, and non-path references
            if (!refPath) continue
            if (refPath.startsWith('http://') || refPath.startsWith('https://')) continue
            if (refPath.startsWith('#')) continue
            if (refPath.startsWith('mailto:')) continue
            if (refPath.includes('{{')) continue // Template variables
            if (refPath.includes('*')) continue // Glob patterns

            // Resolve relative to project root
            const resolvedPath = refPath.startsWith('/')
              ? resolve(root, refPath.slice(1))
              : resolve(root, refPath)

            // Strip any anchor fragments
            const cleanPath = resolvedPath.split('#')[0]

            if (cleanPath && !existsSync(cleanPath)) {
              violations.push({
                file: relative(root, file),
                line: i + 1,
                rule: 'consistency/file-ref',
                message: `Referenced file does not exist: ${refPath}`,
                snippet: line.trim().slice(0, 120),
              })
            }
          }
        }
      }
    }
  }

  return violations
}

// ---------------------------------------------------------------------------
// Stat citation checks
// ---------------------------------------------------------------------------

function checkStatCitations(): ConsistencyViolation[] {
  const violations: ConsistencyViolation[] = []
  const root = resolve(process.cwd())
  const statsFile = resolve(root, 'content/approved/stats.yaml')

  // If no approved stats file, skip
  if (!existsSync(statsFile)) {
    console.log('  ℹ️  No content/approved/stats.yaml found — skipping stat citation check')
    return violations
  }

  // Load approved stat identifiers from the YAML file
  const statsContent = readFileSync(statsFile, 'utf-8')
  const approvedStats = new Set<string>()

  // Extract stat keys (top-level YAML keys)
  for (const line of statsContent.split('\n')) {
    const keyMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:/)
    if (keyMatch) {
      approvedStats.add(keyMatch[1])
    }
  }

  if (approvedStats.size === 0) {
    console.log('  ℹ️  No stats found in stats.yaml — skipping')
    return violations
  }

  console.log(`  Found ${approvedStats.size} approved stat(s) in stats.yaml`)

  // Check content files for stat references
  const contentDirs = [
    resolve(root, 'src/content/blog'),
    resolve(root, 'src/content/case-studies'),
  ]

  // Pattern to find stat citations like {{stat:key}} or data-stat="key"
  const statRefPatterns = [
    /\{\{stat:([a-zA-Z0-9_-]+)\}\}/g,
    /data-stat\s*=\s*["']([a-zA-Z0-9_-]+)["']/g,
  ]

  for (const dir of contentDirs) {
    if (!existsSync(dir)) continue

    const files = collectFiles(dir, '.md').concat(collectFiles(dir, '.mdx'))

    for (const file of files) {
      const content = readFileSync(file, 'utf-8')
      const lines = content.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        for (const pattern of statRefPatterns) {
          pattern.lastIndex = 0
          let match: RegExpExecArray | null
          while ((match = pattern.exec(line)) !== null) {
            const statKey = match[1]
            if (!approvedStats.has(statKey)) {
              violations.push({
                file: relative(root, file),
                line: i + 1,
                rule: 'consistency/stat-citation',
                message: `Stat "${statKey}" not found in approved stats.yaml`,
                snippet: line.trim().slice(0, 120),
              })
            }
          }
        }
      }
    }
  }

  return violations
}

// ---------------------------------------------------------------------------
// Eval rubric checks
// ---------------------------------------------------------------------------

function checkEvalRubrics(): ConsistencyViolation[] {
  const violations: ConsistencyViolation[] = []
  const root = resolve(process.cwd())
  const evalDir = resolve(root, 'scripts/eval')

  if (!existsSync(evalDir)) return violations

  const evalFiles = collectFiles(evalDir, '.ts')

  // Collect all exported function names from eval scripts
  const exportedFunctions = new Map<string, string>()
  const functionCallPattern = /(?:check|validate|run)\w+/g

  for (const file of evalFiles) {
    const content = readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    // Find function definitions
    for (const line of lines) {
      const funcMatch = line.match(/^(?:export\s+)?function\s+((?:check|validate|run)\w+)/)
      if (funcMatch) {
        exportedFunctions.set(funcMatch[1], relative(root, file))
      }
    }
  }

  // Check that run() functions exist in each eval script (except utils)
  for (const file of evalFiles) {
    const rel = relative(root, file)
    if (rel.endsWith('utils.ts')) continue

    const content = readFileSync(file, 'utf-8')

    // Each eval script should have a run() function
    if (!/function\s+run\s*\(/.test(content)) {
      violations.push({
        file: rel,
        line: 1,
        rule: 'consistency/eval-rubric',
        message: 'Eval script missing run() function',
        snippet: '',
      })
    }

    // Each eval script should call run() at the bottom
    if (!/^run\(\)/m.test(content)) {
      violations.push({
        file: rel,
        line: 1,
        rule: 'consistency/eval-rubric',
        message: 'Eval script does not invoke run() — missing top-level call',
        snippet: '',
      })
    }
  }

  return violations
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function run(): void {
  const root = resolve(process.cwd())

  console.log('Sharp End Marketing — Consistency Check')
  console.log('='.repeat(50))

  const allViolations: ConsistencyViolation[] = []

  // File references
  console.log('\nChecking file references in .specs/ and .claude/...')
  allViolations.push(...checkFileReferences())

  // Stat citations
  console.log('Checking stat citations...')
  allViolations.push(...checkStatCitations())

  // Eval rubrics
  console.log('Checking eval rubric integrity...')
  allViolations.push(...checkEvalRubrics())

  // Report
  console.log('\n' + '='.repeat(50))
  console.log('Consistency Report')
  console.log('='.repeat(50))

  if (allViolations.length === 0) {
    console.log('\n✅ No consistency issues found.')
  } else {
    console.log(`\n❌ ${allViolations.length} issue(s) found:\n`)

    // Group by rule
    const byRule = new Map<string, ConsistencyViolation[]>()
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
