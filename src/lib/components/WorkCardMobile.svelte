<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { goto } from '$app/navigation';

	interface Professor {
		name: string;
	}

	interface Props {
		number: string;
		professors: Professor[];
		workCount: number;
		category?: string;
		title?: string;
		activeCardId?: string | null;
		onActivate?: (id: string) => void;
	}

	let { number, professors, workCount, category, title, activeCardId, onActivate }: Props =
		$props();

	// Device detection: Check if mouse/hover is supported (PC) vs touch-only (mobile)
	let hasMouseSupport = $state(false);

	// Active state (controlled by parent via activeCardId)
	let isActive = $derived(activeCardId === number);

	// Hover state (PC only - for mouse hover)
	let isHovered = $state(false);

	// Final expanded state (PC: use hover, Mobile: use active)
	let isExpanded = $derived(hasMouseSupport ? isHovered : isActive);

	// Detect mouse support on mount
	$effect(() => {
		// Check if device supports hover and has a fine pointer (mouse)
		hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	function handleMouseEnter() {
		if (hasMouseSupport) {
			isHovered = true;
		}
	}

	function handleMouseLeave() {
		if (hasMouseSupport) {
			isHovered = false;
		}
	}

	function handleClick(event: MouseEvent) {
		// PC (mouse support): Navigate immediately
		if (hasMouseSupport) {
			goto(`/exhibition/works/list/${number}`);
			return;
		}

		// Mobile (touch only): 2-stage touch logic
		if (!isActive) {
			// First touch: Activate card (show expanded content)
			event.preventDefault();
			onActivate?.(number);
		} else {
			// Second touch: Navigate to page
			goto(`/exhibition/works/list/${number}`);
		}
	}
</script>

<!-- Work Card Mobile Component (1-column horizontal with vertical expansion) -->
<div
	class="relative px-[16px] w-full transition-all duration-500 ease-in-out py-[20px] overflow-hidden {isExpanded
		? 'bg-primary'
		: ''}"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onclick={handleClick}
	role="button"
	tabindex="0"
>
	<!-- Content Container -->
	<div class="flex {!isExpanded ? 'sm:items-center items-end' : 'items-end'} justify-between w-full">
		<!-- Left: Number, Category, and Count -->
		<div class="flex flex-col gap-[12px] items-start">
			<!-- Number and Category Row -->
			<div class="flex gap-[8px] items-start">
				<!-- Large Number -->
				<div class="w-[60px]">
					<p
						class="font-display text-[120px] leading-[1.2] tracking-[-4.8px] text-center transition-colors duration-500 {isExpanded
							? 'text-[#fefefe]'
							: 'text-[#111111]'}"
					>
						{number}
					</p>
				</div>

				<!-- Category and Work Count (shown when expanded) -->
				{#if isExpanded && category}
					<Motion
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						let:motion
					>
						<div use:motion class="flex gap-[12px] pt-[20px]">
							<p
								class="font-display text-[28px] leading-[1.1] uppercase text-[#fefefe] whitespace-nowrap"
							>
								GRADUATION<br />STUDIES
							</p>
							<p class="font-display text-[28px] leading-[1.1] text-[#fefefe]">
								[{workCount}]
							</p>
						</div>
					</Motion>
				{:else if !isExpanded}
					<!-- Work Count (default state) -->
					<div class="flex h-[144px] items-start pt-[22px] pb-[10px]">
						<p
							class="font-display text-[28px] leading-[1.2] tracking-[-0.56px] text-center text-[#111111]"
						>
							[{workCount}]
						</p>
					</div>
				{/if}
			</div>

			<!-- Expanded Content (Title - vertical expansion) -->
			{#if isExpanded && title}
				<Motion
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
					let:motion
				>
					<div use:motion class="relative flex flex-col overflow-hidden pt-[20px]">
						<p class="font-semibold text-[28px] leading-[1.3] text-[#fefefe] whitespace-pre-line">
							{title}
						</p>
					</div>
				</Motion>
			{/if}
		</div>

		<!-- Right: Professor Info and Arrow -->
		<div class="flex flex-col items-end justify-between h-full">
			<!-- Arrow Icon (only when expanded) -->
			{#if isExpanded}
				<Motion
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
					let:motion
				>
					<div use:motion class="absolute top-[32px] right-[32px]">
						<img src="/icons/arrow-top-right.svg" alt="" class="w-[60px] h-[60px]" />
					</div>
				</Motion>
			{/if}

			<!-- Professor Info -->
			<div
				class="{isExpanded && 'hidden'} sm:flex flex-col gap-[8px] items-end justify-end w-[212px]"
			>
				{#each professors as professor}
					<div
						class="flex items-center justify-end w-full text-[15px] transition-colors duration-500 {isExpanded
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
</div>
