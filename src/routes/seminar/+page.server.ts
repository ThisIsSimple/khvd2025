import type { SeminarDay } from '$lib/types/seminar';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	//Seminar data from Figma design
	const seminarData: SeminarDay[] = [
		{
			date: '11.06',
			seminars: [
				{
					id: '1',
					link: 'https://naver.com',
					time: '11:00 - 11:15',
					category: '졸업스튜디오 1',
					title: '7 GOOD THINGS CRUMBLE DOWN',
					description: '변화와 순환을 담은 시간의 이야기',
					highlighted: false,
					fullSchedule: '11.06 (목)  11:00-11:15',
					speakers: [
						{
							name: '이묘정',
							team: '이묘정'
						}
					]
				},
				{
					id: '2',
					link: 'https://naver.com',
					time: '11:15 - 11:30',
					category: '졸업스튜디오 1',
					title: 'Jourpie',
					description: '조각으로 기록하는 나만의 여정',
					highlighted: false,
					fullSchedule: '11.06 (목)  11:15-11:30',
					speakers: [
						{
							name: '이윤서',
							team: '이윤서'
						}
					]
				},
				{
					id: '3',
					link: 'https://naver.com',
					time: '13:00 - 13:15',
					category: '졸업스튜디오 2',
					title: '무드지엄',
					description: '기록과 감정이 작품이 되는 미술관',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:00-13:15',
					speakers: [
						{
							name: '신혜원',
							team: '신혜원'
						}
					]
				},
				{
					id: '4',
					link: 'https://naver.com',
					time: '13:15 - 13:30',
					category: '졸업스튜디오 2',
					title: '웰니스 티 브랜드, 찻장',
					description: '하루의 ON과 OFF를 잇습니다.',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:15-13:30',
					speakers: [
						{
							name: '김주영',
							team: '김주영'
						}
					]
				},
				{
					id: '5',
					link: 'https://naver.com',
					time: '13:45 - 14:00',
					category: '졸업스튜디오 3',
					title: 'GongGOng(공공)',
					description: '놀이기반 인터렉션 투표 플랫폼',
					highlighted: false,
					fullSchedule: '11.06 (목)  13:45-14:00',
					speakers: [
						{
							name: 'T김다은 / 임주은',
							team: 'T김다은 / 임주은'
						}
					]
				},
				{
					id: '6',
					link: 'https://naver.com',
					time: '14:00 - 14:15',
					category: '졸업스튜디오 3',
					title: '피우 (Piu)',
					description: '나만의 꽃 키우기·꽃다발 커스텀 앱',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:00-14:15',
					speakers: [
						{
							name: 'T김은진 / 이채서',
							team: 'T김은진 / 이채서'
						}
					]
				},
				{
					id: '7',
					link: 'https://naver.com',
					time: '14:15 - 14:30',
					category: '졸업스튜디오 0',
					title: '차차',
					description: '업사이클링 로프백 브랜드',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:15-14:30',
					speakers: [
						{
							name: 'T이수빈 / 정혜원 / 오경진',
							team: 'T이수빈 / 정혜원 / 오경진'
						}
					]
				},
				{
					id: '8',
					link: 'https://naver.com',
					time: '14:30 - 14:45',
					category: '졸업스튜디오 0',
					title: 'YIDA (이다)',
					description: '한국의 유쾌함을 잇다, YIDA',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:30-14:45',
					speakers: [
						{
							name: 'T강희승 / 김의진 / 신혜원',
							team: 'T강희승 / 김의진 / 신혜원'
						}
					]
				},
				{
					id: '9',
					link: 'https://naver.com',
					time: '14:45 - 15:00',
					category: '졸업스튜디오 0',
					title: '미룬히어로즈',
					description: '지연행동 척도 기반 전략적 미룸 연구',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:45-15:00',
					speakers: [
						{
							name: 'T김주영 / 방서연 / 이윤서',
							team: 'T김주영 / 방서연 / 이윤서'
						}
					]
				},
				{
					id: '10',
					link: 'https://naver.com',
					time: '15:00 - 15:15',
					category: '졸업스튜디오 0',
					title: 'MICE STAR',
					description: '마이스 관광 가능성을 비추는 새 기준',
					highlighted: false,
					fullSchedule: '11.06 (목)  15:00-15:15',
					speakers: [
						{
							name: 'T안효정 / 정시은 / 만령연 / 김성욱',
							team: 'T안효정 / 정시은 / 만령연 / 김성욱'
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
					link: 'https://naver.com',
					time: '15:00 - 15:30',
					category: '마케팅',
					title: '현혜조',
					description:
						'글로벌 브랜드 마케팅과 커뮤니케이션 분야에서 활동해온 전문가가 스타트업의 생존과 성장 과정에서 얻은 실질적 경험과 통찰을 바탕으로, 마케팅 전략과 캠페인 기획·운영 노하우를 공유합니다.',
					highlighted: false,
					fullSchedule: '11.07 (금)  15:00-15:30',
					speakers: [
						{
							name: '연결링크 x',
							team: '마케팅 · 현혜조'
						}
					]
				},
				{
					id: '12',
					link: 'https://naver.com',
					time: '16:00 - 16:30',
					category: '마케팅',
					title: '정성진',
					description:
						'영화·광고 등 다양한 영상 콘텐츠의 VFX(시각효과) 감독 및 슈퍼바이저로 활동하며, 수많은 상업영화와 프로젝트의 시각효과 기획, 연출, 제작 총괄을 담당했습니다.',
					highlighted: false,
					fullSchedule: '11.07 (금)  16:00-16:30',
					speakers: [
						{
							name: '연결링크 x',
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
