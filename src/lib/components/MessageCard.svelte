<script lang="ts">
	// Message card component for displaying individual messages
	let {
		id,
		writer,
		text,
		date,
		onedit
	}: {
		id: number;
		writer: string;
		text: string;
		date: string;
		onedit?: (id: number) => void;
	} = $props();

	function handleEdit() {
		onedit?.(id);
	}
</script>

<div
	class="bg-[#fefefe] flex flex-col gap-[20px] items-end justify-center p-[20px] w-full"
>
	<!-- Text Container -->
	<div class="flex flex-col gap-[20px] items-start overflow-clip p-[10px] w-full">
		<!-- Writer Name and Edit Button Row -->
		<div class="flex items-center justify-between w-full">
			<p class="font-bold text-[#111111] text-[16px] tablet:text-[20px] leading-[1.4] whitespace-nowrap">
				{writer}
			</p>
			<button
				onclick={handleEdit}
				class="overflow-clip shrink-0 w-[28px] h-[28px] flex items-center justify-center hover:opacity-70 transition-opacity"
				aria-label="Edit message"
			>
				<img src="/icons/edit.svg" alt="" class="w-full h-full" />
			</button>
		</div>

		<!-- Message Text -->
		<p
			class="font-normal text-black text-[16px] tablet:text-[20px] leading-[1.5] w-full overflow-hidden"
			style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; text-overflow: ellipsis;"
		>
			{text}
		</p>
	</div>

	<!-- Date Container -->
	<div class="flex gap-[10px] items-center justify-end w-[100px]">
		<p class="font-normal text-[#999999] text-[15px] tablet:text-[18px] leading-[1.4] whitespace-nowrap">
			{date}
		</p>
	</div>
</div>
