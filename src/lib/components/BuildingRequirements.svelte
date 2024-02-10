<script lang="ts">
	import Button from './Button.svelte';
	import BuildingRequirement from './BuildingRequirement.svelte';
	import { inventory, stocks } from '$lib/stores/inventory';
	import Currency from './Currency.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { savePurchase } from '$lib/api/market';

	export let building: Building;

	let loading = false;
	let missing: Record<number, number> = {};
	let totals: Record<number, number> = {};

	onMount(function () {
		if ($inventory === undefined) {
			inventory.load();
		}
	});

	async function purchaseMissing() {
		try {
			loading = true;

			const requests = building.requirements
				.filter((req: Requirement) => missing[req.resource.id] > 0)
				.map((req: Requirement) =>
					savePurchase({
						quality: req.quality,
						resource_id: req.resource.id,
						quantity: missing[req.resource.id]
					})
				);

			for (const result of await Promise.all(requests)) {
				if (!result.errors && !result.message && result.data) {
					inventory.add(result.data);
				}
			}
		} finally {
			loading = false;
		}
	}

	function updateTotals(event: CustomEvent) {
		totals[event.detail.resource] = event.detail.total;
	}

	$: marketTotal = Object.values(totals).reduce(
		(total: number, subtotal: number) => total + subtotal,
		0
	);

	$: building.requirements.forEach((req: Requirement) => {
		const inStock = $stocks[req.resource.id] && $stocks[req.resource.id][req.quality];
		missing[req.resource.id] = req.quantity - (inStock || 0);
	});

	$: totalMissing = Object.values(missing).reduce((total: number, qty: number) => {
		return total + qty;
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

	<tfoot class="border-y">
		<tr>
			<td colspan="4" class="text-right py-1 font-bold">
				<Currency value={marketTotal} />
			</td>
		</tr>
	</tfoot>
</table>

<div class="flex align-center justify-end gap-4 mt-4">
	<slot missing={totalMissing} />

	{#if totalMissing > 0}
		<div class="text-right">
			<Button
				variant="hollow"
				on:click={purchaseMissing}
				disabled={loading || marketTotal > $user.available_cash}
			>
				Buy missing
			</Button>
		</div>
	{/if}
</div>
