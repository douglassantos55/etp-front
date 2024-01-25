<script lang="ts">
	import { onMount } from 'svelte';
	import { inventory, stocks } from '$lib/stores/inventory';

	export let quality: number;
	export let resourceId: number;

	onMount(async function () {
		if ($inventory === undefined) {
			inventory.load();
		}
	});

	$: stock = ($stocks[resourceId] && $stocks[resourceId][quality]) || 0;
</script>

{stock}
