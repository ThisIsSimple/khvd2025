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
		onHoverChange?: (hovered: boolean) => void;
	}

	let { number, professors, workCount, category, title, onHoverChange }: Props = $props();

	let isHovered = $state(false);

	function handleMouseEnter() {
		isHovered = true;
		onHoverChange?.(true);
	}

	function handleMouseLeave() {
		isHovered = false;
		onHoverChange?.(false);
	}
</script>

<!-- Work Card Component for Desktop/Tablet -->
<div
	class="flex flex-col gap-[40px] transition-all duration-500 ease-in-out {isHovered
		? 'col-span-2'
		: 'col-span-1'}"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="button"
	tabindex="0"
>
		<!-- Professor Info Box -->
		<div
			class="bg-white flex flex-col gap-[12px] items-center justify-center px-[100px] desktop:px-[100px] tablet:px-[48px] py-[20px] w-full"
		>
			<div
				class="flex flex-col items-center justify-between {professors.length === 2
					? 'h-[72px]'
					: ''} w-[280px]"
			>
				{#each professors as professor}
					<div class="bg-white flex items-center justify-between w-full">
						<p class="font-semibold text-[20px] leading-[1.2] text-[#111111] w-[64px]">PROF.</p>
						<p class="font-sans text-[20px] leading-[1.5] text-[#111111] whitespace-nowrap">
							{professor.name}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Number Display Section with Background Pattern -->
		<div
			class="relative flex flex-col h-[720px] pl-[80px] overflow-hidden transition-colors duration-500 ease-in-out {isHovered
				? 'bg-primary'
				: ''}"
		>
			<!-- Background Pattern (only when not hovered) -->
			{#if !isHovered}
				<img
					src="/works-bg-pattern.png"
					alt=""
					class="absolute inset-0 w-full h-full object-cover pointer-events-none"
				/>
			{/if}

			<!-- Number and Count Container -->
			<div class="relative flex items-start justify-between w-full">
				<!-- Left: Number, Text, and Arrow -->
				<div class="flex gap-[8px] items-center pt-[12px]">
					<!-- Large Number -->
					<div class="w-[140px]">
						<p
							class="font-display text-[300px] leading-[1.2] tracking-[-12px] transition-colors duration-500 {isHovered
								? 'text-[#fefefe]'
								: 'text-[#111111]'}"
						>
							{number}
						</p>
					</div>

					<!-- Expanded Content (Category + Count + Arrow) -->
					<Motion
						initial={{ opacity: 0, width: 0 }}
						animate={isHovered ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						let:motion
					>
						<div use:motion class="flex items-center h-full py-[60px] gap-[8px] overflow-hidden">
							{#if category}
								<div class="flex flex-col font-display text-[60px] leading-none text-[#fefefe]">
									{#each category.split(' ') as word}
										<p class="whitespace-nowrap">{word}</p>
									{/each}
								</div>
							{/if}

							<p class="font-display text-[60px] leading-none text-[#fefefe] whitespace-nowrap">
								[{workCount}]
							</p>
						</div>
					</Motion>

					<!-- Default Count (hidden when hovered) -->
					{#if !isHovered}
						<div class="flex items-center h-full py-[60px]">
							<p class="font-display text-[60px] leading-none text-[#111111]">
								[{workCount}]
							</p>
						</div>
					{/if}
				</div>

				<!-- Right: Arrow Icon (only when hovered) -->
				{#if isHovered}
					<Motion
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
						let:motion
					>
						<div use:motion class="flex items-center pt-[12px] pr-[80px]">
							<img
								src="/icons/arrow-diagonal.svg"
								alt=""
								class="w-[240px] h-[240px] rotate-180 scale-y-[-1]"
							/>
						</div>
					</Motion>
				{/if}
			</div>

			<!-- Bottom Title Section (only when hovered) -->
			{#if isHovered && title}
				<Motion
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
					let:motion
				>
					<div use:motion class="flex flex-col mt-[80px] text-[#fefefe]">
						{#if category}
							<p class="font-display text-[52px] leading-[1.1] uppercase whitespace-nowrap">
								{category}
							</p>
						{/if}
						<p class="font-semibold text-[60px] leading-[1.3] tracking-[-2.4px] whitespace-pre-line">
							{title}
						</p>
					</div>
				</Motion>
			{/if}
		</div>
	</div>
