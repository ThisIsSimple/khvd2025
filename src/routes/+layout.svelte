<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { uiState } from '$lib/stores/ui.svelte';

	let { children, data }: { children: any; data: LayoutData } = $props();
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Check if current page is teaser page
	let isTeaserPage = $derived($page.url.pathname === '/teaser');
	let isMainPage = $derived($page.url.pathname === '/');
</script>

<CustomCursor />

<div class="flex min-h-screen flex-col">
	<!-- Navigation Menu (hidden on teaser page or when UI is hidden) -->
	{#if !uiState.isUIHidden}
		{#if !isTeaserPage && !isMainPage}
			<NavigationMenu bind:isOpen={isMenuOpen} />
		{/if}

		{#if isMainPage}
			<NavigationMenu bind:isOpen={isMenuOpen} noTitle />
		{/if}

		{#if !isTeaserPage && !isMainPage}
			<div class="h-[50px] tablet:h-[80px] desktop:h-[100px]"></div>
		{/if}
	{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	{#if !uiState.isUIHidden}
		<Footer />
	{/if}
</div>
