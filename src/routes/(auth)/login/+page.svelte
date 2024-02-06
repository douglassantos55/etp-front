<script lang="ts">
	import { applyAction } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/company';

	export let form: {
		errors: Record<string, string>;
	};

	let data = { email: '', password: '' };

	async function authenticate() {
		const result = await login(data);

		if (result.errors || result.message) {
			await applyAction({ type: 'failure', status: 400, data: result });
		} else if (result.data) {
			localStorage.setItem('access_token', result.data.token);
			goto('/');
		}
	}
</script>

<div class="mx-auto w-96">
	<form method="post" on:submit|preventDefault={authenticate}>
		<div class="mb-4">
			<label for="email">Email</label>
			<Input type="email" id="email" name="email" bind:value={data.email} />

			{#if form?.errors?.email}
				<span class="text-red-500">{form?.errors.email}</span>
			{/if}
		</div>

		<div class="mb-8">
			<label for="password">Password</label>
			<Input type="password" id="password" name="password" bind:value={data.password} />

			{#if form?.errors?.password}
				<span class="text-red-500">{form?.errors.password}</span>
			{/if}
		</div>

		<Button type="submit" size="full">Login</Button>

		<div class="mt-6 text-center">
			<a href="/register" class="hover:underline underline-offset-4">Create an account</a>
		</div>
	</form>
</div>
