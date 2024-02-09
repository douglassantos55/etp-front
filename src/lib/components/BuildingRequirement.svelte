<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ResourcePrice from './ResourcePrice.svelte';
	import { costs, stocks } from '$lib/stores/inventory';
	import { format } from '$lib/helper';

	export let requirement: Requirement;

	const dispatch = createEventDispatcher();

	$: resourceCosts = $costs[requirement.resource.id];
	$: sourcingCost = (resourceCosts && resourceCosts[requirement.quality]) || 0;

	$: qualitiesStocks = $stocks[requirement.resource.id];
	$: stock = (qualitiesStocks && qualitiesStocks[requirement.quality]) || 0;

	$: missing = requirement.quantity - stock;

	function updateTotal(event: CustomEvent) {
		dispatch('update-total', {
			resource: requirement.resource.id,
			total: missing * event.detail.price
		});
	}
</script>

<tr>
	<td>
		<img
			src={requirement.resource.image}
			class="w-8 h-8 inline-block"
			alt={requirement.resource.name}
		/>
		x{requirement.quantity} @Q{requirement.quality}
	</td>

	<td class="text-right">
		{stock}
		<span class="block text-teal-500">{format(sourcingCost)}</span>
	</td>

	<td class="text-right">
		{missing}
		<span class="block text-teal-500">
			<ResourcePrice
				on:update={updateTotal}
				resourceId={requirement.resource.id}
				quality={requirement.quality}
			/>
		</span>
	</td>
</tr>
