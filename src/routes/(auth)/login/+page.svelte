<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container mx-auto">
	<form method="post" use:enhance>
		<div class="mb-4">
			<label for="username">Username</label>
			<input
				type="text"
				id="username"
				name="username"
				class="border w-full py-3 px-4 mt-2 rounded-md"
			/>

			{#if form?.error}
				<span class="text-red-500">{form?.message}</span>
			{/if}
		</div>

		<div class="mb-8">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				class="border w-full py-3 px-4 mt-2 rounded-md"
			/>
		</div>

		<button
			type="submit"
			class="p-4 w-full text-white bg-indigo-600 rounded-xl text-lg font-semibold">Login</button
		>
	</form>
</div>
