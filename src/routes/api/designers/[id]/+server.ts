import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { query } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import type { DesignerRecord } from '$lib/types/designer';
import type { WorkRecord } from '$lib/types/work';
import type { MessageRecord } from '$lib/types/message';

interface DesignerDetailResponse {
	designer: {
		id: number;
		name: string;
		nameEn: string;
		profileImage: string;
		introduction: string;
		interview1: string;
		interview2: string;
		email?: string;
		instagramUrl?: string;
		qrImage?: string;
		qrLink?: string;
		contact1Text?: string;
		contact1Url?: string;
		contact2Text?: string;
		contact2Url?: string;
	};
	works: Array<{
		id: number;
		title: string;
		description: string;
		thumbnail: string;
		groupNumber: number;
	}>;
	messages: Array<{
		id: number;
		writer: string;
		message: string;
		createdAt: string;
	}>;
	total: number;
}

/**
 * GET /api/designers/[id]
 * Fetch designer details including works and messages
 */
export const GET: RequestHandler = async ({ params, url }) => {
	const designerId = parseInt(params.id);

	if (isNaN(designerId)) {
		throw error(400, 'Invalid designer ID');
	}

	try {
		// 1. Fetch designer information
		const designerRows = await query<RowDataPacket[]>(
			`SELECT id, name, eng_name, profile_image, introduction, interview1, interview2,
			        email, instagram, qr_image, qr_link,
			        contact1_text, contact1_url, contact2_text, contact2_url
			 FROM designers
			 WHERE id = ?`,
			[designerId]
		);

		if (!designerRows || designerRows.length === 0) {
			throw error(404, 'Designer not found');
		}

		const designerRecord = designerRows[0] as DesignerRecord;

		// Transform Instagram URL
		function transformInstagramUrl(instagram: string): string {
			if (instagram.startsWith('http://') || instagram.startsWith('https://')) {
				return instagram;
			}
			const username = instagram.startsWith('@') ? instagram.slice(1) : instagram;
			return `https://instagram.com/${username}`;
		}

		const designer = {
			id: designerRecord.id,
			name: designerRecord.name,
			nameEn: designerRecord.eng_name,
			profileImage: designerRecord.profile_image,
			introduction: designerRecord.introduction,
			interview1: designerRecord.interview1,
			interview2: designerRecord.interview2,
			email: designerRecord.email || undefined,
			instagramUrl: designerRecord.instagram
				? transformInstagramUrl(designerRecord.instagram)
				: undefined,
			qrImage: designerRecord.qr_image || undefined,
			qrLink: designerRecord.qr_link || undefined,
			contact1Text: designerRecord.contact1_text || undefined,
			contact1Url: designerRecord.contact1_url || undefined,
			contact2Text: designerRecord.contact2_text || undefined,
			contact2Url: designerRecord.contact2_url || undefined
		};

		// 2. Fetch works associated with this designer (limit 2)
		const workRows = await query<RowDataPacket[]>(
			`SELECT w.id, w.title, w.description, w.list_thumbnail, w.group_number
			 FROM works w
			 INNER JOIN work_designers wd ON w.id = wd.work_id
			 WHERE wd.designer_id = ?
			 ORDER BY w.created_at DESC
			 LIMIT 2`,
			[designerId]
		);

		const works = (workRows as WorkRecord[]).map((work) => ({
			id: work.id,
			title: work.title,
			description: work.description,
			thumbnail: work.list_thumbnail || '',
			groupNumber: work.group_number
		}));

		// 3. Fetch messages for this designer (pagination support)
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '8');
		const offset = (page - 1) * limit;

		const messageRows = await query<RowDataPacket[]>(
			`SELECT id, writer, message, created_at
			 FROM messages
			 WHERE type = 'designer' AND target_id = ?
			 ORDER BY created_at DESC
			 LIMIT ? OFFSET ?`,
			[designerId, limit, offset]
		);

		const messages = (messageRows as MessageRecord[]).map((msg) => ({
			id: msg.id,
			writer: msg.writer,
			message: msg.message,
			createdAt: new Date(msg.created_at).toISOString()
		}));

		// Get total count for pagination
		const countRows = await query<RowDataPacket[]>(
			`SELECT COUNT(*) as total
			 FROM messages
			 WHERE type = 'designer' AND target_id = ?`,
			[designerId]
		);

		const total = (countRows[0] as { total: number }).total;

		const response: DesignerDetailResponse = {
			designer,
			works,
			messages,
			total
		};

		return json(response);
	} catch (err) {
		console.error('Error fetching designer details:', err);
		throw error(500, 'Failed to fetch designer details');
	}
};
