<script lang="ts">
	import OrderItem from '$lib/components/OrderItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex gap-5 items-center">
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
</div>
