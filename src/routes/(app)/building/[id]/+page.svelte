<script lang="ts">
	import BuildingResource from '$lib/components/BuildingResource.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.building.resources as resource}
	<BuildingResource building={data.building} {resource} />
{/each}
