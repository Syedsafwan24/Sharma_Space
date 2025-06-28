import { PrismaClient } from '../../../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const testimonials = await prisma.testimonial.findMany({
			orderBy: { fullName: 'asc' },
		});
		return new Response(JSON.stringify(testimonials), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		const data = await req.json();
		const testimonial = await prisma.testimonial.create({ data });
		return new Response(JSON.stringify(testimonial), { status: 201 });
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
			return new Response(
				JSON.stringify({ error: 'Testimonial id required' }),
				{ status: 400 }
			);
		}
		const testimonial = await prisma.testimonial.update({
			where: { id: data.id },
			data,
		});
		return new Response(JSON.stringify(testimonial), { status: 200 });
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
			return new Response(
				JSON.stringify({ error: 'Testimonial id required' }),
				{ status: 400 }
			);
		}
		await prisma.testimonial.delete({ where: { id: data.id } });
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
