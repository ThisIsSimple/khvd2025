/**
 * Individual Message API Endpoints
 * Handle operations on specific messages by ID
 */

import { json, type RequestHandler, error } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * POST /api/messages/[id]/verify
 * Verify password for a message
 */
export const POST: RequestHandler = async ({ params, request }) => {
	try {
		const { id } = params;
		const { password } = await request.json();

		if (!password) {
			return json({ error: 'Password is required' }, { status: 400 });
		}

		// Check if message exists and verify password
		const rows = await query<RowDataPacket[]>(
			'SELECT id, password FROM messages WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return json({ error: 'Message not found' }, { status: 404 });
		}

		const message = rows[0];

		// Simple password comparison (in production, use bcrypt)
		if (message.password !== password) {
			return json({ error: '잘못된 비밀번호입니다. 다시 입력해주세요.' }, { status: 401 });
		}

		return json({ success: true });
	} catch (err) {
		console.error('Password verification error:', err);
		return json({ error: 'Server error occurred' }, { status: 500 });
	}
};

/**
 * PATCH /api/messages/[id]
 * Update an existing message
 * Body: { password, message }
 */
export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const { id } = params;
		const data = await request.json();

		// Validation
		if (!data.password) {
			return json({ error: 'Password is required' }, { status: 400 });
		}

		if (!data.message || data.message.trim().length === 0) {
			return json({ error: 'Message content is required' }, { status: 400 });
		}

		if (data.message.length > 120) {
			return json({ error: 'Message cannot exceed 120 characters' }, { status: 400 });
		}

		// Check if message exists and verify password
		const rows = await query<RowDataPacket[]>(
			'SELECT id, password FROM messages WHERE id = ?',
			[id]
		);

		if (rows.length === 0) {
			return json({ error: 'Message not found' }, { status: 404 });
		}

		const message = rows[0];

		// Verify password (in production, use bcrypt)
		if (message.password !== data.password) {
			return json({ error: 'Incorrect password' }, { status: 401 });
		}

		// Update message
		await query<ResultSetHeader>(
			'UPDATE messages SET message = ?, updated_at = NOW() WHERE id = ?',
			[data.message.trim(), id]
		);

		// Fetch updated message
		const updatedRows = await query<RowDataPacket[]>(
			`SELECT id, writer, message, type, target_id, created_at
       FROM messages
       WHERE id = ?`,
			[id]
		);

		const row = updatedRows[0];
		const updatedMessage = {
			id: row.id,
			writer: row.writer,
			text: row.message,
			date: formatDate(new Date(row.created_at)),
			type: row.type,
			targetId: row.target_id
		};

		return json(updatedMessage);
	} catch (err) {
		console.error('Update message error:', err);
		return json({ error: 'Failed to update message' }, { status: 500 });
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
