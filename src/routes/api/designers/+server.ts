/**
 * Designers API Endpoints
 * REST API for designer operations
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type { Designer, DesignersResponse } from '$lib/types/designer';
import type { RowDataPacket } from 'mysql2';

/**
 * GET /api/designers
 * Retrieve all designers
 */
export const GET: RequestHandler = async () => {
	try {
		// Get all designers ordered by name with new fields
		const rows = await query<RowDataPacket[]>(
			`SELECT id, name, eng_name, profile_image, email, instagram,
              qr_image, qr_link,
              contact1_text, contact1_url,
              contact2_text, contact2_url
       FROM designers
       ORDER BY name ASC`
		);

		// Transform to Designer format
		const designers: Designer[] = rows.map((row) => ({
			id: row.id,
			name: row.name,
			nameEn: row.eng_name,
			imageUrl: row.profile_image,
			email: row.email || undefined,
			instagramUrl: row.instagram ? transformInstagramUrl(row.instagram) : undefined,
			qrImage: row.qr_image || undefined,
			qrLink: row.qr_link || undefined,
			contact1Text: row.contact1_text || undefined,
			contact1Url: row.contact1_url || undefined,
			contact2Text: row.contact2_text || undefined,
			contact2Url: row.contact2_url || undefined
		}));

		const response: DesignersResponse = {
			designers,
			total: designers.length
		};

		return json(response);
	} catch (error) {
		console.error('Failed to fetch designers:', error);
		return json(
			{ error: 'Failed to fetch designers', message: 'Database error occurred' },
			{ status: 500 }
		);
	}
};

/**
 * Transform Instagram handle to full URL
 * @param instagram - Instagram handle (@username, username, or full URL)
 * @returns Full Instagram URL
 */
function transformInstagramUrl(instagram: string): string {
	// Already a full URL
	if (instagram.startsWith('http://') || instagram.startsWith('https://')) {
		return instagram;
	}

	// Remove @ prefix if present
	const username = instagram.startsWith('@') ? instagram.slice(1) : instagram;

	// Return full Instagram URL
	return `https://instagram.com/${username}`;
}
