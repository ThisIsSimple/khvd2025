<script lang="ts">
	// Footer component - matches Figma design (Footer/Black/1920-1500)
</script>

<footer class="bg-[#111111] text-[#fefefe] h-[400px]">
	<div class="flex flex-col tablet:flex-row w-full h-full max-w-[1920px] mx-auto">
		<!-- Left Section: Title, Subtitle and Logo -->
		<div
			class="flex flex-col justify-between p-6 tablet:p-[52px] flex-1 min-w-0 gap-8 tablet:gap-0"
		>
			<!-- Text Container -->
			<div class="flex flex-col gap-[10px]">
				<h2 class="text-mobile-h6 tablet:text-pc-h10 font-bold text-[#fefefe] tracking-[-0.48px]">
					2025 경희대학교 시각디자인학과 졸업전시회
				</h2>
				<p class="text-mobile-b2 tablet:text-pc-b2 text-[#e0e0e0]">Reenvision = Visual Design</p>
			</div>

			<!-- Large R=VD Logo -->
			<div class="w-[280px] h-[138px]">
				<img src="/logo_white.svg" alt="R=VD" class="w-full h-full object-contain" />
			</div>
		</div>

		<!-- Right Section: Information, SNS and Archive -->
		<div class="flex flex-col tablet:flex-row">
			<!-- Information Section -->
			<div
				class="flex flex-col gap-8 tablet:gap-[72px] p-6 tablet:px-[60px] tablet:py-[52px] border-t tablet:border-t-0 tablet:border-l border-[#999999]"
			>
				<div class="flex flex-col gap-[32px]">
					<h3 class="text-mobile-b1 tablet:text-pc-b1 font-bold text-[#fefefe]">INFORMATION</h3>
					<div class="flex flex-col gap-[16px]">
						<!-- Exhibition Opening -->
						<div
							class="flex gap-[32px] items-center text-mobile-b2 tablet:text-pc-b2 text-[#e0e0e0] tracking-[-0.36px]"
						>
							<span class="w-[100px]">전시 오프닝</span>
							<span class="whitespace-nowrap">2025. 11. 5</span>
						</div>
						<!-- Exhibition Period -->
						<div
							class="flex gap-[32px] items-center text-mobile-b2 tablet:text-pc-b2 text-[#e0e0e0] tracking-[-0.36px]"
						>
							<span class="w-[100px]">전시 기간</span>
							<span class="whitespace-nowrap">2025. 11. 5 - 2025. 11. 9</span>
						</div>
						<!-- Exhibition Location -->
						<div
							class="flex gap-[32px] items-start text-mobile-b2 tablet:text-pc-b2 text-[#e0e0e0] tracking-[-0.36px]"
						>
							<span class="w-[100px]">전시 장소</span>
							<span class="whitespace-nowrap">
								경희대학교 국제캠퍼스<br />
								예술디자인대학 2F A&D 갤러리
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- SNS and Archive Section -->
			<div
				class="flex flex-col justify-between p-6 tablet:p-[52px] border-t tablet:border-t-0 tablet:border-l border-[#999999] gap-8 tablet:gap-0"
			>
				<!-- Top: SNS and Archive -->
				<div class="flex flex-col tablet:flex-row gap-8 tablet:gap-[60px]">
					<!-- SNS -->
					<div class="flex flex-col gap-[32px]">
						<h3 class="text-mobile-b1 tablet:text-pc-b1 font-bold text-[#fefefe]">SNS</h3>
						<div class="flex gap-[16px] items-center">
							<a
								href="https://instagram.com/khvd_graduation"
								target="_blank"
								rel="noopener noreferrer"
								class="border border-[#e0e0e0] rounded-full w-[50px] h-[50px] flex items-center justify-center transition-opacity hover:opacity-70"
								aria-label="Instagram"
							>
								<img src="/icons/insta_fill_white.svg" alt="" class="w-[25px] h-[25px]" />
							</a>
							<a
								href="tel:031-201-2672"
								class="border border-[#e0e0e0] rounded-full w-[50px] h-[50px] flex items-center justify-center transition-opacity hover:opacity-70"
								aria-label="Phone"
							>
								<img src="/icons/call_white.svg" alt="" class="w-[22px] h-[22px]" />
							</a>
							<a
								href="https://and.khu.ac.kr/and_kor/user/main/view.do"
								target="_blank"
								rel="noopener noreferrer"
								class="border border-[#e0e0e0] rounded-full w-[50px] h-[50px] flex items-center justify-center transition-opacity hover:opacity-70"
								aria-label="Naver"
							>
								<img src="/icons/naver_white.svg" alt="" class="w-[16px] h-[16px]" />
							</a>
						</div>
					</div>

					<!-- Archive -->
					<div class="flex flex-col gap-[32px]">
						<h3 class="text-mobile-b1 tablet:text-pc-b1 font-bold text-[#fefefe]">ARCHIVE</h3>
						<div class="flex gap-[24px]">
							<a
								href="https://2023.khvd.kr"
								target="_blank"
								class="flex gap-[4px] items-center transition-opacity hover:opacity-70"
							>
								<div class="w-[24px] h-[24px] flex items-center justify-center">
									<img src="/icons/arrow_diagonal_forward.svg" alt="" class="w-[17px] h-[17px]" />
								</div>
								<span class="text-mobile-b1 tablet:text-pc-b1 font-bold text-[#e0e0e0]">2023</span>
							</a>
							<a
								href="https://2024.khvd.kr"
								target="_blank"
								class="flex gap-[4px] items-center transition-opacity hover:opacity-70"
							>
								<div class="w-[24px] h-[24px] flex items-center justify-center">
									<img src="/icons/arrow_diagonal_forward.svg" alt="" class="w-[17px] h-[17px]" />
								</div>
								<span class="text-mobile-b1 tablet:text-pc-b1 font-bold text-[#e0e0e0]">2024</span>
							</a>
						</div>
					</div>
				</div>

				<!-- Bottom: Info logos (placeholder for now) -->
				<div class="flex gap-[22px] items-end justify-end h-[38px]">
					<img src="/khu-icon.svg" alt="" />
					<img src="/khvd-icon.svg" alt="" />
				</div>
			</div>
		</div>
	</div>
</footer>
