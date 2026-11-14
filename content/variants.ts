import type { CvVariant } from '$lib/types'

/**
 * The role-dependent slice of the CV: headline, SEO metadata and key skills.
 * Everything else (experiences, stack, formations, diplomas, …) is shared and
 * lives in `content/meta.ts` and `content/experiences/`.
 *
 * Each variant is served at `/<slug>`; `/` is the landing page described in
 * `content/home.ts`. Add a new entry here plus a `content/profile.<slug>.md`
 * file, a `src/routes/<slug>/` page and an entry in `content/home.ts` to create
 * another variant.
 */
export const variants = {
	dev: {
		title: 'Développeur Vue.js / TypeScript senior',
		tagline: 'adaptabilité · pragmatisme · ownership',
		description:
			"CV de Didier Demange - Développeur Vue.js / TypeScript senior. 18 ans d'expérience. Vue 3, Quasar, Pinia, TypeScript : app web, Android et iOS livrée seul depuis une seule codebase (59 versions en onze mois). Workflow IA-first avec Claude Code.",
		ogDescription:
			"18 ans d'expérience en développement. Vue 3, Quasar, Pinia, TypeScript, Firebase. Une app web, Android et iOS conçue, développée et livrée de bout en bout depuis une seule codebase.",
		url: 'https://demange.noatis.fr/dev',
		indexable: false,
		stackOrder: ['Front-end', 'Back-end & data', 'IA', 'Méthodes', 'DevOps & outillage'],
		competences: [
			{
				label: 'Front-end Vue',
				items: [
					'Vue 3 (Composition API)',
					'Quasar 2',
					'Pinia',
					'Vue Router',
					'vue-i18n',
					'composables',
					'Vite',
					'TypeScript',
					'Capacitor (web, Android, iOS)'
				]
			},
			{
				label: 'Développement & architecture',
				items: [
					'architecture',
					'modélisation de données',
					'sécurité',
					'performance',
					'évolution sans rupture'
				]
			},
			{
				label: 'Vision produit & UX',
				items: ['cadrage produit', 'roadmap & priorisation', 'parcours utilisateur', 'i18n']
			},
			{
				label: 'Leadership technique',
				items: [
					'veille',
					'études comparatives',
					'choix de stack',
					'cadrage technique',
					'normes & revue',
					'recrutement'
				]
			},
			{
				label: 'Formation & transmission',
				items: ['mentorat', 'montée en compétence', 'formations', 'présentations techniques']
			},
			{
				label: 'Workflow IA-first',
				items: [
					'orchestration d’agents',
					'règles versionnées',
					'outillage sur mesure',
					'revue du code généré'
				]
			}
		]
	},
	manager: {
		title: 'Engineering Manager',
		tagline: 'leadership humain · pragmatisme · IA appliquée',
		description:
			"CV de Didier Demange - Engineering Manager. 18 ans d'expérience en développement et management d'équipes techniques. Leadership humain, pilotage de projets, IA appliquée.",
		ogDescription:
			"18 ans d'expérience en développement et management d'équipes techniques. Leadership humain, pilotage de projets, workflow IA-first avec Claude Code.",
		url: 'https://demange.noatis.fr/manager',
		indexable: false,
		competences: [
			{
				label: 'Management d’équipe',
				items: [
					'animation d’équipe',
					'écoute',
					'suivi individuel',
					'autonomisation',
					'gestion de conflits'
				]
			},
			{
				label: 'Pilotage de projets',
				items: [
					'agilité',
					'gestion budgétaire',
					'arbitrage & décision',
					'rigueur organisationnelle',
					'interface comité de direction'
				]
			},
			{
				label: 'Cadrage produit',
				items: [
					'vision & roadmap',
					'priorisation',
					'business plan',
					'étude de marché',
					'confrontation terrain'
				]
			},
			{
				label: 'IA appliquée',
				items: [
					'workflows IA-first',
					'Claude Code',
					'sensibilisation des équipes',
					'levier de productivité'
				]
			},
			{
				label: 'Leadership technique',
				items: ['choix de stack', 'architecture', 'qualité de code', 'CI/CD', 'revue', 'veille']
			}
		]
	},
	devops: {
		title: 'Ingénieur DevOps',
		tagline: 'automatisation · pragmatisme · ownership',
		description:
			"CV de Didier Demange - Ingénieur DevOps. 18 ans d'expérience dont 6 ans en rôle DevOps : pipelines Jenkins, Docker, Ansible, infrastructure AWS, migration depuis l'on-premise, environnements jetables en libre-service, logs ELK, outillage qualité.",
		ogDescription:
			"6 ans en rôle DevOps chez EasyVista : Jenkins, Docker, Ansible, AWS, environnements jetables en libre-service, outillage qualité. Pipeline de déploiement GitHub Actions multi-environnements en solo sur Envo.",
		url: 'https://demange.noatis.fr/devops',
		indexable: false,
		stackOrder: ['DevOps & outillage', 'Back-end & data', 'Front-end', 'Méthodes', 'IA'],
		competences: [
			{
				label: 'CI/CD & automatisation',
				items: [
					'pipelines Jenkins',
					'GitHub Actions',
					'génération de version',
					'Bash / PowerShell',
					'AWS CLI'
				]
			},
			{
				label: 'Cloud & infrastructure',
				items: [
					'AWS (EC2, S3, IAM)',
					'Docker multi-stage',
					'Ansible, Vagrant',
					'environnements jetables',
					'migration VMware vers AWS',
					'serverless (Cloud Functions)',
					'stockage (S3, Firebase Storage)',
					'VPN'
				]
			},
			{
				label: 'Qualité & sécurité',
				items: ['SonarQube', 'tests E2E', 'tests des règles de sécurité', 'revue de code']
			},
			{
				label: 'Exploitation & fiabilité',
				items: [
					'Sentry',
					'logs centralisés (ELK)',
					'process de mise en production',
					'migrations sans interruption'
				]
			},
			{
				label: 'Plateforme interne & adoption',
				items: ['La Forge', 'accompagnement de 22 développeurs', 'documentation']
			}
		]
	}
} satisfies Record<string, CvVariant>

export type VariantSlug = keyof typeof variants
