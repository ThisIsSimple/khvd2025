<script lang="ts">
	import type { PageData } from './$types';
	import WorkItem from '$lib/components/WorkItem.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let { data }: { data: PageData } = $props();

	// Scroll direction detection for mobile collapsible header
	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let scrollingDown = $state(false);

	$effect(() => {
		if (browser) {
			const handleScroll = () => {
				scrollY = window.scrollY;
				scrollingDown = scrollY > lastScrollY && scrollY > 100;
				lastScrollY = scrollY;
			};

			window.addEventListener('scroll', handleScroll, { passive: true });

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});

	// Map group number to title and description
	const groupInfo: Record<
		number,
		{ title: string; description: string; professors: { ko: string; en: string } }
	> = {
		0: {
			title: 'gRADUATION STUDIES 0',
			description: `졸업스튜디오1은 이미 익숙하다고 생각했던 대상을 재해석하는 과정을 통해 새로운 창의적 디자인 문화를 만들어가는 데 초점을 맞춘 과목이다. 수업을 통해 디자인 굿즈 제작과 이에 따른 리서치 및 현장 답사를 통한 실시간 마케팅 경험(Walk in marketing)을 체험할 수 있다. 이번 전시의 타이틀처럼, 디자이너인 우리는 일상의 사소한 이미지를 들이마신 후, 창의적인 아이디어로 발산한다. 여기서 중요한 것은 번뜩이는 아이디어를 통해 디자인적 소통 문제를 어떻게 해결할 수 있는가이다. 이러한 아이디어들이 어디서 비롯되었는지, 그 해결법과 메세지가 무엇인지 고민해 보았으면 한다.`,
			professors: { ko: '김은정, 박상희', en: 'Eun Jeong Kim / Sang Hee Park' }
		},
		1: {
			title: 'GRADUATION STUDIES 1',
			description: '',
			professors: { ko: '', en: '' }
		},
		2: {
			title: 'GRADUATION STUDIES 2',
			description: '',
			professors: { ko: '', en: '' }
		},
		3: {
			title: 'GRADUATION STUDIES 3',
			description: '',
			professors: { ko: '', en: '' }
		}
	};

	const info = groupInfo[data.groupNumber];

	// Back navigation handler
	function handleBack() {
		window.history.back();
	}

	// Professor filter handler
	function handleProfessorFilter(professor: string | null) {
		const url = new URL(window.location.href);
		if (professor) {
			url.searchParams.set('professor', professor);
		} else {
			url.searchParams.delete('professor');
		}
		goto(url.pathname + url.search);
	}

	// Check if a professor is active
	function isProfessorActive(professor: string): boolean {
		return data.selectedProfessor === professor;
	}
</script>

<svelte:head>
	<title>{info.title} - KHVD 2025</title>
</svelte:head>

<!-- Main Container -->
<div class="w-full bg-[#fefefe] min-h-screen tablet:flex">
	<!-- Left Navigation (150px) - Desktop Only -->
	<nav
		class="hidden tablet:flex sticky left-0 top-0 h-fit w-[150px] bg-[#fefefe] flex-col items-center pt-[24px] shrink-0"
	>
		<!-- Back Arrow Button (sticky) -->
		<button
			onclick={handleBack}
			class="w-[150px] h-[150px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors sticky top-0"
			aria-label="Go back"
		>
			<img
				src="/icons/arrow_diagonal_before.svg"
				alt="Back"
				class="w-[71px] h-[71px]"
			/>
		</button>

		<!-- Professor Filter Buttons (only for group 0) -->
		{#if data.groupNumber === 0 && data.professorCounts}
			<div class="w-full flex flex-col gap-[20px] items-start pt-[40px]">
				<!-- Filter Button: 김은정 -->
				<button
					onclick={() => handleProfessorFilter('김은정')}
					class="w-[134px] h-[202px] p-[32px] flex flex-col items-start justify-between cursor-pointer transition-colors {isProfessorActive(
						'김은정'
					)
						? 'bg-primary text-white'
						: 'bg-[#eeeeee] text-black hover:bg-[#e0e0e0]'}"
				>
					<div class="font-bold text-[20px] leading-[1.4]">
						<p class="mb-0">지도교수</p>
						<p>김은정</p>
					</div>
					<p class="font-display text-[24px] leading-[1.3]">
						[{data.professorCounts['김은정'] || 0}]
					</p>
				</button>

				<!-- Divider Line -->
				<div class="w-full h-[24px] flex items-center justify-center px-[40px]">
					<div class="w-[20px] h-[2px] bg-[#999999]"></div>
				</div>

				<!-- Filter Button: 박상희 -->
				<button
					onclick={() => handleProfessorFilter('박상희')}
					class="w-[134px] h-[202px] p-[32px] flex flex-col items-start justify-between cursor-pointer transition-colors {isProfessorActive(
						'박상희'
					)
						? 'bg-primary text-white'
						: 'bg-[#eeeeee] text-black hover:bg-[#e0e0e0]'}"
				>
					<div class="font-bold text-[20px] leading-[1.4]">
						<p class="mb-0">지도교수</p>
						<p>박상희</p>
					</div>
					<p class="font-display text-[24px] leading-[1.3]">
						[{data.professorCounts['박상희'] || 0}]
					</p>
				</button>
			</div>
		{/if}
	</nav>

	<!-- Main Content Area -->
	<main class="w-full tablet:flex-1">
		<!-- Mobile Header - Collapsible Sticky (Hidden on Desktop) -->
		<div
			class="tablet:hidden sticky top-0 bg-[#fefefe] z-20 transition-transform duration-300"
			class:translate-y-[-100%]={scrollingDown && scrollY > 100}
		>
			<div class="flex items-center gap-[6px] h-[74px] pl-[8px] pr-[16px]">
				<!-- Back button (72×72) -->
				<button
					onclick={handleBack}
					class="size-[72px] flex items-center justify-center shrink-0"
					aria-label="Go back"
				>
					<img
						src="/icons/arrow_diagonal_before.svg"
						alt="Back"
						class="w-[34px] h-[34px]"
					/>
				</button>

				<!-- Title + Count -->
				<div class="flex gap-[6px] items-end min-w-0">
					<h1 class="font-display text-[52px] leading-[1.1] text-[#111111] truncate">
						{info.title}
					</h1>
					<div class="flex items-center pb-[5px] shrink-0">
						<p class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] text-[#111111]">
							[{data.works.length}]
						</p>
					</div>
				</div>
			</div>

			<!-- Description -->
			{#if info.description}
				<div class="px-[24px] py-[12px]">
					<p class="text-[15px] leading-[1.5] text-[#222222] text-justify whitespace-pre-wrap">
						{info.description}
					</p>
				</div>
			{/if}

			<!-- Professor info -->
			{#if info.professors.ko}
				<div class="px-[24px] py-[32px] flex flex-col gap-[2px] items-end">
					<!-- Korean Professor Names -->
					<div class="flex gap-[10px] items-center text-[15px] font-bold leading-[1.4] text-[#111111]">
						<p>지도교수</p>
						<p>{info.professors.ko}</p>
					</div>

					<!-- English Professor Names -->
					<div class="flex gap-[6px] items-center text-[15px] font-bold leading-[1.4] text-[#111111]">
						<p>Prof.</p>
						<p>{info.professors.en}</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Mobile Professor Filter - Horizontal Sticky (only for group 0, hidden on desktop) -->
		{#if data.groupNumber === 0 && data.professorCounts}
			<div class="tablet:hidden sticky top-0 z-10 flex h-[82px] w-full">
				<button
					onclick={() => handleProfessorFilter('김은정')}
					class="flex-1 px-[24px] py-[16px] flex items-start justify-between transition-colors {isProfessorActive(
						'김은정'
					)
						? 'bg-primary text-white'
						: 'bg-[#eeeeee] text-black'}"
				>
					<div class="font-bold text-[18px] leading-[1.4]">
						<p class="mb-0">지도교수</p>
						<p>김은정</p>
					</div>
					<div class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] flex items-center py-[3px]">
						[{data.professorCounts['김은정'] || 0}]
					</div>
				</button>

				<button
					onclick={() => handleProfessorFilter('박상희')}
					class="flex-1 px-[24px] py-[16px] flex items-start justify-between transition-colors {isProfessorActive(
						'박상희'
					)
						? 'bg-primary text-white'
						: 'bg-[#eeeeee] text-black'}"
				>
					<div class="font-bold text-[18px] leading-[1.4]">
						<p class="mb-0">지도교수</p>
						<p>박상희</p>
					</div>
					<div class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] flex items-center py-[3px]">
						[{data.professorCounts['박상희'] || 0}]
					</div>
				</button>
			</div>
		{/if}

		<!-- Desktop Header Section (Hidden on Mobile) -->
		<div class="hidden tablet:flex w-full bg-[#fefefe] flex-col gap-[12px] pt-[48px] px-[40px] desktop:px-[60px]">
			<!-- Title and Count Container -->
			<div class="w-full flex flex-col items-start justify-center">
				<!-- Title Row -->
				<div class="w-full flex gap-[16px] items-center pb-[24px]">
					<!-- Main Title -->
					<h1 class="font-display text-[120px] leading-none text-[#111111] whitespace-nowrap">
						{info.title}
					</h1>

					<!-- Work Count -->
					<div class="flex items-center self-stretch">
						<div class="flex items-start pt-[4px]">
							<p class="font-display text-[40px] leading-[1.4] tracking-[-0.8px] text-[#111111]">
								[{data.works.length}]
							</p>
						</div>
					</div>
				</div>

				<!-- Description -->
				{#if info.description}
					<div class="w-full flex items-center justify-center pr-[320px]">
						<p class="flex-1 text-[20px] leading-[1.5] text-[#222222] whitespace-pre-wrap">
							{info.description}
						</p>
					</div>
				{/if}
			</div>

			<!-- Professor Info -->
			{#if info.professors.ko}
				<div class="w-full flex flex-col items-end justify-end">
					<div class="flex flex-col gap-[5px] items-end">
						<!-- Korean Professor Names -->
						<div class="flex gap-[12px] items-center text-[20px] font-bold leading-[1.4] text-[#111111]">
							<p>지도교수</p>
							<p>{info.professors.ko}</p>
						</div>

						<!-- English Professor Names -->
						<div class="flex gap-[8px] items-center text-[20px] font-bold leading-[1.4] text-[#111111]">
							<p>Prof.</p>
							<p>{info.professors.en}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Works Grid Section -->
		<!--
			Responsive grid:
			- Mobile (< 421px): 2 columns, 16px gap, 24px padding, 28px top padding
			- Tablet/SM (421px - 1350px): 3 columns, 24px gap, 24px padding, 28px top padding
			- Desktop (≥ 1351px): 4 columns, 40px gap, 60px padding, 80px top padding
		-->
		<div
			class="w-full grid grid-cols-2 gap-[16px] xs:grid-cols-3 xs:gap-[24px] desktop:grid-cols-4 desktop:gap-[40px] items-start pb-[200px] pt-[28px] px-[24px] tablet:pt-[80px] tablet:px-[40px] desktop:px-[60px]"
		>
			{#each data.works as work}
				<WorkItem
					id={work.id}
					thumbnail={work.thumbnail}
					title={work.title}
					designers={work.designers.map((d) => d.name)}
				/>
			{/each}
		</div>
	</main>
</div>
