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

	// Map group number to title and professors with descriptions
	const groupInfo: Record<
		number,
		{ title: string; professors: Array<{ ko: string; en: string; description: string }> }
	> = {
		0: {
			title: 'GRADUATION STUDIES 0',
			professors: [
				{
					ko: '김은정',
					en: 'Un Chong Kim',
					description: `시각디자인졸업연구 제로(0)는 '사회적 디자인(Social Design)'을 주제로, 각자가 바라보는 사회적 이슈에 대한 심도 있는 연구·조사와 해석을 통해 디자이너로서의 정체성을 확립하고 그 과정을 아카이브하는 실험적이며 통합적인 디자인 졸업스튜디오 수업이다. 본 수업은 디자이너이자 연구자로서 SDGs(지속가능발전목표) 달성을 위한 과제를 발굴하고, 문제 해결을 위한 방법론을 개발하며, 약 1년간의 연구·디자인 과정을 체계적으로 기록하고 정체성을 구축하는 것을 목표로 한다.`
				},
				{
					ko: '박상희',
					en: 'Sang Hee Park',
					description: `시각디자인졸업연구 제로(0)는 사회적 디자인과 브랜드 액티비즘을 통해 지속 가능한 미래를 위한 창의적 해법을 제시하는 것을 목표로 한다. 학생들이 스스로 문제를 발굴하고, 창업, 산학협력, 사회실험 등의 프로젝트를 생성하는 과정을 중심으로 진행된다. 이 과정은 4P(Problem, Project, Participation, Practice) 접근법을 통해 지역, 생태, 삶의 균형을 촉진하며, 다양한 학문 간 융합과 실천을 강조한다.
디자인 결과물에 대한 영역을 구분하지 않고 융합과 실천을 통해 사회 속 문제를 포착하고, 새로운 시선을 제시하며, 개인의 실천에서 시작해 공동체로 확장해 나 가는 것을 미션으로 삼고 있다.
DESIGN FOR ALL + PASSION + OPEN, MIND + CREATIVITY + :)`
				}
			]
		},
		1: {
			title: 'GRADUATION STUDIES 1',
			professors: [
				{
					ko: '장미경, 김대연',
					en: 'Mee Kyung Jang / Dae Yeon Kim',
					description: `시각디자인졸업연구1 수업은 창의적 콘텐츠 작업을 위한 전문 디자이너 양성을 타겟으로 하며 디자인, 일러스트레이션, 애니, 영상 등의 폭 넓은 분야를 재해석하고 트렌디한 디자인 문화를 이해하는 역량을 키우는 데 목적을 둔다.

체계적인 디자인 리서치를 기본으로 창의적 아이디어를 표현하고 졸업전시 대비뿐만 아니라 개인별 포트폴리오 제작 및 지원 분야별 회사 실무진과의 job interview 기회를 가져 사회 진출의 경험을 쌓는 기회를 가진다.`
				}
			]
		},
		2: {
			title: 'GRADUATION STUDIES 2',
			professors: [
				{
					ko: '정지연',
					en: 'Je Yon Jung',
					description: `오늘날의 비즈니스 환경에서 디자인은 단순한 시각적 표현을 넘어, 경험과 혁신, 그리고 기술을 매개하는 전략적 가치 창출의 중심축으로 진화하고 있다. 2025 시각디자인 졸업연구2 전시는 사회·문화적 변화와 디지털 전환의 흐름 속에서 디자인이 만들어가는 새로운 비즈니스 생태계를 탐구한다.
참여 학생들은 서비스디자인과 브랜드 전략을 기반으로 사용자 경험을 중심에 둔 비즈니스 모델과 커뮤니케이션 솔루션을 제시하며, AI·XR·인터랙티브 미디어 등 신기술을 활용한 혁신적 디자인 실험을 통해 실제 산업과 사회에 적용 가능한 창의적 비즈니스 가능성을 모색한다.
이번 전시는 디자인을 통해 지속가능한 가치, 사회적 영향력, 그리고 미래형 창업 기회를 확장하는 시각디자이너들의 실천적 비전과 통찰을 공유하는 장이 될 것이다.`
				}
			]
		},
		3: {
			title: 'GRADUATION STUDIES 3',
			professors: [
				{
					ko: '김정우',
					en: 'Jung Woo Kim',
					description: `디지털 환경에서의 경험은 시각적 언어와 인터랙션의 감각이 어우러질 때 완성됩니다. 본 과정은 변화하는 경험 디자인의 흐름 속에서 의미 있는 서비스와 미학적으로 탁월한 사용자 경험을 창출하기 위한 심화 학습을 제공합니다.
타이포그래피, 인터페이스 레이아웃, 모션과 같은 시각 요소와 서비스 구조, 사용자 흐름을 통합적으로 다루며, 브랜드 정체성과 연결된 경험 디자인을 탐구합니다. 학생들은 실제 프로젝트를 통해 시각디자인 전공자로서의 강점을 UX 영역에 확장하고, 감각적이면서도 실무적 경쟁력을 갖춘 주니어 UX 디자이너로 성장하는 것을 목표로 합니다.`
				}
			]
		}
	};

	const info = groupInfo[data.groupNumber];

	// Filter professors based on selection (for group 0)
	const filteredProfessors = $derived.by(() => {
		// If not group 0 or no professor selected, show all professors
		if (data.groupNumber !== 0 || !data.selectedProfessor) {
			return info.professors;
		}

		// Filter to show only the selected professor
		return info.professors.filter((prof) => prof.ko === data.selectedProfessor);
	});

	// Back navigation handler
	function handleBack() {
		window.location.href = '/exhibition/works';
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
		class="hidden tablet:flex sticky left-0 h-fit w-[150px] bg-[#fefefe] flex-col items-center pt-[24px] shrink-0"
		style="top: var(--nav-height, 0px)"
	>
		<!-- Back Arrow Button (sticky) -->
		<button
			onclick={handleBack}
			class="group w-[150px] h-[150px] flex items-center justify-center"
			aria-label="Go back"
		>
			<img
				src="/icons/arrow_diagonal_before.svg"
				alt="Back"
				class="group-hover:scale-110 transition-transform duration-300 w-[70px] h-[70px]"
			/>
		</button>

		<!-- Professor Filter Buttons (only for group 0) -->
		{#if data.groupNumber === 0 && data.professorCounts}
			<div class="w-full flex flex-col gap-[20px] items-start pt-[40px]">
				<!-- Filter Button: 김은정 -->
				<button
					onclick={() => handleProfessorFilter('김은정')}
					class="w-full h-[202px] p-[32px] flex flex-col items-start justify-between cursor-pointer transition-colors {isProfessorActive(
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
					class="w-full h-[202px] p-[32px] flex flex-col items-start justify-between cursor-pointer transition-colors {isProfessorActive(
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
			class="tablet:hidden sticky bg-[#fefefe] z-20 transition-transform duration-300"
			style="top: var(--nav-height, 0px)"
			class:translate-y-[-100%]={scrollingDown && scrollY > 100}
		>
			<div class="flex items-center gap-[6px] h-[74px] pl-[8px] pr-[16px]">
				<!-- Back button (70×70) -->
				<button
					onclick={handleBack}
					class="group size-[52px] flex items-center justify-center shrink-0"
					aria-label="Go back"
				>
					<img
						src="/icons/arrow_diagonal_before.svg"
						alt="Back"
						class="group-hover:scale-110 transition-transform duration-300 w-[28px] h-[28px]"
					/>
				</button>

				<!-- Title + Count -->
				<div class="flex gap-[6px] items-start min-w-0">
					<h1 class="font-display text-[40px] leading-[1.1] text-[#111111] truncate">
						{info.title}
					</h1>
					<div class="flex items-center pt-[5px] shrink-0">
						<p class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] text-[#111111]">
							[{data.works.length}]
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Professors Info -->
		{#if filteredProfessors.length > 0}
			<div class="tablet:hidden px-[24px] py-[12px] flex flex-col gap-[24px]">
				{#each filteredProfessors as professor}
					<!-- Professor Description -->
					<div>
						<p class="text-[15px] leading-[1.5] text-[#222222] text-justify whitespace-pre-wrap">
							{professor.description}
						</p>
					</div>

					<!-- Professor Name Info -->
					<div class="flex flex-col gap-[2px] items-end">
						<!-- Korean Professor Name -->
						<div
							class="flex gap-[10px] items-center text-[15px] font-bold leading-[1.4] text-[#111111]"
						>
							<p>지도교수</p>
							<p>{professor.ko}</p>
						</div>

						<!-- English Professor Name -->
						<div
							class="flex gap-[6px] items-center text-[15px] font-bold leading-[1.4] text-[#111111]"
						>
							<p>Prof.</p>
							<p>{professor.en}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Mobile Professor Filter - Horizontal Sticky (only for group 0, hidden on desktop) -->
		{#if data.groupNumber === 0 && data.professorCounts}
			<div
				class="tablet:hidden sticky z-10 flex h-[82px] w-full"
				style="top: var(--nav-height, 0px)"
			>
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
					<div
						class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] flex items-center py-[3px]"
					>
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
					<div
						class="font-display text-[18px] leading-[1.2] tracking-[-0.36px] flex items-center py-[3px]"
					>
						[{data.professorCounts['박상희'] || 0}]
					</div>
				</button>
			</div>
		{/if}

		<!-- Desktop Header Section (Hidden on Mobile) -->
		<div
			class="hidden tablet:flex w-full bg-[#fefefe] flex-col gap-[12px] pt-[48px] px-[40px] desktop:px-[60px]"
		>
			<!-- Title and Count Container -->
			<div class="w-full flex flex-col items-start justify-center">
				<!-- Title Row -->
				<div class="w-full flex gap-[16px] items-start pb-[24px]">
					<!-- Main Title -->
					<h1
						class="font-display text-[100px] xl:text-[120px] leading-none text-[#111111] whitespace-nowrap"
					>
						{info.title}
					</h1>

					<!-- Work Count -->
					<div class="flex items-start pt-[4px]">
						<p class="font-display text-[40px] leading-[1.4] tracking-[-0.8px] text-[#111111]">
							[{data.works.length}]
						</p>
					</div>
				</div>

				<!-- Professors Info -->
				{#if filteredProfessors.length > 0}
					<div class="w-full flex flex-col gap-[40px] pt-[24px]">
						{#each filteredProfessors as professor}
							<div class="w-full flex flex-col gap-[12px]">
								<!-- Professor Description -->
								<div class="w-3/4 flex items-center justify-center">
									<p class="flex-1 text-[20px] leading-[1.5] text-[#222222] whitespace-pre-wrap">
										{professor.description}
									</p>
								</div>

								<!-- Professor Name Info -->
								<div class="w-full flex flex-col items-end justify-end">
									<div class="flex flex-col gap-[5px] items-end">
										<!-- Korean Professor Name -->
										<div
											class="flex gap-[12px] items-center text-[20px] font-bold leading-[1.4] text-[#111111]"
										>
											<p>지도교수</p>
											<p>{professor.ko}</p>
										</div>

										<!-- English Professor Name -->
										<div
											class="flex gap-[8px] items-center text-[20px] font-bold leading-[1.4] text-[#111111]"
										>
											<p>Prof.</p>
											<p>{professor.en}</p>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
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
