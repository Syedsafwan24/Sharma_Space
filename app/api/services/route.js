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
