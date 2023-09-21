<script lang="ts">
	type ButtonVariant = 'hollow' | 'primary' | undefined;
	export let variant: ButtonVariant = 'primary';
</script>

<button
	on:click
	{...$$props}
	class:border={variant === 'hollow'}
	class:hover:bg-slate-100={variant === 'hollow'}
	class:text-white={variant === 'primary'}
	class:bg-indigo-600={variant === 'primary'}
	class:hover:bg-indigo-500={variant === 'primary'}
	class="py-2 px-3 w-full rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
>
	<slot />
</button>
