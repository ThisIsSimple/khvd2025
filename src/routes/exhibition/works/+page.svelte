<script lang="ts">
	import WorkCard from '$lib/components/WorkCard.svelte';
	import WorkCardMobile from '$lib/components/WorkCardMobile.svelte';

	// Professor groups data structure with enhanced info
	const professorGroups = [
		{
			number: '0',
			professors: [{ name: 'Eun Jeong Kim' }, { name: 'Sang Hee Park' }],
			workCount: 15,
			category: 'Graduation Studies',
			title: '지속 가능한 미래를 위한\n창의적 해법'
		},
		{
			number: '1',
			professors: [{ name: 'Mi Gyeong Jang' }, { name: 'Dae Yeon Kim' }],
			workCount: 15,
			category: 'Brand Design',
			title: '브랜드의 새로운\n가치 발견'
		},
		{
			number: '2',
			professors: [{ name: 'Ji Yeon Jeong' }],
			workCount: 15,
			category: 'UX/UI Design',
			title: '사용자 중심의\n디지털 경험'
		},
		{
			number: '3',
			professors: [{ name: 'Jung Woo Kim' }],
			workCount: 15,
			category: 'Motion Graphics',
			title: '움직임으로 전하는\n이야기'
		}
	];
</script>

<!-- Exhibition Works Page -->
<div class="bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Main Content -->
	<div class="flex flex-col items-center w-full max-w-[1920px] px-[40px] py-[80px]">
		<!-- Page Title -->
		<div class="flex items-center justify-start w-full mb-[60px]">
			<h1 class="font-display text-[120px] leading-none text-[#111111]">WORK</h1>
		</div>

		<!-- Professor Groups Grid - Desktop (4 columns) -->
		<div class="hidden desktop:grid grid-cols-4 gap-[40px] w-full mb-[120px]">
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

		<!-- Professor Groups Grid - Tablet (2x2 grid) -->
		<div class="hidden tablet:grid desktop:hidden grid-cols-2 gap-[40px] w-full mb-[120px]">
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
		<div class="flex tablet:hidden flex-col gap-[12px] w-full pb-[60px]">
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
