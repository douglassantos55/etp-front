<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { upgrade } from '$lib/api/buildings';
	import Button from '$lib/components/Button.svelte';
	import BuildingRequirements from './BuildingRequirements.svelte';
	import Modal from './Modal.svelte';
	import Time from './Time.svelte';

	export let companyId: number;
	export let building: Building;

	async function upgradeBuilding() {
		const result = await upgrade(building.id, companyId);

		if (!result.message) {
			await invalidateAll();
			await goto('/');
		}
	}
</script>

<Modal on:close>
	<h3 class="uppercase text-xl font-bold">Upgrade building</h3>
	<p class="mt-5">Production increase: <span class="font-semibold text-blue-700">100%</span></p>
	<p>Downtime: <Time value={building.downtime} /></p>

	<BuildingRequirements {building} let:missing>
		<div class="space-x-4 space-y-4 text-center">
			<Button on:click={upgradeBuilding} disabled={missing > 0}>Upgrade</Button>
		</div>
	</BuildingRequirements>
</Modal>
