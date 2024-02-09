<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let building: Building;

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('click', { buildingId: building.id })}>
	<figure class="w-full min-h-32 bg-gray-400">
		<img src="https://picsum.photos/200" alt={building.name} />
	</figure>

	<h3 class="text-center mt-3">{building.name}</h3>
</button>
