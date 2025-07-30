import { prisma } from '../../../lib/prisma.js';

export async function GET() {
	// Skip database operations during build time
	if (process.env.SKIP_DB_DURING_BUILD === 'true' || process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
		return new Response(
			JSON.stringify({
				status: 'skipped',
				message: 'Database test skipped during build time',
				timestamp: new Date().toISOString(),
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	try {
		console.log('🔍 Testing database connection...');

		// Test basic connection
		await prisma.$connect();
		console.log('✅ Database connected successfully');

		// Test a simple query
		const result = await prisma.$queryRaw`SELECT 1 as test`;
		console.log('✅ Database query test successful:', result);

		// Check if tables exist
		const tables = await prisma.$queryRaw`
			SELECT table_name 
			FROM information_schema.tables 
			WHERE table_schema = 'public'
		`;
		console.log('📊 Available tables:', tables);

		return new Response(
			JSON.stringify({
				status: 'success',
				message: 'Database connection successful',
				tables: tables,
				timestamp: new Date().toISOString(),
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		console.error('❌ Database connection error:', error);

		return new Response(
			JSON.stringify({
				status: 'error',
				message: 'Database connection failed',
				error: error.message,
				details:
					process.env.NODE_ENV === 'development' ? error.stack : undefined,
				timestamp: new Date().toISOString(),
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	} finally {
		await prisma.$disconnect();
	}
}
