/**
 * MySQL Database Connector
 * Connection pool for efficient database access
 */

import mysql from 'mysql2/promise';
import {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
	DB_CONNECTION_LIMIT
} from '$env/static/private';

// Create connection pool
const pool = mysql.createPool({
	host: DB_HOST,
	port: parseInt(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: parseInt(DB_CONNECTION_LIMIT) || 10,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});

/**
 * Get a connection from the pool
 */
export async function getConnection() {
	return await pool.getConnection();
}

/**
 * Execute a query with automatic connection management
 */
export async function query<T>(sql: string, params?: any[]): Promise<T> {
	const connection = await pool.getConnection();
	try {
		const [results] = await connection.execute(sql, params);
		return results as T;
	} finally {
		connection.release();
	}
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
	try {
		const connection = await pool.getConnection();
		await connection.ping();
		connection.release();
		return true;
	} catch (error) {
		console.error('Database connection test failed:', error);
		return false;
	}
}

/**
 * Close the connection pool (use for graceful shutdown)
 */
export async function closePool(): Promise<void> {
	await pool.end();
}

export default pool;
