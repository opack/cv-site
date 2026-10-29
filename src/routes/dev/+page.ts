import { loadCv } from '$lib/content'

export const prerender = true

export function load() {
	return loadCv('dev')
}
