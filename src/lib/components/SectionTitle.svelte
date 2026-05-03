<script lang="ts">
	type Props = { title: string; subtitle?: string };
	let { title, subtitle }: Props = $props();
</script>

<div class="print-avoid-break mb-4 flex items-baseline gap-3">
	<h2 class="text-xl font-semibold tracking-tight" style="color: var(--color-teal-dark)">
		{title}
	</h2>
	<div class="h-px flex-1 bg-linear-to-r from-teal-primary/40 to-transparent"></div>
	{#if subtitle}
		<span class="text-sm text-slate-500">{subtitle}</span>
	{/if}
</div>
