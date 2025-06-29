import { prisma } from '../../../lib/prisma.js';

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const slug = searchParams.get('slug');

		if (slug) {
			const post = await prisma.blogPost.findUnique({
				where: { slug },
			});
			return new Response(JSON.stringify(post), {
				status: 200,
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					Pragma: 'no-cache',
					Expires: '0',
				},
			});
		}

		const posts = await prisma.blogPost.findMany({
			orderBy: { date: 'desc' },
		});
		return new Response(JSON.stringify(posts), {
			status: 200,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
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
		return new Response(JSON.stringify(post), {
			status: 201,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
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
			return new Response(JSON.stringify({ error: 'Blog post id required' }), {
				status: 400,
			});
		}
		const post = await prisma.blogPost.update({
			where: { id: data.id },
			data,
		});
		return new Response(JSON.stringify(post), {
			status: 200,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
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
			return new Response(JSON.stringify({ error: 'Blog post id required' }), {
				status: 400,
			});
		}
		await prisma.blogPost.delete({ where: { id: data.id } });
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}
}
