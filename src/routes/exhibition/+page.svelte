<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
</script>

<!-- Exhibition About Page -->
<div class="bg-[#fefefe] flex flex-col items-center w-full min-h-screen">
	<!-- Main Content -->
	<div class="flex items-start justify-between w-full max-w-[1920px] pb-[180px]">
		<!-- Left Column: Content -->
		<div class="flex flex-col items-start w-full max-w-[1100px]">
			<!-- Page Title -->
			<div class="flex items-center px-[40px] py-[48px]">
				<h1 class="font-display text-[120px] leading-none text-[#111111]">ABOUT EXHIBITION</h1>
			</div>

			<!-- Content Container -->
			<div class="flex flex-col items-start px-[40px]">
				<!-- Divider Line -->
				<div class="flex items-start gap-[20px] h-[24px] px-0 py-[12px] w-full">
					<div class="w-[20px] h-[2px] bg-[#111111]"></div>
				</div>

				<!-- Section 1: 전시의도 -->
				<div class="flex flex-col items-start py-[40px]">
					<!-- Title -->
					<div class="flex flex-col gap-[4px] px-0 py-[12px]">
						<p class="font-bold text-[#fc451e] text-[20px] leading-[1.4]">전시의도</p>
						<h2 class="font-bold text-[#111111] text-[32px] leading-[1.4]">
							다시 보고, 마침내 실현하다
						</h2>
					</div>

					<!-- Content -->
					<div class="flex flex-col gap-[10px] py-[32px]">
						<div class="text-[#222222] text-[20px] leading-[1.5]">
							<p>
								재구상(Reenvision)하는 행위는 끊임없이 다시 그려내는 시각디자인(Visual Design) 그
								자체이며,
							</p>
							<p>
								그렇게 다듬어진 감각과 판단이 생생한 꿈(Vivid Dream)의 실현(Realization)로
								이어진다는 뜻을 담았습니다.
							</p>
							<br />
							<p>그래서 이번 전시는 '다시 보기—다시 그리기—다시 묻기'의 과정입니다.</p>
							<br />
							<p>
								관람자가 작업이 놓인 맥락과 선택의 이유를 따라가며, 타인의 기대를 잠시 비켜 두고
							</p>
							<p>자신의 시선으로 다시 보는 경험을 하기를 바랐습니다.</p>
							<br />
							<p>다시 보고(Reenvision), 마침내 실현합니다(Realization).</p>
							<p>
								이 전시가 여러분의 시선으로 향하는 첫걸음이자, 진정한 꿈에 가까워지는 시작점이 되길
								바랍니다.
							</p>
						</div>
					</div>
				</div>

				<!-- Section 2: 비주얼 -->
				<div class="flex flex-col items-start py-[40px]">
					<!-- Title -->
					<div class="flex flex-col gap-[4px] px-0 py-[8px]">
						<p class="font-bold text-[#fc451e] text-[20px] leading-[1.4]">비주얼</p>
						<h2 class="font-bold text-[#111111] text-[32px] leading-[1.4]">
							선명한 레드 오렌지, 타이포 중심
						</h2>
					</div>

					<!-- Content -->
					<div class="flex flex-col gap-[32px] py-[32px]">
						<div class="flex flex-col gap-[80px]">
							<!-- Text Content -->
							<div class="flex flex-col gap-[28px] text-[#222222] text-[20px] leading-[1.5]">
								<p>
									그래픽의 선과 면, 그리고 분절된 형태는 범람하는 정보사회에 맞서 우리만의 명확한
									시선과 꿈을 찾아가는 과정을 담고 있습니다.
								</p>
								<p>메인 포스터의 중심이 되는 4개의 선은 곧 우리의 중심을 의미합니다.</p>
								<p>
									계속해서 변화하는 수많은 점과 면들은 우리의 시선을 분산시키지만<br />
									그 안에 등장한 선은 프레임을 나누며 꿋꿋이 중심을 구축합니다.
								</p>
								<p>
									타이포그래피 역시 조각난 형태였지만, 자신만의 위치를 찾아 재구상되고,<br />
									그 끝에 완성된 R=VD라는 메시지를 통해 재구상은 곧 하나의 메시지이자 하나의 실현이 됩니다.
								</p>
							</div>

							<!-- Color Swatches and Description -->
							<div class="flex flex-col gap-[40px]">
								<!-- Swatches -->
								<div class="flex items-center">
									<!-- Red Orange Swatch -->
									<div
										class="bg-[#e83e15] w-[290px] h-[140px] px-[15px] py-[12px] flex flex-col justify-between"
									>
										<p class="font-medium text-white text-[18px] leading-none">Red Orange</p>
										<div
											class="flex flex-col text-[rgba(255,255,255,0.6)] text-[15px] leading-none"
										>
											<p># E83E15</p>
											<p>rgb(232, 62, 21)</p>
										</div>
									</div>
									<!-- Black Swatch -->
									<div
										class="bg-black w-[290px] h-[140px] px-[15px] py-[12px] flex flex-col justify-between"
									>
										<p class="font-medium text-white text-[18px] leading-none">Black</p>
										<div
											class="flex flex-col gap-[4px] text-[rgba(255,255,255,0.6)] text-[15px] leading-none"
										>
											<p># 000000</p>
											<p>rgb(0, 0, 0)</p>
										</div>
									</div>
								</div>

								<!-- Color Description -->
								<div class="flex flex-col gap-[28px] text-[20px] text-black leading-[1.5]">
									<p>아이덴티티 컬러는 오렌지와 블랙으로 설정하였습니다.</p>
									<p>
										오렌지는 강렬하면서도 따뜻한 에너지를 지닌 색입니다. 타인에 의해 흔들리지 않는
										자신만의 재구상,<br />
										그 강인함을 드러내면서 동시에 그 과정을 향한 응원과 격려의 의미를 담았습니다.<br
										/>
										<br />
										블랙은 깊이와 무게감을 지니며, 시각적 노이즈 속에서도 본질을 드러내는 색이자 넘쳐나는
										정보 속<br />
										자신만이 찾아낸 '재구상' 그 자체를 나타냅니다.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Section 3: 아카이브존 -->
				<div class="flex flex-col gap-[12px] py-[40px]">
					<!-- Title -->
					<div class="flex flex-col gap-[4px] px-0 py-[8px]">
						<p class="font-bold text-[#e83e15] text-[20px] leading-[1.4]">아카이브존</p>
						<h2 class="font-bold text-black text-[32px] leading-[1.4]">미디어실</h2>
					</div>

					<!-- Content -->
					<div class="flex flex-col gap-[32px] pt-[32px]">
						<p class="text-[20px] text-black leading-[1.5]">
							기획팀 회의 끝나고<br />
							미디어실 의도 설명문
						</p>
						<!-- Archive Image -->
						<div class="w-[415.979px] h-[245.261px]">
							<img
								src="/about-archive-image.png"
								alt="Archive Zone"
								class="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<button class="hidden tablet:block fixed top-[50px+32px] right-[40px]">
			<img
				src="/icons/expand-icon.svg"
				alt=""
				class="w-[40px] h-[40px] desktop:w-[60px] desktop:h-[60px]"
			/>
		</button>

		<!-- Right Column: Poster Image with Arrow -->
		<!-- <div
			class="flex items-start justify-end h-[calc(100vh-50px)] tablet:h-[calc(100vh-100px)] sticky top-[50px] tablet:top-[100px]"
		>
			<div class="w-full max-w-[664px] h-full overflow-hidden">
				<img
					src="/about-poster-image.png"
					alt="Exhibition Poster"
					class="w-full h-full object-cover"
				/>
			</div>
		</div> -->
	</div>
</div>
