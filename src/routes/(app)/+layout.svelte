<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import CloseIcon from '$lib/components/CloseIcon.svelte';
	import HamburgerIcon from '$lib/components/HamburgerIcon.svelte';
	import { user } from '$lib/stores/user';
	import { format } from '$lib/helper';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let menuVisible = false;

	$: user.set(data.user);

	function toggleMenu() {
		menuVisible = !menuVisible;
	}

	onNavigate(() => {
		menuVisible = false;
	});
</script>

<header class="py-2 bg-stone-100 border-b border-stone-200 sticky top-0 z-50 h-20">
	<div class="container px-4 mx-auto">
		<div class="flex flex-wrap items-center">
			<div class="inline-flex items-center gap-2.5">
				<a href="/company">
					<img
						src={$user.logo}
						alt={$user.name}
						class="w-14 h-14 rounded-full object-cover"
					/>
				</a>

				<div class="py-1">
					<h2 class="text-xl font-semibold tracking-tight">{$user.name}</h2>
					<span class="text-medium tracking-wide">{format($user.available_cash)}</span>
				</div>
			</div>

			<div class="ml-auto">
				<button on:click={toggleMenu} class="sm:hidden">
					<HamburgerIcon />
				</button>

				<div
					class="flex flex-col fixed left-0 top-0 bg-white w-3/4 h-screen py-4 px-4 shadow-xl z-50 sm:py-0 sm:px-0 sm:block sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none sm:z-auto"
					class:hidden={!menuVisible}
				>
					<button on:click={toggleMenu} class="ml-auto sm:hidden">
						<CloseIcon />
					</button>

					<a href="/" class="px-2 py-4">Map</a>
					<a href="/inventory" class="px-2 py-4">Inventory</a>
					<a href="/market" class="px-2 py-4">Market</a>
					<a href="/financing" class="px-2 py-4">Finances</a>
					<a href="/research" class="px-2 py-4">Research</a>
					<a href="/chat" class="px-2 py-4">Chat</a>
				</div>

				<button
					tabindex="-1"
					class="fixed left-0 top-0 w-screen h-screen bg-black/70 z-10"
					class:hidden={!menuVisible}
					on:click={toggleMenu}
				/>
			</div>
		</div>
	</div>
</header>

<slot />
