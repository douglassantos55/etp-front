<script lang="ts">
	import { toHoursAndMinutes } from '$lib/helper';

	export let value: number;
</script>

<span class="text-orange-800">{toHoursAndMinutes(value)}</span>
