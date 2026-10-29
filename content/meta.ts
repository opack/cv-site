import type { BaseMeta } from '$lib/types'

/**
 * Everything that does not depend on the targeted role.
 * Title, tagline and competences live in `content/variants.ts`.
 */
export const meta: BaseMeta = {
	identity: {
		firstName: 'Didier',
		lastName: 'Demange',
		email: 'didier.demange@gmail.com',
		phone: '06 24 47 82 44',
		location: '',
		links: [
			{
				label: 'LinkedIn',
				url: 'https://www.linkedin.com/in/didier-demange/',
				handle: 'didier-demange'
			},
			{ label: 'GitHub', url: 'https://github.com/opack', handle: 'opack' }
		]
	},
	stack: [
		{
			label: 'Front-end',
			items: [
				'JavaScript',
				'TypeScript',
				'React',
				'Vue.js',
				'Quasar',
				'Svelte',
				'SvelteKit',
				'TailwindCSS'
			]
		},
		{
			label: 'Back-end & data',
			items: ['Node.js', 'Firebase', 'Supabase', 'PostgreSQL', 'Java / Spring Boot (legacy)']
		},
		{
			label: 'DevOps & outillage',
			items: [
				'Git',
				'Docker',
				'Docker Compose',
				'Jenkins',
				'GitHub Actions',
				'Azure DevOps',
				'Ansible',
				'Vagrant',
				'Bash',
				'PowerShell',
				'AWS (EC2, S3, IAM, Secrets Manager, ECR)',
				'Artifactory / Nexus',
				'ELK',
				'SonarQube',
				'Netlify',
				'CI/CD',
				'Sentry'
			]
		},
		{
			label: 'IA',
			items: [
				'Claude Code',
				'mode plan',
				'agents parallèles',
				'commandes & skills custom',
				'workflow spec-first',
				'architecture via CLAUDE.md'
			]
		},
		{
			label: 'Méthodes',
			items: ['TDD', 'Scrum', 'revue de code']
		}
	],
	formations: [
		{
			year: '2026',
			title: 'Claude Code, orchestration d’agents IA et création de skills custom',
			note: 'pratique intensive structurée sur Envo'
		},
		{
			year: '2025',
			title: 'Vue 3 & Quasar 2',
			provider: 'Make Apps Academy'
		},
		{
			year: '2025',
			title: 'Vue 3',
			note: 'autoformation structurée*'
		},
		{
			year: '2024',
			title: 'Cursus Artisan Développeur',
			provider: 'Benoit Gantaume'
		},
		{
			year: '2024',
			title: 'Svelte + SvelteKit',
			note: 'autoformation structurée*'
		},
		{
			year: '2023',
			title: 'Les essentiels du management',
			provider: 'La Vraie Vie'
		}
	],
	diplomas: [
		{
			year: '2007',
			title:
				'Diplôme d’Ingénieur des techniques de l’industrie, spécialité Informatique et Réseaux',
			school: 'Ingénieurs 2000 (77)',
			note: 'en alternance chez CEDIP Infrared Systems (77)'
		},
		{
			year: '2005',
			title: 'First Certificate of English (FCE), grade B',
			school: 'Ingénieurs 2000 (77)',
			note: 'Évalué et délivré par University of Cambridge'
		},
		{
			year: '2004',
			title: 'DUT Informatique, option Génie Logiciel',
			school: 'IUT de Montreuil (93)',
			note: 'en alternance chez CEDIP Infrared Systems (77)'
		}
	],
	langues: [
		{ label: 'Français', level: 'langue maternelle' },
		{
			label: 'Anglais',
			level: 'courant, usage professionnel quotidien'
		}
	],
	hobbies: [
		{ label: 'Jeux de société', icon: 'boardgame' },
		{ label: 'Jeux vidéo', icon: 'videogame' },
		{ label: 'Piano', icon: 'piano' },
		{ label: 'Guitare', icon: 'guitar' },
		{ label: 'Prototypage d’applis', icon: 'prototyping' }
	]
}
