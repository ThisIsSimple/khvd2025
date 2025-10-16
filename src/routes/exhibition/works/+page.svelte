<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	// Professor groups data structure
	const professorGroups = [
		{
			number: '0',
			professors: ['박재연', '조소원', '최성훈'],
			workCount: 15
		},
		{
			number: '1',
			professors: ['강정림', '박성원', '한승희'],
			workCount: 15
		},
		{
			number: '2',
			professors: ['권명진', '김경국', '최효정'],
			workCount: 15
		},
		{
			number: '3',
			professors: ['김설희', '최윤주', '황혜욱'],
			workCount: 15
		}
	];
</script>

<!-- Exhibition Works Page -->
<div class="relative bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Background Pattern -->
	<img
		src="/works-bg-pattern.png"
		alt=""
		class="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
	/>

	<!-- Main Content -->
	<div class="relative flex flex-col items-center w-full max-w-[1920px] px-[40px] py-[80px]">
		<!-- Page Title -->
		<div class="flex items-center justify-start w-full mb-[60px]">
			<h1 class="font-display text-[120px] leading-none text-[#111111]">WORK</h1>
		</div>

		<!-- Professor Groups Grid -->
		<div class="grid grid-cols-1 xs:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-[40px] w-full mb-[120px]">
			{#each professorGroups as group}
				<div class="flex flex-col items-center gap-[40px]">
					<!-- Professor Info Box -->
					<div class="bg-white flex flex-col items-center justify-center gap-[8px] px-[20px] py-[24px] w-full max-w-[280px]">
						{#each group.professors as professor}
							<p class="font-sans text-[16px] font-medium leading-[1.4] text-[#111111]">
								{professor}
							</p>
						{/each}
					</div>

					<!-- Number Display -->
					<div class="flex flex-col items-center gap-[20px]">
						<p class="font-display text-[300px] leading-none text-[#111111]">
							{group.number}
						</p>
						<p class="font-sans text-[24px] font-bold leading-[1.4] text-[#777777]">
							[{group.workCount}]
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer -->
	<Footer />
</div>
