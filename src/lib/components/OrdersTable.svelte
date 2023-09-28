<script lang="ts">
	import OrderItem from './OrderItem.svelte';

	export let current: number;
	export let orders: Array<Order>;
</script>

<table class="w-full border-collapse">
	<thead>
		<th class="py-2">&nbsp;</th>
		<th class="px-4 py-2 text-right">Qty</th>
		<th class="px-4 py-2 text-right">Price</th>
		<th class="px-4 py-2 text-right">Subtotal</th>
	</thead>

	<tbody>
		{#each orders as order}
			<OrderItem {order} {current} />
		{/each}
	</tbody>
</table>
