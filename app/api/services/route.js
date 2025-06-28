import { PrismaClient } from '../../../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const services = await prisma.service.findMany({
			orderBy: { title: 'asc' },
		});
		return new Response(JSON.stringify(services), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
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
