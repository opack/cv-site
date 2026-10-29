<script lang="ts">
	import { Printer } from 'lucide-svelte'
</script>

<button
	type="button"
	onclick={() => window.print()}
	class="no-print fixed right-4 bottom-4 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-md transition-colors hover:border-teal-primary hover:text-teal-dark md:right-6 md:bottom-6"
>
	<Printer class="h-4 w-4" aria-hidden="true" />
	Imprimer en PDF
</button>
