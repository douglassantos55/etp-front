<script lang="ts">
	import Input from './Input.svelte';
	import Button from './Button.svelte';
	import { format, percent } from '$lib/helper';
	import { createErrors } from '$lib/errors';
	import { buyBond } from '$lib/api/financing';
	import { invalidateAll } from '$app/navigation';

	export let bond: Bond;

	let amount: string;
	let errors = createErrors();

	$: available = bond.amount - bond.purchased;

	async function purchase() {
		const result = await buyBond(bond.id, +amount * 100);

		if (result.errors) {
			errors.set(result.errors);
		} else if (result.message) {
			errors.set({ message: result.message });
		} else {
			await invalidateAll();
		}
	}
</script>

<div class="p-6 shadow-md bg-gray-100">
	<img src={bond.company?.logo} alt={bond.company?.name} class="w-16 h-16 rounded-full" />

	<div class="mt-2">
		<h3 class="font-semibold mb-1">{bond.company?.name}</h3>
		<p>Amount: <span class="text-teal-500">{format(available)}</span></p>
		<p>Interest rate: <span class="text-teal-500">{percent(bond.interest_rate)}</span></p>
	</div>

	<form on:submit|preventDefault={purchase}>
		<div class="mt-4 flex gap-4 items-start">
			<div class="w-40 max-w-full">
				<Input
					min="100"
					step="100"
					type="number"
					placeholder="Amount"
					max={available / 100}
					bind:value={amount}
				/>
			</div>
			<Button type="submit">Buy</Button>
		</div>
	</form>

	{#if $errors.amount}
		<span class="text-red-500">{$errors.amount}</span>
	{/if}

	{#if $errors.message}
		<span class="text-red-500">{$errors.message}</span>
	{/if}
</div>
