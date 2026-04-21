import { loadExperiences, loadProfile, loadMeta } from '$lib/content';

export const prerender = true;

export function load() {
	const experiences = loadExperiences();
	const profile = loadProfile();
	const meta = loadMeta();
	return { experiences, profile, meta };
}
