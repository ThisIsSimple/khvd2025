<script lang="ts">
	// Professor data with existing images
	const professors = [
		{
			name: '정지연',
			nameEn: 'Jung Jiyeon',
			image: '/professors/정지연 교수님.webp'
		},
		{
			name: '장미경',
			nameEn: 'Jang Mikyung',
			image: '/professors/장미경 교수님.webp'
		},
		{
			name: '박상희',
			nameEn: 'Park Sanghee',
			image: '/professors/박상희 교수님.webp'
		},
		{
			name: '김은정',
			nameEn: 'Kim Eunjung',
			image: '/professors/김은정 교수님.webp'
		},
		{
			name: '김정우',
			nameEn: 'Kim Jungwoo',
			image: '/professors/김정우 교수님.webp'
		},
		{
			name: '김대연',
			nameEn: 'Kim Daeyeon',
			image: '/professors/김대연 교수님.webp'
		}
	];

	// Committee members (updated to match Figma design)
	const committeeMembers = [
		{ role: '위원장', names: ['김은서'] },
		{ role: '부위원장', names: ['김유비'] },
		{ role: '그래픽', names: ['오경진', '강희승', '김유비', '이묘정'] },
		{ role: '기획', names: ['최서윤', '김은서', '김유비', '김성은', '만령연', '이도영', '정주희'] },
		{ role: '웹', names: ['임주은', '김은서', '이도영'] },
		{ role: '사진', names: ['김은서', '임주은', '만령연'] }
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
	<section class="px-[20px] tablet:px-[40px] py-[28px] tablet:py-[28px]">
		<h1 class="font-display text-[80px] tablet:text-[100px] leading-[1.2] text-[#111111]">
			TEACH & SUPPORT
		</h1>
	</section>

	<!-- Introduction Section: 새로운 시각을 향하여 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[40px]">
		<h2 class="text-h7 tablet:text-h6 mb-[32px] tablet:mb-[32px]">새로운 시각을 향하여</h2>

		<div class="grid grid-cols-1 tablet:grid-cols-2 gap-[40px] tablet:gap-[40px]">
			<!-- Left: Chairman's Message -->
			<div class="flex flex-col gap-[24px]">
				<p class="text-b1 leading-[1.6] text-[#111111]">
					"생생한 꿈은 결국 실현된다." 제34회 졸업전시회 R=VD의 주제이자, 그 믿음을 스스로의 작업으로
					증명해낸 68명의 디자이너들의 이야기입니다.
				</p>
				<p class="text-b1 leading-[1.6] text-[#111111]">
					이번 전시는 '다시 보기(Reenvision)'와 '실현(Realization)'이라는 두 개의 등식을 통해,
					시각디자인이라는 언어로 자신만의 세계를 재구성하고 구현해낸 여정을 담고 있습니다. 급변하는
					시대에서 학생들은 익숙했던 공식을 넘어 자신만의 기준으로 세상을 재구상하고, 그 안에서 진정한
					디자이너로서의 길을 찾아왔습니다. 그 치열한 탐구와 실험의 시간들이 모여, 이번 전시라는 빛나는
					결과로 이어졌습니다. 이번 졸업전시를 통해 여러분 각자의 시선이 앞으로 사회 곳곳에서 새로운
					영감과 변화를 일으키는 시작점이 되기를 기대합니다.
				</p>
				<p class="text-b1 leading-[1.6] text-[#111111]">
					졸업을 맞이한 68명의 학생 여러분, 그리고 그 과정을 함께한 모든 지도교수님들과 학과
					구성원들께 진심으로 축하와 감사를 전합니다.
				</p>

				<!-- Chairman Signature -->
				<p class="text-b1 text-[#111111] mt-[8px]">학과장 정지연</p>
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
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] bg-transparent">
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[47px] flex gap-[8px] items-baseline">
			<h2 class="text-h7 tablet:text-h6 font-bold text-[#111111]">지도교수</h2>
			<span class="text-b2 tablet:text-b1 text-[#999999]">ADVISOR</span>
		</div>

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
						<h3 class="text-h7 tablet:text-h6 text-[#111111]">{professor.name}</h3>
						<p class="text-b2 tablet:text-b1 text-[#666666]">{professor.nameEn}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Committee Section: 졸업전시위원회 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px]">
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[47px] flex gap-[8px] items-baseline">
			<h2 class="text-h7 tablet:text-h6 font-bold text-[#111111]">졸업전시위원회</h2>
			<span class="text-b2 tablet:text-b1 text-[#999999]">COMMITTEE</span>
		</div>

		<div class="grid grid-cols-1 tablet:grid-cols-2 gap-[40px] tablet:gap-[40px]">
			<!-- Left: Committee Photo -->
			<div class="w-full aspect-[4/3] bg-gray-200">
				<img
					src="/images/committee-photo.jpg"
					alt="졸업전시위원회"
					class="w-full h-full object-cover"
				/>
			</div>

			<!-- Right: Member List -->
			<div class="flex flex-col gap-[10px] tablet:gap-[0px]">
				{#each committeeMembers as member}
					<div class="flex gap-[20px] tablet:gap-[8px] py-[10px] tablet:py-[10px]">
						<p class="text-b1 text-[#111111] w-[80px] shrink-0">{member.role}</p>
						<p class="text-b1 text-[#111111]">{member.names.join(', ')}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Sponsors Section: 후원 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] bg-transparent">
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] flex gap-[8px] items-baseline">
			<h2 class="text-h7 tablet:text-h6 font-bold text-[#111111]">후원</h2>
			<span class="text-b2 tablet:text-b1 text-[#999999]">SPONSOR</span>
		</div>

		<div class="grid grid-cols-2 tablet:grid-cols-4 gap-[20px] tablet:gap-[20px]">
			{#each sponsors as sponsor}
				<div
					class="flex items-center justify-center bg-white p-[24px] tablet:p-[32px] aspect-square border border-[#e5e5e5]"
				>
					<img src={sponsor.logo} alt={sponsor.name} class="max-w-full max-h-full object-contain" />
				</div>
			{/each}
		</div>
	</section>

	<!-- Personal Work Section: 개별 -->
	<section class="px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px]">
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] flex gap-[8px] items-baseline">
			<h2 class="text-h7 tablet:text-h6 font-bold text-[#111111]">개별</h2>
			<span class="text-b2 tablet:text-b1 text-[#999999]">PERSONAL</span>
		</div>

		<div class="max-w-[600px] mx-auto tablet:mx-0">
			<div class="w-full aspect-[3/4] bg-gray-200 mb-[16px]">
				<img
					src="/images/personal-work.jpg"
					alt="전윤민 개인 작업"
					class="w-full h-full object-cover"
				/>
			</div>
			<!-- Artist Name -->
			<p class="text-h7 tablet:text-h6 text-[#111111]">전윤민 Yun Min Jeon</p>
		</div>
	</section>
</div>
