import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Type definitions
export interface Work {
	id: number;
	thumbnail: string;
	title: string;
	description: string;
	content: string;
	professor: string;
	groupNumber: number;
	designers: Designer[];
}

export interface Designer {
	id: number;
	name: string;
	nameEn: string;
	profileImage: string;
}

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const groupNumber = parseInt(params.number);

	// Validate group number (0-3)
	if (isNaN(groupNumber) || groupNumber < 0 || groupNumber > 3) {
		throw error(404, 'Invalid group number. Must be 0, 1, 2, or 3.');
	}

	try {
		// Get professor filter from query parameters
		const professor = url.searchParams.get('professor');

		// Build API URL
		let apiUrl = `/api/works/list?group_number=${groupNumber}`;
		if (professor) {
			apiUrl += `&professor=${encodeURIComponent(professor)}`;
		}

		// Fetch works from API
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw error(response.status, 'Failed to fetch works');
		}

		const data = await response.json();

		return {
			groupNumber,
			works: data.works as Work[],
			totalCount: data.totalCount,
			professorCounts: data.professorCounts,
			selectedProfessor: professor
		};
	} catch (err) {
		console.error('Failed to load works:', err);
		throw error(500, 'Failed to load works from database');
	}
};
