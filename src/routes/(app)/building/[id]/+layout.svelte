<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CloseIcon from '$lib/components/CloseIcon.svelte';
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

	function handleKeyup(evt: KeyboardEvent) {
		if (evt.key === 'Escape') {
			upgrade = false;
		}
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			role="dialog"
			on:keyup={handleKeyup}
			on:click|self={() => (upgrade = false)}
			class="fixed top-0 left-0 w-screen h-screen py-8 flex items-start justify-center bg-black/70 z-50 max-h-full overflow-y-auto"
		>
			<div class="w-11/12 bg-white p-8 relative max-w-lg">
				<button on:click={() => (upgrade = false)} class="absolute right-3 top-3"
					><CloseIcon /></button
				>

				<h3 class="uppercase text-xl font-bold">Upgrade building</h3>
				<p class="mt-2">Production increase: 100%</p>
				<p>Downtime: 24h</p>

				<table class="w-full table-auto mt-6">
					<thead>
						<tr>
							<th class="text-left">Resource</th>
							<th class="text-right">Stock</th>
							<th class="text-right">Market</th>
						</tr>
					</thead>

					<tbody>
						{#each data.building.requirements as requirement}
							<tr>
								<td>
									<img src={requirement.resource.image} class="w-8 h-8 inline-block" alt="" />
									x{requirement.quantity} @Q{requirement.quality}
								</td>

								<td class="text-right">10 <span class="block text-teal-500">$52</span></td>

								<td class="text-right">152 <span class="block text-teal-500">$10</span></td>
							</tr>
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<td>Total</td>
							<td class="text-right">$1,200,000</td>
							<td class="text-right">$250,000</td>
						</tr>
					</tfoot>
				</table>

				<div class="space-x-4 space-y-4 text-center mt-6">
					<Button>Buy missing</Button>
					<Button disabled>Upgrade</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
