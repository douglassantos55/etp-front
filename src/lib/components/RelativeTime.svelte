<script lang="ts">
	import Time from './Time.svelte';

	export let value: string;

	$: diff = (new Date(value).getTime() - Date.now()) / 1000 / 60;
</script>

<Time value={Math.floor(diff)} />
