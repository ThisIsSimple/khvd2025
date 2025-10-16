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
	<!-- Navigation Menu (Type 2 by default: header with title, logo, and menu button) -->
	<NavigationMenu bind:isOpen={isMenuOpen} />

	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
