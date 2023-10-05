<script lang="ts">
	function scroll(_el: HTMLElement) {
		setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 2);
	}
</script>

<div class="container px-4 py-12 mx-auto">
	<div class="flex items-center py-2 gap-3 sticky top-20 bg-white">
		<img
			src="https://picsum.photos/100"
			alt="Casas Bahia"
			class="w-12 h-12 rounded-full object-cover"
		/>
		<div>
			<h2 class="font-semibold text-xl leading-4">Casas Bahia</h2>
			<span class="text-sm text-slate-400">Typing...</span>
		</div>

		<a href="/chat" class="ml-auto">&larr; Back</a>
	</div>

	<div class="flex flex-col flex-grow">
		<div class="pt-6 pb-10 space-y-3 overflow-y-auto" use:scroll>
			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some other reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some other reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-indigo-100 py-2 px-4 rounded-full">Some other reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>

			<div class="text-right">
				<p class="inline-block bg-blue-100 py-2 px-4 rounded-full">Some other reply</p>
				<p class="text-xs text-gray-400 mr-3">a few seconds ago</p>
			</div>

			<div>
				<p class="inline-block bg-gray-200 py-2 px-4 rounded-full">Some message</p>
				<p class="text-xs text-gray-400 ms-3">a few seconds ago</p>
			</div>
		</div>
	</div>

	<form>
		<input
			autofocus
			name="message"
			placeholder="Enter your message"
			class="fixed bottom-0 left-0 w-full border-t px-4 py-2"
		/>
	</form>
</div>
