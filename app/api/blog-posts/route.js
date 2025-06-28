import { PrismaClient } from '../../../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const slug = searchParams.get('slug');

		if (slug) {
			const post = await prisma.blogPost.findUnique({
				where: { slug },
			});
			return new Response(JSON.stringify(post), { status: 200 });
		}

		const posts = await prisma.blogPost.findMany({
			orderBy: { date: 'desc' },
		});
		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	try {
		const data = await req.json();
		const post = await prisma.blogPost.create({ data });
		return new Response(JSON.stringify(post), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
