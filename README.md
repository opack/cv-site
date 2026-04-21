# CV — Didier Demange

Site statique (SvelteKit 2 · Svelte 5 · Tailwind CSS 4) qui génère mon CV en ligne
et à imprimer. Le contenu vit en Markdown sous `content/`, la présentation en
composants Svelte dans `src/lib/components/`.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # génère build/ (pur statique)
npm run preview      # prévisualise le build
npm run check        # svelte-check + tsc
```

## Structure

```
content/
├── profile.md              # accroche + profil (rich text)
├── experiences/*.md        # une expérience par fichier (frontmatter typé + body)
└── meta.ts                 # identité, compétences, stack, formations, diplômes, langues

src/
├── app.css                 # Tailwind + print styles A4
├── app.html                # shell
├── lib/
│   ├── types.ts            # schémas Zod + types inférés
│   ├── content.ts          # loader MD + validation Zod au build
│   └── components/         # Header, SectionTitle, ExperienceCard
└── routes/
    ├── +layout.svelte      # layout commun + import CSS
    ├── +layout.ts          # prerender=true, ssr=true
    ├── +page.ts            # load() qui charge profile, expériences, meta
    └── +page.svelte        # assemblage de la page CV

static/
└── favicon.svg
```

## Modifier le contenu

- **Ajouter une expérience** : créer `content/experiences/XX-slug.md` avec le frontmatter attendu (voir `src/lib/types.ts` → `experienceFrontmatterSchema`). L'ordre d'affichage est calculé à partir de `dateEnd` / `dateStart` (antichrono).
- **Modifier l'identité, la stack, les formations, les diplômes** : éditer `content/meta.ts`. Les schémas Zod valident au build — si un champ est oublié, `npm run build` échoue avec un message clair.
- **Modifier le profil** : éditer `content/profile.md`.

## Export PDF

Ouvrir la page dans le navigateur → Ctrl/Cmd + P → "Enregistrer en PDF" → A4,
marges par défaut. Les styles `@media print` de `src/app.css` basculent
automatiquement en mise en page optimisée papier (pas d'URL résolues dans les
liens, masquage du footer, etc.).

## Déploiement

### Netlify (auto-deploy depuis GitHub)

1. Push le repo sur GitHub.
2. Sur Netlify : "Add new site" → "Import from Git" → choisir le repo.
3. Les paramètres sont pré-remplis par `netlify.toml` (commande `npm run build`, dossier `build`).

### Cloudflare Pages

Framework preset : SvelteKit. Build command : `npm run build`. Output directory : `build`.

### Tout autre hébergeur statique

Lancer `npm run build` et uploader le contenu du dossier `build/`.

## Stack & workflow

- **Svelte 5** avec les runes (`$state`, `$props`, `$derived`) — pas de stores legacy
- **TypeScript strict** + `svelte-check`
- **Tailwind CSS 4** zero-config via `@tailwindcss/vite`
- **mdsvex** pour compiler le Markdown en composants Svelte au build
- **Zod** pour valider tous les frontmatters et `meta.ts`
- **adapter-static** : output 100 % pré-rendu, aucun runtime requis
