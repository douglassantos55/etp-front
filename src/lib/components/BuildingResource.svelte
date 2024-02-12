<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from './Button.svelte';
	import { format } from '$lib/helper';
	import { invalidateAll } from '$app/navigation';
	import { user, getToken } from '$lib/stores/user';
	import RequirementComponent from './Requirement.svelte';
	import { createErrors } from '$lib/errors';
	import { inventory, costs, stocks } from '$lib/stores/inventory';
	import { onMount } from 'svelte';

	export let disabled = false;
	export let companyId: number;
	export let building: CompanyBuilding;
	export let resource: BuildingResource;

	onMount(function () {
		if ($inventory === undefined) {
			inventory.load();
		}
	});

	const errors = createErrors();

	let qty: string;
	let quality: string;

	function maxQty() {
		let total = Infinity;

		for (const requirement of resource.resource.requirements) {
			const stock =
				($stocks[requirement.resource.id] && $stocks[requirement.resource.id][parseInt(quality)]) ||
				0;

			total = Math.floor(Math.min(total, stock / requirement.quantity));
		}

		total = Math.floor(Math.min(total, max_qty));
		qty = total.toString();
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
		if (result.errors) {
			errors.set(result.errors);
		} else if (result.message) {
			errors.set({ message: result.message });
		} else {
			await invalidateAll();
		}
	}

	$: inputId = `qty-${resource.resource.id}`;
	$: qualityId = `quality-${resource.resource.id}`;

	$: duration = parseInt(qty) / resource.qty_per_hour;
	$: max_qty = resource.qty_per_hour * 48;

	$: labor_cost = building.wages_per_hour * duration;

	$: qty_total = resource.resource.requirements.reduce(
		(total: number, req: Requirement) => total + req.quantity,
		0
	);

	$: cost_sum = resource.resource.requirements.reduce((total: number, req: Requirement) => {
		const reqQuality = Math.max(0, +quality - 1);
		const cost = ($costs[req.resource.id] && $costs[req.resource.id][reqQuality]) || 0;
		return total + req.quantity * cost;
	}, 0);

	$: sourcing_cost = (parseInt(qty) * cost_sum) / qty_total;

	$: total_cost = labor_cost + sourcing_cost;
	$: cost_per_unit = total_cost / parseInt(qty);

	$: finishes = (function () {
		const date = new Date();
		date.setTime(date.getTime() + duration * 60 * 60 * 1000);
		return date;
	})();

	$: tooExpensive = total_cost > $user.available_cash;
	$: busyUntil = building.busy_until ? new Date(building.busy_until) : null;

	$: {
		if (tooExpensive) {
			errors.add('cost', 'not enough cash');
		} else {
			errors.remove('cost');
		}
	}
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
					<RequirementComponent
						quantity={parseInt(qty)}
						quality={parseInt(quality)}
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

				{#if $errors.quality}
					<span class="text-red-500">{$errors.quality}</span>
				{/if}
			</div>

			<div>
				<label for={inputId} class="uppercase font-semibold">Quantity</label>

				<Input name="quantity" min="1" max={max_qty} id={inputId} type="number" bind:value={qty} />

				{#if $errors.quantity}
					<span class="text-red-500">{$errors.quantity}</span>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-2 gap-3 mb-3">
			<Button
				variant="hollow"
				type="button"
				on:click={() => (qty = Math.floor(resource.qty_per_hour * 24).toString())}>24h</Button
			>

			<Button type="button" variant="hollow" on:click={maxQty}>Max</Button>
		</div>

		{#each Object.values($errors) as error}
			<div class="text-red-500">{@html error}</div>
		{/each}

		<div class="grid mt-3">
			<Button disabled={disabled || !qty || Object.keys($errors).length > 0}>
				{busyUntil ? 'Busy until ' + busyUntil.toLocaleString() : 'Produce'}
			</Button>
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
