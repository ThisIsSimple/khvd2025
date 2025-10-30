<script lang="ts">
	interface Props {
		questionNumber: 1 | 2;
		question: string;
		answer: string;
	}

	let { questionNumber, question, answer }: Props = $props();
</script>

<div
	class="box-border flex flex-col gap-[16px] tablet:gap-[24px] items-start pb-[38px] tablet:pb-[60px] desktop:pb-[120px] pt-[12px] px-0 relative shrink-0 w-full"
>
	<!-- Question -->
	<div class="flex flex-col gap-[2px] tablet:gap-[4px] items-start justify-center relative shrink-0">
		<!-- Question Number -->
		<div class="flex flex-col gap-[10px] items-center justify-center relative shrink-0">
			<p class="font-display text-[32px] tablet:text-[40px] leading-none text-primary">
				Q{questionNumber}.
			</p>
		</div>

		<!-- Question Text -->
		<p
			class="font-bold text-[18px] tablet:text-[24px] leading-[1.4] tracking-[-0.48px] text-primary whitespace-pre-wrap"
		>
			{question}
		</p>
	</div>

	<!-- Answer -->
	<p class="text-[15px] tablet:text-[18px] leading-[1.5] text-[#222222] w-full whitespace-pre-wrap">
		{answer}
	</p>
</div>
