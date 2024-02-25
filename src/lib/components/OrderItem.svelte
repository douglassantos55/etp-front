<script lang="ts">
	import { format } from '$lib/helper';
	import QualityTag from './QualityTag.svelte';

	export let order: Order;
	export let current: number;
</script>

<tr class:bg-indigo-100={current == order.company.id}>
	<td class="border-y pr-3">
		<div class="flex items-center">
			<div class="relative w-12 h-12 mr-3">
				<img src={order.company.logo} alt={order.company.name} />
				<QualityTag size="xs" quality={order.quality} />
			</div>
			<span class="hidden sm:inline-block">{order.company.name}</span>
		</div>
	</td>
	<td class="px-3 py-2 border-y text-right">{order.quantity}</td>
	<td class="px-3 py-2 border-y text-right">{format(order.price)}</td>
	<td class="px-3 py-2 border-y text-right">{format(order.price * order.quantity)}</td>
	<slot />
</tr>
