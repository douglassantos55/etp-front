<script lang="ts">
	import '../app.css';
	import { user } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: user.set(data.user);
</script>

<header class="py-4 bg-stone-100 border-b border-stone-200">
	<div class="container mx-auto">
		<div class="inline-flex gap-2.5">
			<a href="/company">
				<img src={$user.company_logo} alt={$user.company_name} class="w-14 h-full object-cover" />
			</a>

			<div class="py-1">
				<h2 class="text-xl font-semibold tracking-tight">{$user.company_name}</h2>
				<span class="text-medium tracking-wide">$ {$user.available_cash}</span>
			</div>
		</div>
	</div>
</header>

<slot />
