<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Map group number to title
	const groupTitles: Record<number, string> = {
		0: 'GRADUATION STUDIES 0',
		1: 'GRADUATION STUDIES 1',
		2: 'GRADUATION STUDIES 2',
		3: 'GRADUATION STUDIES 3'
	};
</script>

<svelte:head>
	<title>{groupTitles[data.groupNumber]} - KHVD 2025</title>
</svelte:head>

<!-- Works List Page -->
<div class="bg-[#fefefe] min-h-screen w-full">
	<!-- Header Section -->
	<div class="w-full px-[40px] py-[80px] border-b border-[#e0e0e0]">
		<div class="max-w-[1400px] mx-auto">
			<!-- Breadcrumb -->
			<div class="mb-[24px]">
				<a
					href="/exhibition/works"
					class="font-sans text-[16px] text-[#777777] hover:text-primary transition-colors"
				>
					← Back to Works
				</a>
			</div>

			<!-- Title -->
			<h1 class="font-display text-[80px] tablet:text-[120px] leading-none text-[#111111]">
				{groupTitles[data.groupNumber]}
			</h1>

			<!-- Work Count -->
			<p class="font-display text-[40px] tablet:text-[60px] leading-none text-[#777777] mt-[12px]">
				[{data.works.length}]
			</p>
		</div>
	</div>

	<!-- Works Grid -->
	<div class="w-full px-[40px] py-[60px]">
		<div class="max-w-[1400px] mx-auto">
			{#if data.works.length === 0}
				<!-- Empty State -->
				<div class="flex flex-col items-center justify-center py-[120px]">
					<p class="font-sans text-[20px] text-[#777777]">No works found in this group.</p>
				</div>
			{:else}
				<!-- Works Grid -->
				<div
					class="grid grid-cols-1 xs:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-[40px]"
				>
					{#each data.works as work}
						<a
							href="/exhibition/works/detail/{work.id}"
							class="group flex flex-col gap-[20px] transition-transform duration-300 hover:scale-105"
						>
							<!-- Thumbnail -->
							<div class="aspect-[4/3] overflow-hidden bg-[#f5f5f5] rounded-[8px]">
								<img
									src={work.thumbnail}
									alt={work.title}
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>

							<!-- Work Info -->
							<div class="flex flex-col gap-[8px]">
								<!-- Title -->
								<h3
									class="font-bold text-[20px] tablet:text-[24px] leading-[1.3] text-[#111111] line-clamp-2"
								>
									{work.title}
								</h3>

								<!-- Description -->
								<p class="font-sans text-[16px] leading-[1.5] text-[#777777] line-clamp-2">
									{work.description}
								</p>

								<!-- Designers -->
								{#if work.designers.length > 0}
									<div class="flex flex-wrap gap-[8px] mt-[4px]">
										{#each work.designers as designer}
											<span
												class="font-sans text-[14px] text-[#111111] bg-[#f0f0f0] px-[12px] py-[4px] rounded-full"
											>
												{designer.name}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
