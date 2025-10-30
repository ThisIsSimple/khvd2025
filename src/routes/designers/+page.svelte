<script lang="ts">
	import DesignerCard from '$lib/components/DesignerCard.svelte';
	import type { PageData } from './$types';

	// Get data from server
	let { data }: { data: PageData } = $props();

	// Scroll state management
	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let isScrollingDown = $state(false);
	let showConsonantNav = $state(true);

	// Filter state
	type FilterType =
		| 'ALL'
		| 'ㄱ'
		| 'ㄴ'
		| 'ㄷ'
		| 'ㄹ'
		| 'ㅁ'
		| 'ㅂ'
		| 'ㅅ'
		| 'ㅇ'
		| 'ㅈ'
		| 'ㅊ'
		| 'ㅋ'
		| 'ㅌ'
		| 'ㅍ'
		| 'ㅎ';
	let selectedFilter = $state<FilterType>('ALL');

	// Consonant buttons
	const consonants: FilterType[] = [
		'ㄱ',
		'ㄴ',
		'ㄷ',
		'ㄹ',
		'ㅁ',
		'ㅂ',
		'ㅅ',
		'ㅇ',
		'ㅈ',
		'ㅊ',
		'ㅋ',
		'ㅌ',
		'ㅍ',
		'ㅎ'
	];

	/**
	 * Extract Korean consonant from name
	 * @param name - Korean name
	 * @returns Consonant character
	 */
	function getConsonant(name: string): FilterType {
		if (!name || name.length === 0) return 'ㄱ';

		// Korean consonants in order
		const cho = [
			'ㄱ',
			'ㄲ',
			'ㄴ',
			'ㄷ',
			'ㄸ',
			'ㄹ',
			'ㅁ',
			'ㅂ',
			'ㅃ',
			'ㅅ',
			'ㅆ',
			'ㅇ',
			'ㅈ',
			'ㅉ',
			'ㅊ',
			'ㅋ',
			'ㅌ',
			'ㅍ',
			'ㅎ'
		];

		const firstChar = name.charAt(0);
		const charCode = firstChar.charCodeAt(0);

		// Check if it's a Korean character (가-힣)
		if (charCode < 0xac00 || charCode > 0xd7a3) {
			return 'ㄱ'; // Default to ㄱ for non-Korean characters
		}

		// Calculate consonant index
		const consonantIndex = Math.floor((charCode - 0xac00) / 588);
		const consonant = cho[consonantIndex];

		// Map double consonants to single consonants
		const consonantMap: Record<string, FilterType> = {
			ㄲ: 'ㄱ',
			ㄸ: 'ㄷ',
			ㅃ: 'ㅂ',
			ㅆ: 'ㅅ',
			ㅉ: 'ㅈ'
		};

		return (consonantMap[consonant] || consonant) as FilterType;
	}

	// Filter designers based on selected filter
	const filteredDesigners = $derived(() => {
		if (selectedFilter === 'ALL') {
			return data.designers;
		}
		return data.designers.filter((d) => {
			const consonant = getConsonant(d.name);
			return consonant === selectedFilter;
		});
	});

	// Handle scroll direction detection
	$effect(() => {
		function handleScroll() {
			scrollY = window.scrollY;

			// Determine scroll direction
			if (scrollY > lastScrollY && scrollY > 50) {
				// Scrolling down
				isScrollingDown = true;
				showConsonantNav = false;
			} else if (scrollY < lastScrollY) {
				// Scrolling up
				isScrollingDown = false;
				showConsonantNav = true;
			}

			lastScrollY = scrollY;
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Handle filter selection
	function selectFilter(filter: FilterType) {
		selectedFilter = filter;
	}
</script>

<svelte:head>
	<title>DESIGNERS - KHVD 2025</title>
</svelte:head>

<div class="relative min-h-screen bg-white">
	<!-- Navigation Section -->
	<nav
		class="sticky top-0 z-30 bg-white
		px-4 sm:px-6 tablet:px-[40px]
		py-2 sm:py-2 tablet:py-[24px] desktop:py-[48px]
		flex flex-col tablet:flex-row gap-4 tablet:gap-[52px] items-start tablet:items-center
		border-b border-[#e5e5e5]"
	>
		<!-- Title Section -->
		<div class="flex gap-[16px] items-center shrink-0">
			<h1 class="font-display text-[56px] tablet:text-[120px] leading-none text-[#111111]">
				DESIGNER
			</h1>
			<div class="flex items-start pt-[4px]">
				<span
					class="font-display text-[24px] tablet:text-[40px] leading-[1.4] tracking-[-0.8px] text-[#111111]"
				>
					[{data.total}]
				</span>
			</div>
		</div>

		<!-- Filter Navigation -->
		<div
			class="w-full tablet:w-auto tablet:flex-1
			transition-all duration-300 ease-in-out
			flex justify-between sm:justify-normal
			{showConsonantNav
				? 'max-h-[200px] opacity-100'
				: 'max-h-0 opacity-0 overflow-hidden tablet:max-h-none tablet:opacity-100'}"
		>
			<div class="flex-none sm:hidden">
				<!-- ALL Button -->
				<button
					onclick={() => selectFilter('ALL')}
					class="flex-none items-center justify-center
						w-[40px] h-[40px]
						font-bold text-[16px] leading-[1.4]
						transition-colors duration-200
						{selectedFilter === 'ALL'
						? 'bg-primary text-white'
						: 'bg-transparent text-[#111111] hover:bg-[#f5f5f5]'}"
				>
					ALL
				</button>
			</div>
			<div class="sm:hidden">
				<!-- ALL Button -->
				<button
					onclick={() => selectFilter('ALL')}
					class="hidden sm:flex flex-none items-center justify-center
						w-full h-[40px]
						tablet:w-[52px] tablet:h-[52px]
						desktop:w-[68px] desktop:h-[68px]
						font-bold text-[16px] tablet:text-[20px] leading-[1.4]
						transition-colors duration-200
						{selectedFilter === 'ALL'
						? 'bg-primary text-white'
						: 'bg-transparent text-[#111111] hover:bg-[#f5f5f5]'}"
				>
					ALL
				</button>
			</div>
			<div
				class="grid grid-cols-7 sm:grid-cols-9 tablet:grid-cols-8 desktop:grid-cols-10 xl:grid-cols-12 gap-[12px] items-center"
			>
				<!-- ALL Button -->
				<button
					onclick={() => selectFilter('ALL')}
					class="hidden sm:flex flex-none items-center justify-center
						w-[40px] h-[40px]
						tablet:w-[52px] tablet:h-[52px]
						desktop:w-[68px] desktop:h-[68px]
						font-bold text-[16px] tablet:text-[20px] leading-[1.4]
						transition-colors duration-200
						{selectedFilter === 'ALL'
						? 'bg-primary text-white'
						: 'bg-transparent text-[#111111] hover:bg-[#f5f5f5]'}"
				>
					ALL
				</button>

				<!-- Consonant Buttons -->
				{#each consonants as consonant}
					<button
						onclick={() => selectFilter(consonant)}
						class="flex-none flex items-center justify-center
							w-[40px] h-[40px]
							tablet:w-[52px] tablet:h-[52px]
							desktop:w-[68px] desktop:h-[68px]
							font-bold text-[16px] tablet:text-[20px] leading-[1.4]
							transition-colors duration-200
							{selectedFilter === consonant
							? 'bg-primary text-white'
							: 'bg-transparent text-[#111111] hover:bg-[#f5f5f5]'}"
					>
						{consonant}
					</button>
				{/each}
			</div>
		</div>
	</nav>

	<!-- Content Section -->
	<main class="px-[16px] tablet:px-[40px] py-[60px] tablet:py-[100px]">
		{#if data.error}
			<!-- Error state -->
			<div class="text-center py-[100px]">
				<p class="text-h6 text-[#fc451e] mb-4">⚠️ 데이터 로딩 실패</p>
				<p class="text-b1 text-[#777777]">디자이너 정보를 불러올 수 없습니다.</p>
				<p class="text-b2 text-[#999999] mt-2">잠시 후 다시 시도해주세요.</p>
			</div>
		{:else if data.designers.length === 0}
			<!-- No designers found -->
			<div class="text-center py-[100px]">
				<p class="text-b1 text-[#777777]">등록된 디자이너가 없습니다.</p>
			</div>
		{:else}
			<!-- Designers Grid with Responsive Breakpoints -->
			<div
				class="grid
				   grid-cols-2 gap-[12px]
				   sm:grid-cols-3 sm:gap-[16px]
				   tablet:grid-cols-4 tablet:gap-[20px]
				   desktop:grid-cols-5 desktop:gap-[24px]"
			>
				{#each filteredDesigners() as designer (designer.id)}
					<DesignerCard
						id={designer.id}
						name={designer.name}
						nameEn={designer.nameEn}
						imageUrl={designer.imageUrl}
						instagramUrl={designer.qrLink}
						email={designer.email}
					/>
				{/each}
			</div>

			<!-- Empty state when no designers match filter -->
			{#if filteredDesigners().length === 0}
				<div class="text-center py-[100px]">
					<p class="text-b1 text-[#777777]">해당 초성의 디자이너가 없습니다.</p>
				</div>
			{/if}
		{/if}
	</main>
</div>
