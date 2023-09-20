<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container mx-auto">
	<div class="flex gap-5 items-center py-12">
		<img src={data.item.resource.image} alt={data.item.resource.name} class="w-30" />

		<div class="">
			<h2 class="text-xl font-bold tracking-tight uppercase mb-1">{data.item.resource.name}</h2>

			<p class="text-lg">{data.item.qty} units</p>
			<p>Sourcing cost: {data.item.sourcing_cost}</p>
		</div>

		<div class="flex gap-5 ml-12">
			<a
				href={`/inventory/${data.item.resource.id}/market`}
				class="bg-indigo-600 text-white rounded-lg px-6 py-2 font-semibold text-lg tracking-tight"
			>
				Sell on Market
			</a>

			<a
				href={`/inventory/${data.item.resource.id}/contract`}
				class="bg-indigo-600 text-white rounded-lg px-6 py-2 font-semibold text-lg tracking-tight"
			>
				Send contract
			</a>
		</div>
	</div>

	<slot />
</div>
