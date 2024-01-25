<script lang="ts">
	import { getResourcePrice } from '$lib/api/market';
	import { format } from '$lib/helper';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let quality: number;
	export let resourceId: number;

	let price: number;

	const dispatch = createEventDispatcher();

	$: dispatch('update', { price });

	onMount(async function () {
		// set a listener to the socket

		// fetch from the api
		price = await getResourcePrice(resourceId, quality);
	});

	onDestroy(function () {
		// clear listener from socket
	});
</script>

{#if price === undefined}
	...
{:else}
	{format(price)}
{/if}
