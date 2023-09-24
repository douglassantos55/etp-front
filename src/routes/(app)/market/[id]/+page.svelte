<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { round } from '$lib/helper';
	import { page } from '$app/stores';

	export let data: PageData;

	let _qty: string;
	let total: number = 0;

	$: qty = parseInt(_qty);

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

	$: error = qty > totalOrders ? 'Too much my dude' : '';
</script>

<div class="mb-12">
	<form>
		<input type="hidden" name="resourceId" value={$page.params.id} />

		<table class="table-auto align-bottom">
			<td>
				<label for="qty">Qty</label>
				<Input id="qty" name="qty" type="number" bind:value={_qty} />
				<span class="text-red-600">{error}</span>
			</td>

			<td class="px-8">
				<p><strong>Total:</strong> {total}</p>
				<p><strong>Sourcing cost:</strong> {sourcingCost}</p>
			</td>

			<td>
				<Button type="submit" disabled={!qty || error}>Purchase</Button>
			</td>
		</table>
	</form>
</div>

{#if data.orders.length > 0}
	<table class="w-full border-collapse">
		<thead>
			<th>&nbsp;</th>
			<th class="px-4 text-right">Qty</th>
			<th class="px-4 text-right">Price</th>
			<th class="px-4 text-right">Subtotal</th>
		</thead>

		<tbody>
			{#each data.orders as order}
				<tr>
					<td class="flex items-center">
						<div class="relative inline-block w-12 h-12 mr-4">
							<img src={order.user.company_logo} alt={order.user.company_name} />
							<span class="top-0 right-1 absolute text-white">{order.quality}</span>
						</div>
						{order.user.company_name}
					</td>
					<td class="px-4 text-right">{order.qty}</td>
					<td class="px-4 text-right">{order.price}</td>
					<td class="px-4 text-right">{order.price * order.qty}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<button type="button" on:click={() => data.orders.push(data.orders[0])}>UUUU</button>
{:else}
	<p>No orders for this resource</p>
{/if}
