<script lang="ts">
	import { inventory } from '$lib/stores/inventory';
	import Input from '$lib/components/Input.svelte';
	import Button from './Button.svelte';
	import { format } from '$lib/helper';

	export let building: Building;
	export let resource: BuildingResource;

	let qty: number;

	function maxQty() {}

	$: inputId = `qty-${resource.resource.id}`;
	$: qualityId = `quality-${resource.resource.id}`;

	$: duration = qty / resource.qty_per_hour;

	$: labor_cost = building.wages_per_hour * duration;

	$: sourcing_cost =
		qty *
		resource.resource.requirements.reduce(
			(total: number, req: Requirement) =>
				total + req.quantity * inventory.getSourcingCost(req.resource.id),
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

<div class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full">
	<div>
		<div class="flex gap-4">
			<img src={resource.resource.image} alt={resource.resource.name} class="w-20 h-20" />

			<div>
				<p class="uppercase font-semibold mb-2">{resource.resource.name}</p>

				<p>Production/h: {resource.qty_per_hour}</p>
				<p>Wages/h: {building.wages_per_hour}</p>
			</div>
		</div>

		<div class="mt-6">
			<p class="uppercase font-semibold mb-2">Requirements</p>

			<div class="flex items-center gap-4">
				{#each resource.resource.requirements as requirement}
					<div class="flex items-center gap-2">
						{requirement.quantity * (qty || 1)}x
						<img
							src={requirement.resource.image}
							alt={requirement.resource.name}
							class="w-10 h-10"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div>
		<div class="flex gap-4 mb-3">
			<div>
				<label for={qualityId} class="uppercase font-semibold">Quality</label>

				<select id={qualityId} name="quality" class="w-full py-2 px-3 rounded-md bg-white border">
					{#each { length: resource.max_quality + 1 } as _, i}
						<option value={i.toString()}>{i}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for={inputId} class="uppercase font-semibold">Quantity</label>

				<Input min="0" id={inputId} type="number" bind:value={qty} />
			</div>
		</div>

		<div class="grid grid-cols-2 gap-3">
			<Button variant="hollow" on:click={() => (qty = Math.floor(resource.qty_per_hour * 24))}
				>24h</Button
			>

			<Button variant="hollow" on:click={maxQty}>Max</Button>
		</div>

		<div class="grid mt-3">
			<Button disabled={!qty || qty == 0}>Produce</Button>
		</div>

		{#if qty && qty > 0}
			<hr class="my-3" />
			<p>Finishes: {finishes.toLocaleDateString()}</p>
			<p>Labor cost: {format(labor_cost)}</p>
			<p>Sourcing cost: {format(sourcing_cost)}</p>
			<p>Total cost: {format(total_cost)}</p>
			<p>Cost per unit: {format(cost_per_unit)}</p>
			<hr class="my-3" />
		{/if}
	</div>
</div>
