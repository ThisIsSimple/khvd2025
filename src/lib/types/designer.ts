/**
 * Designer Type Definitions
 * TypeScript interfaces for designer data structures
 */

/**
 * Database Designer Record
 * Matches the MySQL designers table structure
 */
export interface DesignerRecord {
	id: number;
	name: string;
	eng_name: string;
	profile_image: string;
	introduction: string;
	interview1: string;
	interview2: string;
	email: string | null;
	instagram: string | null;
	instagram_qr_image: string | null;
	homepage: string | null;
	qr_image: string | null;
	qr_link: string | null;
	contact1_text: string | null;
	contact1_url: string | null;
	contact2_text: string | null;
	contact2_url: string | null;
	created_at: Date;
}

/**
 * Designer for Display
 * Used in frontend components
 */
export interface Designer {
	id: number;
	name: string;
	nameEn: string;
	imageUrl: string;
	email?: string;
	instagramUrl?: string;
	qrImage?: string;
	qrLink?: string;
	contact1Text?: string;
	contact1Url?: string;
	contact2Text?: string;
	contact2Url?: string;
}

/**
 * Designers Response
 * API response for designer list
 */
export interface DesignersResponse {
	designers: Designer[];
	total: number;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
	error: string;
	message: string;
	details?: any;
}
