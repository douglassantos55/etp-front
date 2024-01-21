<script lang="ts">
	import BuildingResource from '$lib/components/BuildingResource.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let form: {
		message?: string;
		errors: Record<string, string>;
	};
</script>

<div class="grid gap-8 md:grid-cols-2">
	{#each data.building.resources as resource}
		<BuildingResource
			{form}
			{resource}
			building={data.building}
			companyId={data.user.id}
			inventory={data.inventory}
		/>
	{/each}
</div>
