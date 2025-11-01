<script lang="ts">
	import type { Seminar } from '$lib/types/seminar';

	interface Props {
		seminar: Seminar;
	}

	let { seminar }: Props = $props();
</script>

<div class="flex flex-col gap-[12px] bg-[#ffeae0] overflow-clip rounded-[8px]">
	<!-- Title Section -->
	<div class="flex flex-col gap-[32px] items-start justify-center px-[40px] pt-[32px] pb-[24px]">
		<div class="flex flex-col gap-[2px] items-start justify-center overflow-clip w-full">
			<!-- Category Tag -->
			<div class="flex gap-[10px] items-center justify-center px-[3px]">
				<p class="font-bold text-[18px] leading-[1.4] text-primary w-[195px]">
					{seminar.category}
				</p>
			</div>

			<!-- Title -->
			<p class="font-bold text-[28px] leading-[1.4] text-[#111111] w-full">
				{seminar.title}
			</p>
		</div>
	</div>

	<!-- Description Section -->
	{#if seminar.description}
		<div class="flex flex-col gap-[12px] items-start justify-center px-[40px] py-[24px]">
			<p class="font-bold text-[20px] leading-[1.4] text-[#111111] w-full">세미나 내용</p>
			<p class="text-[20px] leading-[1.5] text-[#222222] w-full">
				{seminar.description}
			</p>
		</div>
	{/if}

	<!-- Schedule Section -->
	<div class="flex flex-col gap-[12px] items-start justify-center px-[40px] py-[24px]">
		<p class="font-bold text-[20px] leading-[1.4] text-[#111111] w-full">일정</p>
		<p class="font-bold text-[20px] leading-[1.4] text-[#222222] w-full whitespace-pre-wrap">
			{seminar.fullSchedule || seminar.time}
		</p>
	</div>

	<!-- Speaker Section -->
	{#if seminar.speakers && seminar.speakers.length > 0}
		<div class="flex flex-col gap-[24px] items-start justify-center px-[40px] pt-[24px] pb-[40px]">
			<p class="font-bold text-[20px] leading-[1.4] text-[#111111] w-full">연설자</p>

			{#each seminar.speakers as speaker}
				<div
					class="flex gap-[12px] items-center overflow-clip px-[24px] py-[20px] bg-[#fefefe] rounded-[4px] w-full"
				>
					<p class="flex-1 font-bold text-[20px] leading-[1.4] text-black">
						{speaker.team || speaker.name}
					</p>

					<!-- Arrow Icon -->
					<div class="bg-[#111111] rounded-full w-[32px] h-[32px] flex items-center justify-center">
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.5 12.5L12.5 2.5M12.5 2.5H2.5M12.5 2.5V12.5"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
