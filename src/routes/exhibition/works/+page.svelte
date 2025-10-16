<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	// Professor groups data structure with name objects
	const professorGroups = [
		{
			number: '0',
			professors: [{ name: 'Eun Jeong Kim' }, { name: 'Mi Gyeong Jang' }],
			workCount: 15
		},
		{
			number: '1',
			professors: [{ name: 'Ji Yeon Jeong' }, { name: 'Jung Woo Kim' }],
			workCount: 15
		},
		{
			number: '2',
			professors: [{ name: 'Sang Hee Park' }, { name: 'Dae Yeon Kim' }],
			workCount: 15
		},
		{
			number: '3',
			professors: [{ name: 'TBD' }, { name: 'TBD' }],
			workCount: 15
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
				<div class="flex flex-col gap-[40px]">
					<!-- Professor Info Box - Desktop Layout -->
					<div
						class="bg-white flex flex-col gap-[12px] items-center justify-center px-[100px] py-[20px] w-full"
					>
						<div class="flex flex-col items-center justify-between h-[72px] w-[280px]">
							{#each group.professors as professor}
								<div class="bg-white flex items-center justify-between w-full">
									<p class="font-semibold text-[20px] leading-[1.2] text-[#111111] w-[64px]">
										PROF.
									</p>
									<p class="font-sans text-[20px] leading-[1.5] text-[#111111] whitespace-nowrap">
										{professor.name}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Number Display Section with Background Pattern -->
					<div class="relative flex flex-col h-[720px] pl-[80px] overflow-hidden">
						<!-- Background Pattern -->
						<img
							src="/works-bg-pattern.png"
							alt=""
							class="absolute inset-0 w-full h-full object-cover pointer-events-none"
						/>

						<!-- Number and Count -->
						<div class="relative flex gap-[72px] items-start pt-[12px]">
							<div class="flex gap-[12px] items-center">
								<!-- Large Number -->
								<div class="w-[140px]">
									<p
										class="font-display text-[300px] leading-[1.2] tracking-[-12px] text-[#111111]"
									>
										{group.number}
									</p>
								</div>

								<!-- Work Count -->
								<div class="flex items-center h-full py-[60px]">
									<p class="font-display text-[60px] leading-none text-[#111111]">
										[{group.workCount}]
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Professor Groups Grid - Tablet (3 columns) -->
		<div class="hidden tablet:grid desktop:hidden grid-cols-3 gap-[40px] w-full mb-[120px]">
			{#each professorGroups as group}
				<div class="flex flex-col gap-[40px]">
					<!-- Professor Info Box - Tablet Layout -->
					<div class="bg-white flex flex-col gap-[12px] items-center justify-center p-[20px] w-full">
						<div class="flex flex-col items-center justify-between h-[72px] w-[280px]">
							{#each group.professors as professor}
								<div class="bg-white flex items-center justify-between w-full">
									<p class="font-semibold text-[20px] leading-[1.2] text-[#111111] w-[64px]">
										PROF.
									</p>
									<p class="font-sans text-[20px] leading-[1.5] text-[#111111] whitespace-nowrap">
										{professor.name}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Number Display Section with Background Pattern - Tablet -->
					<div class="relative flex flex-col h-[520px] pl-[40px] pb-[48px] overflow-hidden">
						<!-- Background Pattern -->
						<img
							src="/works-bg-pattern.png"
							alt=""
							class="absolute inset-0 w-full h-full object-cover pointer-events-none"
						/>

						<!-- Number and Count -->
						<div class="relative flex gap-[72px] items-start pt-[28px]">
							<div class="flex gap-[8px] items-start">
								<!-- Large Number -->
								<div class="w-[100px]">
									<p class="font-display text-[210px] leading-none text-[#111111]">
										{group.number}
									</p>
								</div>

								<!-- Work Count -->
								<div class="flex items-start py-[12px]">
									<p
										class="font-display text-[40px] leading-[1.4] tracking-[-0.8px] text-[#111111]"
									>
										[{group.workCount}]
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Professor Groups Grid - Mobile (2x2 grid) -->
		<div class="grid tablet:hidden grid-cols-2 w-full mb-[120px]">
			{#each professorGroups as group}
				<div class="flex flex-col">
					<!-- Professor Info Box - Mobile Layout -->
					<div
						class="bg-[#fefefe] flex flex-col gap-[12px] {group.professors.length === 1 ? 'h-[140px] justify-center' : 'h-[140px]'} px-[48px] py-[28px] w-full"
					>
						<div
							class="flex flex-col {group.professors.length === 2 ? 'h-[72px] justify-between' : ''} items-center w-[280px]"
						>
							{#each group.professors as professor}
								<div class="bg-white flex items-start justify-between w-full">
									<p class="font-semibold text-[20px] leading-[1.2] text-[#111111] w-[64px]">
										PROF.
									</p>
									<p class="font-sans text-[20px] leading-[1.5] text-[#111111] whitespace-nowrap">
										{professor.name}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Number Display Section with Background Pattern - Mobile -->
					<div class="relative flex flex-col h-[520px] pl-[40px] overflow-hidden">
						<!-- Background Pattern -->
						<img
							src="/works-bg-pattern.png"
							alt=""
							class="absolute inset-0 w-full h-full object-cover pointer-events-none"
						/>

						<!-- Number and Count -->
						<div class="relative flex items-start">
							<div class="flex items-center py-[44px]">
								<!-- Large Number -->
								<div class="w-[100px]">
									<p class="font-display text-[210px] leading-none text-[#111111]">
										{group.number}
									</p>
								</div>

								<!-- Work Count -->
								<div class="flex items-center h-full py-[20px]">
									<p
										class="font-display text-[40px] leading-[1.4] tracking-[-0.8px] text-[#111111]"
									>
										[{group.workCount}]
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
