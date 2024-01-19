<script lang="ts">
	import { applyAction } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	export let form: {
		errors: Record<string, string>;
	};

	async function authenticate(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data,
			headers: { Accept: 'application/json' }
		});

		const result = await response.json();
		const type = result.errors ? 'failure' : 'success';

		if (type == 'success') {
			localStorage.setItem('access_token', result.token);
			goto('/');
		} else {
			await applyAction({ type, status: response.status, data: result });
		}
	}
</script>

<div class="mx-auto">
	<form
		method="post"
		on:submit|preventDefault={authenticate}
		action="http://localhost:1323/companies/login"
	>
		<div class="mb-4">
			<label for="email">Email</label>
			<Input type="email" id="email" name="email" />

			{#if form?.errors?.email}
				<span class="text-red-500">{form?.errors.email}</span>
			{/if}
		</div>

		<div class="mb-8">
			<label for="password">Password</label>
			<Input type="password" id="password" name="password" />

			{#if form?.errors?.password}
				<span class="text-red-500">{form?.errors.password}</span>
			{/if}
		</div>

		<Button type="submit">Login</Button>
	</form>
</div>
