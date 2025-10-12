<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>KHVD 2025 Exhibition</title>
</svelte:head>

<div class="min-h-screen">
	<header class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 px-6 desktop:px-8 py-6">
			<h1 class="text-4xl font-display">KHVD 2025 Exhibition</h1>
			<p class="text-gray-600 mt-2">University Online Exhibition</p>
		</div>
	</header>

	<main class="max-w-7xl mx-auto px-4 px-6 desktop:px-8 py-12">
		{#if data.isAvailable}
			<div class="prose max-w-none">
				<h2>Welcome to the Exhibition</h2>
				<p>Exhibition content will be displayed here.</p>

				<!-- Exhibition content grid -->
				<div class="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mt-8">
					<div class="bg-white p-6 rounded-lg shadow">
						<h3 class="font-display text-xl mb-2">Project 1</h3>
						<p class="text-gray-600">Project description...</p>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<h3 class="font-display text-xl mb-2">Project 2</h3>
						<p class="text-gray-600">Project description...</p>
					</div>

					<div class="bg-white p-6 rounded-lg shadow">
						<h3 class="font-display text-xl mb-2">Project 3</h3>
						<p class="text-gray-600">Project description...</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center py-16">
				<h2 class="text-3xl font-display mb-4">Exhibition Not Available</h2>
				<p class="text-gray-600 mb-4">
					The exhibition is not currently available. Please check back during the exhibition period.
				</p>
				<p class="text-sm text-gray-500">
					Exhibition dates: {new Date(data.exhibitionStart).toLocaleDateString()} - {new Date(
						data.exhibitionEnd
					).toLocaleDateString()}
				</p>
			</div>
		{/if}
	</main>
</div>
