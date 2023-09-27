<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;
</script>

<div class="container px-4 py-12 mx-auto">
	<h2 class="text-xl uppercase font-semibold tracking-tight mb-4">Staff</h2>

	<table class="table-auto">
		<thead>
			<tr>
				<th class="text-left border p-2">Name</th>
				<th class="text-left border p-2">Skills</th>
				<th class="text-left border p-2">Salary</th>
				<th class="border">&nbsp;</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border p-2">
					<img src="https://picsum.photos/100" class="w-8 h-8 inline-block" alt="John Doe" />
					John Doe
				</td>
				<td class="border p-2">
					<div class="rounded-xl bg-stone-100 h-2 w-32">
						<div class="rounded-xl bg-teal-500 h-2 w-10" />
					</div>
				</td>
				<td class="border p-2">$ 2.000</td>
				<td class="border p-2">
					<Button>
						Train
						<span class="text-xs block">$ 1.000 (10 hr)</span>
					</Button>
				</td>
			</tr>
			<tr>
				<td class="border p-2">
					<img src="https://picsum.photos/100" class="w-8 h-8 inline-block" alt="John Doe" />
					Jane Doe
				</td>
				<td class="border p-2">
					<div class="rounded-xl bg-stone-100 h-2 w-32">
						<div class="rounded-xl bg-teal-500 h-2 w-14" />
					</div>
				</td>
				<td class="border p-2">$ 5.000</td>
				<td class="border p-2">
					<Button>
						Train
						<span class="text-xs block">$ 5.000 (15 hr)</span>
					</Button>
				</td>
			</tr>
			<tr>
				<td class="border p-2">
					<img src="https://picsum.photos/100" class="w-8 h-8 inline-block" alt="John Doe" />
					James Doe
				</td>
				<td class="border p-2">
					<div class="rounded-xl bg-stone-100 h-2 w-32">
						<div class="rounded-xl bg-teal-500 h-2 w-20" />
					</div>
				</td>
				<td class="border p-2">$ 10.000</td>
				<td class="border p-2">
					<Button>
						Train
						<span class="text-xs block">$ 10.000 (20 hr)</span>
					</Button>
				</td>
			</tr>
			<tr>
				<td class="border p-2">
					<img src="https://picsum.photos/100" class="w-8 h-8 inline-block" alt="John Doe" />
					Jack Doe
				</td>
				<td class="border p-2">
					<div class="rounded-xl bg-stone-100 h-2 w-32">
						<div class="rounded-xl bg-teal-500 h-2 w-24" />
					</div>
				</td>
				<td class="border p-2">$ 15.000</td>
				<td class="border p-2">
					<Button>
						Train
						<span class="text-xs block">$ 15.000 (24 hr)</span>
					</Button>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="space-y-10 mt-12">
		{#each data.categories as category}
			<div>
				<h2 class="text-xl uppercase font-semibold tracking-tight mb-4">{category.name}</h2>

				<div class="flex column gap-4">
					{#each category.resources as resource}
						<div>
							<img src={resource.image} alt={resource.name} class="w-32 h-32 mb-2" />
							<span class="uppercase font-semibold">{resource.name}</span>

							<div class="rounded-xl bg-stone-100 h-2 w-32 mb-4">
								<div class="rounded-xl bg-teal-500 h-2 w-20" />
							</div>

							<div>
								<p>Investment: $ 132.050</p>
								<p class="mb-4">Duration: 24 hr</p>

								<Button>Research</Button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
