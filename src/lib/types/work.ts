// Work type definitions for KHVD 2025 Exhibition

/**
 * Work record from database
 */
export interface WorkRecord {
	id: number;
	thumbnail: string;
	title: string;
	description: string;
	content: string;
	professor: string;
	group_number: number;
	student_id: string | null;
	is_team_work: boolean;
	qr_image: string | null;
	qr_link: string | null;
	pc_link: string | null;
	mobile_link: string | null;
	notes: string | null;
	created_at: Date;
}

/**
 * Work for display (camelCase)
 */
export interface Work {
	id: number;
	thumbnail: string;
	title: string;
	description: string;
	content: string;
	professor: string;
	groupNumber: number;
	studentId?: string;
	isTeamWork: boolean;
	qrImage?: string;
	qrLink?: string;
	pcLink?: string;
	mobileLink?: string;
	notes?: string;
	createdAt: Date;
}

/**
 * Work summary for thumbnail display
 */
export interface WorkSummary {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	groupNumber: number;
}
