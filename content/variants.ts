import type { CvVariant } from '$lib/types'

/**
 * The role-dependent slice of the CV: headline, SEO metadata and key skills.
 * Everything else (experiences, stack, formations, diplomas, …) is shared and
 * lives in `content/meta.ts` and `content/experiences/`.
 *
 * `dev` is the default variant, served at `/`. Add a new entry here plus a
 * `content/profile.<slug>.md` file and a `src/routes/<slug>/` page to create
 * another variant.
 */
export const variants = {
	dev: {
		title: 'Développeur fullstack senior',
		tagline: 'adaptabilité · pragmatisme · ownership',
		description:
			"CV de Didier Demange - Développeur fullstack senior. 18 ans d'expérience, TypeScript, Vue.js et Svelte, architecture applicative, apps mobiles et web livrées de bout en bout, workflow IA-first avec Claude Code.",
		ogDescription:
			"18 ans d'expérience en développement. TypeScript, Vue.js, Svelte, Firebase, Supabase. Apps mobiles et web conçues, développées et livrées de bout en bout.",
		url: 'https://demange.noatis.fr',
		indexable: true,
		competences: [
			{
				label: 'Développement fullstack',
				description:
					'Faire évoluer un produit vivant sans casser l’existant : migrations de données en production, compatibilité ascendante, performance sur données réelles, diagnostic cross-couches, arbitrage produit (périmètre, parcours utilisateur, dette technique)'
			},
			{
				label: 'Workflow IA-first',
				description:
					'Découpage du travail en specs, orchestration d’agents, capitalisation des décisions d’architecture, revue systématique de ce qui est produit'
			},
			{
				label: 'Leadership technique',
				description:
					'Choix de stack après étude comparative, cadrage et specs techniques, qualité code, CI/CD, revue, veille'
			},
			{
				label: 'Formation & transmission',
				description:
					'Montée en compétence des devs, onboarding, revue qui transmet, documentation, présentations'
			}
		]
	},
	manager: {
		title: 'Manager DevOps',
		tagline: 'leadership humain · pragmatisme · IA appliquée',
		description:
			"CV de Didier Demange - Manager DevOps. 18 ans d'expérience en développement et management d'équipes techniques. Leadership humain, pilotage de projets, IA appliquée.",
		ogDescription:
			"18 ans d'expérience en développement et management d'équipes techniques. Leadership humain, pilotage de projets, workflow IA-first avec Claude Code.",
		url: 'https://demange.noatis.fr/manager',
		indexable: false,
		competences: [
			{
				label: 'Management d’équipe',
				description:
					'Communication et écoute, animation d’équipe, suivi individuel, entretiens annuels, accompagnement à la montée en compétence et à l’autonomisation, gestion de conflits'
			},
			{
				label: 'Pilotage de projets',
				description:
					'Gestion budgétaire, méthodes agiles (dont Scrum, Kanban), interface comité de direction et autres départements'
			},
			{
				label: 'IA appliquée',
				description:
					'Sensibilisation et déploiement de workflows IA-first (Claude Code) comme levier de productivité et de nouveaux services'
			},
			{
				label: 'Leadership technique',
				description: 'Choix de stack, architecture, qualité code, CI/CD, revue, veille'
			}
		]
	}
} satisfies Record<string, CvVariant>

export type VariantSlug = keyof typeof variants
export const defaultVariant: VariantSlug = 'dev'
