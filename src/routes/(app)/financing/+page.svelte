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
	<div class="mb-16">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Loans</h2>

		<form class="flex items-end gap-4 mb-6">
			<div class="w-48">
				<label for="loan">Amount</label>
				<Input id="loan" name="amount" type="number" />
			</div>

			<Button type="submit">Take loan</Button>
		</form>

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
					<td class="py-2 px-4 border-y text-right w-64">
						<div class="flex gap-2">
							<Input placeholder="Amount" max="1000000" type="number" />
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

	<div class="mb-4">
		<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds</h2>

		<form class="flex items-end gap-4 mb-6">
			<div class="w-48">
				<label for="bond">Amount</label>
				<Input id="bond" name="amount" type="number" />
			</div>

			<div class="w-48">
				<label for="rate">Interest rate</label>
				<Input id="rate" name="rate" type="number" />
			</div>

			<div class="flex-shrink-0">
				<Button type="submit">Emit bonds</Button>
			</div>
		</form>

		<table class="table-fixed border-collapse">
			<thead>
				<tr>
					<th class="px-4 py-2 text-left">Company</th>
					<th class="px-4 py-2 text-end">Amount</th>
					<th class="px-4 py-2 text-end">Interest rate</th>
					<th class="px-4 py-2 text-end">Interest payment</th>
					<th class="px-4 py-2 text-end">Callable at</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="border-y px-4 py-2">
						<img src="https://picsum.photos/100" class="w-10 h-10 inline-block" alt="Coca-Cola" />
						Coca-Cola
					</td>
					<td class="border-y px-4 py-2 text-end">$ 1.500.000</td>
					<td class="border-y px-4 py-2 text-end">1%</td>
					<td class="border-y px-4 py-2 text-end">$ 15.000</td>
					<td class="border-y px-4 py-2 text-end">01/10/2023</td>
				</tr>

				<tr>
					<td class="border-y px-4 py-2">
						<img src="https://picsum.photos/100" class="w-10 h-10 inline-block" alt="Coca-Cola" />
						Marfrig
					</td>
					<td class="border-y px-4 py-2 text-end">$ 2.000.000</td>
					<td class="border-y px-4 py-2 text-end">1%</td>
					<td class="border-y px-4 py-2 text-end">$ 20.000</td>
					<td class="border-y px-4 py-2 text-end">
						<div class="flex items-end gap-2 w-64">
							<Input placeholder="Amount" type="number" max="2000000" />
							<div class="flex-shrink-0">
								<Button type="button">Call bond</Button>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td class="border-y">&nbsp;</td>
					<td class="font-semibold text-end px-4 py-2 border-y">$ 2.252.300</td>
					<td class="border-y">&nbsp;</td>
					<td class="font-semibold text-end px-4 py-2 border-y">$ 135.300</td>
					<td class="border-y">&nbsp;</td>
				</tr>
			</tfoot>
		</table>
	</div>

	<div class="py-10">
		<canvas bind:this={graph} style="max-height: 350px" />
	</div>
</div>
