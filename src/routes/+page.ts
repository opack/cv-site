import { loadCv } from '$lib/content'
import { defaultVariant } from '../../content/variants'

export const prerender = true

export function load() {
	return loadCv(defaultVariant)
}
