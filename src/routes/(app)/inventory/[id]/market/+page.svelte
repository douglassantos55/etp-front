<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { placeOrder } from '$lib/api/market';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { createErrors } from '$lib/errors';
	import type { PageData } from './$types';

	let price: string;
	let quantity: string;
	let errors = createErrors();

	export let data: PageData;

	async function place() {
		const result = await placeOrder({
			quantity: +quantity,
			price: +price * 100,
			quality: data.item.quality,
			resource_id: data.item.resource.id
		});

		if (result.errors) {
			errors.set(result.errors);
		} else if (result.message) {
			errors.set({ message: result.message });
		} else {
			await invalidateAll();
		}
	}
</script>

<form on:submit|preventDefault={place}>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 items-end max-w-xl">
		<div class="shrink-0">
			<label for="qty">Qty</label>
			<Input id="qty" name="qty" type="number" bind:value={quantity} />

			{#if $errors.quantity}
				<span class="text-red-500">{$errors.quantity}</span>
			{/if}
		</div>

		<div>
			<label for="price">Price/unit</label>
			<Input id="price" name="price" bind:value={price} />

			{#if $errors.price}
				<span class="text-red-500">{$errors.price}</span>
			{/if}
		</div>

		<Button type="submit">Place order</Button>
	</div>
</form>
