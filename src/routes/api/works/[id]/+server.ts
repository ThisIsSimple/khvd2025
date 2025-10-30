import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { query } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import type { WorkRecord, WorkImageRecord, WorkDetailResponse } from '$lib/types/work';
import type { DesignerRecord } from '$lib/types/designer';

/**
 * GET /api/works/[id]
 * Fetch work details including images and participating designers
 */
export const GET: RequestHandler = async ({ params }) => {
	const workId = parseInt(params.id);

	if (isNaN(workId)) {
		throw error(400, 'Invalid work ID');
	}

	try {
		// 1. Fetch work information
		const workRows = await query<RowDataPacket[]>(
			`SELECT id, thumbnail, title, description, content, professor, group_number,
			        student_id, is_team_work, qr_image, qr_link, pc_link, mobile_link, notes
			 FROM works
			 WHERE id = ?`,
			[workId]
		);

		if (!workRows || workRows.length === 0) {
			throw error(404, 'Work not found');
		}

		const workRecord = workRows[0] as WorkRecord;

		const work = {
			id: workRecord.id,
			thumbnail: workRecord.thumbnail,
			title: workRecord.title,
			description: workRecord.description,
			content: workRecord.content,
			professor: workRecord.professor,
			groupNumber: workRecord.group_number,
			studentId: workRecord.student_id || undefined,
			isTeamWork: workRecord.is_team_work,
			qrImage: workRecord.qr_image || undefined,
			qrLink: workRecord.qr_link || undefined,
			pcLink: workRecord.pc_link || undefined,
			mobileLink: workRecord.mobile_link || undefined,
			notes: workRecord.notes || undefined
		};

		// 2. Fetch work images (ordered by order field)
		const imageRows = await query<RowDataPacket[]>(
			`SELECT id, work_id, image, link, platform, \`order\`
			 FROM work_images
			 WHERE work_id = ?
			 ORDER BY \`order\` ASC`,
			[workId]
		);

		const images = (imageRows as WorkImageRecord[]).map((img) => ({
			id: img.id,
			workId: img.work_id,
			image: img.image,
			link: img.link || undefined,
			platform: img.platform,
			order: img.order
		}));

		// 3. Fetch participating designers
		const designerRows = await query<RowDataPacket[]>(
			`SELECT d.id, d.name, d.eng_name, d.profile_image, d.email, d.instagram
			 FROM designers d
			 INNER JOIN work_designers wd ON d.id = wd.designer_id
			 WHERE wd.work_id = ?
			 ORDER BY d.name ASC`,
			[workId]
		);

		// Transform Instagram URL helper
		function transformInstagramUrl(instagram: string): string {
			if (instagram.startsWith('http://') || instagram.startsWith('https://')) {
				return instagram;
			}
			const username = instagram.startsWith('@') ? instagram.slice(1) : instagram;
			return `https://instagram.com/${username}`;
		}

		const designers = (designerRows as DesignerRecord[]).map((designer) => ({
			id: designer.id,
			name: designer.name,
			nameEn: designer.eng_name,
			profileImage: designer.profile_image,
			email: designer.email || undefined,
			instagramUrl: designer.instagram
				? transformInstagramUrl(designer.instagram)
				: undefined
		}));

		const response: WorkDetailResponse = {
			work,
			images,
			designers
		};

		return json(response);
	} catch (err) {
		console.error('Error fetching work details:', err);
		throw error(500, 'Failed to fetch work details');
	}
};
