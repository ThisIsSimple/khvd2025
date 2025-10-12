<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	let { children }: { children: any } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
