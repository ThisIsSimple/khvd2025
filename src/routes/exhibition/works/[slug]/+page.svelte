<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-4xl mx-auto px-4 px-6 desktop:px-8 py-12">
		<a href="/exhibition/works" class="text-blue-600 hover:underline mb-4 inline-block">
			← Back to Works
		</a>

		<article class="bg-white rounded-lg shadow-md p-8">
			<h1 class="text-4xl font-display mb-4">{data.slug}</h1>

			<div class="mb-6">
				<p class="text-gray-600">Artist Name</p>
				<p class="text-gray-600">Department / Year</p>
			</div>

			<div class="mb-8">
				<div class="aspect-video bg-gray-200 rounded-lg"></div>
			</div>

			<div class="prose max-w-none">
				<h2>About this work</h2>
				<p>Detailed description of the work will be displayed here.</p>

				<h2>Artist Statement</h2>
				<p>Artist's statement about their work...</p>
			</div>
		</article>
	</div>
</div>
