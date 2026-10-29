import type { Component } from 'svelte'
import { home as rawHome } from '../../content/home'
import { meta as rawMeta } from '../../content/meta'
import { variants, type VariantSlug } from '../../content/variants'
import {
	cvVariantSchema,
	experienceFrontmatterSchema,
	homeSchema,
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

/**
 * `01-envo.md` is the shared experience; `01-envo.devops.md` overrides it for
 * the `devops` variant: its frontmatter is merged over the base one (dates and
 * company stay in the base) and its body replaces the base body.
 */
export function loadExperiences(variant: VariantSlug): {
	frontmatter: ExperienceFrontmatter
	component: Component
	slug: string
}[] {
	const modules = import.meta.glob<MdModule>('/content/experiences/*.md', { eager: true })
	const bases = new Map<string, MdModule>()
	const overrides = new Map<string, MdModule>()
	for (const [path, mod] of Object.entries(modules)) {
		const [slug, overrideVariant] = path.split('/').pop()!.replace(/\.md$/, '').split('.')
		if (overrideVariant === undefined) bases.set(slug, mod)
		else if (overrideVariant === variant) overrides.set(slug, mod)
	}
	for (const slug of overrides.keys()) {
		if (!bases.has(slug)) throw new Error(`Override ${slug}.${variant}.md has no base ${slug}.md`)
	}
	const loaded = [...bases].map(([slug, base]) => {
		const override = overrides.get(slug)
		const parsed = experienceFrontmatterSchema.safeParse({
			...(base.metadata as Record<string, unknown>),
			...(override?.metadata as Record<string, unknown> | undefined)
		})
		if (!parsed.success) {
			throw new Error(
				`Invalid frontmatter in ${slug}:\n${parsed.error.issues
					.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
					.join('\n')}`
			)
		}
		return { frontmatter: parsed.data, component: (override ?? base).default, slug }
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
	const rank = (label: string) => {
		const i = variant.stackOrder?.indexOf(label) ?? -1
		return i === -1 ? Infinity : i
	}
	const parsed = metaSchema.safeParse({
		...rawMeta,
		stack: [...rawMeta.stack].sort((a, b) => rank(a.label) - rank(b.label)),
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

const monthIndex = (yearMonth: string) => {
	const [year, month] = yearMonth.split('-').map(Number)
	return year * 12 + month
}

/** Landing page: validated content, identity for the header, timeline with durations. */
export function loadHome() {
	const parsed = homeSchema.safeParse(rawHome)
	if (!parsed.success) {
		throw new Error(
			`Invalid home.ts:\n${parsed.error.issues
				.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
				.join('\n')}`
		)
	}
	const home = parsed.data
	const unknown = home.entries.filter((e) => !(e.slug in variants))
	if (unknown.length > 0) {
		throw new Error(`Unknown variant in home.ts: ${unknown.map((e) => e.slug).join(', ')}`)
	}

	const now = new Date()
	const nowIndex = now.getFullYear() * 12 + now.getMonth() + 1
	const phases = home.phases.map((phase) => ({
		...phase,
		months: (phase.end === 'present' ? nowIndex : monthIndex(phase.end)) - monthIndex(phase.start),
		period: `${phase.start.slice(0, 4)} – ${phase.end === 'present' ? 'aujourd’hui' : phase.end.slice(0, 4)}`
	}))

	return {
		home: { ...home, phases },
		identity: { ...rawMeta.identity, title: home.title, tagline: home.tagline }
	}
}

/** Shared page `load` for every CV variant route. */
export function loadCv(variant: VariantSlug) {
	const cvVariant = loadVariant(variant)
	return {
		experiences: loadExperiences(variant),
		profile: loadProfile(variant),
		meta: loadMeta(cvVariant),
		variant: cvVariant,
		slug: variant,
		switchEntries: loadHome().home.entries.map(({ slug, label }) => ({ slug, label }))
	}
}
