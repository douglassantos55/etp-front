<script lang="ts">
	import { format } from '$lib/helper';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createErrors } from '$lib/errors';
	import { invalidateAll } from '$app/navigation';
	import { buyBackLoan } from '$lib/api/financing';

	export let loan: Loan;

	let payBackAmount: string;
	let errors = createErrors();

	$: payableFrom = new Date(loan.payable_from);
	$: payable = payableFrom <= new Date();
	$: available = loan.principal - loan.principal_paid;
	$: interestPayment = available * loan.interest_rate;

	async function payLoan() {
		const result = await buyBackLoan(loan.id, parseInt(payBackAmount) * 100);

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
	<p>Principal: <span class="text-teal-500">{format(loan.principal)}</span></p>
	<p>Principal paid: <span class="text-teal-500">{format(loan.principal_paid)}</span></p>
	<p>Available: <span class="text-teal-500">{format(available)}</span></p>
	<p>Interest rate: <span class="text-teal-500">{loan.interest_rate * 100}%</span></p>
	<p>Interest payment: <span class="text-teal-500">{format(interestPayment)}</span></p>
	<p>Interest paid: <span class="text-teal-500">{format(loan.interest_paid)}</span></p>

	<div class="mt-4">
		{#if payable}
			<form on:submit|preventDefault={payLoan}>
				<div class="flex gap-4 items-start">
					<div class="w-40 max-w-full">
						<Input
							min="100"
							step="100"
							type="number"
							placeholder="Amount"
							max={available / 100}
							bind:value={payBackAmount}
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
