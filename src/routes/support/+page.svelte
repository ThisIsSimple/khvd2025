<script lang="ts">
	// Professor data with existing images
	const professors = [
		{
			name: '장미경',
			nameEn: 'Mi Kyung Jang',
			image: '/professors/Jang Mikyung.webp',
			number: 1,
			link: '/exhibition/works/list/1'
		},
		{
			name: '김은정',
			nameEn: 'Eun Jung Kim',
			image: '/professors/Kim Eunjung.webp',
			number: 0,
			link: '/exhibition/works/list/0'
		},
		{
			name: '정지연',
			nameEn: 'Ji Yeon Jung',
			image: '/professors/Jung Jiyeon.webp',
			number: 2,
			link: '/exhibition/works/list/2'
		},
		{
			name: '박상희',
			nameEn: 'Sang Hee Park',
			image: '/professors/Park Sanghee.webp',
			number: 0,
			link: '/exhibition/works/list/0?professor=박상희'
		},
		{
			name: '김정우',
			nameEn: 'Jung Woo Kim',
			image: '/professors/Kim Jungwoo.webp',
			number: 3,
			link: '/exhibition/works/list/3'
		},
		{
			name: '김대연',
			nameEn: 'Dae Yeon Kim',
			image: '/professors/Kim Daeyeon.webp',
			number: 1,
			link: '/exhibition/works/list/1'
		}
	];

	// Committee members (updated to match Figma design)
	const committeeMembers1 = [
		{ role: '위원장', names: ['김은서'] },
		{ role: '부위원장', names: ['김유비'] }
	];
	const committeeMembers2 = [
		{ role: '그래픽', names: ['오경진', '강희승', '김유비', '이묘정'] },
		{ role: '기획', names: ['최서윤', '김은서', '김유비', '김성은', '만령연', '이도영', '정주희'] },
		{ role: '웹', names: ['임주은', '김은서', '이도영'] },
		{ role: '사진', names: ['김은서', '임주은', '만령연'] }
	];

	// Sponsors
	const sponsors = [
		{
			name: '리즌디자인',
			logo: '/sponsors/1.png',
			link: 'https://www.rixfontcloud.com'
		},
		{
			name: '산돌구름',
			logo: '/sponsors/2.png',
			link: 'https://www.sandollcloud.com/'
		},
		{
			name: '릭스폰트',
			logo: '/sponsors/3.png',
			link: 'https://www.rixfontcloud.com'
		},
		{ name: '윤디자인', logo: '/sponsors/4.png', link: 'https://yoondesign.com' },
		{
			name: '다인어리',
			logo: '/sponsors/5.png',
			link: 'https://www.instagram.com/dainary.official'
		}
	];
</script>

<svelte:head>
	<title>TEACH & SUPPORT - KHVD 2025</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Main Title -->
	<section class="px-[16px] tablet:px-[40px] py-[8px] tablet:py-[48px]">
		<h1
			class="font-display text-[48px] tablet:text-[100px] desktop:text-[120px] leading-[1.2] text-[#111111]"
		>
			TEACH & SUPPORT
		</h1>
	</section>

	<!-- Introduction Section: 생생한 꿈은 실현된다 -->
	<section class="px-[20px] tablet:px-[40px] pt-[40px] pb-[60px] tablet:pb-[120px]">
		<div
			class="flex flex-col tablet:flex-row gap-[20px] tablet:gap-[40px] desktop:gap-[80px] items-start tablet:items-center"
		>
			<!-- Left: Chairman's Message -->
			<div
				class="flex-1 flex flex-col gap-[16px] justify-between h-full min-h-[400px] tablet:min-h-[480px]"
			>
				<!-- Title -->
				<h2
					class="font-bold text-[24px] tablet:text-[32px] leading-[1.4] text-[#111111] mb-[24px] tablet:mb-0"
				>
					생생한 꿈은 실현된다
				</h2>

				<!-- Content & Signature Container -->
				<div class="flex flex-col gap-[38px] items-end">
					<!-- Message Text -->
					<div class="text-[16px] tablet:text-[18px] leading-[1.5] text-[#222222] w-full">
						<p class="mb-[18px]">
							"생생한 꿈은 결국 실현된다." 제34회 졸업전시회 R=VD의 주제이자, 그 믿음을 스스로의
							작업으로 증명해낸 68명의 디자이너들의 이야기입니다.
						</p>
						<p class="mb-[18px]">
							이번 전시는 '다시 보기(Reenvision)'와 '실현(Realization)'이라는 두 개의 등식을 통해,
							시각디자인이라는 언어로 자신만의 세계를 재구성하고 구현해낸 여정을 담고 있습니다.
							급변하는 시대에서 학생들은 익숙했던 공식을 넘어 자신만의 기준으로 세상을 재구상하고,
							그 안에서 진정한 디자이너로서의 길을 찾아왔습니다. 그 치열한 탐구와 실험의 시간들이
							모여, 이번 전시라는 빛나는 결과로 이어졌습니다. 이번 졸업전시를 통해 여러분 각자의
							시선이 앞으로 사회 곳곳에서 새로운 영감과 변화를 일으키는 시작점이 되기를 기대합니다.
						</p>
						<p>
							졸업을 맞이한 68명의 학생 여러분, 그리고 그 과정을 함께한 모든 지도교수님들과 학과
							구성원들께 진심으로 축하와 감사를 전합니다.
						</p>
					</div>

					<!-- Signature -->
					<p
						class="font-bold text-[16px] tablet:text-[18px] leading-[1.4] text-[#222222] text-right w-full"
					>
						학과장 정지연
					</p>
				</div>
			</div>

			<!-- Right: University Building Image -->
			<div class="flex-1 h-[300px] tablet:h-[480px] bg-[#eeeeee] relative overflow-hidden">
				<img
					src="/support-intro.jpeg"
					alt="경희대학교"
					class="w-full h-full object-cover object-center"
				/>
			</div>
		</div>
	</section>

	<!-- Professors Section: 지도교수 -->
	<section
		class="tablet:grid grid-cols-[1fr__5fr] px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] gap-[24px]"
	>
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] gap-[8px]">
			<h2 class="text-[20px] tablet:text-[28px] font-bold text-[#111111]">지도교수</h2>
			<span class="text-[16px] tablet:text-[20px] text-[#999999]">ADVISOR</span>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-3 gap-[8px]">
			{#each professors as professor}
				<a href={professor.link} class="group relative aspect-square overflow-hidden flex flex-col">
					<!-- Professor Image -->
					<div class="w-full h-full bg-gray-300">
						<img
							src={professor.image}
							alt={professor.name}
							class="w-full h-full object-cover object-top"
						/>
					</div>

					<!-- Professor Info -->
					<div
						class="absolute left-0 top-0 w-full h-full flex flex-col items-start justify-end gap-[4px] p-[20px]"
					>
						<h3 class="text-h7 tablet:text-h6 font-bold text-white">{professor.name}</h3>
						<p class="text-b2 tablet:text-b1 font-regular text-white">{professor.nameEn}</p>
					</div>

					<div
						class="group-hover:scale-100 scale-0 transition-transform duration-300 ease-in-out z-[1] absolute left-0 top-0 w-full h-full flex flex-col items-start justify-end gap-[4px] desktop:gap-[8px] p-[16px] tablet:p-[24px] desktop:px-[32px] desktop:py-[26px] bg-primary"
					>
						<h3
							class="text-[32px] tablet:text-[52px] leading-[0.9] font-regular text-white font-display"
						>
							GRADUATION<br />STUDIES {professor.number}
						</h3>
						<p class="text-[20px] tablet:text-[24px] text-white tracking-[-0.4px]">
							졸업연구{professor.number}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Committee Section: 졸업전시위원회 -->
	<section
		class="tablet:grid grid-cols-[1fr__5fr] px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] gap-[24px]"
	>
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] gap-[8px]">
			<h2 class="text-[20px] tablet:text-[28px] font-bold text-[#111111]">졸업전시위원회</h2>
			<span class="text-[16px] tablet:text-[20px] text-[#999999]">COMMITTEE</span>
		</div>

		<div class="flex flex-col sm:flex-row gap-[40px] tablet:gap-[40px]">
			<!-- Left: Committee Photo -->
			<div class="w-full aspect-[480/350] bg-gray-200 max-w-[900px]">
				<img src="/support-group.jpeg" alt="졸업전시위원회" class="w-full h-full object-cover" />
			</div>

			<!-- Right: Member List -->
			<div
				class="flex-none flex flex-col xs:flex-row sm:flex-col tablet:justify-between max-h-[400px]"
			>
				<div class="flex flex-col gap-[8px] xs:mr-5 sm:mr-0">
					{#each committeeMembers1 as member}
						<div class="flex gap-x-[12px] py-[10px]">
							<p class="text-b1 text-[#111111] w-[60px] shrink-0">{member.role}</p>
							<p class="text-b1 text-[#111111] font-bold">{member.names[0]}</p>
							<div class="grid grid-cols-3 gap-y-[8px] gap-x-[12px]">
								{#each member.names.slice(1) as name}
									<p class="text-b1 text-[#111111]">{name}</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
				<div class="flex flex-col gap-[8px]">
					<div class="hidden sm:block h-[1px] bg-[#111111] w-[20px] mb-[8px]"></div>
					{#each committeeMembers2 as member}
						<div class="flex gap-y-[8px] gap-x-[12px] py-[10px]">
							<p class="text-b1 text-[#111111] w-[60px] shrink-0">{member.role}</p>
							<p class="text-b1 text-[#111111] font-bold">{member.names[0]}</p>
							<div class="grid grid-cols-3 gap-y-[8px] gap-x-[12px]">
								{#each member.names.slice(1) as name}
									<p class="text-b1 text-[#111111]">{name}</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Sponsors Section: 후원 -->
	<section
		class="tablet:grid grid-cols-[1fr__5fr] px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] gap-[24px]"
	>
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] gap-[8px]">
			<h2 class="text-[20px] tablet:text-[28px] font-bold text-[#111111]">후원</h2>
			<span class="text-[16px] tablet:text-[20px] text-[#999999]">SPONSOR</span>
		</div>

		<div class="grid grid-cols-2 tablet:grid-cols-5 gap-[20px]">
			{#each sponsors as sponsor}
				<a
					href={sponsor.link}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center aspect-square bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-300"
				>
					<img src={sponsor.logo} alt={sponsor.name} class="max-w-full max-h-full object-contain" />
				</a>
			{/each}
		</div>
	</section>

	<!-- Personal Work Section: 개별 -->
	<section
		class="tablet:grid grid-cols-[1fr__5fr] px-[20px] tablet:px-[40px] py-[40px] tablet:py-[80px] gap-[24px]"
	>
		<!-- Bilingual Title -->
		<div class="mb-[32px] tablet:mb-[40px] gap-[8px]">
			<h2 class="text-[20px] tablet:text-[28px] font-bold text-[#111111]">개발</h2>
			<span class="text-[16px] tablet:text-[20px] text-[#999999]">DEVELOPER</span>
		</div>

		<div class="max-w-[600px] mx-auto tablet:mx-0">
			<div class="w-full aspect-[3/4] bg-gray-200 mb-[16px] max-w-[200px]">
				<img src="/sponsors/developer.webp" alt="전윤민" class="w-full h-full object-cover" />
			</div>
			<!-- Artist Name -->
			<p class="text-h7 tablet:text-h6 text-[#111111]">전윤민 Yun Min Jeon</p>
		</div>
	</section>
</div>
