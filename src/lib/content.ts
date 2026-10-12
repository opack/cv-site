import type { Component } from 'svelte'
import { meta as rawMeta } from '../../content/meta'
import { variants, type VariantSlug } from '../../content/variants'
import {
	cvVariantSchema,
	experienceFrontmatterSchema,
	metaSchema,
	type CvVariant,
	type ExperienceFrontmatter,
	type Meta
} from './types'

type MdModule = {
	default: Component
	metadata: unknown
}

function compareByDate(a: ExperienceFrontmatter, b: ExperienceFrontmatter): number {
	const endA = a.dateEnd === null || a.dateEnd === 'present' ? '9999-99' : a.dateEnd
	const endB = b.dateEnd === null || b.dateEnd === 'present' ? '9999-99' : b.dateEnd
	if (endA !== endB) return endA < endB ? 1 : -1
	return a.dateStart < b.dateStart ? 1 : -1
}

export function loadExperiences(): {
	frontmatter: ExperienceFrontmatter
	component: Component
	slug: string
}[] {
	const modules = import.meta.glob<MdModule>('/content/experiences/*.md', { eager: true })
	const loaded = Object.entries(modules).map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '')
		const parsed = experienceFrontmatterSchema.safeParse(mod.metadata)
		if (!parsed.success) {
			throw new Error(
				`Invalid frontmatter in ${path}:\n${parsed.error.issues
					.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
					.join('\n')}`
			)
		}
		return { frontmatter: parsed.data, component: mod.default, slug }
	})
	return loaded.sort((a, b) => compareByDate(a.frontmatter, b.frontmatter))
}

export function loadProfile(variant: VariantSlug): { component: Component } {
	const modules = import.meta.glob<MdModule>('/content/profile.*.md', { eager: true })
	const profile = modules[`/content/profile.${variant}.md`]
	if (!profile) throw new Error(`Missing content/profile.${variant}.md`)
	return { component: profile.default }
}

export function loadVariant(variant: VariantSlug): CvVariant {
	const parsed = cvVariantSchema.safeParse(variants[variant])
	if (!parsed.success) {
		throw new Error(
			`Invalid variant "${variant}" in variants.ts:\n${parsed.error.issues
				.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
				.join('\n')}`
		)
	}
	return parsed.data
}

/** Compose the shared base meta with the role-dependent slice of a variant. */
export function loadMeta(variant: CvVariant): Meta {
	const parsed = metaSchema.safeParse({
		...rawMeta,
		identity: { ...rawMeta.identity, title: variant.title, tagline: variant.tagline },
		competences: variant.competences
	})
	if (!parsed.success) {
		throw new Error(
			`Invalid meta.ts:\n${parsed.error.issues
				.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
				.join('\n')}`
		)
	}
	return parsed.data
}

/** Shared page `load` for every CV variant route. */
export function loadCv(variant: VariantSlug) {
	const cvVariant = loadVariant(variant)
	return {
		experiences: loadExperiences(),
		profile: loadProfile(variant),
		meta: loadMeta(cvVariant),
		variant: cvVariant
	}
}
