import { z } from 'zod'

/** Link shape used in headers, experiences, etc. */
export const linkSchema = z.object({
	label: z.string().min(1),
	url: z.string().url(),
	handle: z.string().min(1).optional()
})
export type Link = z.infer<typeof linkSchema>

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
})
export type ExperienceFrontmatter = z.infer<typeof experienceFrontmatterSchema>

export interface Experience extends ExperienceFrontmatter {
	body: string // HTML rendered from mdsvex markdown body
	slug: string
}

/** Skill / stack / formation / diploma / language entry */
export const skillGroupSchema = z.object({
	label: z.string(),
	items: z.array(z.string())
})
export type SkillGroup = z.infer<typeof skillGroupSchema>

export const competenceSchema = z.object({
	label: z.string(),
	items: z.array(z.string().min(1)).min(1)
})
export type Competence = z.infer<typeof competenceSchema>

export const formationSchema = z.object({
	year: z.string(),
	title: z.string(),
	provider: z.string().optional(),
	note: z.string().optional()
})
export type Formation = z.infer<typeof formationSchema>

export const diplomaSchema = z.object({
	year: z.string(),
	title: z.string(),
	school: z.string().optional(),
	note: z.string().optional()
})
export type Diploma = z.infer<typeof diplomaSchema>

export const langueSchema = z.object({
	label: z.string(),
	level: z.string()
})
export type Langue = z.infer<typeof langueSchema>

export const hobbyIconSchema = z.enum(['boardgame', 'videogame', 'piano', 'guitar', 'prototyping'])
export type HobbyIcon = z.infer<typeof hobbyIconSchema>

export const hobbySchema = z.object({
	label: z.string(),
	icon: hobbyIconSchema
})
export type Hobby = z.infer<typeof hobbySchema>

/** Identity fields shared by every CV variant */
export const baseIdentitySchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	phone: z.string(),
	location: z.string().optional(),
	links: z.array(linkSchema)
})

/** content/meta.ts — everything that does not depend on the targeted role */
export const baseMetaSchema = z.object({
	identity: baseIdentitySchema,
	stack: z.array(skillGroupSchema),
	formations: z.array(formationSchema),
	diplomas: z.array(diplomaSchema),
	langues: z.array(langueSchema),
	hobbies: z.array(hobbySchema).optional()
})
export type BaseMeta = z.infer<typeof baseMetaSchema>

/** content/variants.ts — the role-dependent slice of the CV */
export const cvVariantSchema = z.object({
	title: z.string().min(1),
	tagline: z.string().optional(),
	description: z.string().min(1),
	ogDescription: z.string().min(1),
	url: z.string().url(),
	indexable: z.boolean(),
	competences: z.array(competenceSchema),
	/** Stack group labels to show first, in this order. Unlisted groups follow. */
	stackOrder: z.array(z.string()).optional()
})
export type CvVariant = z.infer<typeof cvVariantSchema>

/** Base meta composed with a variant — what the page components consume */
export const metaSchema = baseMetaSchema.extend({
	identity: baseIdentitySchema.extend({
		title: z.string(),
		tagline: z.string().optional()
	}),
	competences: z.array(competenceSchema)
})
export type Meta = z.infer<typeof metaSchema>

const yearMonthSchema = z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MM expected')

/** One stretch of the career timeline shown on the landing page */
export const homePhaseSchema = z.object({
	start: yearMonthSchema,
	end: z.union([yearMonthSchema, z.literal('present')]),
	label: z.string().min(1),
	detail: z.string().min(1)
})

/** One way into the CV: a card on the landing page and a button in the switcher */
export const homeEntrySchema = z.object({
	/** Key of `content/variants.ts` */
	slug: z.string().min(1),
	/** Short name, used on buttons */
	label: z.string().min(1),
	pitch: z.string().min(1),
	proofs: z.array(z.string().min(1)).min(1)
})
export type HomeEntry = z.infer<typeof homeEntrySchema>

/** content/home.ts — landing page: framing, career timeline and entry points */
export const homeSchema = z.object({
	title: z.string().min(1),
	tagline: z.string().optional(),
	description: z.string().min(1),
	ogDescription: z.string().min(1),
	url: z.string().url(),
	/** Framing paragraphs: the thread running through the whole career */
	thread: z.array(z.string().min(1)).min(1),
	phases: z.array(homePhaseSchema).min(1),
	entries: z.array(homeEntrySchema).min(1)
})
export type Home = z.infer<typeof homeSchema>

/** Profile content (rich MD body) */
export interface Profile {
	body: string
}
