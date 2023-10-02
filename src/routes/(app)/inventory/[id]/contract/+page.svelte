<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';
	import Options from './Options.svelte';
	import OrderItem from '$lib/components/OrderItem.svelte';

	export let data: PageData;

	let selected: User;
	let focused = false;
	let results: User[] = [];

	function selectCompany(evt: CustomEvent<User>) {
		selected = evt.detail;
		focused = false;
	}

	const filter: FormEventHandler<HTMLInputElement> = async function (evt) {
		if (!evt.currentTarget?.value) {
			results = [];
		} else {
			const response = await fetch(
				`http://localhost:3000/users?company_name_like=${evt.currentTarget.value}`
			);
			results = await response.json();
		}
	};
</script>

<form class="mb-10">
	<input type="hidden" name="company_id" value={selected?.id} />

	<div class="flex flex-wrap gap-4">
		<div class="relative w-full">
			<div class="group">
				<label for="recipient">Recipient</label>

				<Input
					id="recipient"
					autocomplete="off"
					on:focus={() => (focused = true)}
					on:input={filter}
					value={selected?.company_name}
				/>

				<div
					class="hidden group-focus-within:block absolute w-full bg-white shadow-md rounded overflow-hidden"
				>
					{#await data.stream.partners}
						<p>Loading partners</p>
					{:then partners}
						{#if results.length == 0 && partners.length > 0}
							<Options companies={partners} on:select={selectCompany} />
						{/if}

						{#if results.length > 0}
							<Options companies={results} on:select={selectCompany} />
						{/if}
					{:catch}
						<p>Could not fetch partners</p>
					{/await}
				</div>
			</div>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 items-end">
			<div class="shrink-0">
				<label for="qty">Qty</label>
				<Input id="qty" name="qty" type="number" />
			</div>

			<div>
				<label for="price">Price/unit</label>
				<Input id="price" name="price" />
			</div>

			<Button type="submit">Send contract</Button>
		</div>
	</div>
</form>

<div class="mb-10">
	{#await data.stream.contracts}
		<p>Loading contracts...</p>
	{:then contracts}
		<h2 class="font-semibold uppercase tracking-tight">Recent contracts</h2>

		<div class=" overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<th>&nbsp;</th>
					<th class="px-4 py-2 text-right">Qty</th>
					<th class="px-4 py-2 text-right">Price</th>
					<th class="px-4 py-2 text-right">Subtotal</th>
					<th>&nbsp;</th>
				</thead>

				<tbody>
					{#each contracts as contract}
						<OrderItem order={contract} current={data.user.id}>
							<td class="pl-4 py-2 border-y text-right">
								<form>
									<input type="hidden" name="userId" value={contract.userId} />
									<input type="hidden" name="resourceId" value={contract.resourceId} />
									<input type="hidden" name="qty" value={contract.qty} />
									<input type="hidden" name="price" value={contract.price} />

									<Button type="submit">Resend</Button>
								</form>
							</td>
						</OrderItem>
					{/each}
				</tbody>
			</table>
		</div>
	{/await}
</div>
