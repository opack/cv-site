import type { Meta } from '$lib/types'

export const meta: Meta = {
	identity: {
		firstName: 'Didier',
		lastName: 'Demange',
		title: 'Tech Lead / Senior Dev Fullstack',
		tagline: 'workflow IA-first',
		email: 'didier.demange@gmail.com',
		phone: '06 24 47 82 44',
		location: 'Basé en France · full remote privilégié · mobilité ponctuelle possible',
		links: [
			{
				label: 'LinkedIn',
				url: 'https://www.linkedin.com/in/didier-demange/',
				handle: 'didier-demange'
			},
			{ label: 'GitHub', url: 'https://github.com/opack', handle: 'opack' }
		]
	},
	competences: [
		{
			label: 'Développement front',
			description: 'Vue/Quasar, Svelte/SvelteKit, React, TypeScript ; UX, architectures modulaires'
		},
		{
			label: 'Workflow IA-first',
			description:
				"Orchestration d'agents Claude Code, plan mode + Opus, parallélisation, commandes, skills custom, CLAUDE.md comme référentiel architectural vivant"
		},
		{
			label: 'Leadership technique',
			description: 'Choix de stack, qualité code, CI/CD, revue, veille, cadrage'
		},
		{
			label: 'Formation & transmission',
			description: 'Montée en compétence des devs, documentation, présentations'
		}
	],
	stack: [
		{
			label: 'Front-end',
			items: [
				'JavaScript',
				'TypeScript',
				'Vue.js',
				'Quasar',
				'Svelte',
				'SvelteKit',
				'React',
				'HTML5',
				'CSS3',
				'TailwindCSS'
			]
		},
		{
			label: 'Back-end & data',
			items: ['Node.js', 'Firebase', 'Supabase', 'PostgreSQL', 'Java / Spring Boot (legacy)']
		},
		{
			label: 'DevOps & outillage',
			items: ['Git', 'Docker', 'Jenkins', 'SonarQube', 'Azure DevOps', 'AWS', 'CI/CD']
		},
		{
			label: 'IA',
			items: [
				'Claude Code (Opus, plan mode, agents parallèles, commandes, skills custom)',
				'workflow spec-first',
				'CLAUDE.md architecture'
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
