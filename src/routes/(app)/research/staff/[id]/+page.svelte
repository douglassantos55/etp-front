<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Status, hire } from '$lib/components/Staff.svelte';
	import Time from '$lib/components/Time.svelte';
	import { format } from '$lib/helper';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto py-12 px-4">
	<a href="/research" class="ml-auto">&larr; Back</a>

	<div class="flex items-center gap-4 my-4">
		<img src="https://picsum.photos/100" class="w-16 h-16" alt="John Doe" />

		<div class="flex flex-col flex-wrap">
			<h2 class="font-bold text-lg">{data.staff.name}</h2>
			<p>{format(data.staff.salary)}</p>

			<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
				<div class="rounded-xl bg-teal-500 h-2" style:width="{data.staff.skill}%" />
			</div>
		</div>

		<div class="ml-auto text-right">
			{#if data.staff.status == Status.PENDING}
				<div class="ml-auto text-right">
					<Button on:click={() => hire(data.staff.id)}>Hire</Button>
				</div>
			{:else}
				<div class="ml-auto text-right">
					<Button>Train</Button>
				</div>
			{/if}

			{#if data.staff.training_duration}
				<p class="text-sm leading-snug">Training ends in</p>

				<span class="text-teal-500 leading-snug tracking-tight">
					<Time value={data.staff.training_duration} />
				</span>
			{/if}
		</div>
	</div>

	<div class="flex items-center gap-4">
		<div class="">
			<label for="amount" class="inline-block mb-1">New salary</label>
			<Input id="amount" type="number" />
		</div>

		<div class="flex-shrink-0">
			<p>&nbsp;</p>
			<Button>Give raise</Button>
		</div>
	</div>

	{#if data.staff.offer}
		<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">
			Was offered {format(data.staff.offer)}
		</p>
	{/if}

	{#if data.staff.raise}
		<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">
			Requested a raise of {data.staff.raise}%
		</p>
	{/if}

	<div class="mt-8">
		<h3 class="mb-4 uppercase font-semibold">Recent trainings</h3>

		<div class="inline-grid gap-3">
			{#if $page.params.id == '1'}
				<p>John Doe has not received any training yet.</p>
			{:else}
				<div class="pt-2 pb-3 divide-x inline-flex items-center bg-gray-100">
					<div class="px-4">
						<span class="block text-sm text-gray-500">Start</span>
						15/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">End</span>
						16/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">Result</span>
						<span
							class="px-2 py-1 inline-block rounded-full text-white font-semibold text-xs bg-teal-500"
							>+125</span
						>
					</div>
				</div>

				<div class="pt-2 pb-3 divide-x inline-flex items-center bg-gray-100">
					<div class="px-4">
						<span class="block text-sm text-gray-500">Start</span>
						14/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">End</span>
						15/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">Result</span>
						<span
							class="px-2 py-1 inline-block rounded-full text-white font-semibold text-xs bg-teal-500"
							>+25</span
						>
					</div>
				</div>

				<div class="pt-2 pb-3 divide-x inline-flex items-center bg-gray-100">
					<div class="px-4">
						<span class="block text-sm text-gray-500">Start</span>
						13/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">End</span>
						14/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">Result</span>
						<span
							class="px-2 py-1 inline-block rounded-full text-white font-semibold text-xs bg-teal-500"
							>+15</span
						>
					</div>
				</div>

				<div class="pt-2 pb-3 divide-x inline-flex items-center bg-gray-100">
					<div class="px-4">
						<span class="block text-sm text-gray-500">Start</span>
						12/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">End</span>
						13/10/2023
					</div>

					<div class="px-4">
						<span class="block text-sm text-gray-500">Result</span>
						<span
							class="px-2 py-1 inline-block rounded-full text-white font-semibold text-xs bg-teal-500"
							>+105</span
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
