<script lang="ts">
	import { Motion } from 'svelte-motion';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>KHVD 2025 - Coming Soon</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center"
>
	{#if data.isAvailable}
		<Motion
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div class="text-center text-white px-4">
				<h1 class="text-6xl tablet:text-8xl font-display mb-6">KHVD 2025</h1>

				<Motion
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					<p class="text-2xl tablet:text-3xl mb-8">University Online Exhibition</p>
				</Motion>

				<Motion
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.8 }}
				>
					<div class="mb-12">
						<p class="text-lg mb-2">Opening Soon</p>
						<p class="text-4xl font-display">
							{new Date(data.exhibitionStart).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
				</Motion>

				<Motion
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
				>
					<div class="space-y-4">
						<p class="text-gray-300">Stay tuned for an amazing showcase of creativity</p>

						<div class="flex gap-4 justify-center">
							<a
								href="/"
								class="px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
							>
								Learn More
							</a>
						</div>
					</div>
				</Motion>
			</div>
		</Motion>
	{:else}
		<div class="text-center text-white px-4">
			<h1 class="text-4xl font-display mb-4">Teaser Page Not Available</h1>
			<p class="text-gray-300 mb-8">The teaser page is only available during the teaser period.</p>
			<p class="text-sm text-gray-400">
				Teaser period: {new Date(data.teaserStart).toLocaleDateString()} - {new Date(
					data.teaserEnd
				).toLocaleDateString()}
			</p>
			<a
				href="/"
				class="inline-block mt-6 px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
			>
				Go Home
			</a>
		</div>
	{/if}
</div>
