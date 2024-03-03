<script lang="ts">
	import { toHoursAndMinutes } from '$lib/helper';

	export let seconds: number;
</script>

<span class="text-orange-800">{toHoursAndMinutes(seconds)}</span>
