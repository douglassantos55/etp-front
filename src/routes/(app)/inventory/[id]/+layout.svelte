<script lang="ts">
	import type { LayoutData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import OrdersTable from '$lib/components/OrdersTable.svelte';

	export let data: LayoutData;
</script>

<div class="container mx-auto px-4">
	<div class="flex flex-wrap items-center gap-10 py-12">
		<div class="flex flex-wrap gap-5">
			<img src={data.item.resource.image} alt={data.item.resource.name} class="w-24 h-24" />

			<div class="">
				<h2 class="text-xl font-bold tracking-tight uppercase mb-1">{data.item.resource.name}</h2>

				<p class="text-lg">{data.item.qty} units</p>
				<p>Sourcing cost: ${data.item.sourcing_cost}</p>
			</div>
		</div>

		<div class="flex w-full sm:w-fit sm:gap-4 justify-between">
			<Button href={`/inventory/${data.item.resource.id}/market`}>Sell on Market</Button>
			<Button href={`/inventory/${data.item.resource.id}/contract`}>Send contract</Button>
		</div>
	</div>

	<slot />

	<div class="grid lg:grid-cols-2 gap-10">
		<div>
			{#await data.streamed.orders}
				<p>Loading current market orders...</p>
			{:then orders}
				<h2 class="font-semibold uppercase tracking-tight">Market orders</h2>

				<div class="overflow-x-auto">
					<OrdersTable {orders} current={data.user.id} />
				</div>
			{:catch error}
				<p>Could not fetch orders: {error}</p>
			{/await}
		</div>

		<div>
			{#await data.streamed.contracts}
				<p>Loading pending contracts...</p>
			{:then contracts}
				<h2 class="uppercase tracking-tight font-semibold">Pending contracts</h2>

				<div class="overflow-x-auto">
					<OrdersTable orders={contracts} current={data.user.id} />
				</div>
			{:catch error}
				<p>Could not fetch contracts: {error}</p>
			{/await}
		</div>
	</div>
</div>
