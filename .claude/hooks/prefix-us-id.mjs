#!/usr/bin/env node
// UserPromptSubmit hook: préfixe le titre de la session avec l'ID user story
// (ex: [FEA-386]) quand il est détecté dans le prompt courant ou dans
// l'historique de la conversation.

import fs from 'node:fs'

const US_ID_RE = /\b(FEA|BUG|TEC|REF|CON|TST)-\d+\b/
const PREFIX_RE = /^\[(FEA|BUG|TEC|REF|CON|TST)-\d+\]\s+/

async function readStdin() {
	const chunks = []
	for await (const chunk of process.stdin) {
		chunks.push(chunk)
	}
	return Buffer.concat(chunks).toString('utf8')
}

function readJsonlLines(filePath) {
	if (!fs.existsSync(filePath)) {
		return []
	}
	return fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean)
}

function findLastAiTitle(lines) {
	for (let i = lines.length - 1; i >= 0; i--) {
		try {
			const obj = JSON.parse(lines[i])
			if (obj.type === 'ai-title' && typeof obj.aiTitle === 'string') {
				return obj.aiTitle
			}
		} catch {
			/* ignore malformed line */
		}
	}
	return null
}

function extractTextFromUserMessage(obj) {
	if (obj?.type !== 'user' || !obj.message) {
		return ''
	}
	const { content } = obj.message
	if (typeof content === 'string') {
		return content
	}
	if (Array.isArray(content)) {
		return content
			.filter((part) => part?.type === 'text' && typeof part.text === 'string')
			.map((part) => part.text)
			.join(' ')
	}
	return ''
}

function findUsIdInTranscript(lines) {
	for (const line of lines) {
		try {
			const obj = JSON.parse(line)
			const text = extractTextFromUserMessage(obj)
			if (text) {
				const match = text.match(US_ID_RE)
				if (match) {
					return match[0]
				}
			}
		} catch {
			/* ignore malformed line */
		}
	}
	return null
}

function buildFallbackTitle(prompt) {
	return prompt.replace(/\s+/g, ' ').trim().slice(0, 60)
}

async function main() {
	const raw = await readStdin()
	if (!raw.trim()) {
		return
	}

	const input = JSON.parse(raw)
	const prompt = input.prompt ?? ''
	const transcriptPath = input.transcript_path

	const promptMatch = prompt.match(US_ID_RE)
	const lines = transcriptPath ? readJsonlLines(transcriptPath) : []
	const usId = promptMatch?.[0] ?? findUsIdInTranscript(lines)

	if (!usId) {
		return
	}

	const expectedPrefix = `[${usId}] `
	const currentTitle = findLastAiTitle(lines)

	if (currentTitle?.startsWith(expectedPrefix)) {
		return
	}

	const stripped = currentTitle?.replace(PREFIX_RE, '') ?? buildFallbackTitle(prompt)
	const newTitle = `${expectedPrefix}${stripped}`.trim()

	process.stdout.write(
		JSON.stringify({
			hookSpecificOutput: {
				hookEventName: 'UserPromptSubmit',
				sessionTitle: newTitle
			}
		})
	)
}

main().catch((error) => {
	// Never block the prompt — just log to stderr for debugging.
	process.stderr.write(`prefix-us-id hook failed: ${error?.message ?? error}\n`)
	process.exit(0)
})
