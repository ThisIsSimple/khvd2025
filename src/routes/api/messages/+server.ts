/**
 * Messages API Endpoints
 * REST API for guestbook message operations
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type {
	MessageRecord,
	Message,
	MessagesResponse,
	CreateMessageRequest
} from '$lib/types/message';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * GET /api/messages
 * Retrieve paginated messages
 * Query params: page (default: 0), pageSize (default: 10)
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = parseInt(url.searchParams.get('page') || '0');
		const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
		const offset = page * pageSize;

		// Get total count
		const countResult = await query<RowDataPacket[]>('SELECT COUNT(*) as total FROM messages');
		const total = countResult[0].total;

		// Get paginated messages
		const rows = await query<RowDataPacket[]>(
			`SELECT id, writer, message, type, target_id, created_at
       FROM messages
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
			[pageSize, offset]
		);

		// Transform to Message format
		const messages: Message[] = rows.map((row) => ({
			id: row.id,
			writer: row.writer,
			text: row.message,
			date: formatDate(new Date(row.created_at)),
			type: row.type,
			targetId: row.target_id
		}));

		const response: MessagesResponse = {
			messages,
			total,
			page,
			pageSize,
			totalPages: Math.ceil(total / pageSize)
		};

		return json(response);
	} catch (error) {
		console.error('Failed to fetch messages:', error);
		return json(
			{ error: 'Failed to fetch messages', message: 'Database error occurred' },
			{ status: 500 }
		);
	}
};

/**
 * POST /api/messages
 * Create a new message
 * Body: { writer, password, message, type?, targetId? }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data: CreateMessageRequest = await request.json();

		// Validation
		if (!data.writer || data.writer.trim().length === 0) {
			return json({ error: 'Writer name is required' }, { status: 400 });
		}

		if (!data.password || data.password.length < 4 || data.password.length > 10) {
			return json({ error: 'Password must be between 4 and 10 characters' }, { status: 400 });
		}

		if (!data.message || data.message.trim().length === 0) {
			return json({ error: 'Message content is required' }, { status: 400 });
		}

		if (data.message.length > 200) {
			return json({ error: 'Message cannot exceed 200 characters' }, { status: 400 });
		}

		if (data.writer.length > 50) {
			return json({ error: 'Writer name cannot exceed 50 characters' }, { status: 400 });
		}

		// Insert message
		const result = await query<ResultSetHeader>(
			`INSERT INTO messages (writer, password, message, type, target_id)
       VALUES (?, ?, ?, ?, ?)`,
			[
				data.writer.trim(),
				data.password,
				data.message.trim(),
				data.type || null,
				data.targetId || null
			]
		);

		// Fetch the created message
		const rows = await query<RowDataPacket[]>(
			`SELECT id, writer, message, type, target_id, created_at
       FROM messages
       WHERE id = ?`,
			[result.insertId]
		);

		const row = rows[0];
		const message: Message = {
			id: row.id,
			writer: row.writer,
			text: row.message,
			date: formatDate(new Date(row.created_at)),
			type: row.type,
			targetId: row.target_id
		};

		return json(message, { status: 201 });
	} catch (error) {
		console.error('Failed to create message:', error);
		return json(
			{ error: 'Failed to create message', message: 'Database error occurred' },
			{ status: 500 }
		);
	}
};

/**
 * Format date to Korean format (YYYY.MM.DD)
 */
function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
}
