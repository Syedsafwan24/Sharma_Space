import { PrismaClient } from '../../../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { completedDate: 'desc' },
		});
		return new Response(JSON.stringify(projects), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		const data = await req.json();
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
