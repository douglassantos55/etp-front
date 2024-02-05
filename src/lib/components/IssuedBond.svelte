<script lang="ts">
	import Button from './Button.svelte';
	import Creditor from './Creditor.svelte';
	import { format, percent } from '$lib/helper';
	import { cancelBond } from '$lib/api/financing';
	import { invalidateAll } from '$app/navigation';

	export let bond: Bond;

	let loading = false;

	async function cancel() {
		try {
			loading = true;
			await cancelBond(bond.id);
			await invalidateAll();
		} finally {
			loading = false;
		}
	}

	$: available = bond.amount - bond.purchased;
	$: cancelable = available > 0 && !bond.canceled_at;
</script>

<div class="p-6 border rounded-lg shadow-md">
	<div class="flex flex-wrap items-center gap-x-5 gap-y-2">
		<span>
			Amount:
			<span class="text-teal-500">{format(bond.amount)}</span>
		</span>
		<span>
			Interest rate:
			<span class="text-teal-500">{percent(bond.interest_rate)} </span>
		</span>
		<span>
			Purchased:
			<span class="text-teal-500">{format(bond.purchased)}</span>
		</span>

		<span>
			Available:
			<span class="text-teal-500">{format(available)}</span>
		</span>

		{#if cancelable}
			<span>
				<Button on:click={cancel} disabled={loading}>Cancel remaining</Button>
			</span>
		{/if}
	</div>

	<div class="flex flex-wrap gap-10 mt-5">
		{#if bond.creditors.length > 0}
			{#each bond.creditors as creditor}
				<Creditor {creditor} bondId={bond.id} />
			{/each}
		{:else}
			<p>No creditors yet.</p>
		{/if}
	</div>
</div>
