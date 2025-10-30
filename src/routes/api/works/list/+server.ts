import { query } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { RowDataPacket } from 'mysql2';

export const GET: RequestHandler = async ({ url }) => {
	// Get query parameters
	const groupNumberParam = url.searchParams.get('group_number');
	const professorParam = url.searchParams.get('professor');

	// Validate group_number (required)
	if (!groupNumberParam) {
		throw error(400, 'group_number parameter is required');
	}

	const groupNumber = parseInt(groupNumberParam);
	if (isNaN(groupNumber) || groupNumber < 0 || groupNumber > 3) {
		throw error(400, 'group_number must be 0, 1, 2, or 3');
	}

	try {
		// Build SQL query with optional professor filter
		let worksQuery = `
			SELECT
				w.id,
				w.list_thumbnail AS thumbnail,
				w.title,
				w.description,
				w.content,
				w.professor,
				w.group_number
			FROM works w
			WHERE w.group_number = ?
		`;

		const queryParams: any[] = [groupNumber];

		// Add professor filter if provided
		if (professorParam) {
			worksQuery += ` AND w.professor LIKE ?`;
			queryParams.push(`%${professorParam}%`);
		}

		worksQuery += ` ORDER BY w.id ASC`;

		// Fetch works
		const works = await query<RowDataPacket[]>(worksQuery, queryParams);

		// For each work, fetch designers
		const worksWithDesigners = await Promise.all(
			works.map(async (work) => {
				const designers = await query<RowDataPacket[]>(
					`
					SELECT
						d.id,
						d.name,
						d.eng_name,
						d.profile_image
					FROM designers d
					INNER JOIN work_designers wd ON d.id = wd.designer_id
					WHERE wd.work_id = ?
					ORDER BY wd.id ASC
				`,
					[work.id]
				);

				return {
					id: work.id,
					thumbnail: work.thumbnail || '',
					title: work.title,
					description: work.description,
					content: work.content,
					professor: work.professor,
					groupNumber: work.group_number,
					designers: designers.map((d) => ({
						id: d.id,
						name: d.name,
						nameEn: d.eng_name,
						profileImage: d.profile_image
					}))
				};
			})
		);

		// Calculate professor counts for group 0
		let professorCounts: Record<string, number> = {};

		if (groupNumber === 0) {
			// Fetch all works for group 0 to calculate counts
			const allWorks = await query<RowDataPacket[]>(
				`
				SELECT w.professor
				FROM works w
				WHERE w.group_number = 0
			`,
				[]
			);

			// Count works by professor (assuming format: "김은정, 박상희")
			const professors = ['김은정', '박상희'];
			for (const prof of professors) {
				const count = allWorks.filter((w) => w.professor && w.professor.includes(prof)).length;
				professorCounts[prof] = count;
			}
		}

		return json({
			works: worksWithDesigners,
			totalCount: worksWithDesigners.length,
			professorCounts
		});
	} catch (err) {
		console.error('Database error:', err);
		throw error(500, 'Failed to load works from database');
	}
};
