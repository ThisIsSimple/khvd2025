<script lang="ts">
	// Message card component for displaying individual messages
	let { text, date }: { text: string; date: string } = $props();
</script>

<div
	class="bg-[#fefefe] flex flex-col gap-[32px] items-end justify-center overflow-hidden p-[20px] w-full tablet:w-[448px]"
>
	<!-- Text Container -->
	<div class="flex gap-[10px] h-[170px] items-start overflow-hidden p-[10px] w-full">
		<p
			class="text-mobile-b1 tablet:text-pc-b1 font-normal text-black leading-[1.5] overflow-hidden flex-1 min-w-0"
			style="display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; text-overflow: ellipsis;"
		>
			{text}
		</p>
	</div>

	<!-- Date Container -->
	<div class="flex gap-[10px] items-center justify-end w-[100px]">
		<p class="text-mobile-b2 tablet:text-pc-b2 text-[#999999] whitespace-nowrap">
			{date}
		</p>
	</div>
</div>
