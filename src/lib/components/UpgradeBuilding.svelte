<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { toHoursAndMinutes } from '$lib/helper';
	import BuildingRequirements from './BuildingRequirements.svelte';
	import Modal from './Modal.svelte';

	export let building: Building;
</script>

<Modal on:close>
	<h3 class="uppercase text-xl font-bold">Upgrade building</h3>
	<p class="mt-5">Production increase: <span class="font-semibold text-green-500">100%</span></p>
	<p>
		Downtime:
		<span class="font-semibold text-red-500">
			{toHoursAndMinutes(building.downtime)}
		</span>
	</p>

	<BuildingRequirements {building} />

	<div class="space-x-4 space-y-4 text-center mt-6">
		<Button>Buy missing</Button>
		<Button disabled>Upgrade</Button>
	</div>
</Modal>
