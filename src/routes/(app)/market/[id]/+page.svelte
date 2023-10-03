<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { round } from '$lib/helper';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { user } from '$lib/stores/user';
	import OrdersTable from '$lib/components/OrdersTable.svelte';

	export let data: PageData;

	let total: number = 0;
	let _qty = $page.url.searchParams.get('qty') || '0';
	let quality = $page.url.searchParams.get('quality') || '0';

	function repurchase(purchase: Purchase) {
		_qty = purchase.qty.toString();
		quality = purchase.order.quality.toString();
	}

	$: qty = parseInt(_qty);

	$: {
		$page.url.searchParams.set('quality', quality);
		browser && goto($page.url.toString());
	}

	$: {
		total = 0;
		let left = qty;

		for (let i = 0; left > 0 && i < data.orders.length; i++) {
			const order = data.orders[i];

			if (order.qty <= left) {
				total += order.qty * order.price;
				left -= order.qty;
			} else {
				total += left * order.price;
				left -= qty;
			}
		}
	}

	$: totalOrders = data.orders.reduce((total: number, order: OrderItem) => total + order.qty, 0);
	$: sourcingCost = (qty && qty > 0 && round(total / qty)) || 0;

	$: error =
		qty > totalOrders ? 'Too much my dude' : total > $user.available_cash ? 'Not enough cash' : '';
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="flex gap-4 items-center">
		<img src={data.resource.image} alt={data.resource.name} class="w-16 h-16" />
		<h1 class="uppercase tracking-tight font-bold text-xl">{data.resource.name}</h1>

		<a href="/market" class="ml-auto">&larr; Back</a>
	</div>

	<div class="mb-10">
		<form class="space-y-4">
			<input type="hidden" name="resourceId" value={$page.params.id} />

			<div class="flex items-start gap-4">
				<div>
					<label for="qty">Qty</label>
					<Input id="qty" name="qty" type="number" bind:value={_qty} />
					<span class="text-red-600">{error}</span>
				</div>

				<div>
					<label for="quality">Quality</label>
					<select
						id="quality"
						name="quality"
						bind:value={quality}
						class="w-full py-2 px-3 rounded-md bg-white border"
					>
						{#each { length: 21 } as _, i}
							<option value={i.toString()}>{i}</option>
						{/each}
					</select>
				</div>

				<div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="block">&nbsp;</label>
					<Button type="submit" disabled={!qty || error}>Purchase</Button>
				</div>
			</div>

			<div>
				<p><strong>Total:</strong> {total}</p>
				<p><strong>Sourcing cost:</strong> {sourcingCost}</p>
			</div>
		</form>
	</div>

	{#if data.recent.length > 0}
		<h2 class="uppercase font-semibold tracking-tight">Recent purchases</h2>

		<div class="overflow-x-auto mb-10">
			<table class="w-full border-collapse mt-4">
				<thead>
					<th class="pe-4 py-2 text-left">Quality</th>
					<th class="px-4 py-2 text-right">Qty</th>
					<th class="px-4 py-2 text-right">Price</th>
					<th class="px-4 py-2 text-right">Subtotal</th>
					<th>&nbsp;</th>
				</thead>

				<tbody>
					{#each data.recent as purchase}
						<tr>
							<td class="py-2 border-y pe-4">{purchase.order.quality}</td>
							<td class="py-2 border-y px-4 text-right">{purchase.qty}</td>
							<td class="py-2 border-y px-4 text-right">{purchase.order.price}</td>
							<td class="py-2 border-y px-4 text-right">{purchase.order.price * purchase.qty}</td>
							<td class="py-2 border-y px-4 w-48 text-right">
								<Button type="button" on:click={() => repurchase(purchase)}>Repurchase</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if data.orders.length > 0}
		<h2 class="uppercase font-semibold tracking-tight">Market orders</h2>

		<div class="overflow-x-auto">
			<OrdersTable orders={data.orders} current={data.user.id} />
		</div>
	{:else}
		<p>No orders for this resource</p>
	{/if}
</div>
