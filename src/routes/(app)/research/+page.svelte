<script lang="ts">
	import type { PageData } from './$types';
	import Staff from '$lib/components/Staff.svelte';
	import Button from '$lib/components/Button.svelte';
	import ResearchResource from '$lib/components/ResearchResource.svelte';
	import { findExperienced, findGraduate } from '$lib/api/research';
	import notification from '$lib/stores/notification';
	import { invalidateAll } from '$app/navigation';
	import StaffSearch from '$lib/components/StaffSearch.svelte';

	export let data: PageData;

	async function searchGraduate() {
		const result = await findGraduate();
		if (result.message) {
			notification.add(result.message, 'error');
		} else {
			await invalidateAll();
		}
	}

	async function searchExperienced() {
		const result = await findExperienced();
		if (result.message) {
			notification.add(result.message, 'error');
		} else {
			await invalidateAll();
		}
	}
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="flex items-center mb-4">
		<h2 class="text-xl uppercase font-semibold tracking-tight">Staff ({data.staff.length}/10)</h2>
		<div class="flex items-center ml-auto gap-4">
			<Button on:click={searchGraduate}>Search for graduate</Button>
			<Button on:click={searchExperienced}>Search for experienced</Button>
		</div>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if data.staff.length > 0 || data.searches.length > 0}
			{#each data.staff as staff}
				<Staff {staff} />
			{/each}

			{#each data.searches as search}
				<StaffSearch {search} />
			{/each}
		{:else}
			<p>No staff hired yet.</p>
		{/if}
	</div>

	<div class="mt-12 space-y-10">
		{#each data.categories as category}
			<div>
				<h2 class="text-xl uppercase font-semibold tracking-tight mb-4">{category.name}</h2>

				<div
					class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
				>
					{#if category.resources}
						{#each category.resources as resource}
							<ResearchResource {resource} />
						{/each}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
