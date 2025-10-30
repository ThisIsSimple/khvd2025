<script lang="ts">
	interface Props {
		id: number;
		thumbnail: string;
		title: string;
		designers: string[];
	}

	let { id, thumbnail, title, designers }: Props = $props();
</script>

<a href="/exhibition/works/{id}" class="flex flex-col gap-[16px] w-full group cursor-pointer">
	<!-- Thumbnail (responsive aspect square) -->
	<div class="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
		<img
			src={encodeURI(thumbnail)}
			alt={title}
			class="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
		/>
	</div>

	<!-- Work Info -->
	<div class="flex flex-col gap-[2px]">
		<!-- Title (Pretendard Bold, 20px) -->
		<p class="font-bold text-[20px] leading-[1.4] text-[#111111]">
			{title}
		</p>

		<!-- Designer Names (Pretendard Regular, 18px) -->
		<p class="text-[18px] leading-[1.4] text-[#111111]">
			{designers.join(', ')}
		</p>
	</div>
</a>
