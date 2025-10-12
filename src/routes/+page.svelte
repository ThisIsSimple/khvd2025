<script lang="ts">
	import { Motion } from 'svelte-motion';
</script>

<svelte:head>
	<title>KHVD 2025 - University Online Exhibition</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
		<div class="max-w-7xl mx-auto px-4 px-6 desktop:px-8 py-24">
			<Motion
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 class="text-5xl tablet:text-7xl font-display mb-6">KHVD 2025</h1>
				<p class="text-xl tablet:text-2xl mb-8 max-w-2xl">
					University Online Exhibition - Showcasing Innovation and Creativity
				</p>
				<div class="flex gap-4">
					<a
						href="/exhibition"
						class="px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
					>
						View Exhibition
					</a>
					<a
						href="/teaser"
						class="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white hover:text-purple-900 transition-colors"
					>
						Teaser
					</a>
				</div>
			</Motion>
		</div>
	</section>

	<!-- About Section -->
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 px-6 desktop:px-8">
			<h2 class="text-4xl font-display mb-8 text-center">About the Exhibition</h2>
			<div class="grid grid-cols-1 tablet:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="text-4xl mb-4">🎨</div>
					<h3 class="text-xl font-display mb-2">Creative Works</h3>
					<p class="text-gray-600">Explore innovative projects from talented students</p>
				</div>
				<div class="text-center">
					<div class="text-4xl mb-4">🌟</div>
					<h3 class="text-xl font-display mb-2">Innovation</h3>
					<p class="text-gray-600">Discover cutting-edge ideas and solutions</p>
				</div>
				<div class="text-center">
					<div class="text-4xl mb-4">🚀</div>
					<h3 class="text-xl font-display mb-2">Future Vision</h3>
					<p class="text-gray-600">Experience the future of design and technology</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Links -->
	<section class="py-16 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 px-6 desktop:px-8">
			<div class="grid grid-cols-1 tablet:grid-cols-2 gap-6">
				<a
					href="/exhibition/works"
					class="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
				>
					<h3 class="text-2xl font-display mb-2">Browse Works</h3>
					<p class="text-gray-600">View all exhibition works →</p>
				</a>
				<a
					href="/teaser"
					class="block p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
				>
					<h3 class="text-2xl font-display mb-2">Coming Soon</h3>
					<p class="text-gray-600">Check out our teaser page →</p>
				</a>
			</div>
		</div>
	</section>
</div>
