<script lang="ts">
	import BuildingResource from '$lib/components/BuildingResource.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: disabled = !!data.building.busy_until || !!data.building.completes_at;
</script>

<div class="grid gap-8 md:grid-cols-2">
	{#each data.building.resources as resource}
		<BuildingResource {resource} {disabled} building={data.building} companyId={data.user.id} />
	{/each}
</div>
