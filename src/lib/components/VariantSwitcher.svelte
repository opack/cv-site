<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte'

	type Props = {
		current: string
		entries: { slug: string; label: string }[]
	}
	let { current, entries }: Props = $props()
</script>

<nav
	aria-label="Changer d’angle"
	class="no-print mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
>
	<a
		href="/"
		class="inline-flex items-center gap-1 text-slate-500 underline-offset-2 hover:text-teal-dark hover:underline"
	>
		<ArrowLeft class="h-4 w-4" aria-hidden="true" />
		Accueil
	</a>
	<span class="text-slate-300" aria-hidden="true">|</span>
	<span class="text-slate-500">Mon parcours, côté</span>
	<ul class="flex flex-wrap gap-1.5">
		{#each entries as entry (entry.slug)}
			<li>
				<a
					href="/{entry.slug}?from=home"
					aria-current={entry.slug === current ? 'page' : undefined}
					class="inline-block rounded-full border px-3 py-1 font-medium transition-colors {entry.slug ===
					current
						? 'border-teal-primary bg-teal-primary text-white'
						: 'border-slate-200 bg-white text-slate-700 hover:border-teal-primary hover:text-teal-dark'}"
				>
					{entry.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
