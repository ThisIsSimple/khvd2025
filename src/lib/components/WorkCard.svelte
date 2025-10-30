<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { goto } from '$app/navigation';
	interface Professor {
		name: string;
	}

	interface Props {
		number: string;
		professors: Professor[];
		workCount: number;
		category?: string;
		title?: string;
	}

	let { number, professors, workCount, category, title }: Props = $props();

	let isHovered = $state(false);

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	function handleClick() {
		goto(`/exhibition/works/list/${number}`);
	}
</script>

<!-- Work Card Component for Desktop/Tablet -->
<div class="flex flex-col transition-transform duration-500 ease-in-out origin-top {isHovered ? 'scale-y-105' : 'scale-y-100'}">
	<!-- Professor Info Box -->
	<div
		class="flex-1 bg-white flex flex-col gap-[12px] items-start justify-start w-full px-[40px] xl:px-[100px] py-[20px]"
	>
		{#each professors as professor}
			<div class="bg-white flex items-center justify-start w-full">
				<p class="font-semibold text-[20px] leading-[1.2] text-[#111111] w-[64px]">PROF.</p>
				<p class="font-sans text-[20px] leading-[1.5] text-[#111111] whitespace-nowrap">
					{professor.name}
				</p>
			</div>
		{/each}
	</div>

	<div class="bg-white h-[40px] w-full"></div>

	<!-- Number Display Section with Background Pattern -->
	<div
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="button"
		tabindex="0"
		class="relative flex flex-col justify-between h-[720px] pl-[40px] xl:pl-[80px] pb-[55px] overflow-hidden transition-colors duration-500 ease-in-out {isHovered
			? 'bg-primary'
			: ''}"
		onclick={handleClick}
	>
		<!-- Number and Count Container -->
		<div class="relative flex items-start justify-between w-full">
			<!-- Left: Number, Text, and Arrow -->
			<div class="flex gap-[12px] xl:gap-[24px] items-start pt-[12px]">
				<!-- Large Number -->
				<div class="w-">
					<p
						class="font-display text-[210px] xl:text-[300px] leading-[1.2] tracking-[-12px] transition-colors duration-500 {isHovered
							? 'text-[#fefefe]'
							: 'text-[#111111]'}"
					>
						{number}
					</p>
				</div>

				<!-- Expanded Content (Category + Count + Arrow) -->
				{#if isHovered}
					<Motion
						initial={{ opacity: 0, width: 0 }}
						animate={isHovered ? { opacity: 1, width: '100%' } : { opacity: 0, width: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						let:motion
					>
						<div
							use:motion
							class="flex items-start h-full py-[40px] xl:py-[60px] gap-[8px] overflow-hidden pr-[40px]"
						>
							{#if category}
								<div
									class="flex flex-col font-display text-[40px] xl:text-[60px] leading-none text-[#fefefe]"
								>
									GRADUATION<br />STUDIES
								</div>
							{/if}

							<p
								class="font-display text-[40px] xl:text-[60px] leading-none text-[#fefefe] whitespace-nowrap"
							>
								[{workCount}]
							</p>
						</div>
					</Motion>
				{/if}

				<!-- Default Count (hidden when hovered) -->
				{#if !isHovered}
					<div class="flex items-center h-full py-[40px] xl:py-[60px]">
						<p class="font-display text-[40px] xl:text-[60px] leading-none text-[#111111]">
							[{workCount}]
						</p>
					</div>
				{/if}
			</div>

			<!-- Right: Arrow Icon (only when hovered) -->
			{#if isHovered}
				<img
					src="/icons/arrow-top-right.svg"
					alt=""
					class="w-[80px] xl:w-[120px] h-[80px] xl:h-[120px] absolute top-[52px] xl:top-[74px] right-[52px] xl:right-[74px]"
				/>
			{/if}
		</div>

		<!-- Bottom Title Section (only when hovered) -->
		{#if isHovered && title}
			<Motion
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
				let:motion
			>
				<div use:motion class="flex flex-col text-[#fefefe]">
					{#if category}
						<p
							class="font-display text-[40px] xl:text-[52px] leading-[1.1] uppercase whitespace-nowrap"
						>
							{category}
						</p>
					{/if}
					<p
						class="font-semibold text-[40px] xl:text-[60px] leading-[1.3] tracking-[-2.4px] whitespace-pre-line"
					>
						{title}
					</p>
				</div>
			</Motion>
		{/if}
	</div>
</div>
