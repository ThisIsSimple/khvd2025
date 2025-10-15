<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import NavigationMenu from '$lib/components/NavigationMenu.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<CustomCursor />

<div class="flex min-h-screen flex-col">
	<!-- Hamburger Menu Button (visible on all pages) -->
	<button
		onclick={toggleMenu}
		class="fixed top-[20px] right-[20px] w-[60px] h-[60px] bg-black flex flex-col items-center justify-center gap-[11px] z-40 transition-opacity hover:opacity-80"
		aria-label="Toggle menu"
	>
		<div class="w-[32.5px] h-[3px] bg-white"></div>
		<div class="w-[32.5px] h-[3px] bg-white"></div>
		<div class="w-[32.5px] h-[3px] bg-white"></div>
	</button>

	<!-- Navigation Menu Drawer -->
	<NavigationMenu bind:isOpen={isMenuOpen} />

	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
