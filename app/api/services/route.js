import { prisma } from '../../../lib/prisma.js';
import { fallbackServices } from '../../../lib/fallbackData.js';

export async function GET(req) {
	// Skip database operations during build time
	if (process.env.SKIP_DB_DURING_BUILD === 'true') {
		console.log('Skipping services fetch during build time');
		return new Response(JSON.stringify(fallbackServices || []), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	try {
		// Check if prisma is available
		if (!prisma || !prisma.service) {
			console.warn('Prisma service model not available, using fallback data');
			return new Response(JSON.stringify(fallbackServices || []), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const services = await prisma.service.findMany({
			orderBy: { title: 'asc' },
		});
		return new Response(JSON.stringify(services), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Services API error:', error);
		// Return fallback data instead of 500 error during build/fallback mode
		if (
			error.message.includes('Database not available') ||
			error.message.includes('Database not configured')
		) {
			console.log(
				'Using fallback services data due to database unavailability'
			);
			return new Response(JSON.stringify(fallbackServices || []), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
		return new Response(
			JSON.stringify({
				error: 'Failed to fetch services',
				details: error.message,
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
		const service = await prisma.service.create({ data });
		return new Response(JSON.stringify(service), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function PUT(req) {
	try {
		const data = await req.json();
		if (!data.id) {
			return new Response(JSON.stringify({ error: 'Service id required' }), {
				status: 400,
			});
		}
		const service = await prisma.service.update({
			where: { id: data.id },
			data,
		});
		return new Response(JSON.stringify(service), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}

export async function DELETE(req) {
	try {
		const data = await req.json();
		if (!data.id) {
			return new Response(JSON.stringify({ error: 'Service id required' }), {
				status: 400,
			});
		}
		await prisma.service.delete({ where: { id: data.id } });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
