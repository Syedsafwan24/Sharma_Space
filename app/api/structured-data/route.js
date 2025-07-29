import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API route to serve structured data
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');

	if (!type) {
		return NextResponse.json(
			{ error: 'Type parameter is required' },
			{ status: 400 }
		);
	}

	try {
		const filePath = path.join(
			process.cwd(),
			'public',
			'structured-data',
			`${type}.json`
		);
		const jsonData = fs.readFileSync(filePath, 'utf8');
		const data = JSON.parse(jsonData);

		return NextResponse.json(data, {
			headers: {
				'Content-Type': 'application/ld+json',
				'Cache-Control': 'public, max-age=86400',
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Structured data not found' },
			{ status: 404 }
		);
	}
}
