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
