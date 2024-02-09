<script lang="ts">
	import BuildingsModal from '$lib/components/BuildingsModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let modalOpen = false;
	let buildings: Record<number, any> = {};

	$: totalSlots = 5 * Math.ceil((1 + data.user.available_terrains) / 5);

	$: {
		for (let i = 0; i < data.buildings.length; i++) {
			const building = data.buildings[i];
			buildings[building.position] = building;
		}
	}
</script>

<div class="container mx-auto px-4 py-12">
	<div class="flex flex-wrap gap-5 p-5 justify-center max-w-3xl mx-auto bg-stone-600">
		{#each { length: totalSlots } as _, i}
			{#if i < data.user.available_terrains}
				{#if buildings[i]}
					<a href={`/building/${buildings[i].id}`}>
						<div class="flex bg-white items-center justify-center border w-32 h-32">
							{buildings[i].name} ({buildings[i].level})
						</div>
					</a>
				{:else}
					<div class="flex flex-col bg-white items-center justify-center border w-32 h-32 p-3">
						<span class="block mb-2">Available {i}</span>
						<Button on:click={() => (modalOpen = true)}>Build</Button>
					</div>
				{/if}
			{:else}
				<div class="flex flex-col bg-white items-center justify-center border w-32 h-32 p-3">
					<span class="block mb-2">$1,530,005.00</span>
					<Button>Purchase</Button>
				</div>
			{/if}
		{/each}
	</div>
</div>

{#if modalOpen}
	<BuildingsModal on:close={() => (modalOpen = false)} />
{/if}
