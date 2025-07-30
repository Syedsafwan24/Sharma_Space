import { PrismaClient } from '@/lib/generated/prisma';

const globalForPrisma = global;

// Create Prisma client with error handling for missing DATABASE_URL
let prisma;

try {
  // Only create actual Prisma client if database URL is available and not in build mode
  if (process.env.DATABASE_URL && process.env.SKIP_DB_DURING_BUILD !== 'true') {
    prisma = globalForPrisma.prisma || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
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
  return {
    $connect: () => Promise.reject(new Error('Database not configured')),
    $disconnect: () => Promise.resolve(),
    $queryRaw: () => Promise.resolve([]),
    service: { 
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
    testimonial: { 
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
    project: { 
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
    blogPost: { 
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
    message: { 
      findMany: () => Promise.resolve([]),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
    user: { 
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
      create: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
      delete: () => Promise.reject(new Error('Database not available')),
    },
  };
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
