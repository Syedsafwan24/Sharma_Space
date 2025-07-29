import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		// Validate file type
		const allowedTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/webp',
			'image/gif',
		];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{
					error:
						'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
				},
				{ status: 400 }
			);
		}

		// Validate file size (5MB limit)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: 'File size too large. Maximum size is 5MB.' },
				{ status: 400 }
			);
		}

		// Generate unique filename
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 15);
		const fileExtension = path.extname(file.name);
		const fileName = `${timestamp}_${randomString}${fileExtension}`;

		// Create uploads directory if it doesn't exist
		const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
		await mkdir(uploadsDir, { recursive: true });

		// Save file
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const filePath = path.join(uploadsDir, fileName);
		await writeFile(filePath, buffer);

		// Return the file path relative to public directory
		const relativePath = `/uploads/${fileName}`;

		return NextResponse.json(
			{
				success: true,
				filePath: relativePath,
				fileName: fileName,
			},
			{
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0',
				},
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 }
		);
	}
}
