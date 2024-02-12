<script lang="ts">
	import notifications from '$lib/stores/notification';
</script>

<div class="absolute space-y-2 max-w-96 z-50 top-10 right-10">
	{#each Object.values($notifications) as { message, type }}
		<div
			class="px-4 py-2 rounded-lg shadow-lg"
			class:bg-red-500={type === 'error'}
			class:bg-green-500={type === 'success'}
			class:bg-blue-500={type === 'info'}
			class:bg-yellow-500={type === 'warning'}
			class:text-white={['error', 'info', 'success'].includes(type)}
		>
			{message}
		</div>
	{/each}
</div>
