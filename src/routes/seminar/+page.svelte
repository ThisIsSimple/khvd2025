<script lang="ts">
	import SeminarCard from '$lib/components/SeminarCard.svelte';
	import SeminarInfo from '$lib/components/SeminarInfo.svelte';
	import SeminarModal from '$lib/components/SeminarModal.svelte';
	import type { PageData } from './$types';
	import type { Seminar } from '$lib/types/seminar';

	let { data }: { data: PageData } = $props();

	// State for selected seminar - initially the highlighted one or first seminar
	let selectedSeminar = $state<Seminar>(
		data.seminarDays.flatMap((day) => day.seminars).find((s) => s.highlighted) ||
			data.seminarDays[0].seminars[0]
	);

	// Modal state for tablet/mobile
	let showModal = $state(false);
	let modalSeminar = $state<Seminar | null>(null);

	// Handle card click - show modal on tablet/mobile only, update INFO on desktop
	function handleCardClick(seminar: Seminar) {
		selectedSeminar = seminar;

		// Only show modal on tablet/mobile (< 960px)
		if (typeof window !== 'undefined' && window.innerWidth < 960) {
			modalSeminar = seminar;
			showModal = true;
		}
	}

	function closeModal() {
		showModal = false;
	}
</script>

<svelte:head>
	<title>세미나 일정 - KHVD 2025</title>
</svelte:head>

<div
	class="grid grid-cols-2 tablet:grid-cols-3 gap-[20px] px-[20px] tablet:px-[40px] desktop:px-[60px] pb-[200px] min-h-screen"
>
	<!-- 11.06, 11.07 Column -->
	{#each data.seminarDays as day}
		<div class="flex flex-col">
			<!-- Sticky Date Header -->
			<div
				class="sticky bg-white z-10 flex gap-[16px] h-[80px] sm:h-[80px] tablet:h-[120px] items-center"
				style="top: var(--nav-height, 0px)"
			>
				<p
					class="font-display text-[24px] sm:text-[32px] tablet:text-[60px] leading-none text-[#111111]"
				>
					{day.date}
				</p>
			</div>

			<!-- Seminar List -->
			<div class="flex flex-col gap-[60px] pt-[28px] pb-[82px]">
				{#each day.seminars as seminar (seminar.id)}
					<SeminarCard
						{seminar}
						isSelected={selectedSeminar.id === seminar.id}
						onClick={() => handleCardClick(seminar)}
					/>
				{/each}
			</div>
		</div>
	{/each}

	<!-- INFO Section (Sticky Right Column) - Hidden on tablet and below -->
	<div class="hidden tablet:flex flex-col">
		<!-- Sticky INFO Header -->
		<div
			class="sticky bg-white z-10 flex gap-[10px] h-[60px] sm:h-[80px] tablet:h-[120px] items-center"
			style="top: var(--nav-height, 0px); --info-header-height: 60px;"
		>
			<style>
				@media (min-width: 421px) {
					div {
						--info-header-height: 80px;
					}
				}
				@media (min-width: 960px) {
					div {
						--info-header-height: 120px;
					}
				}
			</style>
			<p class="font-display text-[60px] leading-none text-[#111111]">INFO</p>
		</div>

		<!-- Sticky INFO Content -->
		<div
			class="sticky px-[8px] py-[24px] sm:py-[32px] tablet:py-[72px]"
			style="top: calc(var(--nav-height, 0px) + var(--info-header-height, 60px));"
		>
			<SeminarInfo seminar={selectedSeminar} />
		</div>
	</div>
</div>

<!-- Seminar Modal for Tablet/Mobile -->
{#if modalSeminar}
	<SeminarModal seminar={modalSeminar} isOpen={showModal} onClose={closeModal} />
{/if}
