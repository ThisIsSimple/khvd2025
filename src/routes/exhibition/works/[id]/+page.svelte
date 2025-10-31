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

	// Use first PC image as main image, fallback to detailThumbnail
	const mainImage = pcImages.length > 0 ? pcImages[0].image : data.work.detailThumbnail;
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
	<div class="hidden tablet:flex relative min-h-screen bg-white">
		<!-- Sticky Left Navigation (120px on tablet) - Hidden on mobile -->
		<nav
			class="hidden tablet:flex sticky left-0 top-0 h-fit w-[150px] bg-white z-50 flex-col items-center pt-[40px] shrink-0 overflow-hidden"
		>
			<!-- Back Arrow Button -->
			<button
				onclick={handleBack}
				class="group w-[150px] h-[150px] flex items-center justify-center mb-[80px]"
				aria-label="Go back"
			>
				<img
					src="/icons/arrow_diagonal_before.svg"
					alt="Back"
					class="group-hover:scale-110 transition-transform duration-300 w-[70px] h-[70px]"
				/>
			</button>

			<!-- Designer Contact Info -->
			<div class="w-full overflow-hidden flex flex-col gap-[52px] items-start px-[24px] pl-[28px]">
				{#each data.designers as designer}
					<div class="w-full flex flex-col gap-[8px] items-start overflow-hidden">
						<!-- Designer Name -->
						<p class="text-[18px] leading-[1.4] text-[#111111] text-left break-all">
							{designer.name}
						</p>

						<!-- Designer Email (3-line format on tablet) -->
						{#if designer.email}
							{@const emailParts = designer.email.split('@')}
							<div
								class="text-[15px] leading-[1.2] text-[#111111] text-left break-all underline underline-offset-2"
							>
								{designer.email}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</nav>

		<!-- Main Content Area (Tablet+) -->
		<main class="flex-1">
			<!-- Desktop/Tablet Layout (≥960px) -->
			<div class="hidden tablet:block tablet:flex-1">
				<!-- PC Images Container (Tablet+) -->
				<div class="hidden tablet:flex tablet:flex-col w-full tablet:px-[40px] desktop:px-[60px]">
					{#each pcImages as image}
						<div class="w-full flex justify-center bg-[#f6f6f6]">
							<img
								src={encodeURI(image.image)}
								alt={data.work.title}
								class="w-full h-auto object-contain"
							/>
						</div>
					{/each}
				</div>

				<!-- Content Sections Container -->
				<div class="px-[40px] pt-[160px] pb-[100px] flex flex-col gap-[140px]">
					<!-- Designers Grid Section (comes first) -->
					<div class="flex flex-col gap-[32px] items-end px-[16px]">
						{#each Array(Math.ceil(data.designers.length / 2)) as _, rowIndex}
							<div class="flex gap-[32px] items-center">
								{#each data.designers.slice(rowIndex * 2, rowIndex * 2 + 2) as designer}
									<a
										href="/designers/{designer.id}"
										class="flex flex-col gap-[16px] group hover:opacity-80 transition-opacity"
									>
										<!-- Designer Profile Image (205x264) -->
										<div class="group w-[205px] h-[264px] overflow-hidden bg-white">
											<img
												src={encodeURI(designer.profileImage)}
												alt={designer.name}
												class="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
											/>
										</div>

										<!-- Designer Info -->
										<div class="flex flex-col leading-[1.4] pb-[2px]">
											<p class="font-bold text-[18px] text-black whitespace-nowrap">
												{designer.name}
											</p>
											<p class="text-[16px] text-[#222222]">
												{designer.nameEn}
											</p>
										</div>
									</a>
								{/each}
							</div>
						{/each}
					</div>

					<!-- Work Info Section (comes second) -->
					<div class="w-[570px] flex flex-col gap-[40px]">
						<!-- Title Group -->
						<div class="flex flex-col gap-[28px]">
							<!-- Category + Title Group -->
							<div class="flex flex-col gap-[2px]">
								<p class="font-display text-[40px] leading-none text-[#111111] h-[40px]">
									{categoryName}
								</p>
								<h1
									class="font-semibold text-[52px] leading-[1.3] text-[#111111] tracking-[-2.08px]"
								>
									{data.work.title}
								</h1>
							</div>

							<!-- Description (한줄소개) -->
							<p class="text-[24px] leading-[1.5] text-[#111111] whitespace-nowrap">
								{data.work.description}
							</p>
						</div>

						<!-- Content (작업설명글) -->
						<p class="text-[20px] leading-[1.5] text-[#111111]">
							{data.work.content}
						</p>
					</div>
				</div>
			</div>

			<!-- Messages Section (Tablet only - with left nav) -->
			<div class="hidden tablet:block px-[40px] pt-[120px] pb-[160px]">
				<MessageBoard type="work" targetId={data.work.id} isForTarget={true} />
			</div>
		</main>
	</div>

	<!-- Mobile Layout (<960px) - Completely separate structure -->
	<div class="tablet:hidden bg-white">
		<!-- Top Section: Back Arrow + Work Info -->
		<div class="flex flex-col gap-[24px] items-center py-[40px]">
			<!-- Back Arrow + Title Row -->
			<div class="flex gap-[10px] items-start w-full">
				<!-- Back Arrow -->
				<button
					onclick={handleBack}
					class="group shrink-0 w-[90px] h-[90px] flex items-center justify-center sticky top-0"
					aria-label="Go back"
				>
					<img
						src="/icons/arrow_diagonal_before.svg"
						alt="Back"
						class="group-hover:scale-110 transition-transform duration-300 w-[34.08px] h-[34.08px]"
					/>
				</button>

				<!-- Work Title and Description -->
				<div class="flex flex-col items-start pt-[8px] text-[#111111] w-[555px] overflow-hidden">
					<h1 class="font-bold text-[32px] leading-[1.4] w-full">
						{data.work.title}
					</h1>
					<p class="text-[20px] leading-[1.5] w-full">
						{data.work.description}
					</p>
				</div>
			</div>

			<!-- Work Content (설명글) -->
			<div
				class="flex gap-[10px] items-center justify-center pt-[12px] px-[16px] sm:px-[24px] w-full"
			>
				<p class="flex-1 text-[18px] leading-[1.4] text-[#111111]">
					{data.work.content}
				</p>
			</div>

			<!-- Designer Names -->
			<div class="flex flex-col items-end px-[16px] sm:px-[24px] w-full">
				<!-- Korean Names -->
				<div
					class="flex gap-[12px] items-center text-[18px] font-bold leading-[1.4] text-[#111111]"
				>
					{#each data.designers as designer, i}
						<p>{designer.name}</p>
					{/each}
				</div>

				<!-- English Names with separators -->
				<div
					class="flex gap-[8px] items-center justify-end text-[16px] leading-[1.4] text-[#111111]"
				>
					{#each data.designers as designer, i}
						{#if i > 0}
							<p>/</p>
						{/if}
						<p>{designer.nameEn}</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Mobile Images Container (Mobile only) -->
		<div class="tablet:hidden flex flex-col px-[16px] sm:px-[24px] w-full">
			{#each mobileImages as image}
				<div class="w-full flex justify-center bg-[#f6f6f6]">
					<img
						src={encodeURI(image.image)}
						alt={data.work.title}
						class="w-full h-auto object-contain"
					/>
				</div>
			{/each}
		</div>

		<!-- Designers Grid -->
		<div
			class="flex gap-[18px] items-start justify-end pt-[140px] pb-[80px] px-[16px] sm:px-[24px] w-full"
		>
			{#each Array(Math.ceil(data.designers.length / 2)) as _, rowIndex}
				<div class="grid grid-cols-2 gap-[20px] items-center">
					{#each data.designers.slice(rowIndex * 2, rowIndex * 2 + 2) as designer}
						<a href="/designers/{designer.id}" class="flex flex-col gap-[14px] group">
							<!-- Designer Profile Image (196x252) -->
							<div class="w-[196px] h-[252px] overflow-hidden bg-white">
								<img
									src={encodeURI(designer.profileImage)}
									alt={designer.name}
									class="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
								/>
							</div>

							<!-- Designer Info -->
							<div class="flex flex-col">
								<p class="font-bold text-[15px] leading-[1.4] text-[#111111] whitespace-nowrap">
									{designer.name}
								</p>
								<p class="text-[14px] leading-[1.5] text-[#222222]">
									{designer.nameEn}
								</p>
							</div>
						</a>
					{/each}
				</div>
			{/each}
		</div>

		<!-- Messages Section (Mobile - full width, no left nav) -->
		<div class="flex flex-col gap-[40px] items-center justify-center py-[60px]">
			<MessageBoard type="work" targetId={data.work.id} isForTarget={true} />
		</div>
	</div>
{/if}
