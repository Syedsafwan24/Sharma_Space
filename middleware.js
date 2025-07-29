import { NextResponse } from 'next/server';

export function middleware(request) {
	const response = NextResponse.next();

	// Generate a nonce for inline scripts
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

	// Set CSP header with nonce
	const cspHeader = `
		default-src 'self';
		script-src 'self' 'unsafe-inline' 'nonce-${nonce}' ${
		process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
	};
		style-src 'self' 'unsafe-inline';
		img-src 'self' data: blob: https:;
		font-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
		upgrade-insecure-requests;
	`
		.replace(/\s{2,}/g, ' ')
		.trim();

	response.headers.set('Content-Security-Policy', cspHeader);
	response.headers.set('X-Nonce', nonce);

	return response;
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
