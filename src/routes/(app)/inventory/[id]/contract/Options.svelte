<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let companies: User[];

	const dispatch = createEventDispatcher();

	function select(company: User) {
		dispatch('select', company);
	}
</script>

<div class="space-y-1">
	{#each companies as company}
		<button
			type="button"
			on:click={() => select(company)}
			class="w-full flex items-center gap-2 hover:bg-slate-100"
		>
			<img src={company.company_logo} alt={company.company_name} class="w-10 h-10" />
			<span>{company.company_name}</span>
		</button>
	{/each}
</div>
