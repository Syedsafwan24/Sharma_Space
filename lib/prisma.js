import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

// Create Prisma client with error handling for missing DATABASE_URL
let prisma;

try {
	// Only create actual Prisma client if database URL is available and not in build mode
	if (process.env.DATABASE_URL) {
		prisma =
			globalForPrisma.prisma ||
			new PrismaClient({
				log: ['error', 'warn'],
				datasources: {
					db: {
						url: process.env.DATABASE_URL,
					},
				},
			});
	} else {
		console.warn('Prisma client: Using fallback mode (no database connection)');
		// Create a mock prisma client for build time when DATABASE_URL might be missing
		prisma = createMockPrismaClient();
	}
} catch (error) {
	console.warn('Prisma client initialization failed:', error.message);
	// Create a mock prisma client for build time when DATABASE_URL might be missing
	prisma = createMockPrismaClient();
}

function createMockPrismaClient() {
	const mockModel = {
		findMany: () => Promise.resolve([]),
		findUnique: () => Promise.resolve(null),
		create: () => Promise.reject(new Error('Database not available')),
		update: () => Promise.reject(new Error('Database not available')),
		delete: () => Promise.reject(new Error('Database not available')),
		findFirst: () => Promise.resolve(null),
		count: () => Promise.resolve(0),
		deleteMany: () => Promise.reject(new Error('Database not available')),
		updateMany: () => Promise.reject(new Error('Database not available')),
	};

	return {
		$connect: () => Promise.reject(new Error('Database not configured')),
		$disconnect: () => Promise.resolve(),
		$queryRaw: () => Promise.resolve([]),
		service: mockModel,
		testimonial: mockModel,
		project: mockModel,
		blogPost: mockModel,
		message: mockModel,
		user: mockModel,
		// Add any other models that might be used
		partnerBrand: mockModel,
		companyStats: mockModel,
	};
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
