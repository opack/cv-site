<script lang="ts">
	import type { Component } from 'svelte';
	import { Link as LinkIcon } from 'lucide-svelte';
	import type { ExperienceFrontmatter } from '$lib/types';

	type Props = {
		frontmatter: ExperienceFrontmatter;
		body: Component;
	};
	let { frontmatter, body: Body }: Props = $props();

	const monthLabels = [
		'janv.',
		'févr.',
		'mars',
		'avril',
		'mai',
		'juin',
		'juil.',
		'août',
		'sept.',
		'oct.',
		'nov.',
		'déc.'
	];

	function formatDate(d: string | null | undefined): string {
		if (!d) return '';
		if (d === 'present') return 'présent';
		const [y, m] = d.split('-');
		const month = monthLabels[Number(m) - 1] ?? '';
		return `${month} ${y}`;
	}

	const dateRange = $derived(
		`${formatDate(frontmatter.dateStart)} — ${formatDate(frontmatter.dateEnd) || 'présent'}`
	);
</script>

<article
	class="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md print-avoid-break md:p-6"
>
	<div class="absolute left-0 top-5 bottom-5 w-1 rounded-r bg-[var(--color-teal-primary)]"></div>

	<header class="mb-3 flex flex-col gap-1 pl-3 md:flex-row md:items-baseline md:justify-between md:gap-4">
		<div class="min-w-0">
			<h3 class="text-base font-semibold text-slate-900 md:text-lg">
				{frontmatter.title}
				<span class="font-normal text-slate-400"> — </span>
				{#if frontmatter.companyUrl}
					<a
						href={frontmatter.companyUrl}
						target="_blank"
						rel="noopener"
						data-print-url
						class="hover:underline"
						style="color: var(--color-teal-dark)"
					>
						{frontmatter.company}
					</a>
				{:else}
					<span style="color: var(--color-teal-dark)">{frontmatter.company}</span>
				{/if}
			</h3>
			{#if frontmatter.subtitle}
				<p class="mt-1 text-sm italic text-slate-600">{frontmatter.subtitle}</p>
			{/if}
		</div>
		<div class="flex shrink-0 flex-col text-xs text-slate-500 md:items-end">
			<span class="font-medium text-slate-700">{dateRange}</span>
			{#if frontmatter.teamSize}
				<span>{frontmatter.teamSize}</span>
			{/if}
		</div>
	</header>

	{#if frontmatter.links && frontmatter.links.length > 0}
		<div class="mb-3 flex flex-wrap gap-2 pl-3">
			{#each frontmatter.links as link (link.url)}
				<a
					href={link.url}
					target="_blank"
					rel="noopener"
					data-print-url
					class="inline-flex items-center gap-1 rounded-full border border-[var(--color-teal-primary)]/40 bg-[var(--color-teal-soft)] px-3 py-0.5 text-xs font-medium text-[var(--color-teal-dark)] hover:bg-[var(--color-teal-primary)]/15"
				>
					<LinkIcon class="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
					{link.label}
				</a>
			{/each}
		</div>
	{/if}

	<div class="prose-cv pl-3 text-sm text-slate-700">
		<Body />
	</div>

	{#if frontmatter.closingNote}
		<p class="mt-3 border-l-2 border-[var(--color-teal-primary)]/60 bg-[var(--color-teal-soft)]/50 px-3 py-2 pl-4 text-sm italic text-slate-700 ml-3">
			{frontmatter.closingNote}
		</p>
	{/if}

	{#if frontmatter.tags && frontmatter.tags.length > 0}
		<div class="mt-3 flex flex-wrap gap-1.5 pl-3">
			{#each frontmatter.tags as tag (tag)}
				<span class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{tag}</span>
			{/each}
		</div>
	{/if}
</article>
