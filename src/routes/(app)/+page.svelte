<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let buildings: Record<number, any> = {};
	$: totalSlots = 5 * Math.ceil((1 + data.user.available_slots) / 5);

	$: {
		for (let i = 0; i < data.buildings.length; i++) {
			const building = data.buildings[i];
			buildings[building.position] = building;
		}
	}
</script>

<div class="container mx-auto py-12">
	<div class="flex flex-wrap gap-5 py-5 justify-center max-w-3xl mx-auto bg-stone-800">
		{#each { length: totalSlots } as _, i}
			{#if i < data.user.available_slots}
				{#if buildings[i]}
					<a href={`/building/${buildings[i].id}`}>
						<div class="flex bg-white items-center justify-center border w-32 h-32">
							{buildings[i].name} ({buildings[i].level})
						</div>
					</a>
				{:else}
					<a href={`/terrain/${i}`}>
						<div class="flex bg-white items-center justify-center border w-32 h-32">
							{i + 1}
						</div>
					</a>
				{/if}
			{:else}
				<a href={`/terrain/${i}`}>
					<div class="flex bg-white items-center justify-center border w-32 h-32">
						blocked {i + 1}
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>
