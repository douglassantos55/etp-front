<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ResourcePrice from './ResourcePrice.svelte';
	import ResourceStock from './ResourceStock.svelte';
	import ResourceSourcingCost from './ResourceSourcingCost.svelte';
	import { stocks } from '$lib/stores/inventory';

	export let requirement: Requirement;

	const dispatch = createEventDispatcher();

	$: qualitiesStocks = $stocks[requirement.resource.id];
	$: stock = qualitiesStocks && qualitiesStocks[requirement.quality];
	$: missing = requirement.quantity - (stock || 0);

	function updateTotal(event: CustomEvent) {
		dispatch('update-total', {
			resource: requirement.resource.id,
			total: requirement.quantity * event.detail.price
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
		<ResourceStock resourceId={requirement.resource.id} quality={requirement.quality} />
		<ResourceSourcingCost resourceId={requirement.resource.id} quality={requirement.quality} />
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
