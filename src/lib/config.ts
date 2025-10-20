// Exhibition configuration
export const EXHIBITION_CONFIG = {
	// Teaser page availability
	teaserStart: new Date('2025-10-20T00:00:00'),
	teaserEnd: new Date('2025-11-05T17:30:00'),

	// Main exhibition dates
	exhibitionStart: new Date('2025-11-05T17:30:00'),
	exhibitionEnd: new Date('2025-11-09T20:00:00')
};

export function isTeaserAvailable(): boolean {
	const now = new Date();
	return now >= EXHIBITION_CONFIG.teaserStart && now < EXHIBITION_CONFIG.teaserEnd;
}

export function isExhibitionAvailable(): boolean {
	const now = new Date();
	return now >= EXHIBITION_CONFIG.exhibitionStart && now <= EXHIBITION_CONFIG.exhibitionEnd;
}

export function isBeforeExhibition(): boolean {
	const now = new Date();
	return now < EXHIBITION_CONFIG.exhibitionStart;
}
