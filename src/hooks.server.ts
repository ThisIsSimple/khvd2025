import type { Handle } from '@sveltejs/kit';
import { verifySession } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Get session token from cookie
	const sessionToken = event.cookies.get('session');

	// Verify session and attach user to locals
	const user = verifySession(sessionToken);
	event.locals.user = user;

	// Protect admin routes (except login page)
	if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/login') {
		if (!user) {
			return new Response('Redirect', {
				status: 303,
				headers: { Location: '/admin/login' }
			});
		}
	}

	return resolve(event);
};
