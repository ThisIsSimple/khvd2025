<script lang="ts">
	import type { PageData } from './$types';
	import FlipClock from '$lib/components/FlipClock.svelte';
	import MessageBoard from '$lib/components/MessageBoard.svelte';

	let { data }: { data: PageData } = $props();

	// Exhibition closing date: 2025.11.09 at 5:30 PM
	const exhibitionEndDate = new Date('2025-11-09T17:30:00');
</script>

<svelte:head>
	<title>KHVD 2025 - Exhibition</title>
</svelte:head>

<div class="relative min-h-screen">
	<!-- Section 1: Hero Section with R=VD Logo -->
	<section class="relative w-full aspect-video">
		<!-- Background Image -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<img
				src="/exhibition-hero-bg.png"
				alt=""
				class="absolute w-full h-full object-cover"
				style="width: 100.67%; height: 112.53%; left: -0.35%; top: -6.33%;"
			/>
		</div>

		<!-- Content will be added here -->
		<div class="relative z-10 flex items-center justify-center h-full">
			<!-- R=VD Logo and text content will be in the actual design -->
		</div>
	</section>

	<!-- Section 2: Exhibition Concept -->
	<section class="relative w-full flex flex-col">
		<!-- Background Image -->
		<img
			src="/exhibition-section2-bg.png"
			alt=""
			class="absolute inset-0 w-full h-full object-cover pointer-events-none"
		/>

		<!-- Title Area -->
		<div
			class="relative flex flex-col gap-[10px] items-start overflow-hidden px-4 tablet:px-[389px] py-[200px] tablet:py-[400px] w-full"
		>
			<div
				class="flex flex-col font-display gap-[20px] items-center justify-center leading-none text-primary text-[56px] tablet:text-[132px] text-center w-full max-w-[1142px] mx-auto"
			>
				<p class="w-full">Reenvision = vivid dreams</p>
				<p class="whitespace-nowrap">Realization = Visual design</p>
			</div>
		</div>

		<!-- Reenvision Explanation -->
		<div
			class="relative flex flex-col gap-[10px] items-center justify-center px-4 tablet:px-[40px] py-[100px] tablet:py-[200px] w-full"
		>
			<div class="flex flex-col gap-[49px] items-center text-primary w-full max-w-[1081px]">
				<!-- Title -->
				<div class="flex flex-col font-display gap-[14px] items-center w-full max-w-[858px]">
					<p
						class="leading-[1.4] opacity-50 text-[24px] tablet:text-[40px] text-center tracking-[-0.8px] w-full"
					>
						REENVISION=VIVID DREAMS
					</p>
					<p class="leading-none text-[80px] tablet:text-[210px] w-full">REENVISION =</p>
				</div>

				<!-- Description -->
				<div class="font-sans leading-[1.6] text-[20px] tablet:text-[40px] text-center">
					<p class="text-primary">Reenvision, 무뎌졌던 감각을 다시 일깨우고,</p>
					<p class="text-primary">범람하는 정보들을 자신만의 것으로 재구상하는 과정.</p>
					<p>&nbsp;</p>
					<p class="text-primary">넘쳐나는 정보와 급변하는 환경 속에서</p>
					<p class="text-primary">우리는 자주 흐려지고 쉽게 흔들립니다.</p>
					<p>&nbsp;</p>
					<p class="text-primary">"나는 지금 무엇을, 어떻게 보고 있는가?"</p>
					<p>&nbsp;</p>
					<p>이에 우리 디자이너들은 익숙했던 공식 R=VD를 다시 써보며</p>
					<p>모호해진 자신만의 기준을 뚜렷이 다듬어보고자 했습니다.</p>
				</div>
			</div>
		</div>

		<!-- Vivid Dreams Explanation -->
		<div
			class="relative flex flex-col gap-[10px] items-start px-4 tablet:px-[40px] py-[200px] tablet:py-[400px] w-full pb-[200px]"
		>
			<div class="flex flex-col gap-[60px] items-center text-primary w-full">
				<!-- Title -->
				<div class="flex flex-col font-display gap-[7px] items-center w-full max-w-[882px]">
					<p
						class="leading-[1.4] opacity-50 text-[24px] tablet:text-[40px] text-center tracking-[-0.8px] w-full"
					>
						Realization=Visual Design
					</p>
					<p class="leading-none text-[80px] tablet:text-[210px] w-full">VIVID DREAMS</p>
				</div>

				<!-- Description -->
				<div class="font-sans leading-[1.6] text-[20px] tablet:text-[40px] text-center">
					<p>다듬어진 시선과 가치들은 시각디자인이라는 매체를 통해</p>
					<p>Realization, 눈 앞의 현실로 드러납니다.</p>
					<p>&nbsp;</p>
					<p>"생생한 꿈은 결국 실현된다"</p>
					<p>&nbsp;</p>
					<p>이번 전시는 다시 보는 것에서 시작해</p>
					<p>흐릿했던 시야를 스스로의 기준으로 정돈하고,</p>
					<p>자신만의 시선과 태도를 시각적으로 구축해나간 여정의 기록입니다.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 3: Countdown Timer & Exhibition Details -->
	<section class="w-full flex flex-col">
		<!-- Top Bar: UNTIL CLOSING with FlipClock -->
		<div
			class="w-full bg-primary flex flex-col tablet:flex-row items-center justify-between gap-[20px] tablet:gap-[40px] px-[40px] py-[24px] tablet:py-[44px]"
		>
			<h2 class="font-display text-[48px] tablet:text-[80px] text-black leading-none">
				UNTIL CLOSING =
			</h2>
			<FlipClock targetDate={exhibitionEndDate} />
		</div>

		<!-- Bottom Section: Exhibition Details with Pattern Background (Tablet+ only) -->
		<div class="hidden tablet:grid grid-cols-2 w-full relative items-start">
			<!-- Pattern Background -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				<img
					src="/home-information-pattern.webp"
					alt=""
					class="absolute inset-0 w-full h-full object-cover"
				/>
			</div>

			<!-- Left Column: Open & Close -->
			<div
				class="w-full flex flex-col tablet:gap-0 desktop:gap-[8px] p-[40px] relative z-10 shrink-0"
			>
				<h3
					class="font-display tablet:text-[32px] desktop:text-[52px] tablet:leading-[1.3] desktop:leading-[1.1] tablet:tracking-[-0.64px] desktop:tracking-normal text-[#111111]"
				>
					OPEN & CLOSE
				</h3>
				<p
					class="font-display tablet:text-[32px] desktop:text-[52px] tablet:leading-[1.3] desktop:leading-[1.1] tablet:tracking-[-0.64px] desktop:tracking-normal text-[#111111]"
				>
					10:00 AM - 05:30 PM
				</p>
			</div>

			<!-- Right Column: Exhibition Details -->
			<div class="flex-1 flex flex-col tablet:gap-[32px] desktop:gap-[52px] p-[40px] relative z-10">
				<!-- 전시 기간 -->
				<div class="flex flex-col gap-[5px]">
					<h4
						class="font-bold tablet:text-[24px] desktop:text-[28px] tablet:tracking-[-0.48px] desktop:tracking-normal leading-[1.4] text-[#111111]"
					>
						전시 기간
					</h4>
					<div
						class="flex items-center tablet:gap-[12px] desktop:gap-[32px] font-bold text-[#111111] whitespace-nowrap"
					>
						<p class="tablet:text-[20px] desktop:text-[28px] leading-[1.4]">2025.11.05</p>
						<p class="tablet:text-[20px] desktop:text-[32px] leading-[1.4]">-</p>
						<p class="tablet:text-[20px] desktop:text-[28px] leading-[1.4]">2025.11.09</p>
					</div>
				</div>

				<!-- 전시 장소 -->
				<div class="flex flex-col gap-[5px]">
					<h4
						class="font-bold tablet:text-[24px] desktop:text-[28px] tablet:tracking-[-0.48px] desktop:tracking-normal leading-[1.4] text-[#111111]"
					>
						전시 장소
					</h4>
					<p class="font-bold tablet:text-[20px] desktop:text-[28px] leading-[1.4] text-[#111111]">
						경희대학교 국제캠퍼스 예술디자인대학 2F A&D홀 갤러리
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 4: Work Shortcut -->
	<section
		class="w-full bg-white flex flex-col gap-[1.948px] xs:gap-[10px] tablet:gap-[10px] desktop:gap-[10px] xl:gap-[10px] items-start justify-center py-[80px] xs:py-[100px] xs:pb-[160px] tablet:py-[100px] tablet:pb-[200px] desktop:py-[100px] desktop:pb-[200px] xl:py-[100px] xl:pb-[200px] px-[16px] xs:px-[40px] tablet:px-[40px] desktop:px-[40px] xl:px-[40px]"
	>
		<!-- Header -->
		<div class="w-full flex flex-col items-start pb-[14px] pt-[12px] xs:px-[12px] xs:py-[32px] tablet:px-[12px] tablet:py-[32px] desktop:px-[12px] desktop:py-[32px] xl:px-[12px] xl:py-[32px]">
			<h2 class="text-[18px] leading-[1.4] font-bold xs:text-[28px] xs:leading-[1.4] xs:font-bold tablet:text-[32px] tablet:leading-[1.4] desktop:text-h7 xl:text-h7 text-[#111111] tracking-[-0.8px]">작품 바로가기</h2>
			<p class="text-[15px] leading-[1.5] xs:text-[20px] xs:leading-[1.5] tablet:text-h10 desktop:text-h10 xl:text-h10 text-[#777777]">Work Shortcut</p>
		</div>

		<!-- Content Area -->
		<div
			class="w-full flex flex-col tablet:flex-col desktop:flex-row xl:flex-row items-start xs:items-start tablet:items-start desktop:h-[695px] xl:h-[695px] gap-[12px] xs:gap-[32px] tablet:gap-[40px] desktop:gap-[60px] xl:gap-[60px] xs:py-[60px] tablet:py-[60px] desktop:py-[60px] xl:py-[60px] xs:px-[20px] tablet:px-[20px] desktop:px-[20px] xl:px-[20px]"
		>
			<!-- Exhibition Map -->
			<div class="w-full px-[12px] py-[16px] xs:px-0 xs:py-0 tablet:px-0 tablet:py-0 desktop:px-0 desktop:py-0 xl:px-0 xl:py-0">
				<div class="w-full aspect-[331.749/212.747] xs:aspect-[860/575] tablet:aspect-[860/575] desktop:w-[800px] xl:flex-1 desktop:h-[534.884px] xl:h-full relative shrink-0 xs:shrink-0 tablet:shrink-0 desktop:shrink-0">
					<div class="absolute inset-0 bg-white">
						<div class="absolute inset-0 overflow-hidden">
							<img
								src="/exhibition-map.svg"
								alt="Exhibition Map"
								class="w-full desktop:w-[800px] xl:w-[870px]"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Work Details with Arrow -->
			<div
				class="w-full tablet:w-full desktop:flex-1 xl:flex-1 h-full flex flex-row xs:flex-col tablet:flex-row desktop:flex-col xl:flex-col justify-between items-center xs:items-start tablet:items-start desktop:items-start px-[12px] xs:px-[12px] tablet:px-[12px] desktop:px-0 xl:px-0 border-t-[0.5px] border-[#111111] xs:border-black tablet:border-[#111111] desktop:border-t-0 xl:border-t-0 pb-[24px] pt-[18px] xs:pt-[24px] xs:pb-0 tablet:pt-[32px] tablet:pb-0 desktop:py-[60px] xl:py-[60px] xs:gap-[10px] tablet:gap-[95px] desktop:gap-0 xl:gap-0"
			>
				<!-- Text Content -->
				<div class="flex-1 xs:w-full tablet:w-[458px] desktop:w-full xl:w-full flex flex-col gap-0">
					<!-- Text with [15] -->
					<div class="flex flex-row items-center gap-[4px] xs:gap-[8px] tablet:gap-[4px] desktop:flex-col desktop:gap-[4px] xl:flex-col xl:gap-[4px]">
						<p class="font-display text-[40px] leading-none xs:text-[52px] xs:leading-[1.1] tablet:text-[60px] tablet:leading-none desktop:text-[100px] desktop:leading-none xl:text-[120px] xl:leading-none text-[#111111]">
							GRADUATION sTUDies 1
						</p>
						<div class="pt-[6px] xs:pt-[4px] tablet:pt-[2px] desktop:pt-[12px] xl:pt-[12px]">
							<span class="font-display text-[16px] leading-[1.4] tracking-[-0.32px] xs:text-[28px] xs:leading-[1.2] xs:tracking-[-0.56px] tablet:text-[28px] tablet:leading-[1.2] tablet:tracking-[-0.56px] desktop:text-[32px] desktop:leading-none xl:text-[40px] xl:leading-none text-[#111111]">[15]</span>
						</div>
					</div>
				</div>

				<!-- Arrow Icon -->
				<div class="flex-1 xs:w-full tablet:w-auto desktop:w-full xl:w-full flex justify-end xs:justify-end tablet:justify-end desktop:justify-end xl:justify-end items-start xs:items-center tablet:items-start desktop:items-center xl:items-center">
					<div class="w-[52px] h-[52px] xs:w-[60px] xs:h-[60px] tablet:w-[80px] tablet:h-[80px] desktop:w-[150px] xl:w-[150px] desktop:h-[150px] xl:h-[150px] flex items-center justify-center rotate-180 scale-y-[-100%]">
						<img src="/icons/arrow_diagonal.svg" alt="" class="w-[24.613px] h-[24.613px] xs:w-[28.4px] xs:h-[28.4px] tablet:w-[37.867px] tablet:h-[37.867px] desktop:w-[71px] desktop:h-[71px] xl:w-[71px] xl:h-[71px]" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 5: Message Board -->
	<MessageBoard />
</div>
