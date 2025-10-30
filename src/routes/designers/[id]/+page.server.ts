import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { id } = params;

	try {
		const response = await fetch(`/api/designers/${id}`);

		if (!response.ok) {
			return {
				designer: null,
				works: [],
				messages: [],
				total: 0,
				error: `Failed to load designer: ${response.statusText}`
			};
		}

		const data = await response.json();

		return {
			designer: data.designer,
			works: data.works,
			messages: data.messages,
			total: data.total
		};
	} catch (error) {
		console.error('Error loading designer:', error);
		return {
			designer: null,
			works: [],
			messages: [],
			total: 0,
			error: 'Failed to load designer'
		};
	}
};
