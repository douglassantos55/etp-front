<script lang="ts">
	import Modal from './Modal.svelte';
	import BuildingItem from './BuildingItem.svelte';
	import { construct, getBuilding, getBuildings } from '$lib/api/buildings';
	import Currency from './Currency.svelte';
	import Time from './Time.svelte';
	import BuildingRequirements from './BuildingRequirements.svelte';
	import Button from './Button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	export let company: number;
	export let position: number;

	let building: Promise<Building>;
	const buildings = getBuildings(fetch);
	const dispatch = createEventDispatcher();

	function update(evt: CustomEvent) {
		building = getBuilding(evt.detail.buildingId, fetch);
	}

	async function constructBuilding(id: number) {
		await construct(id, position, company);
		dispatch('close');
		await invalidateAll();
	}
</script>

<Modal on:close>
	{#if !building}
		<h3 class="uppercase text-xl font-bold">Buildings</h3>

		<div class="mt-10">
			{#await buildings}
				<p>Loading...</p>
			{:then buildings}
				<div class="grid grid-cols-3 gap-5">
					{#each buildings as building}
						<BuildingItem {building} on:click={update} />
					{/each}
				</div>
			{/await}
		</div>
	{:else}
		{#await building}
			<p>Loading...</p>
		{:then building}
			<div class="flex gap-4">
				<figure class="w-32 h-32 bg-gray-400">
					<img src="https://picsum.photos/200" alt={building.name} />
				</figure>

				<div>
					<h3 class="mb-2 uppercase text-xl font-bold">{building.name}</h3>
					<p>Administration/h: <Currency value={building.admin_per_hour} /></p>
					<p>Wages/h: <Currency value={building.wages_per_hour} /></p>
					<p>Maintenance/h: <Currency value={building.maintenance_per_hour} /></p>
					<p>Downtime: <Time seconds={building.downtime * 60} /></p>
				</div>
			</div>

			<div class="mt-10">
				<h4 class="font-semibold uppercase">Resources</h4>

				{#each building.resources as resource}
					<div class="flex items-center mt-2 gap-2">
						<img src={resource.resource.image} alt={resource.resource.name} class="w-10 h-10" />
						{resource.qty_per_hour}/h
						{resource.resource.name}
					</div>
				{/each}
			</div>

			<div class="mt-10">
				<h4 class="font-semibold uppercase">Requirements</h4>

				<BuildingRequirements {building} let:missing>
					<Button on:click={() => constructBuilding(building.id)} disabled={missing > 0}>
						Construct
					</Button>
				</BuildingRequirements>
			</div>
		{/await}
	{/if}
</Modal>
