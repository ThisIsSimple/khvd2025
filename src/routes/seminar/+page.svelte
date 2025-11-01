<script lang="ts">
	import SeminarCard from '$lib/components/SeminarCard.svelte';
	import SeminarInfo from '$lib/components/SeminarInfo.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Get the first highlighted seminar for the INFO panel (or first seminar if none highlighted)
	const featuredSeminar =
		data.seminarDays
			.flatMap((day) => day.seminars)
			.find((seminar) => seminar.highlighted) || data.seminarDays[0]?.seminars[0];
</script>

<svelte:head>
	<title>세미나 일정 - KHVD 2025</title>
</svelte:head>

<div class="flex gap-[20px] px-[60px] pb-[200px] min-h-screen">
	<!-- Seminar Days Container (2 columns) -->
	<div class="flex gap-[20px] flex-1">
		{#each data.seminarDays as day}
			<div class="flex flex-col flex-1 min-w-0">
				<!-- Sticky Date Header -->
				<div class="sticky top-0 bg-white z-10 flex gap-[16px] h-[120px] items-center">
					<p class="font-display text-[60px] leading-none text-[#111111]">
						{day.date}
					</p>
				</div>

				<!-- Seminar List -->
				<div class="flex flex-col gap-[60px] pt-[28px] pb-[82px]">
					{#each day.seminars as seminar (seminar.id)}
						<SeminarCard {seminar} />
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- INFO Section (Sticky Right Column) -->
	<div class="flex flex-col flex-1 min-w-0">
		<!-- Sticky INFO Header -->
		<div class="sticky top-0 bg-white z-10 flex gap-[10px] h-[120px] items-center">
			<p class="font-display text-[60px] leading-none text-[#111111]">INFO</p>
		</div>

		<!-- Sticky INFO Content -->
		<div class="sticky top-[120px] px-[8px] py-[72px]">
			{#if featuredSeminar}
				<SeminarInfo seminar={featuredSeminar} />
			{/if}
		</div>
	</div>
</div>
