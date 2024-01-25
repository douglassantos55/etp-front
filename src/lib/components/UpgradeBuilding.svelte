<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CloseIcon from '$lib/components/CloseIcon.svelte';
	import { format } from '$lib/helper';
	import BuildingRequirement from './BuildingRequirement.svelte';

	export let building: Building;
	export let inventory: Inventory;

	let totals: Record<number, number> = {};
	const dispatch = createEventDispatcher();

	function handleKeyup(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			dispatch('close');
		}
	}

	function updateTotals(event: CustomEvent) {
		totals[event.detail.resourceId] = event.detail.total;
	}

	function getStock(resourceId: number): number {
		const item = inventory.items.find((item: InventoryItem) => item.resource.id == resourceId);
		if (item === undefined) {
			return 0;
		}
		return item.quantity;
	}

	$: marketTotal = Object.values(totals).reduce(
		(total: number, subtotal: number) => total + subtotal,
		0
    ) / 100;

	$: stockTotal = building.requirements.reduce((total: number, requirement: Requirement) => {
		return total + getStock(requirement.resource.id);
	}, 0);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	role="dialog"
	on:keyup={handleKeyup}
	on:click|self={() => dispatch('close')}
	class="fixed top-0 left-0 w-screen h-screen py-8 flex items-start justify-center bg-black/70 z-50 max-h-full overflow-y-auto"
>
	<div class="w-11/12 bg-white p-8 relative max-w-lg">
		<button on:click={() => dispatch('close')} class="absolute right-3 top-3"><CloseIcon /></button>

		<h3 class="uppercase text-xl font-bold">Upgrade building</h3>
		<p class="mt-2">Production increase: 100%</p>
		<p>Downtime: 24h</p>

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
					<BuildingRequirement {requirement} {inventory} on:update-total={updateTotals} />
				{/each}
			</tbody>

			<tfoot>
				<tr>
					<td>Total</td>
					<td class="text-right">{format(stockTotal)}</td>
					<td class="text-right">{format(marketTotal)}</td>
				</tr>
			</tfoot>
		</table>

		<div class="space-x-4 space-y-4 text-center mt-6">
			<Button>Buy missing</Button>
			<Button disabled>Upgrade</Button>
		</div>
	</div>
</div>
