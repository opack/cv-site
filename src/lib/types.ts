import { z } from 'zod';

/** Link shape used in headers, experiences, etc. */
export const linkSchema = z.object({
	label: z.string().min(1),
	url: z.string().url(),
	handle: z.string().min(1).optional()
});
export type Link = z.infer<typeof linkSchema>;

/** Experience frontmatter schema */
export const experienceFrontmatterSchema = z.object({
	title: z.string().min(1),
	company: z.string().min(1),
	companyUrl: z.string().url().optional(),
	dateStart: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MM expected'),
	dateEnd: z
		.union([z.string().regex(/^\d{4}-\d{2}$/), z.null(), z.literal('present')])
		.default(null),
	teamSize: z.string().optional(),
	subtitle: z.string().optional(),
	links: z.array(linkSchema).optional().default([]),
	tags: z.array(z.string()).optional().default([]),
	order: z.number().int().optional(),
	closingNote: z.string().optional()
});
export type ExperienceFrontmatter = z.infer<typeof experienceFrontmatterSchema>;

export interface Experience extends ExperienceFrontmatter {
	body: string; // HTML rendered from mdsvex markdown body
	slug: string;
}

/** Skill / stack / formation / diploma / language entry — YAML-backed */
export const skillGroupSchema = z.object({
	label: z.string(),
	items: z.array(z.string())
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const competenceSchema = z.object({
	label: z.string(),
	description: z.string()
});
export type Competence = z.infer<typeof competenceSchema>;

export const formationSchema = z.object({
	year: z.string(),
	title: z.string(),
	provider: z.string().optional(),
	note: z.string().optional()
});
export type Formation = z.infer<typeof formationSchema>;

export const diplomaSchema = z.object({
	year: z.string(),
	title: z.string(),
	school: z.string().optional(),
	note: z.string().optional()
});
export type Diploma = z.infer<typeof diplomaSchema>;

export const langueSchema = z.object({
	label: z.string(),
	level: z.string()
});
export type Langue = z.infer<typeof langueSchema>;

export const hobbyIconSchema = z.enum([
	'boardgame',
	'videogame',
	'piano',
	'guitar',
	'prototyping'
]);
export type HobbyIcon = z.infer<typeof hobbyIconSchema>;

export const hobbySchema = z.object({
	label: z.string(),
	icon: hobbyIconSchema
});
export type Hobby = z.infer<typeof hobbySchema>;

/** Full meta.yaml shape */
export const metaSchema = z.object({
	identity: z.object({
		firstName: z.string(),
		lastName: z.string(),
		title: z.string(),
		tagline: z.string().optional(),
		email: z.string().email(),
		phone: z.string(),
		location: z.string().optional(),
		links: z.array(linkSchema)
	}),
	competences: z.array(competenceSchema),
	stack: z.array(skillGroupSchema),
	formations: z.array(formationSchema),
	diplomas: z.array(diplomaSchema),
	langues: z.array(langueSchema),
	hobbies: z.array(hobbySchema).optional()
});
export type Meta = z.infer<typeof metaSchema>;

/** Profile content — rich MD body */
export interface Profile {
	body: string;
}
