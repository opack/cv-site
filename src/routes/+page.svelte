<script lang="ts">
	import CvPage from '$lib/components/CvPage.svelte'
	import type { PageData } from './$types'

	type Props = { data: PageData }
	let { data }: Props = $props()
</script>

<CvPage {data} />
