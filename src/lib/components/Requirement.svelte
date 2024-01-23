<script lang="ts">
	import { useErrors } from '$lib/errors';

	export let stock: number;
	export let quality: number;
	export let quantity: number;
	export let requirement: Requirement;

	const errors = useErrors();

	$: total = quantity ? quantity * requirement.quantity : requirement.quantity;
	$: error = total > stock;
	$: diff = total - stock;

	$: {
		if (error) {
			errors.add(
				requirement.resource.id,
				'Not enough ' +
					requirement.resource.name +
					'. <span class="text-blue-500 text-sm"><a href="/market?resource=' +
					requirement.resource.id +
					'&qty=' +
					diff +
					'&quality=' +
					Math.max(quality - 1, 0) +
					'">(Purchase on market)</a></span>'
			);
		} else {
			errors.remove(requirement.resource.id);
		}
	}
</script>

<div class="flex items-center gap-2" class:text-red-500={error}>
	{total}x
	<img src={requirement.resource.image} alt={requirement.resource.name} class="w-10 h-10" />
</div>
