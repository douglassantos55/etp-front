<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { user } from '$lib/stores/user';

	let height: number;
	let editing = false;
	let textarea: HTMLTextAreaElement;
	let paragraph: HTMLParagraphElement;

	let description = `Maecenas vehicula massa a tincidunt suscipit. Sed vel vestibulum sem, ut accumsan leo. Suspendisse nisi neque, accumsan ac finibus a, fermentum maximus ligula. Duis auctor est vitae condimentum mollis. Vivamus dapibus ligula eu elementum euismod.

Donec non dui ante. Nullam ex lacus, rutrum non neque congue, rhoncus vestibulum massa. Aliquam erat volutpat. Curabitur imperdiet massa lacus, id vehicula enim lobortis non. Nunc ullamcorper, sem vitae volutpat vehicula, mauris dui pharetra neque, eu aliquam nisi nibh vitae nibh. Nunc egestas, odio id malesuada ultrices, erat massa efficitur nisl, sit amet varius nunc purus sed metus.`;

	function toggleEdit() {
		if (!editing) {
			const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight.replace('px', ''));
			height = paragraph.clientHeight / lineHeight;
		}
		editing = !editing;
	}

	function focus(element: HTMLElement) {
		element.focus();
	}
</script>

<div class="container mx-auto px-4 py-12">
	<div class="flex flex-col gap-4 sm:flex-row">
		<img src={$user.company_logo} alt={$user.company_name} class="w-36 h-36" />

		<div>
			<h2 class="flex items-center text-3xl font-bold mb-3 gap-2">
				{$user.company_name}
				<span class="bg-yellow-300 inline-block rounded-full text-xs px-4 py-1">AAA</span>
			</h2>

			<p>
				Ranking: <strong>#15432</strong>
				<span class="text-sm text-green-600 font-semibold px-1">+132</span>
			</p>
			<p>Established: 11/03/2023</p>
			<p>Total employees: 154.522</p>
			<p>Company value: $ 125.235.420</p>
		</div>
	</div>

	<hr class="mt-10" />

	<div class="mt-10">
		{#if editing}
			<textarea use:focus bind:this={textarea} bind:value={description} class="w-full h-max focus:outline-0" rows={height} />
		{:else}
			<p bind:this={paragraph}>{@html description}</p>
		{/if}

		<div class="mt-6">
			<Button on:click={toggleEdit}>{editing ? 'Save changes' : 'Edit description'}</Button>
		</div>
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
		<div class="mt-8 sm:col-span-2 md:col-auto">
			<h3 class="font-semibold text-xl tracking-tight uppercase">Balance Sheet</h3>
			<p>as of September 28th, 2023</p>

			<table class="w-full table-auto mt-4 border-separate">
				<tr>
					<td class="uppercase font-bold">Assets</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-4 font-semibold">Current assets</td>
				</tr>

				<tr>
					<td class="pl-8">Cash and equivalent</td>
					<td class="text-right">12,532.00</td>
				</tr>

				<tr>
					<td class="pl-8">Accounts receivable</td>
					<td class="text-right">2,532.00</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-8">Inventory</td>
				</tr>

				<tr>
					<td class="pl-12">Materials</td>
					<td class="text-right">1,070.00</td>
				</tr>

				<tr>
					<td class="pl-12">Work in process</td>
					<td class="text-right">2,300.00</td>
				</tr>

				<tr>
					<td class="pl-12">Finished goods</td>
					<td class="text-right">2,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Total Inventory</td>
					<td class="text-right border-t py-1 font-semibold">5,370.00</td>
				</tr>

				<tr>
					<td class="pl-4">Total Current assets</td>
					<td class="text-right border-t py-1 font-semibold">20,434.00</td>
				</tr>

				<tr>
					<td class="pl-4 font-semibold">Non-current assets</td>
				</tr>

				<tr>
					<td class="pl-8">Fixed assets</td>
				</tr>

				<tr>
					<td class="pl-12">Land (terrains)</td>
					<td class="text-right">4,202,532.00</td>
				</tr>

				<tr>
					<td class="pl-12">Buildings</td>
					<td class="text-right">2,102,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Total Fixed assets</td>
					<td class="text-right border-t py-1 font-semibold">6,304,532.00</td>
				</tr>

				<tr>
					<td class="pl-8">Intangible assets (research)</td>
					<td class="text-right">1,500,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Long-term investments (bought bonds)</td>
					<td class="text-right">3,050,000.00</td>
				</tr>

				<tr>
					<td class="pl-4">Total Non-current assets</td>
					<td class="text-right border-t py-1 font-semibold">10,854,532.00</td>
				</tr>

				<tr>
					<td>Total Assets</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">10,874,966.00</td>
				</tr>

				<tr>
					<td colspan="2" class="uppercase font-bold">Liabilities</td>
				</tr>

				<tr>
					<td class="pl-4 font-semibold">Current liabilities</td>
				</tr>

				<tr>
					<td class="pl-8">Accounts payable (necessary?)</td>
					<td class="text-right">10,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Wages payable (research staff + buildings' staff)</td>
					<td class="text-right">72,350.00</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-8">Interest payable</td>
				</tr>

				<tr>
					<td class="pl-12">Loans</td>
					<td class="text-right">105,000.00</td>
				</tr>

				<tr>
					<td class="pl-12">Bonds</td>
					<td class="text-right">102,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Total Interest payable</td>
					<td class="text-right border-t py-1 font-semibold">207,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Taxes payable</td>
					<td class="text-right">1,100,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Total Current liabilities</td>
					<td class="text-right border-t py-1 font-semibold">1,389,350.00</td>
				</tr>

				<tr>
					<td class="pl-4 font-semibold">Non-current liabilities</td>
				</tr>

				<tr>
					<td class="pl-8">Loans payable (principal)</td>
					<td class="text-right">5,105,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Bonds payable (principal)</td>
					<td class="text-right">6,102,000.00</td>
				</tr>

				<tr>
					<td class="pl-8">Total Non-current liabilities</td>
					<td class="text-right border-t py-1 font-semibold">11,207,000.00</td>
				</tr>

				<tr>
					<td>Total Liabilities</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">12,596,350.00</td>
				</tr>

				<tr>
					<td colspan="2" class="uppercase font-bold">Equity</td>
				</tr>

				<tr>
					<td class="pl-4">Owner's capital</td>
					<td class="text-right">1,000,000.00</td>
				</tr>

				<tr>
					<td class="pl-4">Retained earnings</td>
					<td class="text-right">102,000.00</td>
				</tr>

				<tr>
					<td>Total Equity</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">1,102,000.00</td>
				</tr>

				<tr>
					<td class="font-bold uppercase">Total Equity + Liabilities</td>
					<td class="text-right border-double border-b-4 py-1 font-bold">13,698,350.00</td>
				</tr>
			</table>
		</div>

		<div class="mt-8">
			<h3 class="font-semibold text-xl tracking-tight uppercase">Income Statement</h3>
			<p>from September 27th to 28th, 2023</p>

			<table class="w-full table-auto mt-4 border-separate">
				<tr>
					<td colspan="2" class="font-semibold">Revenues</td>
				</tr>

				<tr>
					<td class="pl-4">Sales</td>
					<td class="text-right">15,520.00</td>
				</tr>

				<tr>
					<td class="pl-4">Other revenue</td>
					<td class="text-right">0.00</td>
				</tr>

				<tr>
					<td>Total Revenues</td>
					<td class="text-right border-t py-1 font-semibold">15,520.00</td>
				</tr>

				<tr>
					<td colspan="2" class="font-semibold">Cost of sales</td>
				</tr>

				<tr>
					<td class="pl-4">Cost of goods sold</td>
					<td class="text-right">(10,320.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Transportation</td>
					<td class="text-right">(3,000.00)</td>
				</tr>

				<tr>
					<td>Total Cost of sales</td>
					<td class="text-right border-t py-1 font-semibold">(13,320.00)</td>
				</tr>

				<tr>
					<td class="font-bold">Gross profit</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">2,220.00</td>
				</tr>

				<tr>
					<td colspan="2" class="font-semibold">Operating expenses</td>
				</tr>

				<tr>
					<td class="pl-4">SG&A</td>
					<td class="text-right">(1,500.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Market fees</td>
					<td class="text-right">(500.00)</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-4 font-semibold">Personnel expenses</td>
				</tr>

				<tr>
					<td class="pl-8">Salaries</td>
					<td class="text-right">(5,500.00)</td>
				</tr>

				<tr>
					<td class="pl-8">Training</td>
					<td class="text-right">(1,500.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Total Personnel expenses</td>
					<td class="text-right border-t py-1 font-semibold">(7,000.00)</td>
				</tr>

				<tr>
					<td>Total Operating expenses</td>
					<td class="text-right border-t py-1 font-semibold">(9,000.00)</td>
				</tr>

				<tr>
					<td class="font-bold">Operating income</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">(6,780.00)</td>
				</tr>

				<tr>
					<td>Interest expenses</td>
					<td class="text-right">(1,000.00)</td>
				</tr>

				<tr>
					<td>Interest income</td>
					<td class="text-right">100.00</td>
				</tr>

				<tr>
					<td>Tax expenses</td>
					<td class="text-right">(950.00)</td>
				</tr>

				<tr>
					<td class="font-bold uppercase">Net income</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">(8,630.00)</td>
				</tr>
			</table>
		</div>

		<div class="mt-8">
			<h3 class="font-semibold text-xl tracking-tight uppercase">Cash Flow Statement</h3>
			<p>from September 27th to 28th, 2023</p>

			<table class="w-full table-auto mt-4 border-separate">
				<tr>
					<td colspan="2" class="uppercase font-bold">Operating activities</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-4 font-semibold">Receits</td>
				</tr>

				<tr>
					<td class="pl-8">Market</td>
					<td class="text-right">15,520.00</td>
				</tr>

				<tr>
					<td class="pl-8">Contracts</td>
					<td class="text-right">0.00</td>
				</tr>

				<tr>
					<td class="pl-8">Interest</td>
					<td class="text-right">100.00</td>
				</tr>

				<tr>
					<td class="pl-8">Others</td>
					<td class="text-right">0.00</td>
				</tr>

				<tr>
					<td colspan="2" class="pl-4 font-semibold">Payments</td>
				</tr>

				<tr>
					<td class="pl-8">Administration</td>
					<td class="text-right">(1,500.00)</td>
				</tr>

				<tr>
					<td class="pl-8">Personnel</td>
					<td class="text-right">(5,500.00)</td>
				</tr>

				<tr>
					<td class="pl-8">Suppliers</td>
					<td class="text-right">0.00</td>
				</tr>

				<tr>
					<td class="pl-8">Market</td>
					<td class="text-right">(10,320.00)</td>
				</tr>

				<tr>
					<td class="pl-8">Market fees</td>
					<td class="text-right">(500.00)</td>
				</tr>

				<tr>
					<td class="pl-8">Transportation</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td>Net cash flow from operating activities</td>
					<td class="text-right border-t py-1 font-semibold">7,000.00</td>
				</tr>

				<tr>
					<td colspan="2" class="uppercase font-bold">Investing activities</td>
				</tr>

				<tr>
					<td class="pl-4">Land</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Buildings</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Training</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Research</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td>Net cash flow from investing activities</td>
					<td class="text-right border-t py-1 font-semibold">7,000.00</td>
				</tr>

				<tr>
					<td colspan="2" class="uppercase font-bold">Financing activities</td>
				</tr>

				<tr>
					<td class="pl-4">Loans taken (paid)</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Interest paid on loans</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Bonds issued (paid)</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td class="pl-4">Interest paid on bonds</td>
					<td class="text-right">(3000.00)</td>
				</tr>

				<tr>
					<td>Net cash flow from financing activities</td>
					<td class="text-right border-t py-1 font-semibold">7,000.00</td>
				</tr>

				<tr>
					<td class="font-bold uppercase">Net change in cash</td>
					<td class="text-right border-double border-y-4 py-1 font-semibold">(8,630.00)</td>
				</tr>
			</table>
		</div>
	</div>
</div>
