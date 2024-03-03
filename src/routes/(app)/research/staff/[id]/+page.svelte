<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import RelativeTime from '$lib/components/RelativeTime.svelte';
	import { Status, hire, train } from '$lib/components/Staff.svelte';
	import { format, parseDateTime } from '$lib/helper';
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
			{:else if data.staff.busy_until}
				<div class="ml-auto text-right">
					<p class="text-sm leading-snug">Training ends in</p>

					<span class="text-teal-500 leading-snug tracking-tight">
						<RelativeTime value={data.staff.busy_until} />
					</span>
				</div>
			{:else}
				<div class="ml-auto text-right">
					<Button on:click={() => train(data.staff.id)}>Train</Button>
				</div>
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
			{#if data.staff.trainings.length > 0}
				{#each data.staff.trainings as training}
					<div class="pt-2 pb-3 divide-x inline-flex items-center bg-gray-100">
						<div class="px-4">
							<span class="block text-sm text-gray-500">Started</span>
							{training.started_at}
						</div>

						<div class="px-4">
							<span class="block text-sm text-gray-500">Completed</span>
							{parseDateTime(training.completed_at ?? '')}
						</div>

						<div class="px-4">
							<span class="block text-sm text-gray-500">Result</span>
							<span
								class="px-2 py-1 inline-block rounded-full text-white font-semibold text-xs bg-teal-500"
							>
								+{training.result || 0}
							</span>
						</div>
					</div>
				{/each}
			{:else}
				<p>{data.staff.name} has not completed any trainings yet.</p>
			{/if}
		</div>
	</div>
</div>
