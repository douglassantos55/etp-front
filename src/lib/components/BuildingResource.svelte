<script lang="ts">
	import { inventory } from '$lib/stores/inventory';

	export let building: Building;
	export let resource: BuildingResource;

	let qty: number;

	$: inputId = `qty-${resource.resource.id}`;
	$: duration = qty / resource.production_hour;

	$: labor_cost = building.wages_hour * duration;

	$: sourcing_cost =
		qty *
		resource.resource.requirements.reduce(
			(total: number, req: Requirement) =>
				total + req.qty * inventory.getSourcingCost(req.resource.id),
			0
		);

	$: total_cost = labor_cost + sourcing_cost;
	$: cost_per_unit = total_cost / qty;

	$: finishes = (function () {
		const date = new Date();
		date.setTime(date.getTime() + duration * 60 * 60 * 1000);
		return date;
	})();
</script>

<div class="flex gap-5 mb-12 items-center w-full">
	<img src={resource.resource.image} alt={resource.resource.name} />

	<div>
		<p class="uppercase font-semibold mb-2">{resource.resource.name}</p>

		<p>Production/h: {resource.production_hour}</p>
		<p>Wages/h: {building.wages_hour}</p>

		{#if qty && qty > 0}
			<hr class="my-3" />
			<p>Finishes: {finishes.toLocaleString()}</p>
			<p>Labor cost: {labor_cost}</p>
			<p>Sourcing cost: {sourcing_cost}</p>
			<p>Total cost: {total_cost} ({cost_per_unit}/unit)</p>
		{/if}
	</div>

	<div>
		<p class="uppercase font-semibold mb-2">Requirements</p>

		<div class="flex items-center gap-4">
			{#each resource.resource.requirements as requirement}
				<div class="flex items-center gap-2">
					{requirement.qty}x
					<img src={requirement.resource.image} alt={requirement.resource.name} class="w-12 h-12" />
				</div>
			{/each}
		</div>
	</div>

	<div class="w-36">
		<label for={inputId} class="uppercase font-semibold">Quantity</label>

		<input
			min="0"
			id={inputId}
			type="number"
			bind:value={qty}
			class="border w-full py-2 px-3 rounded-md mt-2"
		/>

		<div class="flex gap-3 my-3">
			<button
				class="py-2 px-3 w-full border rounded-md"
				on:click={() => (qty = Math.floor(resource.production_hour * 24))}>24h</button
			>
			<button class="py-2 px-3 w-full border rounded-md">Max</button>
		</div>

		<button class="py-2 px-3 w-full text-white bg-indigo-600 disabled:bg-indigo-400 rounded-lg" disabled={!qty || qty == 0}>Produce</button>
	</div>
</div>
