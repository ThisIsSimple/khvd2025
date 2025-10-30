import type { PageServerLoad } from './$types';
import type { DesignersResponse } from '$lib/types/designer';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/designers');

		if (!response.ok) {
			throw new Error(`Failed to fetch designers: ${response.statusText}`);
		}

		const data: DesignersResponse = await response.json();

		return {
			designers: data.designers,
			total: data.total
		};
	} catch (error) {
		console.error('Error loading designers:', error);

		// Return empty array with error
		return {
			designers: [],
			total: 0,
			error: 'Failed to load designers'
		};
	}
};
