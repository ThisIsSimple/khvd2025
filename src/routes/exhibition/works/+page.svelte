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

</script>

<!-- Exhibition Works Page -->
<div class="bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Main Content -->
	<div class="flex flex-col items-center w-full">
		<!-- Page Title -->
		<div class="flex items-center justify-start w-full px-[40px] py-[40px]">
			<h1 class="font-display text-[120px] leading-none text-[#111111]">WORK</h1>
		</div>

		<!-- Professor Groups Grid - Tablet+ (2x2 grid) -->
		<div
			class="hidden tablet:grid w-full grid-cols-2 grid-rows-2 gap-0"
			style="background-image: url('/work-background.webp'); background-size: 100%; background-repeat: repeat-x repeat-y;"
		>
			{#each professorGroups as group}
				<WorkCard
					number={group.number}
					professors={group.professors}
					workCount={group.workCount}
					category={group.category}
					title={group.title}
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
