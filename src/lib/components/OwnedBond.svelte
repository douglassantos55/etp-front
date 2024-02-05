<script lang="ts">
	import { format, percent } from '$lib/helper';

	export let creditor: Creditor;
</script>

<div class="p-6 shadow-md bg-gray-100">
	<img src="https://picsum.photos/100" alt={creditor.name} class="w-16 h-16 rounded-full" />

	<div class="mt-2">
		<h3 class="font-semibold mb-1">{creditor.name}</h3>
		<p>
			Amount:
			<span class="text-teal-500">{format(creditor.principal - creditor.principal_paid)}</span>
		</p>
		<p>
			Interest rate:
			<span class="text-teal-500">{percent(creditor.interest_rate)}</span>
		</p>
		<p>
			Interest payment:
			<span class="text-teal-500">{format(creditor.principal * creditor.interest_rate)}</span>
		</p>
		<p>
			Interest received:
			<span class="text-teal-500">{format(creditor.interest_paid)}</span>
		</p>
	</div>
</div>
