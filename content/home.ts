import type { Home } from '$lib/types'

/**
 * Landing page served at `/`: the thread running through the career, a
 * timeline, and one entry per CV variant (`slug` is a key of `variants.ts`).
 * Entries also feed the switcher shown on a CV page reached from here.
 */
export const home: Home = {
	title: 'Ingénieur logiciel',
	tagline: 'rendre les développements plus efficaces',
	description:
		"Didier Demange - Ingénieur logiciel. 18 ans d'expérience : développement et architecture, DevOps, produits en solo. Un même parcours, à lire côté développeur, DevOps ou manager.",
	ogDescription:
		"18 ans à rendre les développements plus efficaces : développement et architecture, DevOps, produits en solo. Choisissez l'angle qui vous intéresse.",
	url: 'https://demange.noatis.fr',
	thread: [
		"Depuis 18 ans, je rends des développements plus efficaces, par trois leviers : le code, la chaîne de livraison et l'équipe.",
		'Dix ans à concevoir et construire des applications, six ans à industrialiser leur livraison, puis plus de deux ans à tout porter seul sur mes propres produits. Chaque étape a servi la suivante.',
		"C'est un seul parcours : choisissez l'angle qui vous intéresse !"
	],
	phases: [
		{
			start: '2007-10',
			end: '2017-07',
			label: 'Développement & architecture',
			detail:
				'Sopra, Solutec, CNAF, Société Générale. Java/J2EE puis Spring Boot et AngularJS : référent technique, lead developer, architecte applicatif.'
		},
		{
			start: '2017-07',
			end: '2023-10',
			label: 'DevOps & leadership technique',
			detail:
				'EasyVista. Technical Leader puis Manager DevOps : CI/CD, AWS, Docker, environnements de dev jetables, équipe de 11.'
		},
		{
			start: '2024-01',
			end: 'present',
			label: 'Produits en solo',
			detail:
				'Kazelio puis Envo. Conception, développement et exploitation de bout en bout, workflow IA-first.'
		}
	],
	entries: [
		{
			slug: 'dev',
			label: 'Développeur',
			pitch: 'Vous cherchez quelqu’un qui livre un produit de bout en bout.',
			proofs: [
				'Envo : 59 versions livrées en onze mois, seul, sur trois plateformes',
				'TypeScript, Vue.js, Svelte, Firebase, Supabase'
			]
		},
		{
			slug: 'devops',
			label: 'DevOps',
			pitch: 'Vous cherchez quelqu’un qui fiabilise et automatise la livraison.',
			proofs: [
				'Environnements de dev : de 15 minutes à 2-3 minutes, en libre-service',
				'Migration des plateformes de VMware vers AWS'
			]
		},
		{
			slug: 'manager',
			label: 'Manager',
			pitch: 'Vous cherchez quelqu’un qui fait grandir une équipe technique.',
			proofs: [
				'Co-management d’une équipe DevOps de 11 personnes',
				'15 ans à faire monter en compétence des développeurs'
			]
		}
	]
}
