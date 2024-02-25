<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ResourcePrice from './ResourcePrice.svelte';
	import { costs, stocks } from '$lib/stores/inventory';
	import { format } from '$lib/helper';
	import QualityTag from './QualityTag.svelte';

	export let requirement: Requirement;

	let price: number;
	const dispatch = createEventDispatcher();

	$: resourceCosts = $costs[requirement.resource.id];
	$: sourcingCost = (resourceCosts && resourceCosts[requirement.quality]) || 0;

	$: qualitiesStocks = $stocks[requirement.resource.id];
	$: stock = (qualitiesStocks && qualitiesStocks[requirement.quality]) || 0;

	$: missing = requirement.quantity - stock;

	$: dispatch('update-total', {
		resource: requirement.resource.id,
		total: missing * price
	});

	function updatePrice(event: CustomEvent) {
		price = event.detail.price;
	}
</script>

<tr>
	<td>
		<div class="flex items-center gap-2">
			<figure class="relative w-12 h-12 inline-block">
				<img
					class="w-full h-full"
					alt={requirement.resource.name}
					src={requirement.resource.image}
				/>
				<QualityTag size="xs" quality={requirement.quality} />
			</figure>

			<span>x{requirement.quantity}</span>
		</div>
	</td>

	<td class="text-right">
		{stock}
		<span class="block text-teal-500">{format(sourcingCost)}</span>
	</td>

	<td class="text-right">
		{missing}
		<span class="block text-teal-500">
			<ResourcePrice
				on:update={updatePrice}
				resourceId={requirement.resource.id}
				quality={requirement.quality}
			/>
		</span>
	</td>
</tr>
