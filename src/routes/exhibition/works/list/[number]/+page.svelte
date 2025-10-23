<script lang="ts">
	import type { PageData } from './$types';
	import WorkItem from '$lib/components/WorkItem.svelte';

	let { data }: { data: PageData } = $props();

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
</script>

<svelte:head>
	<title>{info.title} - KHVD 2025</title>
</svelte:head>

<!-- Main Container -->
<div class="w-full bg-[#fefefe] min-h-screen">
	<!-- Content Wrapper with horizontal padding -->
	<div class="w-full px-[60px]">
		<!-- Header Section -->
		<div class="w-full bg-[#fefefe] flex flex-col gap-3">
			<!-- Title and Count Container -->
			<div class="w-full flex flex-col items-start justify-center">
				<!-- Title Row -->
				<div class="w-full flex gap-4 items-center pb-6 pt-12">
					<!-- Main Title -->
					<h1 class="font-display text-h3 leading-none text-[#111111] whitespace-nowrap">
						{info.title}
					</h1>

					<!-- Work Count -->
					<div class="flex items-center h-full">
						<div class="flex gap-2.5 items-start pt-1 pb-0">
							<p class="font-display text-h7 leading-[1.4] tracking-[-0.02em] text-[#111111]">
								[{data.works.length}]
							</p>
						</div>
					</div>
				</div>

				<!-- Description -->
				{#if info.description}
					<div class="w-full flex gap-2.5 items-center justify-center pr-80">
						<p class="flex-1 text-b1 leading-[1.5] text-[#222222] whitespace-pre-wrap">
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
						<div class="flex gap-3 items-center justify-center text-b1 font-bold text-[#111111]">
							<p>지도교수</p>
							<p>{info.professors.ko}</p>
						</div>

						<!-- English Professor Names -->
						<div class="flex gap-2 items-center text-b1 font-bold text-[#111111]">
							<p>Prof.</p>
							<p>{info.professors.en}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Works Grid Section -->
		<div class="w-full flex flex-wrap gap-[52px] items-start justify-between pb-[200px] pt-20">
			{#each data.works as work}
				<div class="w-[390px] shrink-0">
					<WorkItem
						id={work.id}
						thumbnail={work.thumbnail}
						title={work.title}
						designers={work.designers.map((d: any) => d.name)}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
