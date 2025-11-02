import type { SeminarDay } from '$lib/types/seminar';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Seminar data from Figma design
	const seminarData: SeminarDay[] = [
		{
			date: '11.06',
			seminars: [
				{
					id: '1',
					time: '11:00 - 11:15',
					category: '졸업스튜디오 1',
					title: '7 GOOD THINGS CRUMBLE DOWN',
					description: '변화와 순환를 담은 시각의 이야기',
					highlighted: false,
					fullSchedule: '11.06 (목)  11:00-11:15',
					speakers: [
						{
							name: '이요정',
							team: '졸업스튜디오 1 · 이요정'
						}
					]
				},
				{
					id: '2',
					time: '11:15 - 11:30',
					category: '졸업스튜디오 1',
					title: 'Jourpie',
					description: '조각으로 기록하는 나만의 여정',
					highlighted: false,
					fullSchedule: '11.06 (목)  11:15-11:30',
					speakers: [
						{
							name: '이윤서',
							team: '졸업스튜디오 1 · 이윤서'
						}
					]
				},
				{
					id: '3',
					time: '13:00 - 13:15',
					category: '졸업스튜디오 2',
					title: '무드지점',
					description: '기록과 감정이 적용이 되는 미술관',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:00-13:15',
					speakers: [
						{
							name: '신해원',
							team: '졸업스튜디오 2 · 신해원'
						}
					]
				},
				{
					id: '4',
					time: '13:15 - 13:30',
					category: '졸업스튜디오 2',
					title: '웰니스 티 브랜드, 잇장',
					description: '하루의 ON과 OFF를 잇습니다.',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:15-13:30',
					speakers: [
						{
							name: '김주영',
							team: '졸업스튜디오 2 · 김주영'
						}
					]
				},
				{
					id: '5',
					time: '13:45 - 14:00',
					category: '졸업스튜디오 3',
					title: 'GongGOng(공공)',
					description: '놀이기반 인터렉션 툴로 플렛폼',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:45-14:00',
					speakers: [
						{
							name: '구다연',
							team: '졸업스튜디오 3 · 구다연'
						}
					]
				},
				{
					id: '6',
					time: '14:00 - 14:15',
					category: '졸업스튜디오 3',
					title: '삐유 (Piu)',
					description: '나만의 꽃 키우기·콜라보 커스텀 앱',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:00-14:15',
					speakers: [
						{
							name: '구은인',
							team: '졸업스튜디오 3 · 구은인'
						}
					]
				},
				{
					id: '7',
					time: '14:15 - 14:30',
					category: '졸업스튜디오 0',
					title: '저서',
					description: '영사이클릴 로푸팔 브랜드',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:15-14:30',
					speakers: [
						{
							name: '이숨/정해린/오경진',
							team: '졸업스튜디오 0 · T이숨/T정해린/오경진'
						}
					]
				},
				{
					id: '8',
					time: '14:30 - 14:45',
					category: '졸업스튜디오 0',
					title: 'YIDA (이다)',
					description: '한국의 유채됨을 잇다, YIDA',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:30-14:45',
					speakers: [
						{
							name: '강희윤',
							team: '졸업스튜디오 0 · T강희윤/ 김의진/ 신혜원'
						}
					]
				},
				{
					id: '9',
					time: '14:45 - 15:00',
					category: '졸업스튜디오 0',
					title: '미토화이트즈',
					description: '지연화동 작도 기반 전략적 미술 연구',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:45-15:00',
					speakers: [
						{
							name: '다담',
							team: '졸업스튜디오 0 -다담 · T김주영/ 박서민/ 이윤서'
						}
					]
				},
				{
					id: '10',
					time: '15:00 - 15:15',
					category: '졸업스튜디오 0',
					title: 'MICE STAR',
					description: '마이스 관광 가능성을 바우는 새 기준',
					highlighted: false,
					fullSchedule: '11.06 (목)  15:00-15:15',
					speakers: [
						{
							name: '다담',
							team: '졸업스튜디오 0 -다담 · T김포장/정서은/한희옥/김성옥'
						}
					]
				}
			]
		},
		{
			date: '11.07',
			seminars: [
				{
					id: '11',
					time: '15:00 - 15:30',
					category: '미래일 · 전예조',
					title: '',
					description:
						'글로벌 브랜드 마케팅과 커뮤니케이션 분야에서 활동하며 전문가가 스타트업의 생존과 성장 과정을 통해 얻은 경험을 바탕으로, 마케팅 전략과 전반적인 운영을 공유합니다.',
					highlighted: false,
					fullSchedule: '11.07 (금)  15:00-15:30',
					speakers: [
						{
							name: '전예원칙 x',
							team: '미래일 · 전예조'
						}
					]
				},
				{
					id: '12',
					time: '16:00 - 16:30',
					category: 'VFX · 정성진',
					title: '',
					description:
						'영화·광고 등 다양한 영상 콘텐츠의 VFX(시각효과) 감독 및 슈퍼바이저로 활동하며, 수많은 실영상 화와 프로젝트의 시각효과 기획, 연출, 제작 전반을 담당합니다.',
					highlighted: false,
					fullSchedule: '11.07 (금)  16:00-16:30',
					speakers: [
						{
							name: '전예원칙 x',
							team: 'VFX · 정성진'
						}
					]
				}
			]
		}
	];

	return {
		seminarDays: seminarData
	};
};
