<script lang="ts">
	import { goto } from '$app/navigation';
	interface Props {
		id: number;
		name: string;
		nameEn: string;
		imageUrl: string;
		instagramUrl?: string;
		email?: string;
	}

	let { id, name, nameEn, imageUrl, instagramUrl, email }: Props = $props();

	// Handle icon clicks to prevent card click propagation
	function handleIconClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
	}

	// Determine which contacts to show
	const hasLegacyInstagram = instagramUrl;
	const hasLegacyEmail = email;

	function handleCardKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			goto(`/designers/${id}`);
		}
	}

	function handleCardClick() {
		goto(`/designers/${id}`);
	}
</script>

<div
	role="link"
	tabindex="0"
	class="gap-[16px] w-full group/card block cursor-pointer"
	onclick={handleCardClick}
	onkeydown={handleCardKeydown}
>
	<!-- Image Container with Hover Effects -->
	<div class="relative w-full aspect-[258/332] bg-white overflow-hidden group mb-4">
		<!-- Profile Image with Grayscale Effect -->
		<!-- src={imageUrl} -->
		<img
			src="https://i.namu.wiki/i/DtCwhjGV2N6EXrBqBoeDh9BAh2gQvqVcBDK48oZJXu0Dv7ZwTyMGodIHxJ4dBBQTy-2Kwq4EM1pk0JBZjIDOnQ.webp"
			alt={name}
			class="absolute inset-0 w-full h-full object-cover
				   grayscale transition-all duration-300 ease-in-out
				   group-hover:grayscale-0 group-hover:scale-105"
		/>

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
