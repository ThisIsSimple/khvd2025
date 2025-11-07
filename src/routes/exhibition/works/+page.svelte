<script lang="ts">
	import WorkCard from '$lib/components/WorkCard.svelte';
	import WorkCardMobile from '$lib/components/WorkCardMobile.svelte';

	// Active card ID for mobile touch interaction
	let activeCardId = $state<string | null>(null);

	// Handle card activation (mobile 2-stage touch)
	function handleCardActivate(id: string) {
		activeCardId = id;
	}

	// Professor groups data structure with enhanced info
	const professorGroups = [
		{
			number: '0',
			professors: [{ name: 'Eun Jeong Kim' }, { name: 'Sang Hee Park' }],
			workCount: 24,
			category: 'SDGs design Solutions',
			title: '지속 가능한 미래를 위한\n창의적 해법'
		},
		{
			number: '1',
			professors: [{ name: 'Mi Kyeong Jang' }, { name: 'Dae Yeon Kim' }],
			workCount: 34,
			category: 'GRAPHIC & BRANDING',
			title: '아이디어의 근원과\n메세지를 탐구하는 실전 디자인'
		},
		{
			number: '2',
			professors: [{ name: 'Ji Yeon Jung' }],
			workCount: 21,
			category: 'DESIGN BUSINESS',
			title: '디자인 비즈니스:\n경험, 혁신, 그리고 미래 연결성'
		},
		{
			number: '3',
			professors: [{ name: 'Jung Woo Kim' }],
			workCount: 13,
			category: 'INTERACTION',
			title: '시각 언어와 인터랙션을 결합한\n경험 디자인'
		}
	];
</script>

<!-- Exhibition Works Page -->
<div class="bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Main Content -->
	<div class="flex flex-col items-center w-full">
		<!-- Page Title -->
		<div
			class="flex items-center justify-start w-full px-[16px] tablet:px-[40px] py-[8px] tablet:py-[48px]"
		>
			<h1
				class="font-display text-[48px] tablet:text-[100px] desktop:text-[120px] leading-none text-[#111111]"
			>
				WORK
			</h1>
		</div>

		<!-- Professor Groups Grid - Tablet+ (2x2 grid) -->
		<div
			class="hidden tablet:grid w-full grid-cols-2 gap-0"
			style="background-image: url('/work-background.webp'); background-size: 100%; background-repeat: repeat-x repeat-y;"
		>
			{#each professorGroups as group, index}
				<WorkCard
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
					isBottom={index === 2 || index === 3}
				/>
			{/each}
		</div>

		<!-- Professor Groups Grid - Mobile & XS (1 column horizontal) -->
		<div
			class="flex tablet:hidden flex-col w-full bg-size-[200%] sm:bg-size-[150%]"
			style="background-image: url('/work-background.webp'); background-repeat: repeat-x repeat-y;"
		>
			{#each professorGroups as group}
				<WorkCardMobile
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
					activeCardId={activeCardId}
					onActivate={handleCardActivate}
				/>
			{/each}
		</div>
	</div>
</div>
