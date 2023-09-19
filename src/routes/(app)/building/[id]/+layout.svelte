<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let input: any;
	let rename: boolean = false;

	function triggerRename() {
		rename = !rename;
	}

	function handleKeypress(evt: KeyboardEvent) {
		if (evt.key === 'Escape' || evt.key === 'Enter') {
			update();
		}
	}

	function update() {
		console.log('updating');
		rename = false;
	}

	$: rename && input && input.focus();
</script>

<div class="container mx-auto py-12">
	<div class="mb-12">
		<h2 class="text-4xl tracking-tight font-semibold">
			{#if rename}
				<input
					type="text"
					class="focus:border-0 focus:ring-0 tracking-tight"
					bind:this={input}
					bind:value={data.building.name}
					on:keyup={handleKeypress}
					on:blur={() => update()}
				/>
			{:else}
				{data.building.name}

				<button
					type="button"
					on:click={triggerRename}
					class="text-base text-blue-700 underline tracking-tight">Rename</button
				>
			{/if}
		</h2>

		<span class="font-medium uppercase">Level {data.building.level}</span>
	</div>

	<slot />
</div>
