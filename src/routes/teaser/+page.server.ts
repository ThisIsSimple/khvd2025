import type { PageServerLoad } from './$types';
import { isTeaserAvailable, EXHIBITION_CONFIG } from '$lib/config';

export const load: PageServerLoad = async ({ locals }) => {
	// Admin users bypass teaser availability check
	const isAdmin = !!locals.user;
	const isAvailable = isAdmin || isTeaserAvailable();

	return {
		isAvailable,
		isAdmin,
		teaserStart: EXHIBITION_CONFIG.teaserStart.toISOString(),
		teaserEnd: EXHIBITION_CONFIG.teaserEnd.toISOString(),
		exhibitionStart: EXHIBITION_CONFIG.exhibitionStart.toISOString()
	};
};
