<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="flex gap-10">
		<div class="space-y-10 w-1/3">
			{#each data.categories as category}
				<div>
					<h2 class="uppercase tracking-tight font-semibold mb-4">{category.name}</h2>

					<div class="flex gap-4">
						{#each category.resources as resource}
							<a href={`/market/${resource.id}`}>
								<img src={resource.image} alt={resource.name} class="w-16 h-16" />
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="w-2/3">
			<slot />
		</div>
	</div>
</div>
