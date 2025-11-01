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
					highlighted: false
				},
				{
					id: '3',
					time: '15:00 - 15:30',
					category: 'BRANDING',
					title: '창작자로 살아남기',
					highlighted: false
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
					highlighted: false
				},
				{
					id: '5',
					time: '11:15 - 11:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '6',
					time: '11:30 - 11:45',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '7',
					time: '11:45 - 12:00',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '8',
					time: '13:00 - 13:15',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '9',
					time: '13:15 - 13:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '10',
					time: '13:45 - 14:00',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '11',
					time: '14:00 - 14:15',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				},
				{
					id: '12',
					time: '14:15 - 14:30',
					category: '졸업스튜디오 1',
					title: '기획자와 창작자',
					highlighted: false
				}
			]
		}
	];

	return {
		seminarDays: seminarData
	};
};
