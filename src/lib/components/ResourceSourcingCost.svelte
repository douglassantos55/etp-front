<script lang="ts">
	import { format } from '$lib/helper';
	import { costs, inventory } from '$lib/stores/inventory';
	import { onMount } from 'svelte';

	export let quality: number;
	export let resourceId: number;

	onMount(async function () {
		if ($inventory === undefined) {
			await inventory.load();
		}
	});

	$: cost = ($costs[resourceId] && $costs[resourceId][quality]) || 0;
</script>

<span class="block text-teal-500">{format(cost)}</span>
