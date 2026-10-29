<script lang="ts">
	import HomePage from '$lib/components/HomePage.svelte'
	import type { PageData } from './$types'

	type Props = { data: PageData }
	let { data }: Props = $props()
</script>

<HomePage {data} />
