import type { PageServerLoad } from './$types';
import { isTeaserAvailable, EXHIBITION_CONFIG } from '$lib/config';

export const load: PageServerLoad = async () => {
	return {
		isAvailable: isTeaserAvailable(),
		teaserStart: EXHIBITION_CONFIG.teaserStart.toISOString(),
		teaserEnd: EXHIBITION_CONFIG.teaserEnd.toISOString(),
		exhibitionStart: EXHIBITION_CONFIG.exhibitionStart.toISOString()
	};
};
