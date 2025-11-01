/**
 * Seminar type definitions for KHVD 2025 Exhibition
 */

export interface Speaker {
	name: string;
	team?: string;
}

export interface Seminar {
	id: string;
	time: string;
	category: string;
	title: string;
	description?: string;
	speakers?: Speaker[];
	highlighted?: boolean;
	fullSchedule?: string; // Full schedule string for INFO panel (e.g., "11.06 (목) 14:00-14:30")
}

export interface SeminarDay {
	date: string;
	seminars: Seminar[];
}
