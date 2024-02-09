<script lang="ts">
	import CloseIcon from './CloseIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleKeyup(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			dispatch('close');
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	role="dialog"
	on:keyup={handleKeyup}
	on:click|self={() => dispatch('close')}
	class="fixed top-0 left-0 w-screen h-screen py-8 flex items-start justify-center bg-black/70 z-50 max-h-full overflow-y-auto"
>
	<div class="w-11/12 bg-white p-8 relative max-w-lg">
		<button on:click={() => dispatch('close')} class="absolute right-3 top-3"><CloseIcon /></button>

		<slot />
	</div>
</div>
