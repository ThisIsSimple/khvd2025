import type { PageServerLoad } from './$types';
import { isExhibitionAvailable, EXHIBITION_CONFIG } from '$lib/config';

export const load: PageServerLoad = async () => {
	return {
		isAvailable: isExhibitionAvailable(),
		exhibitionStart: EXHIBITION_CONFIG.exhibitionStart.toISOString(),
		exhibitionEnd: EXHIBITION_CONFIG.exhibitionEnd.toISOString()
	};
};
