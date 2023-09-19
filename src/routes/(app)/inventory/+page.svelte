<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let categories: Record<string, Array<InventoryItem>> = {};

	$: {
		data.inventory.forEach((item: any) => {
			const category = item.resource.category.name;
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(item);
		});
	}
</script>

<div class="container mx-auto py-12 space-y-10">
	{#each Object.keys(categories) as name}
		<div>
			<h3 class="font-semibold text-xl uppercase tracking-tight mb-5">{name}</h3>

			<div class="flex gap-10">
				{#each categories[name] as item}
					<a href={`/inventory/${item.resource.id}`}>
						<img src={item.resource.image} alt={item.resource.name} class="w-30 mb-2" />
						<span class="text-xl font-semibold">{item.qty}</span>x {item.resource.name}
						<div class="text-sm font-bold">{item.sourcing_cost}</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
