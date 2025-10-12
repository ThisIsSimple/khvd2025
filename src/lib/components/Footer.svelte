<script lang="ts">
	// Footer component based on design
</script>

<footer class="bg-black text-white">
	<div class="mx-auto max-w-[1920px] px-4 py-8 tablet:px-6 tablet:py-12 desktop:px-8">
		<div class="grid grid-cols-1 gap-8 tablet:grid-cols-3 tablet:gap-12">
			<!-- Left Section: Title and Subtitle -->
			<div class="space-y-4">
				<h2 class="text-h7 tablet:text-h6">2025 경희대학교 시각디자인학과 졸업전시회</h2>
				<p class="text-b2">Reenvision = Visual Design</p>
			</div>

			<!-- Middle Section: Information -->
			<div class="space-y-4">
				<h3 class="text-h8 font-bold">INFORMATION</h3>
				<div class="space-y-2 text-b2">
					<div class="flex gap-4">
						<span class="min-w-[80px]">전시 오픈일</span>
						<span>2025. 11. 5</span>
					</div>
					<div class="flex gap-4">
						<span class="min-w-[80px]">전시 기간</span>
						<span>2025. 11. 5 - 2025. 11. 9</span>
					</div>
					<div class="flex gap-4">
						<span class="min-w-[80px]">전시 장소</span>
						<div>
							<p>경희대학교 국제캠퍼스</p>
							<p>예술디자인대학 2F A&D 갤러리</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Section: SNS and Archive -->
			<div class="flex flex-col justify-between gap-8">
				<div class="space-y-4">
					<h3 class="text-h8 font-bold">SNS</h3>
					<div class="flex gap-4">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							class="transition-opacity hover:opacity-70"
							aria-label="Instagram"
						>
							<img src="/icons/insta_fill_white.svg" alt="Instagram" class="h-8 w-8" />
						</a>
						<a href="tel:+82" class="transition-opacity hover:opacity-70" aria-label="Phone">
							<img src="/icons/call_white.svg" alt="Call" class="h-8 w-8" />
						</a>
						<a
							href="https://naver.com"
							target="_blank"
							rel="noopener noreferrer"
							class="transition-opacity hover:opacity-70"
							aria-label="Naver"
						>
							<img src="/icons/naver_white.svg" alt="Naver" class="h-8 w-8" />
						</a>
					</div>
				</div>

				<div class="space-y-4">
					<h3 class="text-h8 font-bold">ARCHIVE</h3>
					<div class="flex gap-4">
						<a
							href="/archive/2023"
							class="flex items-center gap-2 transition-opacity hover:opacity-70"
						>
							<img src="/icons/arrow_diagonal_forward.svg" alt="" class="h-6 w-6" />
							<span class="text-b2">2023</span>
						</a>
						<a
							href="/archive/2024"
							class="flex items-center gap-2 transition-opacity hover:opacity-70"
						>
							<img src="/icons/arrow_diagonal_forward.svg" alt="" class="h-6 w-6" />
							<span class="text-b2">2024</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Large R=VD Logo -->
		<div class="mt-12 tablet:mt-16">
			<img
				src="/logo_white.svg"
				alt="R=VD"
				class="h-auto w-[280px] tablet:w-[420px] desktop:w-[560px]"
			/>
		</div>
	</div>
</footer>
