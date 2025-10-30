<script lang="ts">
	import MessageBoard from '$lib/components/MessageBoard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Back navigation handler
	function handleBack() {
		window.history.back();
	}

	// Get category name from group number
	const categoryName = `GRADUATION STUDIES ${data.work.groupNumber}`;

	// Filter images by platform (default to PC for main display)
	const pcImages = data.images.filter((img) => img.platform === 'pc');
	const mobileImages = data.images.filter((img) => img.platform === 'mobile');

	// Use first PC image as main image, fallback to thumbnail
	const mainImage = pcImages.length > 0 ? pcImages[0].image : data.work.thumbnail;
</script>

<svelte:head>
	<title>{data.work.title} - KHVD 2025</title>
</svelte:head>

{#if !data.work}
	<!-- Error State -->
	<div class="min-h-screen bg-white flex items-center justify-center">
		<div class="text-center">
			<p class="text-h6 text-primary mb-4">⚠️ 작품 정보를 불러올 수 없습니다</p>
			<p class="text-b1 text-[#777777]">다시 시도해주세요.</p>
			<button
				onclick={handleBack}
				class="mt-8 px-6 py-3 bg-primary text-white rounded hover:bg-[#e03d1a] transition-colors"
			>
				뒤로 가기
			</button>
		</div>
	</div>
{:else}
	<div class="relative min-h-screen bg-white flex">
		<!-- Sticky Left Navigation (150px) -->
		<nav
			class="sticky left-0 top-0 h-fit w-[90px] tablet:w-[150px] bg-white z-50 flex flex-col items-center pt-[20px] shrink-0 overflow-hidden"
		>
			<!-- Back Arrow Button -->
			<button
				onclick={handleBack}
				class="w-[90px] tablet:w-[150px] h-[90px] tablet:h-[150px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors mb-[80px]"
				aria-label="Go back"
			>
				<img
					src="/icons/arrow_diagonal_before.svg"
					alt="Back"
					class="w-[35px] h-[35px] tablet:w-[70px] tablet:h-[70px]"
				/>
			</button>

			<!-- Designer Contact Info -->
			<div
				class="w-full overflow-hidden flex flex-col gap-[52px] items-center px-[16px] tablet:px-[36px]"
			>
				{#each data.designers as designer}
					<div class="w-full flex flex-col gap-[2px] items-center justify-center overflow-hidden">
						<!-- Designer Name -->
						<p
							class="text-[14px] tablet:text-[18px] leading-[1.2] text-[#222222] text-center break-words max-w-full"
						>
							{designer.name}
						</p>

						<!-- Designer Email -->
						{#if designer.email}
							<a
								href="mailto:{designer.email}"
								class="text-[14px] tablet:text-[18px] leading-[1.2] text-[#222222] text-center underline hover:text-primary transition-colors break-words max-w-full"
							>
								{designer.email}
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</nav>

		<!-- Main Content Area -->
		<main class="flex-1">
			<!-- Desktop/Tablet Layout (≥960px) -->
			<div class="hidden tablet:block">
				<!-- Work Image Container -->
				<div class="w-full aspect-[16/9] overflow-hidden bg-[#f6f6f6]">
					<img src={mainImage} alt={data.work.title} class="w-full h-full object-cover" />
				</div>

				<!-- Work Info Section -->
				<div class="flex gap-[40px] px-[40px] pt-[48px] pb-[60px]">
					<!-- Left Column: Work Details -->
					<div class="w-[480px] flex flex-col gap-[28px] shrink-0">
						<!-- Category -->
						<p class="font-display text-[40px] leading-[1.2] text-[#111111]">
							{categoryName}
						</p>

						<!-- Title -->
						<h1 class="font-bold text-[48px] leading-[1.4] text-[#111111]">
							{data.work.title}
						</h1>

						<!-- Description (Subtitle) -->
						<p class="text-[24px] leading-[1.5] text-[#222222]">
							{data.work.description}
						</p>

						<!-- Content (Detailed description) -->
						<p class="text-[20px] leading-[1.5] text-[#222222] whitespace-pre-wrap">
							{data.work.content}
						</p>

						<!-- Professor -->
						<div class="flex flex-col gap-[8px]">
							<p class="text-[16px] leading-[1.4] text-[#999999]">Professor</p>
							<p class="text-[18px] leading-[1.4] text-[#222222]">
								{data.work.professor}
							</p>
						</div>
					</div>

					<!-- Right Column: Designers Grid -->
					<div class="flex-1">
						<div class="grid grid-cols-2 gap-[24px]">
							{#each data.designers as designer}
								<a
									href="/designers/{designer.id}"
									class="flex flex-col gap-[16px] group hover:opacity-80 transition-opacity"
								>
									<!-- Designer Profile Image -->
									<div class="w-full aspect-[330/425] overflow-hidden bg-[#f6f6f6]">
										<img
											src={designer.profileImage}
											alt={designer.name}
											class="w-full h-full object-cover"
										/>
									</div>

									<!-- Designer Info -->
									<div class="flex flex-col gap-[4px]">
										<p class="font-bold text-[24px] leading-[1.4] text-[#111111]">
											{designer.name}
										</p>
										<p class="text-[20px] leading-[1.2] text-[#111111]">
											{designer.nameEn}
										</p>
										{#if designer.email}
											<p class="text-[16px] leading-[1.4] text-[#777777] underline">
												{designer.email}
											</p>
										{/if}
									</div>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile Layout (<960px) -->
			<div class="block tablet:hidden px-[20px] pt-[28px]">
				<!-- Work Image -->
				<div class="w-full aspect-[4/3] overflow-hidden bg-[#f6f6f6] mb-[24px]">
					<img
						src={mobileImages.length > 0 ? mobileImages[0].image : mainImage}
						alt={data.work.title}
						class="w-full h-full object-cover"
					/>
				</div>

				<!-- Category -->
				<p class="font-display text-[28px] leading-[1.2] text-[#111111] mb-[12px]">
					{categoryName}
				</p>

				<!-- Title -->
				<h1 class="font-bold text-[32px] leading-[1.4] text-[#111111] mb-[16px]">
					{data.work.title}
				</h1>

				<!-- Description -->
				<p class="text-[18px] leading-[1.5] text-[#222222] mb-[16px]">
					{data.work.description}
				</p>

				<!-- Content -->
				<p class="text-[16px] leading-[1.5] text-[#222222] mb-[24px] whitespace-pre-wrap">
					{data.work.content}
				</p>

				<!-- Professor -->
				<div class="flex flex-col gap-[6px] mb-[32px]">
					<p class="text-[14px] leading-[1.4] text-[#999999]">Professor</p>
					<p class="text-[16px] leading-[1.4] text-[#222222]">
						{data.work.professor}
					</p>
				</div>

				<!-- Designers Grid (Mobile) -->
				<div class="flex flex-col gap-[24px] mb-[40px]">
					{#each data.designers as designer}
						<a
							href="/designers/{designer.id}"
							class="flex gap-[16px] group hover:opacity-80 transition-opacity"
						>
							<!-- Designer Profile Image (Smaller) -->
							<div class="w-[120px] aspect-[330/425] overflow-hidden bg-[#f6f6f6] shrink-0">
								<img
									src={designer.profileImage}
									alt={designer.name}
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Designer Info -->
							<div class="flex flex-col gap-[4px] justify-center">
								<p class="font-bold text-[18px] leading-[1.4] text-[#111111]">
									{designer.name}
								</p>
								<p class="text-[16px] leading-[1.2] text-[#111111]">
									{designer.nameEn}
								</p>
								{#if designer.email}
									<p class="text-[14px] leading-[1.4] text-[#777777] underline break-all">
										{designer.email}
									</p>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			</div>

			<!-- Messages Section (Full Width) -->
			<div class="mt-[60px] px-[20px] tablet:px-[40px] tablet:pt-[60px]">
				<MessageBoard type="work" targetId={data.work.id} isForTarget={true} />
			</div>
		</main>
	</div>
{/if}
