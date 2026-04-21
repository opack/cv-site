#!/usr/bin/env node
// Script appelable manuellement (ou par Claude via Bash) pour préfixer
// le titre de la session courante avec un ID user story — utile quand
// Claude découvre l'ID en cours de conversation (ex: en lisant un fichier)
// et non dans un prompt utilisateur.
//
// Usage :
//   node .claude/hooks/set-us-prefix.mjs <US-ID>
//   node .claude/hooks/set-us-prefix.mjs <US-ID> --session <sessionId>
//
// Par défaut, la session ciblée est le fichier .jsonl le plus récemment
// modifié dans le répertoire de projet Claude correspondant au CWD.

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const US_ID_RE = /^(FEA|BUG|TEC|REF|CON|TST)-\d+$/
const PREFIX_RE = /^\[(FEA|BUG|TEC|REF|CON|TST)-\d+\]\s+/

function parseArgs(argv) {
  const args = { usId: null, sessionId: null }
  for (let i = 0; i < argv.length; i++) {
    const value = argv[i]
    if (value === '--session' || value === '-s') {
      args.sessionId = argv[++i]
    } else if (!args.usId) {
      args.usId = value
    }
  }
  return args
}

function projectDirForCwd(cwd) {
  // Claude Code encode le CWD en remplaçant `:`, `\` et `/` par `-`.
  // Ex: `c:\data\YED\projects\envo` → `c--data-YED-projects-envo`.
  const encoded = cwd.replace(/[:\\/]/g, '-')
  return path.join(os.homedir(), '.claude', 'projects', encoded)
}

function findMostRecentSessionFile(projectDir) {
  if (!fs.existsSync(projectDir)) {
    return null
  }
  const candidates = fs
    .readdirSync(projectDir)
    .filter((name) => name.endsWith('.jsonl'))
    .map((name) => {
      const full = path.join(projectDir, name)
      return { full, mtime: fs.statSync(full).mtimeMs }
    })
    .sort((a, b) => b.mtime - a.mtime)

  return candidates[0]?.full ?? null
}

function readJsonlLines(filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean)
}

function findLastAiTitle(lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const obj = JSON.parse(lines[i])
      if (obj.type === 'ai-title' && typeof obj.aiTitle === 'string') {
        return { aiTitle: obj.aiTitle, sessionId: obj.sessionId }
      }
    } catch {
      /* ignore malformed line */
    }
  }
  return null
}

function extractSessionId(lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const obj = JSON.parse(lines[i])
      if (obj.sessionId) {
        return obj.sessionId
      }
    } catch {
      /* ignore */
    }
  }
  return null
}

function appendAiTitle(filePath, sessionId, newTitle) {
  const entry = JSON.stringify({ type: 'ai-title', sessionId, aiTitle: newTitle })
  fs.appendFileSync(filePath, `${entry}\n`, 'utf8')
}

function main() {
  const { usId, sessionId } = parseArgs(process.argv.slice(2))

  if (!usId || !US_ID_RE.test(usId)) {
    console.error('Usage: node .claude/hooks/set-us-prefix.mjs <US-ID> [--session <id>]')
    console.error('US-ID must match /^(FEA|BUG|TEC|REF|CON|TST)-\\d+$/')
    process.exit(1)
  }

  const projectDir = projectDirForCwd(process.cwd())
  let targetFile

  if (sessionId) {
    targetFile = path.join(projectDir, `${sessionId}.jsonl`)
    if (!fs.existsSync(targetFile)) {
      console.error(`Session file not found: ${targetFile}`)
      process.exit(1)
    }
  } else {
    targetFile = findMostRecentSessionFile(projectDir)
    if (!targetFile) {
      console.error(`No session file found in ${projectDir}`)
      process.exit(1)
    }
  }

  const lines = readJsonlLines(targetFile)
  const last = findLastAiTitle(lines)
  const resolvedSessionId = last?.sessionId ?? extractSessionId(lines) ?? path.basename(targetFile, '.jsonl')
  const expectedPrefix = `[${usId}] `

  if (last?.aiTitle?.startsWith(expectedPrefix)) {
    console.log(`Already prefixed: ${last.aiTitle}`)
    return
  }

  const stripped = last?.aiTitle?.replace(PREFIX_RE, '') ?? '(title pending)'
  const newTitle = `${expectedPrefix}${stripped}`.trim()

  appendAiTitle(targetFile, resolvedSessionId, newTitle)
  console.log(`Title updated: ${newTitle}`)
  console.log(`  file: ${targetFile}`)
}

main()
