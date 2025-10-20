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

		<!-- Bottom Section: Exhibition Details with Pattern Background -->
		<div class="w-full bg-white relative flex flex-col tablet:flex-row items-start">
			<!-- Pattern Background -->
			<div class="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
				<img
					src="/home-information-pattern.webp"
					alt=""
					class="absolute inset-0 w-full h-full object-cover"
				/>
			</div>

			<!-- Left Column: Open & Close -->
			<div
				class="flex-1 flex flex-col gap-[8px] px-[20px] tablet:px-[40px] py-[48px] relative z-10"
			>
				<h3 class="font-display text-[40px] tablet:text-[52px] leading-[1.1] text-[#111111]">
					OPEN & CLOSE
				</h3>
				<p class="font-display text-[40px] tablet:text-[52px] leading-[1.1] text-[#111111]">
					10:00 AM - 05:30 PM
				</p>
			</div>

			<!-- Right Column: Exhibition Details -->
			<div
				class="flex-1 flex flex-col gap-[32px] tablet:gap-[52px] px-[20px] tablet:px-[40px] py-[48px] relative z-10"
			>
				<!-- 전시 기간 -->
				<div class="flex flex-col gap-[5px]">
					<h4 class="font-bold text-[20px] tablet:text-[28px] leading-[1.4] text-[#111111]">
						전시 기간
					</h4>
					<div class="flex items-center gap-[32px] font-bold text-[#111111] whitespace-nowrap">
						<p class="text-[20px] tablet:text-[28px]">
							<span class="text-[20px] tablet:text-[28px]">2025</span><span
								class="text-[24px] tablet:text-[32px]">.11.05</span
							>
						</p>
						<p class="text-[24px] tablet:text-[32px]">-</p>
						<p class="text-[20px] tablet:text-[28px]">2025.11.09</p>
					</div>
				</div>

				<!-- 전시 장소 -->
				<div class="flex flex-col gap-[5px]">
					<h4 class="font-bold text-[20px] tablet:text-[28px] leading-[1.4] text-[#111111]">
						전시 장소
					</h4>
					<p class="font-bold text-[20px] tablet:text-[28px] leading-[1.4] text-[#111111]">
						경희대학교 국제캠퍼스 예술디자인대학 2F A&D홀 갤러리
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 4: Work Shortcut -->
	<section
		class="w-full bg-white flex flex-col gap-[10px] items-start justify-center py-[100px] tablet:pb-[200px] px-[20px] tablet:px-[40px]"
	>
		<!-- Header -->
		<div class="w-full flex flex-col items-start px-[12px] py-[32px]">
			<h2 class="text-h7 text-black tracking-[-0.8px] leading-[1.2]">작품 바로가기</h2>
			<p class="text-h10 text-[#777777] leading-[1.5]">Work Shortcut</p>
		</div>

		<!-- Content Area -->
		<div
			class="w-full flex flex-col tablet:flex-row items-center tablet:h-[695px] py-[60px] tablet:pl-[40px] tablet:pr-[80px]"
		>
			<!-- Left: Exhibition Map -->
			<div class="w-full tablet:flex-1 h-full relative">
				<div class="absolute inset-0 bg-white">
					<div class="absolute inset-0 overflow-hidden">
						<img
							src="/exhibition-section4-map.png"
							alt="Exhibition Map"
							class="absolute w-[157%] h-[126%] left-[-0.38%] top-0 max-w-none object-cover"
						/>
					</div>
				</div>
			</div>

			<!-- Right: Work Details with Arrow -->
			<div
				class="w-full tablet:flex-1 h-full flex flex-col justify-between items-start mt-[40px] tablet:mt-0"
			>
				<!-- Arrow Icon (Top Right) -->
				<div class="w-full flex justify-end items-center">
					<div
						class="w-[100px] h-[100px] tablet:w-[150px] tablet:h-[150px] flex items-center justify-center rotate-180 scale-y-[-100%]"
					>
						<img src="/icons/arrow_diagonal.svg" alt="" class="w-[71px] h-[71px]" />
					</div>
				</div>

				<!-- Text Content (Bottom) -->
				<div
					class="w-full flex flex-col gap-[4px] px-[20px] tablet:px-[80px] py-[40px] tablet:py-[60px]"
				>
					<div class="flex flex-col gap-[4px]">
						<p class="font-display text-[80px] tablet:text-[120px] leading-none text-black">
							GRADUATION
						</p>
						<div class="flex gap-[10px] items-start">
							<p class="font-display text-[80px] tablet:text-[120px] leading-none text-black">
								STUDIES 1
							</p>
							<div class="pt-[8px] tablet:pt-[12px]">
								<span class="font-display text-[28px] tablet:text-[40px] leading-none text-black"
									>[15]</span
								>
							</div>
						</div>
					</div>
					<p class="font-display text-[40px] tablet:text-[52px] leading-[1.1] text-black">
						visual design
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 5: Message Board -->
	<MessageBoard />
</div>
