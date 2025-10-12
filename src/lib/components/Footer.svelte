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
							class="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-black"
							aria-label="Instagram"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
								/>
							</svg>
						</a>
						<a
							href="tel:+82"
							class="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-black"
							aria-label="Phone"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
								/>
							</svg>
						</a>
						<a
							href="https://naver.com"
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-black"
							aria-label="Naver"
						>
							<span class="font-bold">N</span>
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
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
							</svg>
							<span class="text-b2">2023</span>
						</a>
						<a
							href="/archive/2024"
							class="flex items-center gap-2 transition-opacity hover:opacity-70"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
							</svg>
							<span class="text-b2">2024</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Large R=VD Logo -->
		<div class="mt-12 tablet:mt-16">
			<div class="font-display text-[120px] leading-none tablet:text-[180px] desktop:text-[240px]">
				R=VD
			</div>
		</div>
	</div>
</footer>
