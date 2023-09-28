<script lang="ts">
	export let order: OrderItem;
	export let current: number;
</script>

<tr class:bg-indigo-100={current == order.user.id}>
	<td class="border-y pe-4">
		<div class="flex items-center">
			<div class="relative inline-block w-12 h-12 mr-4">
				<img src={order.user.company_logo} alt={order.user.company_name} />
				<span class="top-0 right-1 absolute text-white">{order.quality}</span>
			</div>
			{order.user.company_name}
		</div>
	</td>
	<td class="px-4 py-2 border-y text-right">{order.qty}</td>
	<td class="px-4 py-2 border-y text-right">{order.price}</td>
	<td class="px-4 py-2 border-y text-right">{order.price * order.qty}</td>
	<slot />
</tr>
