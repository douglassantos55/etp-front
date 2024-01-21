<script lang="ts">
	export let stock: number;
	export let quantity: number;
	export let requirement: Requirement;

	$: error = quantity * requirement.quantity > stock;
	$: total = quantity ? quantity * requirement.quantity : requirement.quantity;
</script>

<div class="flex items-center gap-2" class:text-red-500={error}>
	{total}x
	<img src={requirement.resource.image} alt={requirement.resource.name} class="w-10 h-10" />
</div>
