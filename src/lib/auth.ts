// Authentication utilities
export const ADMIN_USERNAME = 'khvd2025';
export const ADMIN_PASSWORD = 'khvd2025';

export interface User {
	username: string;
	isAuthenticated: boolean;
}

export function verifyCredentials(username: string, password: string): boolean {
	return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(user: User): string {
	// Simple session token (in production, use proper JWT or session management)
	return btoa(JSON.stringify(user));
}

export function verifySession(token: string | null): User | null {
	if (!token) return null;

	try {
		const user = JSON.parse(atob(token)) as User;
		return user.isAuthenticated ? user : null;
	} catch {
		return null;
	}
}
