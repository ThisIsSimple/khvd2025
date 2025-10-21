<script lang="ts">
	import WorkCard from '$lib/components/WorkCard.svelte';
	import WorkCardMobile from '$lib/components/WorkCardMobile.svelte';

	// Professor groups data structure with enhanced info
	const professorGroups = [
		{
			number: '0',
			professors: [{ name: 'Un Chong Kim ' }, { name: 'Sang Hee Park' }],
			workCount: 25,
			category: 'VISUAL DESIGN',
			title: '지속 가능한 미래를 위한\n창의적 해법'
		},
		{
			number: '1',
			professors: [{ name: 'Mee Kyung Jang' }, { name: 'Dae Yeon Kim' }],
			workCount: 34,
			category: 'VISUAL DESIGN',
			title: '아이디어의 근원과\n메세지를 탐구하는\n실전 디자인'
		},
		{
			number: '2',
			professors: [{ name: 'Je Yon Jung' }],
			workCount: 21,
			category: 'VISUAL DESIGN',
			title: '디자인 비즈니스:\n경험, 혁신, 그리고\n미래 연결성'
		},
		{
			number: '3',
			professors: [{ name: 'Jung Woo Kim' }],
			workCount: 13,
			category: 'VISUAL DESIGN',
			title: '시각 언어와\n인터랙션을 결합한\n경험 디자인'
		}
	];

	// Track which card is hovered
	let hoveredIndex = $state<number | null>(null);

	// Calculate grid template columns based on hover state
	// Total should always be 4fr to maintain 100% width
	function getGridColumns(totalCards: number, hovered: number | null): string {
		if (hovered === null) {
			return 'repeat(4, 1fr)'; // Default: equal columns (1fr each = 4fr total)
		}
		// When hovered: total is 4fr
		// Expanded card gets 1.6fr, others share remaining 2.4fr (0.8fr each)
		const expandedSize = 1.6;
		const normalSize = (4 - expandedSize) / (totalCards - 1); // 2.4 / 3 = 0.8
		const columns = Array(totalCards)
			.fill(0)
			.map((_, i) => (i === hovered ? `${expandedSize}fr` : `${normalSize}fr`))
			.join(' ');
		return columns;
	}
</script>

<!-- Exhibition Works Page -->
<div class="bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Main Content -->
	<div class="flex flex-col items-center w-full">
		<!-- Page Title -->
		<div class="flex items-center justify-start w-full mb-[60px] px-[40px] py-[80px]">
			<h1 class="font-display text-[120px] leading-none text-[#111111]">WORK</h1>
		</div>

		<!-- Professor Groups Grid - Desktop (4 columns) -->
		<div
			class="hidden desktop:grid w-full transition-all duration-500 ease-in-out"
			style="grid-template-columns: {getGridColumns(
				professorGroups.length,
				hoveredIndex
			)}; background-image: url('/work-background.webp'); background-size: 100%; background-repeat: repeat-x repeat-y;"
		>
			{#each professorGroups as group, index}
				<WorkCard
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
					onHoverChange={(hovered) => (hoveredIndex = hovered ? index : null)}
				/>
			{/each}
		</div>

		<!-- Professor Groups Grid - Tablet (2x2 grid) -->
		<div
			class="hidden tablet:grid desktop:hidden w-full transition-all duration-500 ease-in-out"
			style="grid-template-columns: {hoveredIndex !== null && hoveredIndex < 2
				? hoveredIndex === 0
					? '1.3fr 0.7fr'
					: '0.7fr 1.3fr'
				: hoveredIndex !== null && hoveredIndex >= 2
					? hoveredIndex === 2
						? '1.3fr 0.7fr'
						: '0.7fr 1.3fr'
					: '1fr 1fr'}; background-image: url('/work-background.webp'); background-size: 100%; background-repeat: repeat-x repeat-y; background-size: contain;"
		>
			{#each professorGroups as group, index}
				<WorkCard
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
					onHoverChange={(hovered) => (hoveredIndex = hovered ? index : null)}
				/>
			{/each}
		</div>

		<!-- Professor Groups Grid - Mobile & XS (1 column horizontal) -->
		<div
			class="flex tablet:hidden flex-col w-full"
			style="background-image: url('/work-background.webp'); background-repeat: repeat-x repeat-y; background-size: 200%;"
		>
			{#each professorGroups as group}
				<WorkCardMobile
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
				/>
			{/each}
		</div>
	</div>
</div>
