<script lang="ts">
	import { format } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';
	import ResourcePrice from './ResourcePrice.svelte';

	export let inventory: Inventory;
	export let requirement: Requirement;

	const dispatch = createEventDispatcher();

	$: stock = getStock(requirement.resource.id);
	$: missing = requirement.quantity - stock;
	$: sourcingCost = getSourcingCost(requirement.resource.id);

	function updateTotal(event: CustomEvent) {
		dispatch('update-total', {
			resource: requirement.resource.id,
			total: requirement.quantity * event.detail.price
		});
	}

	function getStock(resourceId: number): number {
		const item = inventory.items.find((item: InventoryItem) => item.resource.id == resourceId);
		if (item === undefined) {
			return 0;
		}
		return item.quantity;
	}

	function getSourcingCost(resourceId: number): number {
		const item = inventory.items.find((item: InventoryItem) => item.resource.id == resourceId);
		if (item === undefined) {
			return 0;
		}
		return item.cost / 100;
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

		{#if sourcingCost > 0}
			<span class="block text-teal-500">{format(sourcingCost)}</span>
		{/if}
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
