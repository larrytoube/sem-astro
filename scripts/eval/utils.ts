/**
 * Shared utilities for eval scripts.
 */

import { readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Recursively collect files matching a given extension from a directory.
 */
export function collectFiles(dir: string, ext: string): string[] {
  const results: string[] = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        results.push(...collectFiles(fullPath, ext))
      } else if (entry.name.endsWith(ext)) {
        results.push(fullPath)
      }
    }
  } catch {
    // Directory may not exist
  }
  return results
}

/**
 * Collect all HTML files from the dist directory.
 */
export function collectHtmlFiles(distDir: string): string[] {
  return collectFiles(distDir, '.html')
}
