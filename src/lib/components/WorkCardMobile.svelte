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
	class="relative flex flex-col px-[16px] w-full transition-all duration-500 ease-in-out py-[20px] overflow-hidden {isHovered
		? 'bg-primary'
		: ''}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	ontouchstart={handleToggle}
	role="button"
	tabindex="0"
>
	<!-- Background Pattern (only when not hovered) -->
	{#if !isHovered}
		<img
			src="/works-bg-pattern.png"
			alt=""
			class="absolute inset-0 w-full h-full object-cover pointer-events-none"
		/>
	{/if}

	<!-- Content Container -->
	<div class="relative flex items-start justify-between w-full">
		<!-- Left: Number, Category, and Count -->
		<div class="flex flex-col gap-[12px] items-start">
			<!-- Number and Category Row -->
			<div class="flex gap-[8px] items-start">
				<!-- Large Number -->
				<div class="w-[60px]">
					<p
						class="font-display text-[120px] leading-[1.2] tracking-[-4.8px] text-center transition-colors duration-500 {isHovered
							? 'text-[#fefefe]'
							: 'text-[#111111]'}"
					>
						{number}
					</p>
				</div>

				<!-- Category and Work Count (shown when hovered) -->
				{#if isHovered && category}
					<Motion
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						let:motion
					>
						<div use:motion class="flex flex-col gap-[4px] pt-[20px]">
							<p class="font-display text-[28px] leading-[1.1] uppercase text-[#fefefe] whitespace-nowrap">
								{category}
							</p>
							<p class="font-display text-[28px] leading-[1.1] text-[#fefefe]">
								[{workCount}]
							</p>
						</div>
					</Motion>
				{:else if !isHovered}
					<!-- Work Count (default state) -->
					<div class="flex h-[144px] items-start pt-[22px] pb-[10px]">
						<p class="font-display text-[28px] leading-[1.2] tracking-[-0.56px] text-center text-[#111111]">
							[{workCount}]
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Right: Professor Info and Arrow -->
		<div class="flex flex-col gap-[8px] items-end justify-between">
			<!-- Arrow Icon (only when hovered) -->
			{#if isHovered}
				<Motion
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
					let:motion
				>
					<div use:motion class="flex items-center justify-end">
						<img
							src="/icons/arrow-diagonal-mobile.svg"
							alt=""
							class="w-[140px] h-[140px] rotate-180 scale-y-[-1]"
						/>
					</div>
				</Motion>
			{/if}

			<!-- Professor Info -->
			<div class="flex flex-col gap-[8px] items-end justify-end w-[212px]">
				{#each professors as professor}
					<div
						class="flex items-center justify-end w-full text-[15px] transition-colors duration-500 {isHovered
							? 'text-[#fefefe]'
							: 'text-[#111111]'}"
					>
						<p class="font-bold leading-[1.4] w-[64px]">PROF.</p>
						<p class="font-sans leading-[1.5] text-right w-[148px]">{professor.name}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Expanded Content (Title - vertical expansion) -->
	{#if isHovered && title}
		<Motion
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
			let:motion
		>
			<div use:motion class="relative flex flex-col overflow-hidden pt-[20px]">
				<p class="font-semibold text-[28px] leading-[1.3] text-[#fefefe] max-w-[280px]">
					{title}
				</p>
			</div>
		</Motion>
	{/if}
</div>
