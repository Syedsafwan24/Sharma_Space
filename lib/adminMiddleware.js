import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function adminMiddleware(request) {
	const token = await getToken({ req: request });

	if (!token) {
		return NextResponse.json(
			{ error: 'Authentication required' },
			{ status: 401 }
		);
	}

	if (token.role !== 'admin') {
		return NextResponse.json(
			{ error: 'Admin access required' },
			{ status: 403 }
		);
	}

	return null; // Allow the request to continue
}

// Helper function to check if user is admin in API routes
export async function isAdmin(request) {
	const token = await getToken({ req: request });
	return token && token.role === 'admin';
}
