<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { format } from '$lib/helper';
	import { issueBond, takeLoan } from '$lib/api/financing';
	import { createErrors } from '$lib/errors';
	import { invalidateAll } from '$app/navigation';
	import Loan from '$lib/components/Loan.svelte';
	import Creditor from '$lib/components/Creditor.svelte';

	export let data: PageData;

	let errors = createErrors();
	let graph: HTMLCanvasElement;

	let bondAmount: string;
	let bondRate: string;

	const graphData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		datasets: [
			{
				label: 'Inflation',
				data: [10, 11, 10.3, 9.8, 9.5, 10.2, 9.95]
			},
			{
				label: 'Interest rate',
				data: [8, 9.5, 10, 10, 10, 10, 10]
			}
		]
	};

	onMount(() => new Chart(graph, { type: 'line', data: graphData }));

	async function issue() {
		const result = await issueBond({
			rate: parseFloat(bondRate) / 100,
			amount: parseInt(bondAmount) * 100
		});

		if (result.errors) {
			errors.set(result.errors);
		} else if (result.message) {
			errors.set({ message: result.message });
		} else {
			await invalidateAll();
		}
	}

	async function loan() {
		const result = await takeLoan(10000);

		if (result.errors) {
			errors.set(result.errors);
		} else if (result.message) {
			errors.set({ message: result.message });
		} else {
			await invalidateAll();
		}
	}
</script>

<div class="container px-4 mx-auto py-12">
	<div class="pb-10">
		<canvas bind:this={graph} style="max-height: 350px" />
	</div>

	<div class="mb-10">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Loans</h2>

		<form class="flex items-end gap-4 mb-6" on:submit|preventDefault={loan}>
			<div class="w-48">
				<label for="loan">Amount</label>
				<Input id="loan" name="amount" type="number" />
			</div>

			<Button type="submit">Take loan</Button>
		</form>

		<div class="flex flex-wrap gap-10">
			{#await data.loans}
				<p>Loading...</p>
			{:then loans}
				{#if loans.length > 0}
					{#each loans as loan}
						<Loan {loan} />
					{/each}
				{:else}
					<p>No loans</p>
				{/if}
			{/await}
		</div>
	</div>

	<div class="mb-10">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds Issued</h2>

		<form class="grid grid-cols-2 sm:flex items-end gap-4 mb-6" on:submit|preventDefault={issue}>
			<div class="w-52 max-w-full">
				<label for="bond">Amount ($)</label>
				<Input id="bond" min="1000" step="100" type="number" bind:value={bondAmount} />
			</div>

			<div class="w-36 max-w-full">
				<label for="rate">Interest rate (%)</label>
				<Input id="rate" min="0.5" step=".1" type="number" bind:value={bondRate} />
			</div>

			<div class="flex-shrink-0">
				<Button type="submit">Issue bonds</Button>
			</div>
		</form>

		<div class="flex flex-wrap gap-10">
			{#await data.bonds}
				<p>Loading...</p>
			{:then bonds}
				{#each bonds as bond}
					<ul class="p-6 shadow-md bg-gray-100">
						<li>Amount: <span class="text-teal-500">{format(bond.amount)}</span></li>
						<li>Interest rate: <span class="text-teal-500">{bond.interest_rate * 100}%</span></li>
						<li>Purchased: <span class="text-teal-500">{format(bond.purchased)}</span></li>
						<li>
							Available: <span class="text-teal-500">{format(bond.amount - bond.purchased)}</span>
						</li>
					</ul>

					{#each bond.creditors as creditor}
						<Creditor {creditor} />
					{/each}
				{/each}
			{/await}
		</div>
	</div>

	<div>
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds Owned</h2>

		<div class="flex flex-wrap gap-10">
			<div class="p-6 shadow-md bg-gray-100">
				<img src="https://picsum.photos/100" alt="Company name" class="w-16 h-16 rounded-full" />

				<div class="mt-2">
					<h3 class="font-semibold mb-1">Company name</h3>
					<p>Amount: $ 1,252,300.00</p>
					<p>Interest rate: 10%</p>
					<p>Interest payment: $125,300.00</p>
					<p>Interest received: $1,253,000.00</p>
				</div>
			</div>
		</div>
	</div>
</div>
