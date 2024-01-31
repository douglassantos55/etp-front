<script lang="ts">
	import { format } from '$lib/helper';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let creditor: Creditor;

	$: payableFrom = new Date(creditor.payable_from);
	$: payable = payableFrom <= new Date();
	$: available = creditor.principal - creditor.principal_paid;
	$: interestPayment = available * creditor.interest_rate;
</script>

<div class="p-6 shadow-md bg-gray-100">
	<img src={creditor.logo} alt={creditor.name} class="w-16 h-16 rounded-full" />

	<div class="mt-2">
		<h3 class="font-semibold mb-1">{creditor.name}</h3>
		<p>Amount: <span class="text-teal-500">{format(creditor.principal)}</span></p>
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
			<div class="w-40 max-w-full">
				<Input placeholder="Amount" max={available / 100} type="number" />
			</div>
			<Button type="submit">Pay</Button>
		{:else}
			<p>
				Payable at <span class="font-semibold text-indigo-700">{payableFrom.toLocaleString()}</span>
			</p>
		{/if}
	</div>
</div>
