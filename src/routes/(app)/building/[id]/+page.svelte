<script lang="ts">
	import BuildingResource from '$lib/components/BuildingResource.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid gap-8 md:grid-cols-2">
	{#each data.building.resources as resource}
		<BuildingResource building={data.building} {resource} />
	{/each}
</div>
