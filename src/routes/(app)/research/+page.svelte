<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { format } from '$lib/helper';

	export let data: PageData;
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="flex items-center mb-4">
		<h2 class="text-xl uppercase font-semibold tracking-tight">Staff (4/10)</h2>
		<div class="ml-auto">
			<Button>Hire staff</Button>
		</div>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<a href={`/research/staff/${1}`} class="px-3 py-4 shadow-lg border border-gray-100">
			<div class="flex items-center gap-3">
				<img src="https://picsum.photos/100" class="w-14 h-14 inline-block" alt="John Doe" />

				<div class="flex flex-col flex-wrap">
					<h3 class="font-semibold">John Doe</h3>
					<p>$ 1,000.00</p>

					<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
						<div class="rounded-xl bg-teal-500 h-2 w-10" />
					</div>
				</div>

				<div class="ml-auto text-right">
					<Button>Train</Button>
				</div>
			</div>

			<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">Was offered $ 10,000.00</p>
		</a>

		<a href={`/research/staff/${5}`} class="px-3 py-4 shadow-lg border border-gray-100">
			<div class="flex items-center gap-3">
				<img src="https://picsum.photos/100" class="w-14 h-14 inline-block" alt="John Doe" />

				<div class="flex flex-col flex-wrap">
					<h3 class="font-semibold">John Doe</h3>
					<p>$ 5,000.00</p>

					<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
						<div class="rounded-xl bg-teal-500 h-2 w-10" />
					</div>
				</div>

				<div class="ml-auto text-right">
					<p class="text-sm leading-snug">Training ends in</p>
					<span class="text-teal-500 leading-snug tracking-tight">20 hrs</span>
				</div>
			</div>

			<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">Requested a raise of 10%</p>
		</a>

		<a href={`/research/staff/${6}`} class="px-3 py-4 shadow-lg border border-gray-100">
			<div class="flex items-center gap-3">
				<img src="https://picsum.photos/100" class="w-14 h-14 inline-block" alt="John Doe" />

				<div class="flex flex-col flex-wrap">
					<h3 class="font-semibold">John Doe</h3>
					<p>$ 5,000.00</p>

					<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
						<div class="rounded-xl bg-teal-500 h-2 w-10" />
					</div>
				</div>

				<div class="ml-auto text-right">
					<p class="text-sm leading-snug">Training ends in</p>
					<span class="text-teal-500 leading-snug tracking-tight">3 mins</span>
				</div>
			</div>
		</a>

		<a href={`/research/staff/${6}`} class="px-3 py-4 shadow-lg border border-gray-100">
			<div class="flex items-center gap-3">
				<img src="https://picsum.photos/100" class="w-14 h-14 inline-block" alt="John Doe" />

				<div class="flex flex-col flex-wrap">
					<h3 class="font-semibold">John Doe</h3>
					<p>$ 5,000.00</p>

					<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
						<div class="rounded-xl bg-teal-500 h-2 w-10" />
					</div>
				</div>

				<div class="ml-auto text-right">
					<p class="text-sm leading-snug">Training ends in</p>
					<span class="text-teal-500 leading-snug tracking-tight">3 secs</span>
				</div>
			</div>
		</a>
	</div>

	<div class="mt-12 space-y-10">
		{#each data.categories as category}
			<div>
				<h2 class="text-xl uppercase font-semibold tracking-tight mb-4">{category.name}</h2>

				<div
					class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
				>
					{#if category.resources}
						{#each category.resources as resource}
							<div>
								<img src={resource.image} alt={resource.name} class="w-32 h-32 mb-2" />
								<span class="uppercase font-semibold">{resource.name}</span>

								<div class="rounded-xl bg-stone-100 h-2 w-32 mt-2 mb-3">
									<div class="rounded-xl bg-teal-500 h-2" style:width="{resource.patents}%" />
								</div>

								<div>
									<p>
										Investment: <span class="tracking-tight">{format(resource.investment)}</span>
									</p>
									<p class="mb-3">
										Duration:
										<span class="text-teal-500 tracking-tight">
											{resource.duration} hrs
										</span>
									</p>

									<Button>Research</Button>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
