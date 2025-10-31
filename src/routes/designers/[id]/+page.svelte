<script lang="ts">
	import WorkThumbnail from '$lib/components/WorkThumbnail.svelte';
	import DesignerProfile from '$lib/components/DesignerProfile.svelte';
	import DesignerInterview from '$lib/components/DesignerInterview.svelte';
	import MessageBoard from '$lib/components/MessageBoard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Back navigation handler
	function handleBack() {
		window.history.back();
	}

	// Interview questions
	const INTERVIEW_QUESTIONS = {
		q1: '작품에 담아낸 당신의 R(재구상)은 무엇인가요?',
		q2: '당신에게 VD(시각디자인학과)란 어떤 의미인가요?'
	};
</script>

<svelte:head>
	<title>{data.designer?.name || 'Designer'} - KHVD 2025</title>
</svelte:head>

{#if data.error || !data.designer}
	<!-- Error State -->
	<div class="min-h-screen bg-white flex items-center justify-center">
		<div class="text-center">
			<p class="text-h6 text-primary mb-4">⚠️ 디자이너 정보를 불러올 수 없습니다</p>
			<p class="text-b1 text-[#777777]">{data.error || '다시 시도해주세요.'}</p>
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
			class="sticky left-0 top-0 h-fit w-[90px] tablet:w-[150px] bg-white z-50 flex flex-col items-center pt-[40px] shrink-0 overflow-hidden"
		>
			<!-- Back Arrow Button -->
			<button
				onclick={handleBack}
				class="group w-[90px] tablet:w-[150px] h-[90px] tablet:h-[150px] flex items-center justify-center mb-[80px]"
				aria-label="Go back"
			>
				<img
					src="/icons/arrow_diagonal_before.svg"
					alt="Back"
					class="group-hover:scale-110 transition-transform duration-300 w-[35px] h-[35px] tablet:w-[70px] tablet:h-[70px]"
				/>
			</button>

			<!-- Designer Contact Info -->
			<div
				class="w-full overflow-hidden flex flex-col gap-[40px] items-center px-[12px] tablet:px-[24px]"
			>
				<!-- Profile Image + Instagram -->
				<div class="w-full flex flex-col gap-[6px] items-center justify-center">
					<a
						href={data.designer.qrLink}
						class="w-[115%] block"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={encodeURI(data.designer.qrImage)}
							alt={data.designer.name}
							class="w-full h-full object-contain"
						/>
					</a>
					{#if data.designer.instagramUrl}
						<a
							href={data.designer.instagramUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="break-all text-center text-[14px] tablet:text-[16px] leading-[1.2] tablet:leading-[1.4] tracking-[-0.64px] text-[#222222] hover:text-primary transition-colors"
						>
							@{data.designer.instagramUrl.split('/').pop()}
						</a>
					{/if}
				</div>

				<!-- Contact Links -->
				{#if data.designer.contact1Text && data.designer.contact1Url}
					<a
						href={data.designer.contact1Url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-[14px] tablet:text-[16px] leading-[1.4] tracking-[-0.64px] text-[#222222] text-justify underline hover:text-primary transition-colors break-words max-w-full"
					>
						{data.designer.contact1Text}
					</a>
				{:else if data.designer.email}
					<a
						href="mailto:{data.designer.email}"
						class="text-[14px] tablet:text-[16px] leading-[1.4] tracking-[-0.64px] text-[#222222] text-justify underline hover:text-primary transition-colors break-words max-w-full"
					>
						{data.designer.email}
					</a>
				{/if}

				{#if data.designer.contact2Text && data.designer.contact2Url}
					<a
						href={data.designer.contact2Url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-[14px] tablet:text-[16px] leading-[1.4] tracking-[-0.64px] text-[#222222] text-justify underline hover:text-primary transition-colors break-words max-w-full"
					>
						{data.designer.contact2Text}
					</a>
				{/if}
			</div>
		</nav>

		<!-- Main Content Area (flex-grow to take remaining space) -->
		<main class="flex-1">
			<!-- Desktop Layout (≥1351px) -->
			<div class="hidden desktop:flex">
				<!-- Center Content (830px) -->
				<div
					class="w-2/3 flex flex-col gap-[28px] px-[16px] tablet:px-[40px] desktop:px-[60px] pt-[48px]"
				>
					<!-- Designer Name -->
					<div class="flex gap-[40px] items-center h-[156px] justify-start">
						<h1 class="font-display text-[120px] leading-none text-[#111111]">
							{data.designer.nameEn}
						</h1>
					</div>

					<!-- Profile Section with Background -->
					<div class="relative w-full">
						<!-- Background Pattern Image -->
						<div class="absolute inset-0 -z-10">
							<!-- Add background pattern if needed -->
						</div>

						<!-- Profile Component -->
						<DesignerProfile
							name={data.designer.name}
							nameEn={data.designer.nameEn}
							profileImage={data.designer.profileImage}
							introduction={data.designer.introduction}
						/>

						<!-- Divider Line -->
						<div class="w-[20px] h-0 border-t border-[#222] my-[30px] tablet:my-[60px]"></div>

						<!-- Interview Sections -->
						<div class="flex flex-col gap-[12px] w-full">
							<DesignerInterview
								questionNumber={1}
								question={INTERVIEW_QUESTIONS.q1}
								answer={data.designer.interview1}
							/>

							<DesignerInterview
								questionNumber={2}
								question={INTERVIEW_QUESTIONS.q2}
								answer={data.designer.interview2}
							/>
						</div>
					</div>
				</div>

				<!-- Right Sticky Works (520px) -->
				<div class="w-1/3 sticky top-0 h-screen flex-shrink-0">
					{#if data.works.length > 0}
						{#each data.works.slice(0, 2) as work}
							<WorkThumbnail
								workId={work.id}
								title={work.title}
								description={work.description}
								thumbnail={work.thumbnail}
								groupNumber={work.groupNumber}
								isSticky={true}
							/>
						{/each}
					{/if}
				</div>
			</div>

			<div
				class="block desktop:hidden px-[16px] sm:px-[24px] tablet:px-[40px] desktop:px-[60px] pt-[40px]"
			>
				<!-- Designer Name -->
				<div class="flex gap-[20px] items-center h-[86px] tablet:h-[156px] justify-start">
					<h1 class="font-display text-[40px] tablet:text-[100px] leading-none text-[#111111]">
						{data.designer.nameEn}
					</h1>
				</div>

				<!-- Profile Component (Horizontal Layout) -->
				<DesignerProfile
					name={data.designer.name}
					nameEn={data.designer.nameEn}
					profileImage={data.designer.profileImage}
					introduction={data.designer.introduction}
				/>

				<!-- Works (Below Profile, Blog Style) -->
				{#if data.works.length > 0}
					<div class="flex flex-col gap-[12px] my-[28px]">
						{#each data.works.slice(0, 2) as work}
							<WorkThumbnail
								workId={work.id}
								title={work.title}
								description={work.description}
								thumbnail={work.thumbnail}
								groupNumber={work.groupNumber}
								showTitle={true}
							/>
						{/each}
					</div>
				{/if}

				<!-- Divider Line -->
				<div class="h-0 border-t border-[#e5e5e5] my-[12px]"></div>

				<!-- Interview Sections -->
				<div class="flex flex-col gap-[12px] w-full">
					<DesignerInterview
						questionNumber={1}
						question={INTERVIEW_QUESTIONS.q1}
						answer={data.designer.interview1}
					/>

					<DesignerInterview
						questionNumber={2}
						question={INTERVIEW_QUESTIONS.q2}
						answer={data.designer.interview2}
					/>
				</div>
			</div>

			<!-- Messages Section (Full Width) -->
			<div class="hidden sm:block mt-[60px] px-[20px] tablet:pt-[120px]">
				<MessageBoard type="designer" targetId={data.designer.id} isForTarget={true} />
			</div>
		</main>
	</div>
	<div class="block sm:hidden px-[24px] tablet:px-[40px] pt-[160px]">
		<MessageBoard type="designer" targetId={data.designer.id} isForTarget={true} />
	</div>
{/if}
