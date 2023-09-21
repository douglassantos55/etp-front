<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container mx-auto px-4">
	<div class="flex flex-wrap items-center gap-10 py-12">
		<div class="flex flex-wrap gap-5">
			<img src={data.item.resource.image} alt={data.item.resource.name} class="w-30" />

			<div class="">
				<h2 class="text-xl font-bold tracking-tight uppercase mb-1">{data.item.resource.name}</h2>

				<p class="text-lg">{data.item.qty} units</p>
				<p>Sourcing cost: {data.item.sourcing_cost}</p>
			</div>
		</div>

		<div class="flex w-full sm:w-fit sm:gap-4 justify-between">
			<Button href={`/inventory/${data.item.resource.id}/market`}>Sell on Market</Button>
			<Button href={`/inventory/${data.item.resource.id}/contract`}>Send contract</Button>
		</div>
	</div>

	<slot />
</div>
