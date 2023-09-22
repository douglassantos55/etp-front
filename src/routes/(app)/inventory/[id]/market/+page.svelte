<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

<form>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 items-end max-w-xl">
		<div class="shrink-0">
			<label for="qty">Qty</label>
			<Input id="qty" name="qty" type="number" />
		</div>

		<div>
			<label for="price">Price/unit</label>
			<Input id="price" name="price" />
		</div>

		<Button type="submit">Place order</Button>
	</div>
</form>
