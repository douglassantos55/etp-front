<script lang="ts">
	import { format } from '$lib/helper';

	export let value: number;
</script>

<span class="text-teal-500">{format(value)}</span>
