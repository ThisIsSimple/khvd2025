<script lang="ts">
	// Message card component for displaying individual messages
	let {
		id,
		writer,
		text,
		date,
		onedit,
		isForTarget = false,
		type,
		targetId
	}: {
		id: number;
		writer: string;
		text: string;
		date: string;
		onedit?: (id: number) => void;
		isForTarget?: boolean;
		type?: 'work' | 'designer' | 'normal';
		targetId?: number;
	} = $props();

	// Generate target URL based on type and targetId
	const showLink = $derived(type && targetId && type !== 'normal');
	const targetUrl = $derived(
		type && targetId && type !== 'normal'
			? type === 'work'
				? `/exhibition/works/${targetId}`
				: `/designers/${targetId}`
			: null
	);

	// Get label text based on type
	const targetLabel = $derived(type === 'work' ? '작품 보기' : '디자이너 보기');

	function handleEdit() {
		onedit?.(id);
	}
</script>

<div
	class={isForTarget
		? 'bg-[#f6f6f6] flex flex-col gap-[40px] tablet:gap-[24px] items-end justify-between pt-[20px] pb-[12px] px-[14px] tablet:p-[24px] w-full'
		: 'bg-[#fefefe] flex flex-col gap-[40px] items-end justify-between py-[20px] px-[14px] tablet:p-[20px] w-full'}
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
	{#if showLink}
		<div class="flex gap-[10px] items-center justify-between w-full">
			<!-- Navigation link to target (work/designer) -->
			{#if targetUrl && !isForTarget}
				<a
					href={targetUrl}
					class="group flex gap-[6px] items-center hover:opacity-70 transition-opacity"
				>
					<span class="font-normal text-[#111111] text-[14px] tablet:text-[16px] leading-[1.5]">
						{targetLabel}
					</span>
					<img
						src="/icons/arrow_diagonal_before.svg"
						alt=""
						class="w-[12px] h-[12px] tablet:w-[14px] tablet:h-[14px] scale-x-[-1] duration-300"
					/>
				</a>
			{:else}
				<!-- Empty spacer when no target -->
				<div></div>
			{/if}

			<!-- Date -->
			<p
				class="font-normal text-[#999999] text-[16px] tablet:text-[18px] leading-[1.5] whitespace-nowrap"
			>
				{date}
			</p>
		</div>
	{:else}
		<div class="flex gap-[10px] items-center justify-end w-[100px]">
			<p
				class="font-normal text-[#999999] text-[16px] tablet:text-[18px] leading-[1.4] whitespace-nowrap"
			>
				{date}
			</p>
		</div>
	{/if}
</div>
