<script lang="ts">
	type Size = 'full' | 'auto';
	type ButtonVariant = 'hollow' | 'primary' | undefined;

	export let size: Size = 'auto';
	export let variant: ButtonVariant = 'primary';

	$: component = $$props.href ? 'a' : 'button';
</script>

<svelte:element
	this={component}
	on:click
	role="button"
	tabindex="0"
	{...$$props}
	class:w-full={size === 'full'}
	class:border={variant === 'hollow'}
	class:hover:bg-slate-100={variant === 'hollow'}
	class:text-white={variant === 'primary'}
	class:bg-indigo-600={variant === 'primary'}
	class:hover:bg-indigo-500={variant === 'primary'}
	class="py-2 px-3 inline-block rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
>
	<slot />
</svelte:element>
