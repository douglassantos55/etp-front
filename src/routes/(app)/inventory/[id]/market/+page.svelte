<script lang="ts">
	import OrderItem from '$lib/components/OrderItem.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	let qty = '0';
	let price = '0';
</script>

<form>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 items-end max-w-xl">
		<div class="shrink-0">
			<label for="qty">Qty</label>
			<Input id="qty" name="qty" type="number" bind:value={qty} />
		</div>

		<div>
			<label for="price">Price/unit</label>
			<Input id="price" name="price" bind:value={price} />
		</div>

		<Button type="submit">Place order</Button>
	</div>
</form>

<table class="w-full border-collapse">
	<thead>
		<th>&nbsp;</th>
		<th class="px-4 text-right">Qty</th>
		<th class="px-4 text-right">Price</th>
		<th class="px-4 text-right">Subtotal</th>
	</thead>

	<tbody>
		{#each data.orders as order}
			<OrderItem {order} current={data.user.id} />
		{/each}
	</tbody>
</table>
