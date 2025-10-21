import { query } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Type definitions
export interface Work {
	id: number;
	thumbnail: string;
	title: string;
	description: string;
	content: string;
	professor: string;
	group_number: number;
	designers: Designer[];
	images: WorkImage[];
}

export interface Designer {
	id: number;
	name: string;
	eng_name: string;
	profile_image: string;
}

export interface WorkImage {
	id: number;
	image: string;
	link: string | null;
	platform: 'pc' | 'mobile';
	order: number;
}

export const load: PageServerLoad = async ({ params }) => {
	const groupNumber = parseInt(params.number);

	// Validate group number (0-3)
	if (isNaN(groupNumber) || groupNumber < 0 || groupNumber > 3) {
		throw error(404, 'Invalid group number. Must be 0, 1, 2, or 3.');
	}

	try {
		// Fetch all works for the given group number
		const works = await query<any[]>(
			`
			SELECT
				w.id,
				w.thumbnail,
				w.title,
				w.description,
				w.content,
				w.professor,
				w.group_number
			FROM works w
			WHERE w.group_number = ?
			ORDER BY w.id ASC
		`,
			[groupNumber]
		);

		// For each work, fetch designers and images
		const worksWithDetails = await Promise.all(
			works.map(async (work) => {
				// Fetch designers for this work
				const designers = await query<any[]>(
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

				// Fetch images for this work
				const images = await query<any[]>(
					`
					SELECT
						id,
						image,
						link,
						platform,
						\`order\`
					FROM work_images
					WHERE work_id = ?
					ORDER BY \`order\` ASC, id ASC
				`,
					[work.id]
				);

				return {
					...work,
					designers,
					images
				};
			})
		);

		return {
			groupNumber,
			works: worksWithDetails as Work[]
		};
	} catch (err) {
		console.error('Database error:', err);
		throw error(500, 'Failed to load works from database');
	}
};
