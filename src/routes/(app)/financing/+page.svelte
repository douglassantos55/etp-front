<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

	let graph: HTMLCanvasElement;

	const data = {
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

	onMount(() => new Chart(graph, { type: 'line', data }));
</script>

<div class="container px-4 mx-auto py-12">
	<div class="pb-10">
		<canvas bind:this={graph} style="max-height: 350px" />
	</div>

	<div class="mb-10">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Loans</h2>

		<form class="flex items-end gap-4 mb-6">
			<div class="w-48">
				<label for="loan">Amount</label>
				<Input id="loan" name="amount" type="number" />
			</div>

			<Button type="submit">Take loan</Button>
		</form>

		<div class="flex flex-wrap gap-10">
			<div class="p-6 shadow-md bg-gray-100">
				<p>Amount: $ 1,000,000.00</p>
				<p>Interest rate: 1%</p>
				<p>Interest payment: $10,000.00</p>
				<p>Interest paid: $100,000.00</p>

				<div class="flex gap-4 mt-4">
					<div class="w-40 max-w-full">
						<Input placeholder="Amount" max="1000000" type="number" value="1000000" />
					</div>
					<Button type="submit">Pay</Button>
				</div>
			</div>

			<div class="p-6 shadow-md bg-gray-100">
				<p>Amount: $ 1,252,300.00</p>
				<p>Interest rate: 10%</p>
				<p>Interest payment: $125,300.00</p>
				<p>Interest paid: $1,253,000.00</p>

				<div class="flex gap-4 mt-4">
					<p>Payable at <span class="font-semibold text-indigo-700">11/11/2023</span></p>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-10">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds Emmited</h2>

		<form class="grid grid-cols-2 sm:flex items-end gap-4 mb-6">
			<div class="w-48 max-w-full">
				<label for="bond">Amount</label>
				<Input id="bond" name="amount" type="number" />
			</div>

			<div class="w-32 max-w-full">
				<label for="rate">Interest rate</label>
				<Input id="rate" name="rate" type="number" />
			</div>

			<div class="flex-shrink-0">
				<Button type="submit">Emit bonds</Button>
			</div>
		</form>

		<div class="flex flex-wrap gap-10">
			<div class="p-6 shadow-md bg-gray-100">
				<img src="https://picsum.photos/100" alt="Company name" class="w-16 h-16 rounded-full" />

				<div class="mt-2">
					<h3 class="font-semibold mb-1">Company name</h3>
					<p>Amount: $ 1,252,300.00</p>
					<p>Interest rate: 10%</p>
					<p>Interest payment: $125,300.00</p>
					<p>Interest paid: $1,253,000.00</p>
				</div>

				<div class="flex gap-4 mt-4">
					<div class="w-40 max-w-full">
						<Input placeholder="Amount" max="1000000" type="number" value="1252300" />
					</div>
					<Button type="submit">Pay</Button>
				</div>
			</div>

			<div class="p-6 shadow-md bg-gray-100">
				<img src="https://picsum.photos/100" alt="Company name" class="w-16 h-16 rounded-full" />

				<div class="mt-2">
					<h3 class="font-semibold mb-1">Company name</h3>
					<p>Amount: $ 1,252,300.00</p>
					<p>Interest rate: 10%</p>
					<p>Interest payment: $125,300.00</p>
					<p>Interest paid: $1,253,000.00</p>
				</div>

				<div class="flex gap-4 mt-4">
					<p>Payable at <span class="font-semibold text-indigo-700">11/11/2023</span></p>
				</div>
			</div>
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
