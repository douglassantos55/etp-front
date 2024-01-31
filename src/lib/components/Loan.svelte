<script lang="ts">
	import { format } from '$lib/helper';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let loan: Loan;

	$: payableFrom = new Date(loan.payable_from);
	$: payable = payableFrom <= new Date();
	$: interestPayment = (loan.principal - loan.interest_paid) * loan.interest_rate;
</script>

<div class="p-6 shadow-md bg-gray-100">
	<p>Amount: <span class="text-teal-500">{format(loan.principal)}</span></p>
	<p>Interest rate: <span class="text-teal-500">{loan.interest_rate * 100}%</span></p>
	<p>Interest payment: <span class="text-teal-500">{format(interestPayment)}</span></p>
	<p>Interest paid: <span class="text-teal-500">{format(loan.interest_paid)}</span></p>

	<div class="flex gap-4 mt-4">
		{#if payable}
			<div class="w-40 max-w-full">
				<Input placeholder="Amount" max={loan.principal} type="number" />
			</div>
			<Button type="submit">Pay</Button>
		{:else}
			<p>
				Payable at <span class="font-semibold text-indigo-700">{payableFrom.toLocaleString()}</span>
			</p>
		{/if}
	</div>
</div>
