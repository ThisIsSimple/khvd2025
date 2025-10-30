<script lang="ts">
	interface Props {
		id: number;
		thumbnail: string;
		title: string;
		designers: string[];
	}

	let { id, thumbnail, title, designers }: Props = $props();
</script>

<a href="/exhibition/works/detail/{id}" class="flex flex-col gap-4 w-full group cursor-pointer">
	<!-- Thumbnail (390x390px square) -->
	<div class="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
		<img
			src={thumbnail}
			alt={title}
			class="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
		/>
	</div>

	<!-- Work Info -->
	<div class="flex flex-col gap-0.5">
		<!-- Title (Pretendard Bold, 24px) -->
		<h3 class="font-bold text-2xl leading-[1.4] tracking-[-0.02em] text-[#111111] truncate">
			{title}
		</h3>

		<!-- Designer Names (Pretendard Regular, 20px) -->
		<p class="text-b1 text-[#111111]">
			{designers.join(', ')}
		</p>
	</div>
</a>
