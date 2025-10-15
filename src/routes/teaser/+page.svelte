<script lang="ts">
	import { Motion } from 'svelte-motion';
	import type { PageData } from './$types';
	import FlipClock from '$lib/components/FlipClock.svelte';
	import MessageBoard from '$lib/components/MessageBoard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>KHVD 2025 - Coming Soon</title>
</svelte:head>

<div class="relative min-h-screen">
	<div class="relative inset-0 w-full h-screen">
		<img src="/teaser.png" alt="KHVD 2025 Teaser Background" class="w-full h-full object-cover" />

		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div class="w-full">
				<div class="relative z-10 text-center text-black px-4">
					<h1 class="text-h3 tablet:text-h2 font-display mb-6">EXHIBITION D-DAY</h1>
				</div>

				<div class="relative z-10 flex justify-center">
					<FlipClock targetDate={new Date(data.exhibitionStart)} />
				</div>
			</div>
		</div>
	</div>
	<!-- Message Board Section -->
	<MessageBoard />
</div>
