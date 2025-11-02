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
		<p
			class="font-medium text-[16px] tablet:text-[20px] desktop:text-[24px] leading-[1.2] tracking-[-0.96px] text-[#111111]"
		>
			{seminar.time}
		</p>
	</div>

	<!-- Seminar Card -->
	<button
		type="button"
		onclick={onClick}
		class="flex flex-col gap-[8px] items-center justify-center px-[20px] tablet:px-[32px] desktop:px-[40px] py-[16px] tablet:py-[32px] desktop:py-[32px] w-full cursor-pointer hover:opacity-90 transition-opacity {isSelected
			? 'bg-primary'
			: 'bg-[#f6f6f6]'}"
	>
		<div
			class="flex flex-wrap gap-[8px] tablet:gap-[10px] desktop:gap-[12px] items-center justify-center w-full"
		>
			<!-- Category -->
			<p
				class="font-bold text-[16px] tablet:text-[20px] desktop:text-[24px] leading-[1.4] tracking-[-0.48px] {isSelected
					? 'text-white'
					: 'text-[#222222]'}"
			>
				{seminar.category}
			</p>

			<!-- Separator Dot -->
			<div
				class="w-[4px] tablet:w-[5px] desktop:w-[5px] h-[4px] tablet:h-[5px] desktop:h-[5px] rounded-full {isSelected
					? 'bg-white'
					: 'bg-[#222222]'}"
			></div>

			<!-- Title -->
			<p
				class="text-[16px] tablet:text-[20px] desktop:text-[24px] leading-[1.5] font-sans {isSelected
					? 'text-white'
					: 'text-[#222222]'}"
			>
				{seminar.title}
			</p>
		</div>
	</button>
</div>
