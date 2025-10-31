import type { Handle } from '@sveltejs/kit';
import { verifySession } from '$lib/auth';
import { isBeforeExhibition } from '$lib/config';

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

	// Redirect to teaser page if before exhibition period (unless admin or accessing allowed paths)
	// if (isBeforeExhibition()) {
	// 	const allowedPaths = ['/teaser', '/admin/login', '/admin/logout', '/api'];
	// 	const isAllowedPath = allowedPaths.some((path) => event.url.pathname.startsWith(path));

	// 	// Redirect to teaser if not admin and not accessing allowed paths
	// 	if (!user && !isAllowedPath) {
	// 		return new Response('Redirect', {
	// 			status: 303,
	// 			headers: { Location: '/teaser' }
	// 		});
	// 	}
	// }

	return resolve(event);
};
