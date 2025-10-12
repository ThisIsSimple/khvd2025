<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 px-6 desktop:px-8">
			<div class="flex justify-between items-center h-16">
				<h1 class="text-2xl font-display">KHVD 2025 Admin</h1>
				<div class="flex items-center gap-4">
					<span class="text-sm text-gray-600">Welcome, {data.user?.username}</span>
					<form method="POST" action="/admin/logout" use:enhance>
						<button
							type="submit"
							class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
						>
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4 px-6 desktop:px-8 py-8">
		<div class="grid grid-cols-1 tablet:grid-cols-3 gap-6">
			<div class="bg-white p-6 rounded-lg shadow">
				<h2 class="text-xl font-display mb-2">Exhibition Management</h2>
				<p class="text-gray-600 mb-4">Manage exhibition content and settings</p>
				<a
					href="/admin/exhibition"
					class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Manage
				</a>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<h2 class="text-xl font-display mb-2">Teaser Settings</h2>
				<p class="text-gray-600 mb-4">Configure teaser page availability</p>
				<a
					href="/admin/teaser"
					class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Configure
				</a>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<h2 class="text-xl font-display mb-2">Analytics</h2>
				<p class="text-gray-600 mb-4">View visitor statistics</p>
				<a
					href="/admin/analytics"
					class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					View Stats
				</a>
			</div>
		</div>
	</main>
</div>
