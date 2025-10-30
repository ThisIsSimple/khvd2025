import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { WorkDetailResponse } from '$lib/types/work';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const workId = params.id;

	try {
		const response = await fetch(`/api/works/${workId}`);

		if (!response.ok) {
			if (response.status === 404) {
				throw error(404, 'Work not found');
			}
			throw error(response.status, 'Failed to load work details');
		}

		const data: WorkDetailResponse = await response.json();

		return {
			work: data.work,
			images: data.images,
			designers: data.designers
		};
	} catch (err) {
		console.error('Error loading work page:', err);
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to load work details');
	}
};
