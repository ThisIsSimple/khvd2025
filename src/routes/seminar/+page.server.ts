import type { SeminarDay } from '$lib/types/seminar';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Sample seminar data based on Figma design
	// This can be replaced with database queries in the future
	const seminarData: SeminarDay[] = [
		{
			date: '11.06',
			seminars: [
				{
					id: '1',
					time: '14:00 - 14:30',
					category: 'BRANDING',
					title: '세미나의제목은최대15자입니다',
					highlighted: true,
					fullSchedule: '11.06 (목)  14:00-14:30',
					description:
						'졸업전시를 준비하며 준비했던 창의성, 브랜딩 그 과정에서 얻은 경험에 대해 나누고자 한다.',
					speakers: [
						{
							name: '이도영',
							team: '이도영 팀'
						}
					]
				},
				{
					id: '2',
					time: '14:30 - 15:00',
					category: 'BRANDING',
					title: '창작자로 살아남기',
					highlighted: false,
					fullSchedule: '11.06 (목)  14:30-15:00',
					description:
						'브랜드 아이덴티티 구축과 창작 활동을 지속 가능하게 만드는 전략에 대해 이야기합니다.',
					speakers: [
						{
							name: '김민수',
							team: '김민수 팀'
						}
					]
				},
				{
					id: '3',
					time: '15:00 - 15:30',
					category: 'BRANDING',
					title: '창작자로 살아남기',
					highlighted: false,
					fullSchedule: '11.06 (목)  15:00-15:30',
					description:
						'디지털 시대의 브랜딩 전략과 개인 브랜드를 성장시키는 실질적인 방법을 공유합니다.',
					speakers: [
						{
							name: '박서연',
							team: '박서연 팀'
						}
					]
				}
			]
		},
		{
			date: '11.07',
			seminars: [
				{
					id: '4',
					time: '11:00 - 11:15',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  11:00-11:15',
					description:
						'졸업 작품 기획 과정에서의 창의적 사고와 실행 전략을 공유합니다.',
					speakers: [
						{
							name: '정현우',
							team: '정현우 팀'
						}
					]
				},
				{
					id: '5',
					time: '11:15 - 11:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  11:15-11:30',
					description:
						'프로젝트 기획부터 실행까지의 전 과정을 체계적으로 관리하는 방법론을 다룹니다.',
					speakers: [
						{
							name: '최지은',
							team: '최지은 팀'
						}
					]
				},
				{
					id: '6',
					time: '11:30 - 11:45',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  11:30-11:45',
					description:
						'창작자로서의 정체성과 기획자로서의 역할 사이의 균형을 찾는 이야기를 나눕니다.',
					speakers: [
						{
							name: '강태민',
							team: '강태민 팀'
						}
					]
				},
				{
					id: '7',
					time: '11:45 - 12:00',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  11:45-12:00',
					description:
						'협업 프로젝트에서의 의사소통과 창의적 문제 해결 경험을 공유합니다.',
					speakers: [
						{
							name: '윤서아',
							team: '윤서아 팀'
						}
					]
				},
				{
					id: '8',
					time: '13:00 - 13:15',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  13:00-13:15',
					description:
						'디자인 씽킹과 사용자 중심 기획 방법론을 실전 사례와 함께 소개합니다.',
					speakers: [
						{
							name: '임준혁',
							team: '임준혁 팀'
						}
					]
				},
				{
					id: '9',
					time: '13:15 - 13:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  13:15-13:30',
					description:
						'프로젝트 리서치부터 최종 결과물까지의 여정과 배운 점을 나눕니다.',
					speakers: [
						{
							name: '한소희',
							team: '한소희 팀'
						}
					]
				},
				{
					id: '10',
					time: '13:45 - 14:00',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  13:45-14:00',
					description:
						'시각 디자인과 기획의 융합을 통한 혁신적인 접근 방식을 소개합니다.',
					speakers: [
						{
							name: '오민재',
							team: '오민재 팀'
						}
					]
				},
				{
					id: '11',
					time: '14:00 - 14:15',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  14:00-14:15',
					description:
						'데이터 기반 창작과 감성적 기획의 조화를 이루는 방법을 다룹니다.',
					speakers: [
						{
							name: '송유진',
							team: '송유진 팀'
						}
					]
				},
				{
					id: '12',
					time: '14:15 - 14:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false,
					fullSchedule: '11.07 (금)  14:15-14:30',
					description:
						'졸업 프로젝트를 통해 배운 실무 적용 가능한 기획 및 창작 노하우를 공유합니다.',
					speakers: [
						{
							name: '배준서',
							team: '배준서 팀'
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
