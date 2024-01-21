<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from './Button.svelte';
	import { format } from '$lib/helper';
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';
	import { user, getToken } from '$lib/stores/user';
	import Requirement from './Requirement.svelte';

	export let companyId: number;
	export let building: Building;
	export let resource: BuildingResource;
	export let inventory: { items: InventoryItem[] };

	let qty: string;
	let quality: string;

	export let form: {
		message?: string;
		errors: Record<string, string>;
	};

	function maxQty() {}

	function getSourcingCost(resource: number): number {
		const item = inventory.items.find((item: InventoryItem) => {
			return item.resource.id === resource;
		});
		return item ? item.cost : 0;
	}

	function getStock(resource: number): number {
		const item = inventory.items.find((item: InventoryItem) => {
			return item.resource.id === resource;
		});
		return item ? item.quantity : 0;
	}

	async function produce() {
		const response = await fetch(
			`http://localhost:1323/companies/${companyId}/buildings/${building.id}/productions`,
			{
				method: 'POST',
				body: JSON.stringify({
					resource_id: resource.resource.id,
					quality: parseInt(quality),
					quantity: parseInt(qty)
				}),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getToken()
				}
			}
		);

		const result = await response.json();
		const type = result.errors || result.message ? 'failure' : 'success';

		if (type == 'success') {
			await invalidateAll();
		} else {
			await applyAction({ type, status: response.status, data: result });
		}
	}

	$: inputId = `qty-${resource.resource.id}`;
	$: qualityId = `quality-${resource.resource.id}`;

	$: duration = parseInt(qty) / resource.qty_per_hour;

	$: labor_cost = building.wages_per_hour * duration;

	$: sourcing_cost =
		(parseInt(qty) *
			resource.resource.requirements.reduce(
				(total: number, req: Requirement) =>
					total + req.quantity * getSourcingCost(req.resource.id),
				0
			)) /
		100;

	$: total_cost = labor_cost + sourcing_cost;
	$: cost_per_unit = total_cost / parseInt(qty);

	$: finishes = (function () {
		const date = new Date();
		date.setTime(date.getTime() + duration * 60 * 60 * 1000);
		return date;
	})();
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full">
	<div>
		<div class="flex gap-4">
			<img src={resource.resource.image} alt={resource.resource.name} class="w-20 h-20" />

			<div>
				<p class="uppercase font-semibold mb-2">{resource.resource.name}</p>

				<p>Production/h: {resource.qty_per_hour}</p>
				<p>Wages/h: {building.wages_per_hour}</p>
			</div>
		</div>

		<div class="mt-6">
			<p class="uppercase font-semibold mb-2">Requirements</p>

			<div class="flex items-center gap-4">
				{#each resource.resource.requirements as requirement}
					<Requirement
						stock={getStock(requirement.resource.id)}
						quantity={parseInt(qty)}
						{requirement}
					/>
				{/each}
			</div>
		</div>
	</div>

	<form on:submit={produce}>
		<div class="flex gap-4 mb-3">
			<div>
				<label for={qualityId} class="uppercase font-semibold">Quality</label>

				<select
					id={qualityId}
					name="quality"
					bind:value={quality}
					class="w-full py-2 px-3 rounded-md bg-white border"
				>
					{#each { length: resource.max_quality + 1 } as _, i}
						<option value={i.toString()}>{i}</option>
					{/each}
				</select>

				{#if form?.errors?.quality}
					<span class="text-red-500">{form?.errors.quality}</span>
				{/if}
			</div>

			<div>
				<label for={inputId} class="uppercase font-semibold">Quantity</label>

				<Input name="quantity" min="0" id={inputId} type="number" bind:value={qty} />

				{#if form?.errors?.quantity}
					<span class="text-red-500">{form?.errors.quantity}</span>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-2 gap-3">
			<Button
				variant="hollow"
				type="button"
				on:click={() => (qty = Math.floor(resource.qty_per_hour * 24).toString())}>24h</Button
			>

			<Button type="button" variant="hollow" on:click={maxQty}>Max</Button>
		</div>

		{#if form?.message}
			<span class="text-red-500">{form?.message}</span>
		{/if}

		<div class="grid mt-3">
			<Button disabled={!qty || parseInt(qty) == 0}>Produce</Button>
		</div>

		{#if qty && parseInt(qty) > 0}
			<hr class="my-3" />
			<p>Finishes: {finishes.toLocaleString()}</p>
			<p>Labor cost: {format(labor_cost)}</p>
			<p>Sourcing cost: {format(sourcing_cost)}</p>
			<p>
				Total cost:
				<span class:text-red-500={total_cost > $user.available_cash}>
					{format(total_cost)}
				</span>
			</p>
			<p>Cost per unit: {format(cost_per_unit)}</p>
			<hr class="my-3" />
		{/if}
	</form>
</div>
