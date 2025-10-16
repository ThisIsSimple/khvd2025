/**
 * Message Board Type Definitions
 * TypeScript interfaces for message data structures
 */

/**
 * Database Message Record
 * Matches the MySQL messages table structure
 */
export interface MessageRecord {
	id: number;
	writer: string;
	password: string;
	message: string;
	type: string | null;
	target_id: number | null;
	created_at: Date;
	updated_at: Date;
}

/**
 * Message for Display (without sensitive data)
 * Used in frontend components
 */
export interface Message {
	id: number;
	writer: string;
	text: string;
	date: string;
	type?: string | null;
	targetId?: number | null;
}

/**
 * Create Message Request
 * Data required to create a new message
 */
export interface CreateMessageRequest {
	writer: string;
	password: string;
	message: string;
	type?: string | null;
	targetId?: number | null;
}

/**
 * Update Message Request
 * Data required to update an existing message
 */
export interface UpdateMessageRequest {
	id: number;
	password: string;
	message: string;
}

/**
 * Delete Message Request
 * Data required to delete a message
 */
export interface DeleteMessageRequest {
	id: number;
	password: string;
}

/**
 * Messages Response (Paginated)
 * API response for message list
 */
export interface MessagesResponse {
	messages: Message[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
	error: string;
	message: string;
	details?: any;
}
