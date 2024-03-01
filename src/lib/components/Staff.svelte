<script context="module" lang="ts">
	export enum Status {
		PENDING,
		HIRED
	}

	export async function hire(id: number) {
		const result = await hireStaff(id);
		if (result.message) {
			notification.add(result.message, 'error');
		} else {
			await invalidateAll();
		}
	}
</script>

<script lang="ts">
	import { format } from '$lib/helper';
	import Time from '$lib/components/Time.svelte';
	import Button from '$lib/components/Button.svelte';
	import { hireStaff } from '$lib/api/research';
	import notification from '$lib/stores/notification';
	import { invalidateAll } from '$app/navigation';

	export let staff: Staff;
</script>

<a href={`/research/staff/${staff.id}`} class="px-3 py-4 shadow-lg border border-gray-100">
	<div class="flex items-center gap-3">
		<img src="https://picsum.photos/100" class="w-14 h-14 inline-block" alt="John Doe" />

		<div class="flex flex-col flex-wrap">
			<h3 class="font-semibold">{staff.name}</h3>
			<p>{format(staff.salary)}</p>

			<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
				<div class="rounded-xl bg-teal-500 h-2" style:width="{staff.skill}%" />
			</div>
		</div>

		{#if staff.status == Status.PENDING}
			<div class="ml-auto text-right">
				<Button on:click={() => hire(staff.id)}>Hire</Button>
			</div>
		{:else}
			<div class="ml-auto text-right">
				<Button>Train</Button>
			</div>
		{/if}
	</div>

	{#if staff.training_duration}
		<div class="ml-auto text-right">
			<p class="text-sm leading-snug">Training ends in</p>

			<span class="text-teal-500 leading-snug tracking-tight">
				<Time value={staff.training_duration} />
			</span>
		</div>
	{/if}

	{#if staff.offer}
		<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">
			Was offered {format(staff.offer)}
		</p>
	{/if}

	{#if staff.raise}
		<p class="mt-4 py-1 px-4 rounded-lg text-sm bg-yellow-200">
			Requested a raise of {staff.raise}%
		</p>
	{/if}
</a>
