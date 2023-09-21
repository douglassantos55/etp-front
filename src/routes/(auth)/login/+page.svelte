<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let form: ActionData;
</script>

<div class="container mx-auto">
	<form method="post" use:enhance>
		<div class="mb-4">
			<label for="username">Username</label>
			<Input type="text" id="username" name="username" />

			{#if form?.error}
				<span class="text-red-500">{form?.message}</span>
			{/if}
		</div>

		<div class="mb-8">
			<label for="password">Password</label>
			<Input type="password" id="password" name="password" />
		</div>

		<Button type="submit">Login</Button>
	</form>
</div>
