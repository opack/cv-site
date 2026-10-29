<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte'
	import Header from '$lib/components/Header.svelte'
	import PrintButton from '$lib/components/PrintButton.svelte'
	import SectionTitle from '$lib/components/SectionTitle.svelte'
	import VariantSwitcher from '$lib/components/VariantSwitcher.svelte'
	import type { CvVariant, ExperienceFrontmatter, HobbyIcon, Meta } from '$lib/types'
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { Dices, ExternalLink, Gamepad2, Guitar, Lightbulb, Piano } from 'lucide-svelte'
	import { onMount, type Component, type ComponentType } from 'svelte'

	type Props = {
		data: {
			experiences: { frontmatter: ExperienceFrontmatter; component: Component; slug: string }[]
			profile: { component: Component }
			meta: Meta
			variant: CvVariant
			slug: string
			switchEntries: { slug: string; label: string }[]
		}
	}
	let { data }: Props = $props()

	const Profile = $derived(data.profile.component)

	/**
	 * Le sélecteur d'angle n'apparaît que si l'on arrive depuis l'accueil
	 * (`?from=home`) : un visiteur tombé directement sur une variante ne doit pas
	 * y voir les autres. Lu après le montage, car les pages sont prérendues sans
	 * query string.
	 */
	let mounted = $state(false)
	onMount(() => {
		mounted = true
	})
	const fromHome = $derived(mounted && page.url.searchParams.get('from') === 'home')

	/**
	 * Version détaillée, activée par `?details` : chaque point d'expérience
	 * déploie les précisions rédigées sous lui dans le markdown. Le paramètre est
	 * lu côté client uniquement — les pages sont prérendues sans query string.
	 */
	const showDetails = $derived(browser && page.url.searchParams.has('details'))

	const hobbyIcons: Record<HobbyIcon, ComponentType> = {
		boardgame: Dices,
		videogame: Gamepad2,
		piano: Piano,
		guitar: Guitar,
		prototyping: Lightbulb
	}
</script>

<svelte:head>
	<title>{data.meta.identity.firstName} {data.meta.identity.lastName} - {data.variant.title}</title>
	<meta name="description" content={data.variant.description} />
	<meta
		property="og:title"
		content="{data.meta.identity.firstName} {data.meta.identity.lastName} - {data.variant.title}"
	/>
	<meta property="og:description" content={data.variant.ogDescription} />
	<link rel="canonical" href={data.variant.url} />
	{#if !data.variant.indexable}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>

<PrintButton />

<main
	class={[
		'mx-auto max-w-215 px-4 py-8 md:px-6 md:py-10 print:px-0 print:py-0',
		fromHome && 'pt-3 md:pt-3 print:pt-0'
	]}
	class:cv-details={showDetails}
>
	{#if fromHome}
		<VariantSwitcher current={data.slug} entries={data.switchEntries} />
	{/if}

	<Header identity={data.meta.identity} />

	{#if showDetails}
		<p class="mt-3 text-center text-xs tracking-wide text-slate-400 uppercase">Version détaillée</p>
	{/if}

	<section
		class="print-avoid-break mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7"
	>
		<SectionTitle title="Profil" />
		<div class="prose-cv text-sm leading-relaxed text-slate-700 md:text-[15px]">
			<Profile />
		</div>
	</section>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<SectionTitle title="Compétences clés" />
			<ul class="space-y-3">
				{#each data.meta.competences as comp (comp.label)}
					<li>
						<span class="block text-sm font-semibold text-slate-900">{comp.label}</span>
						<div class="print-chips mt-1 flex flex-wrap gap-1.5">
							{#each comp.items as item (item)}
								<span class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{item}</span>
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<SectionTitle title="Stack" />
			<ul class="space-y-3">
				{#each data.meta.stack as group (group.label)}
					<li>
						<span class="block text-sm font-semibold text-slate-900">{group.label}</span>
						<div class="print-chips mt-1 flex flex-wrap gap-1.5">
							{#each group.items as item (item)}
								<span class="rounded bg-teal-soft px-2 py-0.5 text-xs text-teal-dark">{item}</span>
							{/each}
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>

	<section class="mt-10">
		<SectionTitle title="Expériences professionnelles" />
		<div class="space-y-5">
			{#each data.experiences as exp (exp.slug)}
				<ExperienceCard frontmatter={exp.frontmatter} body={exp.component} />
			{/each}
		</div>
	</section>

	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<SectionTitle title="Formations récentes" />
			<ul class="space-y-2.5 text-sm text-slate-700">
				{#each data.meta.formations as f (`${f.year}-${f.title}`)}
					<li class="flex gap-3">
						<span class="w-12 shrink-0 font-semibold text-teal-dark">{f.year}</span>
						<span>
							<span class="font-medium text-slate-900">{f.title}</span>
							{#if f.provider}
								<span class="text-slate-600"> · {f.provider}</span>
							{/if}
							{#if f.note}
								<span class="block text-xs text-slate-500">{f.note}</span>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
			<p class="mt-3 text-xs text-slate-500">
				* Autoformation structurée : cours, documentation, mise en application sur projet concret.
			</p>
		</section>

		<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<SectionTitle title="Diplômes" />
			<ul class="space-y-2.5 text-sm text-slate-700">
				{#each data.meta.diplomas as d (`${d.year}-${d.title}`)}
					<li class="flex gap-3">
						<span class="w-12 shrink-0 font-semibold text-teal-dark">{d.year}</span>
						<span>
							<span class="font-medium text-slate-900">{d.title}</span>
							{#if d.school}
								<span class="block text-xs text-slate-600">{d.school}</span>
							{/if}
							{#if d.note}
								<span class="block text-xs text-slate-500">{d.note}</span>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</section>
	</div>

	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
			<SectionTitle title="Langues" />
			<ul class="space-y-2.5 text-sm text-slate-700">
				{#each data.meta.langues as l (l.label)}
					<li class="flex gap-3">
						<span class="w-14 shrink-0 font-semibold text-teal-dark">{l.label}</span>
						<span class="text-slate-600">{l.level}</span>
					</li>
				{/each}
			</ul>
		</section>

		{#if data.meta.hobbies && data.meta.hobbies.length > 0}
			<section class="print-avoid-break rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<SectionTitle title="Temps libre" />
				<ul class="grid grid-cols-3 gap-3 sm:grid-cols-5">
					{#each data.meta.hobbies as hobby (hobby.icon)}
						{@const Icon = hobbyIcons[hobby.icon]}
						<li class="flex flex-col items-center gap-1.5 text-center">
							<span
								class="flex h-11 w-11 items-center justify-center rounded-full bg-teal-soft text-teal-dark"
							>
								<Icon class="h-5 w-5" aria-hidden="true" />
							</span>
							<span class="text-xs leading-tight font-medium text-slate-700">{hobby.label}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>

	<p
		class="print-only mt-6 flex items-center justify-center gap-1 text-[9pt] text-slate-500 italic"
	>
		<span>Document généré depuis la version en ligne</span>
		<a
			href={data.variant.url}
			target="_blank"
			rel="noopener"
			class="inline-flex items-center gap-0.5"
		>
			{data.variant.url.replace('https://', '')}
			<ExternalLink class="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
		</a>
	</p>

	<footer class="no-print mt-12 text-center text-xs text-slate-400">
		<p>Site construit en SvelteKit 2 · Svelte 5 · Tailwind CSS 4</p>
	</footer>
</main>
