<script lang="ts">
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import Header from '$lib/components/Header.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import type { HobbyIcon } from '$lib/types';
	import {
		Dices,
		ExternalLink,
		Gamepad2,
		Guitar,
		Lightbulb,
		Piano
	} from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { PageData } from './$types';


	type Props = { data: PageData };
	let { data }: Props = $props();

	const Profile = $derived(data.profile.component);

	const hobbyIcons: Record<HobbyIcon, ComponentType> = {
		boardgame: Dices,
		videogame: Gamepad2,
		piano: Piano,
		guitar: Guitar,
		prototyping: Lightbulb
	};
</script>

<svelte:head>
	<title>Didier Demange — Tech Lead / Senior Dev Fullstack</title>
</svelte:head>

<main class="mx-auto max-w-215 px-4 py-8 print:px-0 print:py-0 md:px-6 md:py-10">
	<Header identity={data.meta.identity} />

	<section class="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break md:p-7">
		<SectionTitle title="Profil" />
		<div class="prose-cv text-sm leading-relaxed text-slate-700 md:text-[15px]">
			<Profile />
		</div>
	</section>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
			<SectionTitle title="Compétences clés" />
			<ul class="space-y-3">
				{#each data.meta.competences as comp (comp.label)}
					<li class="text-sm text-slate-700">
						<span class="block font-semibold text-slate-900">{comp.label}</span>
						<span class="text-slate-600">{comp.description}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
			<SectionTitle title="Stack" />
			<ul class="space-y-3">
				{#each data.meta.stack as group (group.label)}
					<li>
						<span class="block text-sm font-semibold text-slate-900">{group.label}</span>
						<div class="mt-1 flex flex-wrap gap-1.5">
							{#each group.items as item (item)}
								<span
									class="rounded bg-teal-soft px-2 py-0.5 text-xs text-teal-dark"
									>{item}</span
								>
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
		<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
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

		<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
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
		<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
			<SectionTitle title="Langues" />
			<ul class="space-y-2 text-sm text-slate-700">
				{#each data.meta.langues as l (l.label)}
					<li>
						<span class="font-semibold text-slate-900">{l.label}</span> :
						<span class="text-slate-600">{l.level}</span>
					</li>
				{/each}
			</ul>
		</section>

		{#if data.meta.hobbies && data.meta.hobbies.length > 0}
			<section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print-avoid-break">
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

	<p class="print-only mt-6 flex items-center justify-center gap-1 text-[9pt] text-slate-500 italic">
		<span>Document généré depuis la version en ligne</span>
		<a
			href="https://demange.noatis.fr"
			target="_blank"
			rel="noopener"
			class="inline-flex items-center gap-0.5"
		>
			demange.noatis.fr
			<ExternalLink class="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
		</a>
	</p>

	<footer class="no-print mt-12 text-center text-xs text-slate-400">
		<p>Site construit en SvelteKit 2 · Svelte 5 · Tailwind CSS 4</p>
	</footer>
</main>
