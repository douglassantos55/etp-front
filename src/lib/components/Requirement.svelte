<script lang="ts">
	import { useErrors } from '$lib/errors';

	export let stock: number;
	export let quantity: number;
	export let requirement: Requirement;

	const errors = useErrors();

	$: total = quantity ? quantity * requirement.quantity : requirement.quantity;
	$: error = total > stock;

	$: {
		if (error) {
			errors.add(requirement.resource.id, 'not enough ' + requirement.resource.name);
		} else {
			errors.remove(requirement.resource.id);
		}
	}
</script>

<div class="flex items-center gap-2" class:text-red-500={error}>
	{total}x
	<img src={requirement.resource.image} alt={requirement.resource.name} class="w-10 h-10" />
</div>
