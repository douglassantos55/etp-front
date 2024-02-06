<script lang="ts">
	import { goto } from '$app/navigation';
	import { applyAction } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { registerCompany } from '$lib/api/company';

	export let form: {
		message?: string;
		errors?: Record<string, string>;
	};

	let data = {
		name: '',
		email: '',
		password: '',
		confirm_password: ''
	};

	async function register() {
		const result = await registerCompany(data);

		if (result.errors || result.message) {
			await applyAction({ type: 'failure', status: 401, data: result });
		} else if (result.data) {
			localStorage.setItem('access_token', result.data.token);
			goto('/');
		}
	}
</script>

<div class="mx-auto w-96">
	<form
		method="post"
		on:submit|preventDefault={register}
		action="http://localhost:1323/companies/register"
	>
		<div class="mb-4">
			<label for="name">Name</label>
			<Input type="name" id="name" name="name" bind:value={data.name} />

			{#if form?.errors?.name}
				<span class="text-red-500">{form?.errors.name}</span>
			{/if}
		</div>

		<div class="mb-4">
			<label for="email">Email</label>
			<Input type="email" id="email" name="email" bind:value={data.email} />

			{#if form?.errors?.email}
				<span class="text-red-500">{form?.errors.email}</span>
			{/if}
		</div>

		<div class="mb-4">
			<label for="password">Password</label>
			<Input type="password" id="password" name="password" bind:value={data.password} />

			{#if form?.errors?.password}
				<span class="text-red-500">{form?.errors.password}</span>
			{/if}
		</div>

		<div class="mb-8">
			<label for="confirm-password">Confirm Password</label>
			<Input
				type="password"
				id="confirm-password"
				name="confirm_password"
				bind:value={data.confirm_password}
			/>

			{#if form?.errors?.confirm_password}
				<span class="text-red-500">{form?.errors.confirm_password}</span>
			{/if}
		</div>

		<Button type="submit" size="full">Register</Button>

		<div class="mt-6 text-center">
			<a href="/login" class="hover:underline underline-offset-4">Already have an account</a>
		</div>
	</form>
</div>
