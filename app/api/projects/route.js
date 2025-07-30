import { prisma } from '../../../lib/prisma.js';

export async function GET(req) {
	// Skip database operations during build time
	if (process.env.SKIP_DB_DURING_BUILD === 'true') {
		return new Response(JSON.stringify([]), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	try {
		const projects = await prisma.project.findMany({
			orderBy: { completedDate: 'desc' },
		});

		return new Response(JSON.stringify(projects), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Projects API error:', error);
		return new Response(
			JSON.stringify({
				error: 'Failed to fetch projects',
				details: process.env.NODE_ENV === 'development' ? error.stack : error.message,
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
}

export async function POST(req) {
	try {
		const data = await req.json();

		// Generate slug from title if not provided
		if (!data.slug && data.title) {
			data.slug = data.title
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
				.replace(/\s+/g, '-') // Replace spaces with hyphens
				.replace(/-+/g, '-') // Replace multiple hyphens with single
				.trim('-'); // Remove leading/trailing hyphens
		}

		// Convert completedDate to ISO-8601 DateTime if provided
		if (data.completedDate && typeof data.completedDate === 'string') {
			// If it's just a date string (YYYY-MM-DD), convert to DateTime
			if (data.completedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
				data.completedDate = new Date(
					data.completedDate + 'T00:00:00.000Z'
				).toISOString();
			} else {
				// Try to parse as Date and convert to ISO string
				data.completedDate = new Date(data.completedDate).toISOString();
			}
		}

		const project = await prisma.project.create({ data });
		return new Response(JSON.stringify(project), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function PUT(req) {
	try {
		const data = await req.json();
		if (!data.id)
			return new Response(JSON.stringify({ error: 'Project id required' }), {
				status: 400,
			});
		const project = await prisma.project.update({
			where: { id: data.id },
			data,
		});
		return new Response(JSON.stringify(project), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function DELETE(req) {
	try {
		const data = await req.json();
		if (!data.id)
			return new Response(JSON.stringify({ error: 'Project id required' }), {
				status: 400,
			});
		await prisma.project.delete({ where: { id: data.id } });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
