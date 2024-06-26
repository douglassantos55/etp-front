<script lang="ts">
	import 'chartjs-adapter-date-fns';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Chart, type ChartData } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { percent } from '$lib/helper';
	import { issueBond, takeLoan } from '$lib/api/financing';
	import { createErrors } from '$lib/errors';
	import { invalidateAll } from '$app/navigation';
	import Loan from '$lib/components/Loan.svelte';
	import BondComponent from '$lib/components/Bond.svelte';
	import OwnedBond from '$lib/components/OwnedBond.svelte';
	import IssuedBond from '$lib/components/IssuedBond.svelte';

	export let data: PageData;

	let errors = createErrors();
	let graph: HTMLCanvasElement;

	let bondAmount: string;
	let bondRate: string;

	let loanAmount: string;

	const graphData: ChartData = {
		labels: [],
		datasets: [
			{ label: 'Inflation', data: [] },
			{ label: 'Interest rate', data: [] }
		]
	};

	for (const rate of data.rates) {
		graphData.labels?.push(new Date(rate.period));
		graphData.datasets[0].data.push(rate.inflation);
		graphData.datasets[1].data.push(rate.interest);
	}

	onMount(
		() =>
			new Chart(graph, {
				type: 'line',
				data: graphData,
				options: {
					scales: {
						y: {
							ticks: {
								callback: function (value: string | number) {
									return percent(value as number);
								}
							}
						},
						x: {
							type: 'time',
							ticks: {
								source: 'data'
							},
							time: {
								tooltipFormat: 'MM/dd/yyyy',
								displayFormats: {
									day: 'MM/dd/yyyy'
								}
							}
						}
					},
					plugins: {
						tooltip: {
							callbacks: {
								label: function (context) {
									let label = context.dataset.label || '';

									if (label) {
										label += ': ';
									}

									if (context.parsed.y !== null) {
										label += percent(context.parsed.y);
									}

									return label;
								}
							}
						}
					}
				}
			})
	);

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
		const result = await takeLoan(parseInt(loanAmount) * 100);

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

		<form on:submit|preventDefault={loan}>
			<div class="flex items-end gap-4">
				<div class="w-52">
					<label for="loan">Amount ($)</label>
					<Input id="loan" min="5000" step="100" type="number" bind:value={loanAmount} required />
				</div>

				<Button type="submit">Take loan</Button>
			</div>

			{#if $errors.amount || $errors.message}
				<p class="text-red-500">{$errors.amount || $errors.message}</p>
			{/if}
		</form>

		<div class="flex flex-wrap gap-10 mt-6">
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

		<div class="flex flex-col flex-wrap gap-10">
			{#await data.issuedBonds}
				<p>Loading...</p>
			{:then bonds}
				{#if bonds.length > 0}
					{#each bonds as bond}
						<IssuedBond {bond} />
					{/each}
				{:else}
					<p>No bonds issued.</p>
				{/if}
			{/await}
		</div>
	</div>

	<div>
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds Owned</h2>

		<div class="flex flex-wrap gap-10">
			{#await data.ownedBonds}
				<p>Loading...</p>
			{:then creditors}
				{#if creditors.length > 0}
					{#each creditors as creditor}
						<OwnedBond {creditor} />
					{/each}
				{:else}
					<p>No bonds owned.</p>
				{/if}
			{/await}
		</div>
	</div>

	<div class="mt-10">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds Available</h2>

		<div class="flex flex-wrap gap-10">
			{#await data.bonds}
				<p>Loading bonds...</p>
			{:then bonds}
				{#if bonds.length > 0}
					{#each bonds as bond}
						<BondComponent {bond} />
					{/each}
				{:else}
					<p>No bonds available.</p>
				{/if}
			{/await}
		</div>
	</div>
</div>
