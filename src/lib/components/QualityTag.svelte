<script lang="ts">
	type Size = 'xs' | 'sm' | 'md' | 'lg';

	export let size: Size = 'sm';
	export let quality: number;
</script>

<span
	class:text-xs={size == 'xs'}
	class:text-sm={size == 'sm'}
	class:text-md={size == 'md'}
	class:text-lg={size == 'lg'}
	class="-top-1 right-1 absolute bg-gray-700 text-white font-semibold p-1 shadow"
>
	Q{quality}
</span>
