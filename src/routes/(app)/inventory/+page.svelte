<script lang="ts">
	import QualityTag from '$lib/components/QualityTag.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let categories: Record<string, Array<InventoryItem>> = {};

	$: {
		data.items.forEach((item: any) => {
			const category = item.resource.category.name;
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(item);
		});
	}
</script>

<div class="container mx-auto px-4 py-12 space-y-10">
	{#each Object.keys(categories) as name}
		<div>
			<h3 class="font-semibold text-xl uppercase tracking-tight mb-5">{name}</h3>

			<div class="flex flex-wrap gap-x-6 gap-y-10">
				{#each categories[name] as item}
					<a href={`/inventory/${item.resource.id}?quality=${item.quality}`}>
						<div class="relative w-24 h-24 mb-2">
							<img src={item.resource.image} alt={item.resource.name} class="w-full h-full" />
							<QualityTag quality={item.quality} />
						</div>
						<span class="text-xl font-semibold">{item.quantity}</span>x {item.resource.name}
						<div class="text-sm font-bold">{item.cost}</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
