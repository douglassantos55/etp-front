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
	<div class="flex gap-8">
		<div class="w-1/2 mb-4">
			<h2 class="uppercase tracking-tight font-semibold mb-4">Loans</h2>

			<form class="flex items-end gap-4 mb-6">
				<div class="flex-grow">
					<label for="loan">Amount</label>
					<Input id="loan" name="amount" />
				</div>

				<Button type="submit">Take loan</Button>
			</form>

			<table class="w-full table-auto border-collape border">
				<thead>
					<tr>
						<th class="p-2 border text-right">Amount</th>
						<th class="p-2 border text-right">Interest rate</th>
						<th class="p-2 border text-right">Interest payment</th>
						<th class="p-2 border text-right">Payable at</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border text-right">$ 1.252.300</td>
						<td class="p-2 border text-right">10%</td>
						<td class="p-2 border text-right">$ 125.230</td>
						<td class="p-2 border text-right">01/10/2023</td>
					</tr>
					<tr>
						<td class="p-2 border text-right">$ 1.000.000</td>
						<td class="p-2 border text-right">1%</td>
						<td class="p-2 border text-right">$ 10.000</td>
						<td class="p-2 border text-right">
							<Input placeholder="Amount" />
							<Button type="submit">Pay</Button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td class="font-semibold text-end p-2 border">$ 2.252.300</td>
						<td>&nbsp;</td>
						<td class="font-semibold text-end p-2 border">$ 135.300</td>
					</tr>
				</tfoot>
			</table>
		</div>

		<div class="w-1/2 mb-4">
			<h2 class="uppercase tracking-tight font-semibold mb-4">Bonds</h2>

			<form class="flex items-end gap-4 mb-6">
				<div class="flex-grow">
					<label for="bond">Amount</label>
					<Input id="bond" name="amount" />
				</div>

				<div>
					<label for="rate">Interest rate</label>
					<Input id="rate" name="rate" />
				</div>

				<div class="flex-shrink-0">
					<Button type="submit">Emit bonds</Button>
				</div>
			</form>

			<table class="w-full table-fixed border border-collapse">
				<thead>
					<tr>
						<th class="border p-2 text-left">Company</th>
						<th class="border p-2 text-end">Amount</th>
						<th class="border p-2 text-end">Interest rate</th>
						<th class="border p-2 text-end">Interest payment</th>
						<th class="border p-2 text-end">Callable at</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border">
							<img src="https://picsum.photos/100" class="w-10 h-10 inline-block" alt="Coca-Cola" />
							Coca-Cola
						</td>
						<td class="border p-2 text-end">$ 1.500.000</td>
						<td class="border p-2 text-end">1%</td>
						<td class="border p-2 text-end">$ 15.000</td>
						<td class="border p-2 text-end">01/10/2023</td>
					</tr>

					<tr>
						<td class="border">
							<img src="https://picsum.photos/100" class="w-10 h-10 inline-block" alt="Coca-Cola" />
							Marfrig
						</td>
						<td class="border p-2 text-end">$ 2.000.000</td>
						<td class="border p-2 text-end">1%</td>
						<td class="border p-2 text-end">$ 20.000</td>
						<td class="border p-2 text-end">
							<Input placeholder="Amount" />
							<Button type="button">Call bond</Button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>&nbsp;</td>
						<td class="font-semibold text-end p-2 border">$ 2.252.300</td>
						<td>&nbsp;</td>
						<td class="font-semibold text-end p-2 border">$ 135.300</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>

	<div class="py-10">
		<canvas bind:this={graph} style="max-height: 350px" />
	</div>
</div>
