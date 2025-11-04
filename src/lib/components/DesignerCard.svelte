<script lang="ts">
	import { goto } from '$app/navigation';
	interface Props {
		id: number;
		name: string;
		nameEn: string;
		imageUrl: string;
		instagramUrl?: string;
		email?: string;
		activeCardId?: number | null;
		onActivate?: (id: number) => void;
	}

	let { id, name, nameEn, imageUrl, instagramUrl, email, activeCardId, onActivate }: Props =
		$props();

	// Device detection: Check if mouse/hover is supported (PC) vs touch-only (mobile)
	let hasMouseSupport = $state(false);

	// Active state (controlled by parent via activeCardId)
	let isActive = $derived(activeCardId === id);

	// Hover state (PC only - for mouse hover)
	let isHovered = $state(false);

	// Final color display state (PC: use hover, Mobile: use active)
	let showColor = $derived(hasMouseSupport ? isHovered : isActive);

	// Detect mouse support on mount
	$effect(() => {
		// Check if device supports hover and has a fine pointer (mouse)
		hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	// Handle icon clicks to prevent card click propagation
	function handleIconClick(e: MouseEvent) {
		e.stopPropagation();
		// Don't prevent default - allow link navigation
	}

	// Determine which contacts to show
	const hasLegacyInstagram = instagramUrl;
	const hasLegacyEmail = email;

	function handleCardKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			goto(`/designers/${id}`); // Keyboard always navigates immediately
		}
	}

	function handleCardClick(event: MouseEvent) {
		// PC (mouse support): Navigate immediately
		if (hasMouseSupport) {
			goto(`/designers/${id}`);
			return;
		}

		// Mobile (touch only): 2-stage touch logic
		if (!isActive) {
			// First touch: Activate card (show color)
			event.preventDefault();
			onActivate?.(id);
		} else {
			// Second touch: Navigate to page
			goto(`/designers/${id}`);
		}
	}

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
</script>

<div
	role="link"
	tabindex="0"
	class="w-full group/card block cursor-pointer"
	onclick={handleCardClick}
	onkeydown={handleCardKeydown}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<!-- Image Container with Hover Effects -->
	<div class="relative w-full aspect-[258/332] bg-white overflow-hidden group mb-2 tablet:mb-4">
		<!-- Profile Image with Grayscale Effect -->
		{#if imageUrl}
			<img
				src={imageUrl}
				alt={name}
				class="absolute inset-0 w-full h-full object-cover
				   transition-all duration-300 ease-in-out
				   {showColor ? 'grayscale-0 scale-105' : 'grayscale'}"
			/>
		{:else}
			<div
				class="absolute inset-0 w-full h-full bg-[#808080] flex items-center justify-center"
			></div>
		{/if}

		<!-- Contact Icons (Top Right) -->
		{#if hasLegacyInstagram || hasLegacyEmail}
			<div class="absolute top-[12px] right-[12px] flex gap-[6px] items-center justify-end z-10">
				<!-- Instagram -->
				{#if hasLegacyInstagram}
					<a
						href={instagramUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary text-white text-[10px] font-bold"
						aria-label={instagramUrl}
						title={instagramUrl}
					>
						<img src="/icons/insta-line-white.svg" alt="Instagram" class="w-[14px] h-[14px]" />
					</a>
				{/if}

				<!-- Email -->
				{#if hasLegacyEmail}
					<a
						href="mailto:{email}"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary"
						aria-label="Email"
					>
						<img src="/icons/mail-line-white.svg" alt="Email" class="w-[14px] h-[14px]" />
					</a>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Text Information -->
	<div class="flex flex-col leading-[1.4] text-[#111111]">
		<p class="font-bold text-[20px]">{name}</p>
		<p class="text-[18px] h-[29px]">{nameEn}</p>
	</div>
</div>
