<script lang="ts">
	export let value = '';
</script>

<input bind:value on:input {...$$props} on:focus on:blur class="border w-full py-2 px-3 rounded-md" />
