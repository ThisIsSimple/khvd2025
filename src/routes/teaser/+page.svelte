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
		<!-- Background Image -->
		<img
			src="/teaser.png"
			alt="KHVD 2025 Teaser Background"
			class="absolute inset-0 w-full h-full object-cover"
		/>

		<!-- Content Container -->
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] px-4 tablet:px-[70px]">
			<div class="flex flex-col gap-[20px] tablet:gap-[28px] items-center">
				<!-- Title: EXHIBITION D-DAY -->
				<h1 class="font-display text-[56px] tablet:text-[132px] leading-none text-black text-center whitespace-nowrap">
					EXHIBITION D-DAY
				</h1>

				<!-- FlipClock Timer -->
				<div class="relative z-10 flex justify-center w-full">
					<FlipClock targetDate={new Date(data.exhibitionStart)} />
				</div>
			</div>
		</div>
	</div>
	<!-- Message Board Section -->
	<MessageBoard />
</div>
