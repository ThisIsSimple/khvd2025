/**
 * MySQL Database Connector
 * Connection pool for efficient database access
 */

import mysql, { type Pool, type PoolConnection } from 'mysql2/promise';
import { env } from '$env/dynamic/private';

// Get environment variables with defaults
const DB_HOST = env.DB_HOST || 'localhost';
const DB_PORT = env.DB_PORT || '3306';
const DB_USER = env.DB_USER || 'khvd_user';
const DB_PASSWORD = env.DB_PASSWORD || '';
const DB_NAME = env.DB_NAME || 'khvd_2025';
const DB_CONNECTION_LIMIT = env.DB_CONNECTION_LIMIT || '10';

// Create connection pool
const pool: Pool = mysql.createPool({
	host: DB_HOST,
	port: parseInt(DB_PORT),
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: parseInt(DB_CONNECTION_LIMIT),
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});

/**
 * Get a connection from the pool
 */
export async function getConnection(): Promise<PoolConnection> {
	return await pool.getConnection();
}

/**
 * Execute a query with automatic connection management
 */
export async function query<T>(sql: string, params?: any[]): Promise<T> {
	const connection: PoolConnection = await pool.getConnection();
	try {
		const [results] = await (connection as any).query(sql, params);
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
