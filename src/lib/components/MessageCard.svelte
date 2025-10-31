<script lang="ts">
	// Message card component for displaying individual messages
	let {
		id,
		writer,
		text,
		date,
		onedit,
		isForTarget = false
	}: {
		id: number;
		writer: string;
		text: string;
		date: string;
		onedit?: (id: number) => void;
		isForTarget?: boolean;
	} = $props();

	function handleEdit() {
		onedit?.(id);
	}
</script>

<div
	class={isForTarget
		? 'bg-[#f6f6f6] flex flex-col gap-[20px] tablet:gap-[24px] items-end justify-between pt-[20px] pb-[12px] px-[14px] tablet:p-[24px] w-full'
		: 'bg-[#fefefe] flex flex-col gap-[20px] items-end justify-between py-[20px] px-[14px] tablet:p-[20px] w-full'}
>
	<!-- Text Container -->
	<div
		class="flex flex-col {isForTarget
			? 'gap-[20px] tablet:gap-[24px]'
			: 'gap-[20px]'} items-start overflow-clip {isForTarget ? '' : 'tablet:p-[10px]'} w-full"
	>
		<!-- Writer Name and Edit Button Row -->
		<div class="flex items-center justify-between w-full">
			<p
				class={isForTarget
					? 'font-bold text-[#111111] text-[16px] tablet:text-[18px] leading-[1.4] whitespace-nowrap'
					: 'font-bold text-[#111111] text-[16px] tablet:text-[18px] leading-[1.4] whitespace-nowrap'}
			>
				{writer}
			</p>
			<button
				onclick={handleEdit}
				class={isForTarget
					? 'overflow-clip shrink-0 w-[20px] h-[20px] tablet:w-[24px] tablet:h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity'
					: 'overflow-clip shrink-0 w-[20px] h-[20px] tablet:w-[24px] tablet:h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity'}
				aria-label="Edit message"
			>
				<img src="/icons/edit.svg" alt="" class="w-full h-full opacity-35" />
			</button>
		</div>

		<!-- Message Text -->
		<p
			class={isForTarget
				? 'font-normal text-black text-[15px] tablet:text-[18px] leading-[1.5] w-full overflow-hidden'
				: 'font-normal text-black text-[16px] tablet:text-[20px] leading-[1.5] w-full overflow-hidden'}
		>
			{text}
		</p>
	</div>

	<!-- Date Container -->
	<div class="flex gap-[10px] items-center justify-end w-[100px]">
		<p
			class={isForTarget
				? 'font-normal text-[#999999] text-[16px] tablet:text-[18px] leading-[1.5] whitespace-nowrap'
				: 'font-normal text-[#999999] text-[16px] tablet:text-[18px] leading-[1.4] whitespace-nowrap'}
		>
			{date}
		</p>
	</div>
</div>
