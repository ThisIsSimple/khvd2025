// Exhibition configuration
export const EXHIBITION_CONFIG = {
	// Teaser page availability
	teaserStart: new Date('2025-01-01T00:00:00'),
	teaserEnd: new Date('2025-02-01T00:00:00'),

	// Main exhibition dates
	exhibitionStart: new Date('2025-11-05T10:00:00'),
	exhibitionEnd: new Date('2025-12-31T23:59:59')
};

export function isTeaserAvailable(): boolean {
	const now = new Date();
	return now >= EXHIBITION_CONFIG.teaserStart && now < EXHIBITION_CONFIG.teaserEnd;
}

export function isExhibitionAvailable(): boolean {
	const now = new Date();
	return now >= EXHIBITION_CONFIG.exhibitionStart && now <= EXHIBITION_CONFIG.exhibitionEnd;
}
