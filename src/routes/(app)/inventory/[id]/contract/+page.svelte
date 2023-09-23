<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';
	import Options from './Options.svelte';

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

<form>
	<input type="hidden" name="company_id" value={selected?.id} />

	<div class="grid grid-cols-2">
		<div class="relative max-w-lg">
			<div class="group mb-4">
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

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 items-end max-w-xl">
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

		<div>
			{#await data.stream.contracts}
				<p>Loading contracts...</p>
			{:then contracts}
				<h2 class="font-semibold">Recent contracts</h2>

				<table class="w-full border-collapse">
					<thead>
						<th>&nbsp;</th>
						<th class="px-4 text-right">Qty</th>
						<th class="px-4 text-right">Price</th>
						<th class="px-4 text-right">Subtotal</th>
						<th>&nbsp;</th>
					</thead>

					<tbody>
						{#each contracts as contract}
							<tr>
								<td class="flex items-center">
									<div class="relative inline-block w-12 h-12 mr-4">
										<img src={contract.user.company_logo} alt={contract.user.company_name} />
										<span class="top-0 right-1 absolute text-white">{contract.quality}</span>
									</div>
									{contract.user.company_name}
								</td>
								<td class="px-4 text-right">{contract.qty}</td>
								<td class="px-4 text-right">{contract.price}</td>
								<td class="px-4 text-right">{contract.price * contract.qty}</td>
								<td class="px-4">
									<form>
										<input type="hidden" name="userId" value={contract.userId} />
										<input type="hidden" name="resourceId" value={contract.resourceId} />
										<input type="hidden" name="qty" value={contract.qty} />
										<input type="hidden" name="price" value={contract.price} />

										<Button type="submit">Resend</Button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/await}
		</div>
	</div>
</form>
