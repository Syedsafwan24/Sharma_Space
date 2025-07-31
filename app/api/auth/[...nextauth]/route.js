import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Use a fallback Prisma client during build time
let prisma;
try {
	if (
		// ...existing code...
		!process.env.DATABASE_URL
	) {
		// Create a mock Prisma client for build time
		prisma = {
			user: {
				findUnique: () => Promise.resolve(null),
			},
		};
	} else {
		prisma = new PrismaClient();
	}
} catch (error) {
	console.warn('Prisma initialization failed in auth:', error.message);
	prisma = {
		user: {
			findUnique: () => Promise.resolve(null),
		},
	};
}

const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// ...existing code...

				if (!credentials?.email || !credentials?.password) {
					throw new Error('Missing email or password');
				}

				try {
					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (!user) {
						throw new Error('No user found');
					}

					const isValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isValid) {
						throw new Error('Invalid password');
					}

					return {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.role,
					};
				} catch (error) {
					console.error('Auth error:', error.message);
					throw new Error('Authentication failed');
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
	// Add error handling for production
	debug: process.env.NODE_ENV === 'development',
	logger: {
		error(code, metadata) {
			console.error('NextAuth Error:', code, metadata);
		},
		warn(code) {
			console.warn('NextAuth Warning:', code);
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
