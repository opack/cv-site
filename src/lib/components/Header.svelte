<script lang="ts">
	import type { Meta } from '$lib/types';
	import { Link as LinkIcon, Mail, Phone } from 'lucide-svelte';

	type Props = { identity: Meta['identity'] };
	let { identity }: Props = $props();

	const fullName = $derived(`${identity.firstName} ${identity.lastName}`);

	type Brand = 'linkedin' | 'github' | 'generic';
	function brandFor(url: string): Brand {
		try {
			const host = new URL(url).hostname;
			if (host.includes('linkedin.com')) return 'linkedin';
			if (host.includes('github.com')) return 'github';
		} catch {
			/* URL malformée — le schéma Zod l'empêche en théorie */
		}
		return 'generic';
	}
</script>

<header class="relative overflow-hidden rounded-2xl bg-teal-primary text-white shadow-sm">
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div class="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/40 blur-3xl"></div>
		<div class="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/20 blur-3xl"></div>
	</div>

	<div class="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-8 md:px-8 md:py-10">
		<div
			class="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-white/60 bg-white/10 text-center shadow-inner backdrop-blur-sm md:h-32 md:w-32"
		>
			<div class="text-xl leading-none font-semibold tracking-tight md:text-2xl">{identity.firstName}</div>
			<div class="text-xl leading-none font-semibold tracking-tight md:text-2xl">{identity.lastName}</div>
		</div>

		<div class="min-w-0 flex-1">
			<h1 class="text-2xl leading-tight font-semibold md:text-3xl">
				{identity.title}
				{#if identity.tagline}
					<span class="block text-lg font-normal text-white/85 md:text-xl">{identity.tagline}</span>
				{/if}
			</h1>

			<div class="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center">
				<span class="flex items-center gap-2">
					<Mail class="h-4 w-4 opacity-80" aria-hidden="true" />
					<a class="underline-offset-2 hover:underline" href={`mailto:${identity.email}`}>{identity.email}</a>
				</span>
				<span class="flex items-center gap-2">
					<Phone class="h-4 w-4 opacity-80" aria-hidden="true" />
					<a class="underline-offset-2 hover:underline" href={`tel:${identity.phone.replace(/\s+/g, '')}`}>{identity.phone}</a>
				</span>
				{#each identity.links as link (link.url)}
					{@const brand = brandFor(link.url)}
					<a
						class="inline-flex items-center gap-2 opacity-90 underline-offset-2 hover:underline hover:opacity-100"
						href={link.url}
						rel="noopener"
						target="_blank"
						aria-label={`${link.label} — ${link.handle ?? link.label}`}
						title={link.label}
					>
						{#if brand === 'linkedin'}
							<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						{:else if brand === 'github'}
							<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						{:else}
							<LinkIcon class="h-4 w-4 opacity-80" aria-hidden="true" />
						{/if}
						<span>{link.handle ?? link.label}</span>
					</a>
				{/each}
			</div>

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
