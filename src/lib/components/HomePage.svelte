<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import SectionTitle from '$lib/components/SectionTitle.svelte'
	import type { Home, Meta } from '$lib/types'
	import { ArrowRight } from 'lucide-svelte'

	type Props = {
		data: {
			home: Omit<Home, 'phases'> & {
				phases: (Home['phases'][number] & { months: number; period: string })[]
			}
			identity: Meta['identity']
		}
	}
	let { data }: Props = $props()

	const { home, identity } = $derived(data)

	/** One shade per phase, from the oldest to the most recent. */
	const shades = ['bg-teal-dark', 'bg-teal-primary', 'bg-teal-light']
</script>

<svelte:head>
	<title>{identity.firstName} {identity.lastName} - {home.title}</title>
	<meta name="description" content={home.description} />
	<meta property="og:title" content="{identity.firstName} {identity.lastName} - {home.title}" />
	<meta property="og:description" content={home.ogDescription} />
	<link rel="canonical" href={home.url} />
</svelte:head>

<main class="mx-auto max-w-215 px-4 py-8 md:px-6 md:py-10">
	<Header {identity} />

	<section class="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
		<div class="space-y-3 text-[15px] leading-relaxed text-slate-700">
			{#each home.thread as paragraph, i (i)}
				<p class={i === 0 ? 'text-base font-medium text-slate-900' : ''}>{paragraph}</p>
			{/each}
		</div>
	</section>

	<section class="mt-10">
		<SectionTitle title="Parcours" />
		<div class="flex h-3 gap-1" aria-hidden="true">
			{#each home.phases as phase, i (phase.label)}
				<div
					class="min-w-6 rounded-full {shades[i % shades.length]}"
					style="flex: {phase.months} 1 0"
				></div>
			{/each}
		</div>
		<ol class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each home.phases as phase, i (phase.label)}
				<li class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
						<span class="h-2.5 w-2.5 rounded-full {shades[i % shades.length]}" aria-hidden="true"
						></span>
						{phase.period}
					</div>
					<h3 class="mt-1.5 text-base font-semibold text-slate-900">{phase.label}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-slate-600">{phase.detail}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="mt-10">
		<SectionTitle title="Voir mon CV côté…" />
		<ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each home.entries as entry (entry.slug)}
				<li class="flex">
					<a
						href="/{entry.slug}?from=home"
						class="group flex w-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-teal-primary"
					>
						<span class="text-lg font-semibold text-teal-dark">{entry.label}</span>
						<span class="mt-1 text-sm text-slate-600">{entry.pitch}</span>
						<div class="prose-cv mt-3 flex-1 text-sm text-slate-700">
							<ul>
								{#each entry.proofs as proof (proof)}
									<li>{proof}</li>
								{/each}
							</ul>
						</div>
						<span
							class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-dark group-hover:underline"
						>
							Voir ce CV
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<footer class="mt-12 text-center text-xs text-slate-400">
		<p>Site construit en SvelteKit 2 · Svelte 5 · Tailwind CSS 4</p>
	</footer>
</main>
