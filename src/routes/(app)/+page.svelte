<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { purchaseTerrain } from '$lib/api/company';
	import BuildingsModal from '$lib/components/BuildingsModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { format, parseDateTime } from '$lib/helper';
	import type { PageData } from './$types';
	export let data: PageData;

	let buildings: Record<number, any> = {};
	let position: number | undefined = undefined;

	$: totalSlots = 5 * Math.ceil((1 + data.user.available_terrains) / 5);

	$: {
		for (let i = 0; i < data.buildings.length; i++) {
			const building = data.buildings[i];
			buildings[building.position] = building;
		}
	}

	async function purchase(position: number) {
		const result = await purchaseTerrain(position);
		if (!result.message) {
			await invalidateAll();
		}
	}

	function getTerrainCost(position: number): number {
		return 1_000_000_00 + 500_000_00 * Math.floor(position / 5) + 100_000_00 * position;
	}
</script>

<div class="container mx-auto px-4 py-12">
	<div class="flex flex-wrap gap-5 p-5 justify-center max-w-3xl mx-auto bg-stone-600">
		{#each { length: totalSlots } as _, i}
			{#if i < data.user.available_terrains}
				{#if buildings[i]}
					<a
						href={`/building/${buildings[i].id}`}
						class:opacity-65={buildings[i].completes_at}
						class:pointer-events-none={buildings[i].completes_at}
					>
						<div class="flex flex-col bg-white items-center justify-center border w-32 h-32">
							<div>{buildings[i].name} ({buildings[i].level})</div>

							{#if buildings[i].completes_at}
								<div class="mt-2 text-sm text-center">
									{parseDateTime(buildings[i].completes_at)}
								</div>
							{/if}
						</div>
					</a>
				{:else}
					<div class="flex flex-col bg-white items-center justify-center border w-32 h-32 p-3">
						<span class="block mb-2">Available</span>
						<Button on:click={() => (position = i)}>Build</Button>
					</div>
				{/if}
			{:else}
				<div class="flex flex-col bg-white items-center justify-center border w-32 h-32 p-3">
					<span class="block mb-2">{format(getTerrainCost(i))}</span>

					<Button on:click={() => purchase(i)}>Purchase</Button>
				</div>
			{/if}
		{/each}
	</div>
</div>

{#if position !== undefined}
	<BuildingsModal {position} company={data.user.id} on:close={() => (position = undefined)} />
{/if}
