/**
 * Password Verification Endpoint
 * POST /api/messages/[id]/verify
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

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
		const rows = await query<RowDataPacket[]>('SELECT id, password FROM messages WHERE id = ?', [
			id
		]);

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
