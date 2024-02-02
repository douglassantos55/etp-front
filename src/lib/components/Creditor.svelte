<script lang="ts">
	import { format } from '$lib/helper';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { createErrors } from '$lib/errors';
	import { buyBackBond } from '$lib/api/financing';

	export let bondId: number;
	export let creditor: Creditor;

	let amount: string;
	let errors = createErrors();

	$: payableFrom = new Date(creditor.payable_from);
	$: payable = payableFrom <= new Date();
	$: available = creditor.principal - creditor.principal_paid;
	$: interestPayment = available * creditor.interest_rate;

	async function buyBack() {
		const result = await buyBackBond(bondId, creditor.id, +amount * 100);

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
	<img src={creditor.logo} alt={creditor.name} class="w-16 h-16 rounded-full" />

	<div class="mt-2">
		<h3 class="font-semibold mb-1">{creditor.name}</h3>
		<p>Principal: <span class="text-teal-500">{format(creditor.principal)}</span></p>
		<p>Principal paid: <span class="text-teal-500">{format(creditor.principal_paid)}</span></p>
		<p>
			Available: <span class="text-teal-500">{format(available)}</span>
		</p>
		<p>
			Interest rate: <span class="text-teal-500">{creditor.interest_rate * 100}%</span>
		</p>
		<p>
			Interest payment:
			<span class="text-teal-500">{format(interestPayment)}</span>
		</p>
		<p>
			Interest paid: <span class="text-teal-500">{format(creditor.interest_paid)}</span>
		</p>
	</div>

	<div class="flex gap-4 mt-4">
		{#if payable}
			<form on:submit|preventDefault={buyBack}>
				<div class="flex gap-4 items-start">
					<div class="w-40 max-w-full">
						<Input
							min="100"
							step="100"
							type="number"
							placeholder="Amount"
							bind:value={amount}
							max={available / 100}
						/>
					</div>
					<Button type="submit">Pay</Button>
				</div>

				{#if $errors.amount}
					<span class="text-red-500">{$errors.amount}</span>
				{/if}

				{#if $errors.message}
					<span class="text-red-500">{$errors.message}</span>
				{/if}
			</form>
		{:else}
			<p>
				Payable at <span class="font-semibold text-indigo-700">{payableFrom.toLocaleString()}</span>
			</p>
		{/if}
	</div>
</div>
