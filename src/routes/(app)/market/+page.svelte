<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="space-y-10">
		{#each data.categories as category}
			<div>
				<h2 class="uppercase tracking-tight font-semibold mb-4">{category.name}</h2>

				{#if category.resources}
					<div class="flex flex-wrap gap-4">
						{#each category.resources as resource}
							<a href={`/market/${resource.id}`}>
								<img src={resource.image} alt={resource.name} class="w-24 h-24" />
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
