<script lang="ts">
	import { user } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: console.log(data);
	$: user.set(data.user);
</script>

<header class="py-4 bg-stone-100 border-b border-stone-200">
	<div class="container mx-auto">
		<div class="flex items-center">
			<div class="inline-flex gap-2.5">
				<a href="/company">
					<img src={$user.company_logo} alt={$user.company_name} class="w-14 h-full object-cover" />
				</a>

				<div class="py-1">
					<h2 class="text-xl font-semibold tracking-tight">{$user.company_name}</h2>
					<span class="text-medium tracking-wide">$ {$user.available_cash}</span>
				</div>
			</div>

			<div class="ml-auto">
				<a href="/inventory" class="px-4">Inventory</a>
				<a href="/market" class="px-4">Market</a>
				<a href="/financing" class="px-4">Finances</a>
				<a href="/research" class="px-4">Research</a>
				<a href="/chat" class="px-4">Chat</a>
			</div>
		</div>
	</div>
</header>

<slot />
