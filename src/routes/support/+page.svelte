<script lang="ts">
	// Professor data with existing images
	const professors = [
		{
			name: '정지연',
			title: '학과장',
			nameEn: 'Jung Jiyeon',
			image: '/professors/정지연 교수님.webp'
		},
		{
			name: '장미경',
			title: '교수',
			nameEn: 'Jang Mikyung',
			image: '/professors/장미경 교수님.webp'
		},
		{
			name: '박상희',
			title: '교수',
			nameEn: 'Park Sanghee',
			image: '/professors/박상희 교수님.webp'
		},
		{
			name: '김은정',
			title: '교수',
			nameEn: 'Kim Eunjung',
			image: '/professors/김은정 교수님.webp'
		},
		{
			name: '김정우',
			title: '교수',
			nameEn: 'Kim Jungwoo',
			image: '/professors/김정우 교수님.webp'
		},
		{
			name: '김대연',
			title: '교수',
			nameEn: 'Kim Daeyeon',
			image: '/professors/김대연 교수님.webp'
		}
	];

	// Committee members
	const committeeMembers = [
		{ role: '총괄', names: ['이채원'] },
		{ role: '부총괄', names: ['김민서'] },
		{ role: '디자인', names: ['김태훈', '양다솜', '최혜린'] },
		{ role: '웹', names: ['김태훈', '박서준', '이윤수'] },
		{ role: '영상', names: ['박서준', '손민아', '정현수'] },
		{ role: '홍보', names: ['양다솜', '정현수', '최혜린'] }
	];

	// Sponsors
	const sponsors = [
		{ name: 'LISN', logo: '/sponsors/lisn-logo.png' },
		{ name: 'Risfont', logo: '/sponsors/risfont-logo.png' },
		{ name: 'Yoondesign', logo: '/sponsors/yoondesign-logo.png' },
		{ name: 'DdayB', logo: '/sponsors/ddayb-logo.png' }
	];
</script>

<svelte:head>
	<title>TEACH & SUPPORT - KHVD 2025</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Main Title -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[60px]">
		<h1 class="font-display text-[80px] tablet:text-[120px] leading-none text-[#111111]">
			TEACH & SUPPORT
		</h1>
	</section>

	<!-- Introduction Section: 영상과 함께 살펴보다 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px]">
		<h2 class="text-h6 tablet:text-h5 mb-[24px] tablet:mb-[40px]">영상과 함께 살펴보다</h2>

		<div class="grid grid-cols-1 tablet:grid-cols-2 gap-[40px] tablet:gap-[60px]">
			<!-- Left: Text Content -->
			<div class="flex flex-col gap-[20px]">
				<p class="text-b1 leading-[1.6] text-[#111111]">
					건국대 시각디자인과는 시각디자인 분야의 전문 인력 양성을 목표로 1963년 공예디자인과로 출발한
					이래, 오늘날 국내 시각 디자인 분야를 선도하는 교육기관으로 성장해 왔습니다. 우리 학과는 이론과
					실무를 겸비한 창의적이고 전문적인 디자이너를 육성하고자 다양한 실습 및 산학 협동을 통해 학생들이
					실무에 대응할 수 있는 능력을 향상하고 폭 넓은 활동의 기회를 제공하고 있습니다.
				</p>
				<p class="text-b1 leading-[1.6] text-[#111111]">
					졸업 후에는 산업디자인 분야뿐만 아니라 시각 커뮤니케이션의 다양한 영역에서 자신의 재능을 발휘할
					수 있습니다.
				</p>

				<button
					class="mt-[20px] w-fit px-[32px] py-[16px] bg-primary text-white font-bold text-b1 hover:bg-[#e03d1a] transition-colors"
				>
					학과소개영상
				</button>
			</div>

			<!-- Right: University Building Image -->
			<div class="w-full aspect-[4/3] bg-gray-200">
				<img
					src="/images/university-building.jpg"
					alt="건국대학교 건물"
					class="w-full h-full object-cover"
				/>
			</div>
		</div>
	</section>

	<!-- Professors Section: 지도교수 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] bg-[#f5f5f5]">
		<h2 class="text-h6 tablet:text-h5 mb-[40px] tablet:mb-[60px]">지도교수</h2>

		<div class="grid grid-cols-1 tablet:grid-cols-3 gap-[32px] tablet:gap-[40px]">
			{#each professors as professor}
				<div class="flex flex-col">
					<!-- Professor Image -->
					<div class="w-full aspect-[3/4] bg-gray-300 mb-[16px]">
						<img
							src={professor.image}
							alt={professor.name}
							class="w-full h-full object-cover"
						/>
					</div>

					<!-- Professor Info -->
					<div class="flex flex-col gap-[4px]">
						<h3 class="text-h7 text-[#111111]">{professor.name}</h3>
						<p class="text-b2 text-[#666666]">{professor.title}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Committee Section: 졸업전시위원회 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px]">
		<h2 class="text-h6 tablet:text-h5 mb-[40px] tablet:mb-[60px]">졸업전시위원회</h2>

		<div class="grid grid-cols-1 tablet:grid-cols-2 gap-[40px] tablet:gap-[60px]">
			<!-- Left: Committee Photo -->
			<div class="w-full aspect-[4/3] bg-gray-200">
				<img
					src="/images/committee-photo.jpg"
					alt="졸업전시위원회"
					class="w-full h-full object-cover"
				/>
			</div>

			<!-- Right: Member List -->
			<div class="flex flex-col gap-[16px]">
				{#each committeeMembers as member}
					<div class="flex gap-[20px] py-[12px] border-b border-[#e5e5e5]">
						<p class="text-b1 font-bold text-[#111111] w-[80px] shrink-0">{member.role}</p>
						<p class="text-b1 text-[#111111]">{member.names.join(', ')}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Sponsors Section: 후원 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] bg-[#f5f5f5]">
		<h2 class="text-h6 tablet:text-h5 mb-[40px] tablet:mb-[60px]">후원</h2>

		<div class="grid grid-cols-1 tablet:grid-cols-4 gap-[32px] tablet:gap-[40px]">
			{#each sponsors as sponsor}
				<div
					class="flex items-center justify-center bg-white p-[32px] aspect-square border border-[#e5e5e5]"
				>
					<img src={sponsor.logo} alt={sponsor.name} class="max-w-full max-h-full object-contain" />
				</div>
			{/each}
		</div>
	</section>

	<!-- Poster Section: 포스터 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px]">
		<h2 class="text-h6 tablet:text-h5 mb-[40px] tablet:mb-[60px]">포스터</h2>

		<div class="max-w-[600px] mx-auto">
			<div class="w-full aspect-[3/4] bg-gray-200">
				<img src="/images/poster.jpg" alt="KHVD 2025 포스터" class="w-full h-full object-cover" />
			</div>
		</div>
	</section>
</div>
