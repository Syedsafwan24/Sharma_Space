import { PrismaClient } from '@/lib/generated/prisma';

const globalForPrisma = global;

// Create Prisma client with error handling for missing DATABASE_URL
let prisma;

try {
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
} catch (error) {
  console.warn('Prisma client initialization failed:', error.message);
  // Create a mock prisma client for build time when DATABASE_URL might be missing
  prisma = {
    $connect: () => Promise.reject(new Error('Database not configured')),
    $disconnect: () => Promise.resolve(),
    service: { findMany: () => Promise.resolve([]) },
    testimonial: { findMany: () => Promise.resolve([]) },
    project: { findMany: () => Promise.resolve([]) },
    blogPost: { findMany: () => Promise.resolve([]) },
    message: { findMany: () => Promise.resolve([]) },
  };
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
