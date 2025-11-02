<script lang="ts">
	import type { Seminar } from '$lib/types/seminar';

	interface Props {
		seminar: Seminar;
		isSelected?: boolean;
		onClick?: () => void;
	}

	let { seminar, isSelected = false, onClick }: Props = $props();
</script>

<div class="flex flex-col gap-[16px] w-full">
	<!-- Time Display -->
	<div class="flex gap-[10px] items-center">
		<p class="font-medium text-[24px] leading-[1.2] tracking-[-0.96px] text-[#111111]">
			{seminar.time}
		</p>
	</div>

	<!-- Seminar Card -->
	<button
		type="button"
		onclick={onClick}
		class="flex flex-col gap-[8px] items-center justify-center px-[40px] py-[32px] w-full cursor-pointer hover:opacity-90 transition-opacity {isSelected
			? 'bg-primary'
			: 'bg-[#f6f6f6]'}"
	>
		<div class="flex flex-wrap gap-[12px] items-center justify-center w-full">
			<!-- Category -->
			<p
				class="font-bold text-[24px] leading-[1.4] tracking-[-0.48px] {isSelected
					? 'text-white'
					: 'text-[#222222]'}"
			>
				{seminar.category}
			</p>

			<!-- Separator Dot -->
			<div class="w-[5px] h-[5px] rounded-full {isSelected ? 'bg-white' : 'bg-[#222222]'}"></div>

			<!-- Title -->
			<p class="text-[24px] leading-[1.5] font-sans {isSelected ? 'text-white' : 'text-[#222222]'}">
				{seminar.title}
			</p>
		</div>
	</button>
</div>
