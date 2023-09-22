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
	{#if selected}
		<input type="hidden" name="company_id" bind:value={selected.id} />
	{/if}

	<div class="relative max-w-lg">
		<div class="mb-4">
			<label for="recipient">Recipient</label>

			<Input
				id="recipient"
				autocomplete="off"
				on:focus={() => (focused = true)}
				on:input={filter}
				value={selected?.company_name}
			/>

			{#if focused}
				<div class="absolute w-full bg-white shadow-md rounded overflow-hidden">
					{#if results.length == 0 && data.partners.length > 0}
						<Options companies={data.partners} on:select={selectCompany} />
					{/if}

					{#if results.length > 0}
						<Options companies={results} on:select={selectCompany} />
					{/if}
				</div>
			{/if}
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
</form>
