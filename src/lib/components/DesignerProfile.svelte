<script lang="ts">
	interface Props {
		name: string;
		nameEn: string;
		profileImage: string;
		introduction: string;
	}

	let { name, nameEn, profileImage, introduction }: Props = $props();
</script>

<!-- Desktop Layout (≥1351px) -->
<div
	class="hidden desktop:flex gap-[48px] h-[586px] items-end pb-[60px] pt-[20px] px-0 relative shrink-0 w-full"
>
	<!-- Profile Image -->
	<div class="bg-white h-[465px] overflow-clip relative shrink-0 w-[350px]">
		<div class="absolute aspect-[289/384] left-0 right-0 top-1/2 translate-y-[-50%]">
			<img src={encodeURI(profileImage)} alt={name} class="absolute inset-0 w-full h-full object-cover" />
		</div>
	</div>

	<!-- Text Box -->
	<div
		class="basis-0 box-border flex flex-col gap-[28px] grow h-[490px] items-start justify-end min-h-px min-w-px px-0 py-[12px] relative shrink-0"
	>
		<!-- Name -->
		<div class="flex flex-col gap-[2px] items-start justify-center">
			<p class="font-bold text-[32px] leading-[1.4] text-[#111111]">{name}</p>
			<p class="font-medium text-[20px] leading-[1.2] tracking-[-0.8px] text-[#111111]">
				{nameEn}
			</p>
		</div>

		<!-- Introduction -->
		<div class="flex gap-[10px] items-end justify-end relative shrink-0 w-full">
			<div class="basis-0 flex flex-col grow justify-center min-h-px min-w-px relative shrink-0">
				<p class="text-[20px] leading-[1.5] text-[#222222]">{introduction}</p>
			</div>
		</div>
	</div>
</div>

<div class="flex desktop:hidden flex-col sm:flex-row gap-[20px] items-start py-[20px] w-full">
	<!-- Profile Image (Smaller) -->
	<div class="hidden sm:block bg-white w-[200px] h-[260px] overflow-clip relative shrink-0">
		<img src={encodeURI(profileImage)} alt={name} class="w-full h-full object-cover" />
	</div>

	<!-- Profile Image (Smaller) -->
	<div class="block sm:hidden bg-white w-[180px] h-[320px] overflow-clip relative shrink-0">
		<img src={encodeURI(profileImage)} alt={name} class="w-full h-full object-cover" />
	</div>

	<!-- Text Box -->
	<div class="flex-1 flex flex-col gap-[16px] justify-start">
		<!-- Name -->
		<div class="flex flex-col gap-[2px]">
			<p class="font-bold text-[20px] tablet:text-[32px] leading-[1.4] text-[#111111]">{name}</p>
			<p
				class="font-medium text-[16px] tablet:text-[20px] leading-[1.2] tracking-[-0.8px] text-[#111111]"
			>
				{nameEn}
			</p>
		</div>

		<!-- Introduction -->
		<p class="text-[18px] tablet:text-[18px] leading-[1.5] text-[#222222]">{introduction}</p>
	</div>
</div>
