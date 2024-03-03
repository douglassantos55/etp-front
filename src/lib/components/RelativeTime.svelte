<script lang="ts">
	import Time from './Time.svelte';

	export let value: string;

	$: diff = (new Date(value).getTime() - Date.now()) / 1000;

	setInterval(() => diff--, 1000);
</script>

<Time seconds={Math.floor(diff)} />
