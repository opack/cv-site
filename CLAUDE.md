# Guide Claude Code — cv-site

Ce repo est développé avec un workflow IA-first structuré autour de Claude Code.
Ce fichier sert de référentiel architectural vivant, mis à jour au fil des
revues et des décisions structurantes.

## Principes de développement

- **TypeScript strict**. Zéro `any`. Toute frontière de module est typée.
- **Zod pour toute donnée externe** (frontmatter, `meta.ts`). La validation
  échoue à la compilation, jamais à l'exécution.
- **Pas de runtime-storage** : le site est un pur statique, `adapter-static`.
  Aucune API, aucune session, aucun localStorage.
- **Svelte 5 runes uniquement** : `$state`, `$props`, `$derived`. Pas de stores
  legacy. Pas de `export let`.
- **Tailwind 4** via `@tailwindcss/vite`. Variables de thème dans `@theme` dans
  `src/app.css` — palette teal (`--color-teal-*`). Pas de CSS ad-hoc hors
  `:global` pour le shell et le `@layer components` pour les composants
  typographiques réutilisés.

## Workflow de modification

1. Pour changer le contenu, éditer les fichiers de `content/`. Ne jamais toucher
   aux composants pour un simple changement de texte.
2. Pour changer la présentation, éditer les composants sous `src/lib/components/`.
3. Toute nouvelle propriété de contenu doit d'abord être ajoutée au schéma Zod
   correspondant (`src/lib/types.ts`), sous peine de rejet au build.
4. Après modification : `npm run check && npm run build` avant commit.

## Organisation du contenu

- `content/experiences/*.md` — une expérience par fichier. Préfixe numérique
  indicatif, l'ordre réel est calculé par `compareByDate` dans `src/lib/content.ts`
  à partir des dates frontmatter (antichrono).
- `content/profile.md` — paragraphe d'accroche, rich text.
- `content/meta.ts` — identité, compétences, stack, formations, diplômes, langues.

## Print vs Web

Les styles d'impression sont dans `@media print` de `src/app.css`. Toute
modification de layout doit être vérifiée en aperçu d'impression navigateur
(Ctrl+P). Éléments à ne pas imprimer : ajouter la classe `no-print`.
Éléments à ne pas casser entre pages : `print-avoid-break`.

## Ne pas

- Ne pas ajouter de dépendance sans justification dans le PR.
- Ne pas introduire de JS runtime-only qui casserait le prerendering.
- Ne pas dupliquer du contenu entre composants et fichiers `content/`.

# Git Usage

Use conventional commit format: `<prefix>(<scope>): [<us-id>] <description>`

## Commit Message Prefixes (<prefix>)

- "fix" for bug fixes
- "feat" for new features
- "perf" for performance improvements
- "docs" for documentation changes
- "style" for formatting changes
- "refactor" for code refactoring
- "test" for adding missing tests
- "chore" for maintenance tasks
- "revert": reverts a previous commit

## Scopes (<scope>)

Choose the most precise scope in the following tree:

- "global": concerns the whole app
  - "nav"
  - "security"
  - "ci"
  - "ide"
    - "vscode"
    - "webstorm"
    - "claude"

If no scope apply, create a new one and add it to the list.

## User Story ID (<us-id>)

The part `[<us-id>]` is optional and appears only if you know the US-ID for the current work.

## Rules

- Use lowercase for commit messages
- Keep the summary line concise
- Include description for non-obvious changes, and keep it concise
- Reference issue numbers when applicable

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
