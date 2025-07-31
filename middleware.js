import { NextResponse } from 'next/server';

export function middleware(request) {
	try {
		const response = NextResponse.next();

		// Skip CSP for build time and development
		// ...existing code...
		// Example: if (process.env.NODE_ENV !== 'production') { return response; }
		// Make sure any opened block is closed before proceeding.
		// return response;
		// }

		// For production, we'll use a more permissive CSP that allows JSON-LD scripts and animations
		const cspHeader = `
			default-src 'self';
			script-src 'self' 'unsafe-inline' ${
				process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
			};
			style-src 'self' 'unsafe-inline' data:;
			img-src 'self' data: blob: https:;
			font-src 'self' data:;
			object-src 'none';
			media-src 'self';
			connect-src 'self' https:;
			base-uri 'self';
			form-action 'self';
			frame-ancestors 'none';
			upgrade-insecure-requests;
		`
			.replace(/\s{2,}/g, ' ')
			.trim();

		response.headers.set('Content-Security-Policy', cspHeader);

		return response;
	} catch (error) {
		console.warn('Middleware error:', error.message);
		// Return a basic response if middleware fails
		return NextResponse.next();
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
