<script lang="ts">
	import BuildingRequirement from './BuildingRequirement.svelte';
	import { costs, inventory, stocks } from '$lib/stores/inventory';
	import Currency from './Currency.svelte';
	import { onMount } from 'svelte';

	export let building: Building;

	let totals: Record<number, number> = {};

	onMount(function () {
		if ($inventory === undefined) {
			inventory.load();
		}
	});

	function updateTotals(event: CustomEvent) {
        console.log(event.detail);
		totals[event.detail.resource] = event.detail.total;
	}

	$: marketTotal = Object.values(totals).reduce(
		(total: number, subtotal: number) => total + subtotal,
		0
	);

	$: stockTotal = building.requirements.reduce((total: number, requirement: Requirement) => {
		const stock =
			$stocks[requirement.resource.id] && $stocks[requirement.resource.id][requirement.quality];

		const cost =
			$costs[requirement.resource.id] && $costs[requirement.resource.id][requirement.quality];

		return total + (stock || 0) * (cost || 0);
	}, 0);
</script>

<table class="w-full table-auto mt-6">
	<thead>
		<tr>
			<th class="text-left">Resource</th>
			<th class="text-right">Stock</th>
			<th class="text-right">Market</th>
		</tr>
	</thead>

	<tbody>
		{#each building.requirements as requirement}
			<BuildingRequirement {requirement} on:update-total={updateTotals} />
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td>Total</td>
			<td class="text-right"><Currency value={stockTotal} /></td>
			<td class="text-right"><Currency value={marketTotal} /></td>
		</tr>
	</tfoot>
</table>
