<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import UpgradeBuilding from '$lib/components/UpgradeBuilding.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let input: any;
	let upgrade = false;
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
		rename = false;
	}

	$: rename && input && input.focus();
</script>

<div class="container mx-auto px-4 py-12">
	<div class="flex flex-wrap items-center gap-4 mb-12">
		<div class="mr-auto lg:mr-10">
			<h2 class="text-2xl tracking-tight font-semibold">
				{#if rename}
					<input
						type="text"
						class="w-full focus:border-0 focus:ring-0 tracking-tight"
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

		<Button on:click={() => (upgrade = true)}>Upgrade</Button>
	</div>

	<slot />

	{#if upgrade}
		<UpgradeBuilding building={data.building} on:close={() => (upgrade = false)} />
	{/if}
</div>
