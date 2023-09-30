<script lang="ts">
	const companies = [
		{ name: 'Marfrig', last_message: 'Hey man, that is pretty cool!', timestamp: 'yesterday' },
		{ name: 'Coca-Cola', last_message: 'That sounds good, thanks', timestamp: '2 days ago' },
		{
			name: 'Tesla',
			last_message: 'You cannot miss this oportunity',
			timestamp: 'a few seconds ago'
		},
		{
			name: 'Microsoft',
			last_message: 'No problem, we will look into it',
			timestamp: 'one minute ago'
		},
		{ name: 'Amazon', last_message: 'Your order is on the way!', timestamp: '30 minutes ago' },
		{ name: 'Turso', last_message: 'Check this out', timestamp: '2 hours ago' },
		{ name: 'Google', last_message: 'Hey man, that is pretty cool!', timestamp: 'yesterday' },
		{ name: 'Casas Bahia', last_message: 'Delivery for you', timestamp: 'a year ago' },
		{
			name: 'Netflix',
			last_message: 'New shows are available in your region',
			timestamp: 'a month ago'
		},
		{ name: 'McDonalds', last_message: '', timestamp: '' }
	];
</script>

<div class="container px-4 mx-auto py-12">
	<div class="grid sm:grid-cols-2 py-2 gap-8">
		{#each { length: 10 } as _, i}
			<a href={`/chat/${i}`} class="flex items-center gap-4">
				<img
					src="https://picsum.photos/100"
					class="w-16 h-16 mb-1 rounded-full object-cover"
					alt="company"
				/>

				<div class="flex-shrink">
					<h3 class="font-semibold">{companies[i].name}</h3>

					<p>{companies[i].last_message}</p>
					<p class="text-xs text-gray-400">{companies[i].timestamp}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
