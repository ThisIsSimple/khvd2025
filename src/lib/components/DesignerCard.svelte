<script lang="ts">
	interface Props {
		id: number;
		name: string;
		nameEn: string;
		imageUrl: string;
		instagramUrl?: string;
		email?: string;
		contact1Text?: string;
		contact1Url?: string;
		contact2Text?: string;
		contact2Url?: string;
	}

	let {
		id,
		name,
		nameEn,
		imageUrl,
		instagramUrl,
		email,
		contact1Text,
		contact1Url,
		contact2Text,
		contact2Url
	}: Props = $props();

	// Handle icon clicks to prevent card click propagation
	function handleIconClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
	}

	// Determine which contacts to show
	// Priority: contact1/contact2 > instagram/email (for backward compatibility)
	const hasContact1 = contact1Text && contact1Url;
	const hasContact2 = contact2Text && contact2Url;
	const hasLegacyInstagram = !hasContact1 && instagramUrl;
	const hasLegacyEmail = !hasContact2 && email;
</script>

<a href="/designers/{id}" class="flex flex-col gap-[16px] w-full group/card block">
	<!-- Image Container with Hover Effects -->
	<div class="relative w-full aspect-[258/332] bg-white overflow-hidden group">
		<!-- Profile Image with Grayscale Effect -->
		<img
			src={imageUrl}
			alt={name}
			class="absolute inset-0 w-full h-full object-cover
				   grayscale transition-all duration-300 ease-in-out
				   group-hover:grayscale-0 group-hover:scale-105"
		/>

		<!-- Contact Icons (Top Right) -->
		{#if hasContact1 || hasContact2 || hasLegacyInstagram || hasLegacyEmail}
			<div class="absolute top-[12px] right-[12px] flex gap-[6px] items-center justify-end z-10">
				<!-- Contact 1 (or Legacy Instagram) -->
				{#if hasContact1}
					<a
						href={contact1Url}
						target="_blank"
						rel="noopener noreferrer"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary text-white text-[10px] font-bold"
						aria-label={contact1Text}
						title={contact1Text}
					>
						{contact1Text?.substring(0, 2)}
					</a>
				{:else if hasLegacyInstagram}
					<a
						href={instagramUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary"
						aria-label="Instagram"
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="w-[14px] h-[14px]"
						>
							<path
								d="M7.5 3.5C5.29 3.5 3.5 5.29 3.5 7.5C3.5 9.71 5.29 11.5 7.5 11.5C9.71 11.5 11.5 9.71 11.5 7.5C11.5 5.29 9.71 3.5 7.5 3.5ZM7.5 10.1667C6.02667 10.1667 4.83333 8.97333 4.83333 7.5C4.83333 6.02667 6.02667 4.83333 7.5 4.83333C8.97333 4.83333 10.1667 6.02667 10.1667 7.5C10.1667 8.97333 8.97333 10.1667 7.5 10.1667ZM12.3333 3.33333C12.3333 3.85 11.9167 4.26667 11.4 4.26667C10.8833 4.26667 10.4667 3.85 10.4667 3.33333C10.4667 2.81667 10.8833 2.4 11.4 2.4C11.9167 2.4 12.3333 2.81667 12.3333 3.33333ZM14.6667 4.26667C14.6 3.05 14.35 1.98333 13.4833 1.11667C12.6167 0.25 11.55 0 10.3333 -0.0666667C9.08333 -0.133333 5.91667 -0.133333 4.66667 -0.0666667C3.45 0 2.38333 0.25 1.51667 1.11667C0.65 1.98333 0.4 3.05 0.333333 4.26667C0.266667 5.51667 0.266667 8.68333 0.333333 9.93333C0.4 11.15 0.65 12.2167 1.51667 13.0833C2.38333 13.95 3.45 14.2 4.66667 14.2667C5.91667 14.3333 9.08333 14.3333 10.3333 14.2667C11.55 14.2 12.6167 13.95 13.4833 13.0833C14.35 12.2167 14.6 11.15 14.6667 9.93333C14.7333 8.68333 14.7333 5.51667 14.6667 4.26667ZM13.0833 11.2833C12.85 11.9 12.3833 12.3667 11.7667 12.6C10.7667 13.0833 8.48333 13 7.5 13C6.51667 13 4.23333 13.0833 3.23333 12.6C2.61667 12.3667 2.15 11.9 1.91667 11.2833C1.43333 10.2833 1.51667 8 1.51667 7.01667C1.51667 6.03333 1.43333 3.75 1.91667 2.75C2.15 2.13333 2.61667 1.66667 3.23333 1.43333C4.23333 0.95 6.51667 1.03333 7.5 1.03333C8.48333 1.03333 10.7667 0.95 11.7667 1.43333C12.3833 1.66667 12.85 2.13333 13.0833 2.75C13.5667 3.75 13.4833 6.03333 13.4833 7.01667C13.4833 8 13.5667 10.2833 13.0833 11.2833Z"
								fill="white"
							/>
						</svg>
					</a>
				{/if}

				<!-- Contact 2 (or Legacy Email) -->
				{#if hasContact2}
					<a
						href={contact2Url}
						target="_blank"
						rel="noopener noreferrer"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary text-white text-[10px] font-bold"
						aria-label={contact2Text}
						title={contact2Text}
					>
						{contact2Text?.substring(0, 2)}
					</a>
				{:else if hasLegacyEmail}
					<a
						href="mailto:{email}"
						onclick={handleIconClick}
						class="w-[32px] h-[32px] bg-[#111111] rounded-full flex items-center justify-center
							   transition-colors duration-200 hover:bg-primary"
						aria-label="Email"
					>
						<svg
							width="16"
							height="13"
							viewBox="0 0 16 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="w-[14px] h-[11px]"
						>
							<path
								d="M14.5 0.5H1.5C0.95 0.5 0.505 0.95 0.505 1.5L0.5 11.5C0.5 12.05 0.95 12.5 1.5 12.5H14.5C15.05 12.5 15.5 12.05 15.5 11.5V1.5C15.5 0.95 15.05 0.5 14.5 0.5ZM14.5 3.5L8 7.5L1.5 3.5V1.5L8 5.5L14.5 1.5V3.5Z"
								fill="white"
							/>
						</svg>
					</a>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Text Information -->
	<div class="flex flex-col leading-[1.4] text-[#111111]">
		<p class="font-bold text-[20px]">{name}</p>
		<p class="text-[18px] h-[29px]">{nameEn}</p>
	</div>
</a>
