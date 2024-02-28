<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { cancelSearch } from '$lib/api/research';
	import notification from '$lib/stores/notification';

	import Button from '$lib/components/Button.svelte';
	import RelativeTime from '$lib/components/RelativeTime.svelte';

	export let search: Search;

	async function cancel() {
		try {
			await cancelSearch(search.id);
			await invalidateAll();
		} catch (err) {
			notification.add('An error ocurred while canceling search', 'error');
		}
	}

	$: expertise = search.expertise == 0 ? 'Graduate' : 'Experienced';
</script>

<div class="px-3 py-4 shadow-lg border border-gray-100">
	<div class="flex items-center gap-3">
		<div class="flex flex-col flex-wrap">
			<h3 class="font-semibold">{expertise}</h3>
			<p class="text-sm leading-snug">Search ends in</p>

			<span class="text-teal-500 leading-snug tracking-tight">
				<RelativeTime value={search.finishes_at} />
			</span>
		</div>

		<div class="ml-auto text-right">
			<Button variant="hollow" on:click={cancel}>Cancel</Button>
		</div>
	</div>
</div>
