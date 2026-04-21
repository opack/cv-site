<script lang="ts">
	import { Mail, Phone, Link as LinkIcon } from 'lucide-svelte';
	import type { Meta } from '$lib/types';

	type Props = { identity: Meta['identity'] };
	let { identity }: Props = $props();

	const fullName = $derived(`${identity.firstName} ${identity.lastName}`);
</script>

<header class="relative overflow-hidden rounded-2xl bg-teal-primary text-white shadow-sm">
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div class="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/40 blur-3xl"></div>
		<div class="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/20 blur-3xl"></div>
	</div>

	<div class="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-10 md:p-10">
		<div
			class="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-white/60 bg-white/10 text-center shadow-inner backdrop-blur-sm md:h-32 md:w-32"
		>
			<div class="text-xl leading-tight font-semibold tracking-tight md:text-2xl">{identity.firstName}</div>
			<div class="text-xl leading-tight font-semibold tracking-tight md:text-2xl">{identity.lastName}</div>
		</div>

		<div class="min-w-0 flex-1">
			<h1 class="text-2xl leading-tight font-semibold md:text-3xl">
				{identity.title}
				{#if identity.tagline}
					<span class="block text-lg font-normal text-white/85 md:text-xl">— {identity.tagline}</span>
				{/if}
			</h1>

			<dl class="mt-5 grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
				<div class="flex items-center gap-2">
					<Mail class="h-4 w-4 opacity-80" aria-hidden="true" />
					<a class="underline-offset-2 hover:underline" href={`mailto:${identity.email}`} data-print-url>{identity.email}</a>
				</div>
				<div class="flex items-center gap-2">
					<Phone class="h-4 w-4 opacity-80" aria-hidden="true" />
					<a class="underline-offset-2 hover:underline" href={`tel:${identity.phone.replace(/\s+/g, '')}`}>{identity.phone}</a>
				</div>
				{#each identity.links as link (link.url)}
					<div class="flex items-center gap-2">
						<LinkIcon class="h-4 w-4 opacity-80" aria-hidden="true" />
						<a class="underline-offset-2 hover:underline" href={link.url} rel="noopener" target="_blank" data-print-url>{link.label}</a>
					</div>
				{/each}
			</dl>

			{#if identity.location}
				<p class="mt-4 text-sm text-white/85">{identity.location}</p>
			{/if}
		</div>
	</div>

	<p class="sr-only">{fullName}</p>
</header>

<style>
	:global(.bg-teal-primary) {
		background: linear-gradient(135deg, var(--color-teal-dark) 0%, var(--color-teal-primary) 100%);
	}
</style>
