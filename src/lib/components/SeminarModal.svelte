<script lang="ts">
	import type { Seminar } from '$lib/types/seminar';

	interface Props {
		seminar: Seminar;
		isOpen: boolean;
		onClose: () => void;
	}

	let { seminar, isOpen, onClose }: Props = $props();

	// Close modal on ESC key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	// Close modal on backdrop click
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop Overlay -->
	<div
		class="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center p-4"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<!-- Modal Container -->
		<div class="bg-[#ffeae0] w-full max-w-[360px] rounded-[8px] overflow-hidden">
			<!-- Header Section -->
			<div
				class="relative flex flex-col gap-[8px] pt-[20px] tablet:pt-[24px] desktop:pt-[32px] px-[24px] tablet:px-[24px] desktop:px-[40px]"
			>
				<!-- Close Button -->
				<button
					type="button"
					onclick={onClose}
					class="absolute top-[8.5px] right-[8px] w-[32px] h-[32px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
					aria-label="닫기"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.5 1.5L13.5 13.5M13.5 1.5L1.5 13.5"
							stroke="#111111"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				</button>

				<!-- Category -->
				<div class="flex items-center px-[3px]">
					<p class="font-bold text-[15px] leading-[1.4] text-primary">
						{seminar.category}
					</p>
				</div>

				<!-- Title -->
				<p class="font-bold text-[20px] leading-[1.4] text-[#111111] w-full">
					{seminar.title}
				</p>
			</div>

			<!-- Description Section -->
			<div class="px-[24px] tablet:px-[24px] desktop:px-[40px] pb-0">
				<p class="font-sans text-[15px] leading-[1.5] text-[#222222]">
					{seminar.description || ''}
				</p>
			</div>

			<!-- Schedule Section -->
			<div
				class="flex flex-col gap-[8px] pt-[16px] tablet:pt-[20px] desktop:pt-[24px] pb-[12px] tablet:pb-[16px] desktop:pb-[20px] px-[24px] tablet:px-[24px] desktop:px-[40px]"
			>
				<p class="font-bold text-[16px] leading-[1.4] text-[#222222] whitespace-pre-wrap">
					{seminar.fullSchedule || seminar.time}
				</p>
			</div>

			<!-- Speakers Section -->
			<div
				class="flex flex-col gap-[12px] pt-[12px] tablet:pt-[16px] desktop:pt-[20px] pb-[28px] tablet:pb-[32px] desktop:pb-[40px] px-[24px] tablet:px-[24px] desktop:px-[40px]"
			>
				<p class="font-bold text-[16px] leading-[1.4] text-[#111111]">연설자</p>

				{#if seminar.speakers && seminar.speakers.length > 0}
					{#each seminar.speakers as speaker}
						<a
							href={seminar.link}
							class="bg-[#fefefe] flex items-center justify-between gap-[12px] px-[16px] py-[12px] rounded-[4px]"
						>
							<p class="font-bold text-[16px] leading-[1.4] text-black flex-1">
								{speaker.team || speaker.name}
							</p>

							<!-- Arrow Icon -->
							<div
								class="bg-[#111111] w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0"
							>
								<svg
									width="9"
									height="9"
									viewBox="0 0 9 9"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 4.5H8M8 4.5L4.5 1M8 4.5L4.5 8"
										stroke="#FEFEFE"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}
