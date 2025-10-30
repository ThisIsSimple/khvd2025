<script lang="ts">
	interface Props {
		workId: number;
		title: string;
		description: string;
		thumbnail: string;
		groupNumber: number;
		showTitle?: boolean; // Tablet: show title at bottom
		isSticky?: boolean; // Desktop: enable hover effects
	}

	let {
		workId,
		title,
		description,
		thumbnail,
		groupNumber,
		showTitle = false,
		isSticky = false
	}: Props = $props();

	let isHovered = $state(false);

	function handleMouseEnter() {
		if (isSticky) {
			isHovered = true;
		}
	}

	function handleMouseLeave() {
		if (isSticky) {
			isHovered = false;
		}
	}

	function handleClick() {
		window.location.href = `/exhibition/works/${workId}`;
	}

	const groupName = `Graduation Studies ${groupNumber}`;
</script>

<a
	class="relative w-full h-1/2 overflow-hidden cursor-pointer group block"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	href={`/exhibition/works/${workId}`}
>
	<!-- Background Image -->
	<img src={thumbnail} alt={title} class="absolute inset-0 w-full h-full object-cover" />

	<!-- Desktop: Hover Overlay -->
	{#if isSticky && isHovered}
		<div
			class="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center gap-[16px] transition-opacity duration-300"
		>
			<!-- Work Info -->
			<div class="flex flex-col items-center text-center text-white">
				<p class="font-bold text-[28px] leading-[1.4]">{title}</p>
				<p class="text-[20px] leading-[1.5] text-[#eeeeee]">{groupName}</p>
			</div>

			<!-- Action Icons -->
			<div class="flex gap-[10px] items-center">
				<!-- Edit Icon (Pencil) -->
				<button
					class="w-[44px] h-[44px] bg-[#111111] rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors"
					onclick={(e) => {
						e.stopPropagation();
						window.location.href = `/exhibition/works/${workId}`;
					}}
					aria-label="View work details"
				>
					<svg
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 13.4167V16.5H3.08333L12.2583 7.325L9.175 4.24167L0 13.4167ZM14.5417 4.94167C14.8583 4.625 14.8583 4.11667 14.5417 3.8L12.7 1.95833C12.3833 1.64167 11.875 1.64167 11.5583 1.95833L10.1083 3.40833L13.1917 6.49167L14.5417 4.94167Z"
							fill="white"
						/>
					</svg>
				</button>

				<!-- Arrow Icon -->
				<button
					class="w-[44px] h-[44px] bg-[#111111] rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors"
					onclick={(e) => {
						e.stopPropagation();
						window.location.href = `/exhibition/works/${workId}`;
					}}
					aria-label="Go to work page"
				>
					<svg
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.5 0.5C3.8 0.5 0 4.3 0 9C0 13.7 3.8 17.5 8.5 17.5C13.2 17.5 17 13.7 17 9C17 4.3 13.2 0.5 8.5 0.5ZM12.325 9.85L9.575 12.6C9.4 12.775 9.175 12.85 8.95 12.85C8.725 12.85 8.5 12.775 8.325 12.6C7.975 12.25 7.975 11.675 8.325 11.325L9.65 10H5C4.5 10 4.1 9.6 4.1 9.1C4.1 8.6 4.5 8.2 5 8.2H9.65L8.325 6.875C7.975 6.525 7.975 5.95 8.325 5.6C8.675 5.25 9.25 5.25 9.6 5.6L12.35 8.35C12.675 8.675 12.675 9.5 12.325 9.85Z"
							fill="white"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}

	<!-- Tablet: Fixed Title at Bottom -->
	{#if showTitle && !isSticky}
		<div class="absolute bottom-0 left-0 right-0 bg-white px-[20px] py-[16px]">
			<p class="font-bold text-[18px] leading-[1.4] text-[#111111]">{title}</p>
			<p class="text-[15px] leading-[1.5] text-[#777777]">{description}</p>
		</div>
	{/if}
</a>
