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

		<div class="overflow-x-auto">
			<table class="table-auto border-collapse">
				<thead>
					<tr>
						<th class="py-2 px-4 text-right">Amount</th>
						<th class="py-2 px-4 text-right">Interest rate</th>
						<th class="py-2 px-4 text-right">Interest payment</th>
						<th class="py-2 px-4 text-right">Payable at</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="py-2 px-4 border-y text-right">$ 1.252.300</td>
						<td class="py-2 px-4 border-y text-right">10%</td>
						<td class="py-2 px-4 border-y text-right">$ 125.230</td>
						<td class="py-2 px-4 border-y text-right">01/10/2023</td>
					</tr>
					<tr>
						<td class="py-2 px-4 border-y text-right">$ 1.000.000</td>
						<td class="py-2 px-4 border-y text-right">1%</td>
						<td class="py-2 px-4 border-y text-right">$ 10.000</td>
						<td class="py-2 px-4 border-y text-right">
							<div class="flex gap-2">
								<div class="w-32 max-w-full">
									<Input placeholder="Amount" max="1000000" type="number" />
								</div>
								<Button type="submit">Pay</Button>
							</div>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td class="font-semibold text-end py-2 px-4 border-y">$ 2.252.300</td>
						<td class="border-y">&nbsp;</td>
						<td class="font-semibold text-end py-2 px-4 border-y">$ 135.300</td>
						<td class="border-y">&nbsp;</td>
					</tr>
				</tfoot>
			</table>
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
			<div class="">
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

			<div class="">
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

		<div class="">
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
