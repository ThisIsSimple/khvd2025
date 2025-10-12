import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifyCredentials, createSession } from '$lib/auth';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to admin if already logged in
	if (locals.user) {
		throw redirect(303, '/admin');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!verifyCredentials(username, password)) {
			return fail(400, { error: 'Invalid credentials' });
		}

		// Create session
		const user = { username, isAuthenticated: true };
		const sessionToken = createSession(user);

		// Set cookie
		cookies.set('session', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/admin');
	}
} satisfies Actions;
