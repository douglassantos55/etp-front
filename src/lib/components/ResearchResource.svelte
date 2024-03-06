<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { startResearch } from '$lib/api/research';
	import Button from '$lib/components/Button.svelte';
	import Currency from '$lib/components/Currency.svelte';
	import notification from '$lib/stores/notification';
	import Modal from './Modal.svelte';
	import RelativeTime from './RelativeTime.svelte';

	let modal = false;
	let selectedStaff: number[] = [];

	export let resource: Resource;
	export let members: Staff[];

	async function research() {
		const result = await startResearch(resource.id, selectedStaff);
		if (result.message) {
			notification.add(result.message, 'error');
		} else {
			modal = false;
			await invalidateAll();
		}
	}

	function selectStaff(id: number) {
		if (!selectedStaff.includes(id)) {
			selectedStaff = [...selectedStaff, id];
		} else {
			selectedStaff = selectedStaff.filter((value: number) => value != id);
		}
	}
</script>

<div>
	<img src={resource.image} alt={resource.name} class="w-32 h-32 mb-2" />
	<span class="uppercase font-semibold">{resource.name}</span>

	<div class="rounded-xl bg-stone-100 h-2 w-32 mt-2 mb-3">
		<div class="rounded-xl bg-teal-500 h-2" style:width="{resource.patents}%" />
	</div>

	{#if !resource.research_until}
		<div>
			<p>
				Investment:
				<span class="block tracking-tight">
					<Currency value={resource.investment} />
				</span>
			</p>
			<p class="mb-3">
				Duration:
				<span class="text-teal-500 tracking-tight">
					{resource.duration} hrs
				</span>
			</p>

			<Button on:click={() => (modal = true)}>Research</Button>
		</div>
	{:else}
		<p class="text-sm leading-snug">Research finishes in</p>
		<RelativeTime value={resource.research_until} />
	{/if}
</div>

{#if modal}
	<Modal
		on:close={() => {
			modal = false;
			selectedStaff = [];
		}}
	>
		<h3 class="mb-5 text-xl font-semibold tracking-tight">
			Select the staff members for the research:
		</h3>

		<div class="grid grid-cols-2 gap-3 mb-5">
			{#each members as staff}
				<button
					on:click={() => selectStaff(staff.id)}
					class:border-green-500={selectedStaff.includes(staff.id)}
					class="flex items-center gap-3 border shadow-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!!staff.busy_until || !!staff.on_strike_until}
				>
					<img src="https://picsum.photos/100" class="w-10 h-10 inline-block" alt="John Doe" />

					<div class="flex flex-col flex-wrap">
						<h3 class="font-semibold">{staff.name}</h3>

						<div class="rounded-xl bg-stone-100 h-2 w-28 mt-1">
							<div class="rounded-xl bg-teal-500 h-2" style:width="{staff.skill}%" />
						</div>
					</div>
				</button>
			{/each}
		</div>

		<Button on:click={research} disabled={selectedStaff.length == 0}>Start research</Button>
	</Modal>
{/if}
