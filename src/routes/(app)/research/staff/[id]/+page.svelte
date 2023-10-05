<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

<div class="container mx-auto py-12 px-4">
	<a href="/research" class="ml-auto">&larr; Back</a>

	<div class="flex items-center gap-4 my-4">
		<img src="https://picsum.photos/100" class="w-16 h-16" alt="John Doe" />

		<div class="flex flex-col flex-wrap">
			<h2 class="font-bold text-lg">Jeniffer Smith</h2>
			<p>$ 1,000.00</p>

			<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
				<div class="rounded-xl bg-teal-500 h-2 w-10" />
			</div>
		</div>

		<div class="ml-auto text-right">
			{#if $page.params.id == '1'}
				<Button>Train</Button>
			{:else}
				<p class="text-sm leading-snug">Training ends in</p>
				<span class="text-teal-500 leading-snug tracking-tight">20 hrs</span>
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

	<p class="mt-4 py-1 px-4 rounded-lg bg-yellow-200">Was offered $ 10,000.00</p>

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