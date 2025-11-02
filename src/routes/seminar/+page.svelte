<script lang="ts">
	import SeminarCard from '$lib/components/SeminarCard.svelte';
	import SeminarInfo from '$lib/components/SeminarInfo.svelte';
	import type { PageData } from './$types';
	import type { Seminar } from '$lib/types/seminar';

	let { data }: { data: PageData } = $props();

	// State for selected seminar - initially the highlighted one or first seminar
	let selectedSeminar = $state<Seminar>(
		data.seminarDays.flatMap((day) => day.seminars).find((s) => s.highlighted) ||
			data.seminarDays[0].seminars[0]
	);
</script>

<svelte:head>
	<title>세미나 일정 - KHVD 2025</title>
</svelte:head>

<div
	class="grid grid-cols-3 gap-[20px] px-[20px] tablet:px-[40px] xl:px-[60px] pb-[200px] min-h-screen"
>
	<!-- 11.06, 11.07 Column -->
	{#each data.seminarDays as day}
		<div class="flex flex-col">
			<!-- Sticky Date Header -->
			<div class="sticky top-0 bg-white z-10 flex gap-[16px] h-[120px] items-center">
				<p class="font-display text-[60px] leading-none text-[#111111]">
					{day.date}
				</p>
			</div>

			<!-- Seminar List -->
			<div class="flex flex-col gap-[60px] pt-[28px] pb-[82px]">
				{#each day.seminars as seminar (seminar.id)}
					<SeminarCard
						{seminar}
						isSelected={selectedSeminar.id === seminar.id}
						onClick={() => {
							selectedSeminar = seminar;
						}}
					/>
				{/each}
			</div>
		</div>
	{/each}

	<!-- INFO Section (Sticky Right Column) -->
	<div class="flex flex-col">
		<!-- Sticky INFO Header -->
		<div class="sticky top-0 bg-white z-10 flex gap-[10px] h-[120px] items-center">
			<p class="font-display text-[60px] leading-none text-[#111111]">INFO</p>
		</div>

		<!-- Sticky INFO Content -->
		<div class="sticky top-[120px] px-[8px] py-[72px]">
			<SeminarInfo seminar={selectedSeminar} />
		</div>
	</div>
</div>
