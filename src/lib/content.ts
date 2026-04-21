import type { Component } from 'svelte';
import { meta as rawMeta } from '../../content/meta';
import {
	experienceFrontmatterSchema,
	metaSchema,
	type ExperienceFrontmatter,
	type Meta
} from './types';

type MdModule = {
	default: Component;
	metadata: unknown;
};

function compareByDate(a: ExperienceFrontmatter, b: ExperienceFrontmatter): number {
	const endA = a.dateEnd === null || a.dateEnd === 'present' ? '9999-99' : a.dateEnd;
	const endB = b.dateEnd === null || b.dateEnd === 'present' ? '9999-99' : b.dateEnd;
	if (endA !== endB) return endA < endB ? 1 : -1;
	return a.dateStart < b.dateStart ? 1 : -1;
}

export function loadExperiences(): {
	frontmatter: ExperienceFrontmatter;
	component: Component;
	slug: string;
}[] {
	const modules = import.meta.glob<MdModule>('/content/experiences/*.md', { eager: true });
	const loaded = Object.entries(modules).map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '');
		const parsed = experienceFrontmatterSchema.safeParse(mod.metadata);
		if (!parsed.success) {
			throw new Error(
				`Invalid frontmatter in ${path}:\n${parsed.error.issues
					.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
					.join('\n')}`
			);
		}
		return { frontmatter: parsed.data, component: mod.default, slug };
	});
	return loaded.sort((a, b) => compareByDate(a.frontmatter, b.frontmatter));
}

export function loadProfile(): { component: Component } {
	const modules = import.meta.glob<MdModule>('/content/profile.md', { eager: true });
	const first = Object.values(modules)[0];
	if (!first) throw new Error('Missing content/profile.md');
	return { component: first.default };
}

export function loadMeta(): Meta {
	const parsed = metaSchema.safeParse(rawMeta);
	if (!parsed.success) {
		throw new Error(
			`Invalid meta.ts:\n${parsed.error.issues
				.map((i) => ` - ${i.path.join('.')}: ${i.message}`)
				.join('\n')}`
		);
	}
	return parsed.data;
}
