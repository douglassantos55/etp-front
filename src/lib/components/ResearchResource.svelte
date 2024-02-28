<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Currency from '$lib/components/Currency.svelte';

	export let resource: Resource;

	async function research() {
		console.log('research');
	}
</script>

<div>
	<img src={resource.image} alt={resource.name} class="w-32 h-32 mb-2" />
	<span class="uppercase font-semibold">{resource.name}</span>

	<div class="rounded-xl bg-stone-100 h-2 w-32 mt-2 mb-3">
		<div class="rounded-xl bg-teal-500 h-2" style:width="{resource.patents}%" />
	</div>

	<div>
		<p>
			Investment:
			<span class="block tracking-tight">
				<Currency value={resource.investment} />
			</span>
		</p>
		<p class="mb-3">
			Duration:
			<span class="text-teal-500 tracking-tight">
				{resource.duration} hrs
			</span>
		</p>

		<Button on:click={research}>Research</Button>
	</div>
</div>
