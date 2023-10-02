<script lang="ts">
	export let order: OrderItem;
	export let current: number;
</script>

<tr class:bg-indigo-100={current == order.user.id}>
	<td class="border-y pr-3">
		<div class="flex items-center">
			<div class="relative w-12 h-12 mr-3">
				<img src={order.user.company_logo} alt={order.user.company_name} />
				<span class="top-0 right-1 absolute text-white">{order.quality}</span>
			</div>
			<span class="hidden sm:inline-block">{order.user.company_name}</span>
		</div>
	</td>
	<td class="px-3 py-2 border-y text-right">{order.qty}</td>
	<td class="px-3 py-2 border-y text-right">${order.price}</td>
	<td class="px-3 py-2 border-y text-right">${order.price * order.qty}</td>
	<slot />
</tr>
