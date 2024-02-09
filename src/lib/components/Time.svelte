<script lang="ts">
	export let value: number;

	$: hours = Math.floor(value / 60);
	$: minutes = value % 60;
</script>

<span>
	{hours}h {#if minutes > 0}{minutes}m{/if}
</span>
