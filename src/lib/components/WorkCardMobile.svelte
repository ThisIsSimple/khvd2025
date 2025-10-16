<script lang="ts">
	import { Motion } from 'svelte-motion';

	interface Professor {
		name: string;
	}

	interface Props {
		number: string;
		professors: Professor[];
		workCount: number;
		category?: string;
		title?: string;
	}

	let { number, professors, workCount, category, title }: Props = $props();

	let isHovered = $state(false);

	function handleToggle() {
		isHovered = !isHovered;
	}
</script>

<!-- Work Card Mobile Component (1-column horizontal with vertical expansion) -->
<div
	class="relative flex flex-col px-[16px] w-full transition-all duration-500 ease-in-out py-[20px]"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	ontouchstart={handleToggle}
	role="button"
	tabindex="0"
>
	<!-- Background Pattern -->
	<img
		src="/works-bg-pattern.png"
		alt=""
		class="absolute inset-0 w-full h-full object-cover pointer-events-none"
	/>

	<!-- Content Container -->
	<div class="relative flex items-start justify-between w-full">
		<!-- Left: Number and Count -->
		<div class="flex flex-col gap-[4px] items-start">
			<div class="flex gap-[4px] items-start">
				<!-- Large Number -->
				<div class="w-[60px]">
					<p class="font-display text-[120px] leading-[1.2] tracking-[-4.8px] text-center text-[#111111]">
						{number}
					</p>
				</div>

				<!-- Work Count -->
				<div class="flex h-[144px] items-start pt-[22px] pb-[10px]">
					<p class="font-display text-[28px] leading-[1.2] tracking-[-0.56px] text-center text-[#111111]">
						[{workCount}]
					</p>
				</div>
			</div>

		</div>

		<!-- Right: Professor Info -->
		<div class="flex flex-col gap-[8px] items-end justify-end w-[212px]">
			{#each professors as professor}
				<div class="flex items-center justify-end w-full text-[15px] text-[#111111]">
					<p class="font-bold leading-[1.4] w-[64px]">PROF.</p>
					<p class="font-sans leading-[1.5] text-right w-[148px]">{professor.name}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Expanded Content (Category and Title - vertical expansion) -->
	{#if isHovered && (category || title)}
		<Motion
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
			let:motion
		>
			<div use:motion class="relative flex flex-col gap-[8px] overflow-hidden pt-[20px]">
				{#if category}
					<p class="font-display text-[24px] leading-[1.1] uppercase text-[#111111]">
						{category}
					</p>
				{/if}
				{#if title}
					<p class="font-semibold text-[28px] leading-[1.3] text-[#111111] max-w-[280px]">
						{title}
					</p>
				{/if}
			</div>
		</Motion>
	{/if}
</div>
