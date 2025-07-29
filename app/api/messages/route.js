import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const messages = await prisma.message.findMany({
			orderBy: { date: 'desc' },
		});
		return new Response(JSON.stringify(messages), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		const data = await req.json();
		const message = await prisma.message.create({ data });
		return new Response(JSON.stringify(message), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
