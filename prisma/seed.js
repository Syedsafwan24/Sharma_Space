const { PrismaClient } = require('../lib/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
	// --- Service ---
	const servicesPath = path.join(
		__dirname,
		'../app/data/services/services.json'
	);
	const servicesData = JSON.parse(
		fs.readFileSync(servicesPath, 'utf-8')
	).services;
	await prisma.service.deleteMany({});
	await prisma.service.createMany({
		data: servicesData.map(({ id, ...rest }) => rest),
	});

	// --- Testimonial ---
	const testimonialsPath = path.join(
		__dirname,
		'../app/data/testimonials/testimonialsUnifiedData.js'
	);
	const { testimonials } = require(testimonialsPath);
	await prisma.testimonial.deleteMany({});
	await prisma.testimonial.createMany({
		data: testimonials.map(
			({ id, name, fullName, location, rating, image, text }) => ({
				fullName: fullName || name,
				location,
				rating,
				image: image?.url || '',
				text,
			})
		),
	});

	// --- Project ---
	const portfolioPath = path.join(
		__dirname,
		'../app/data/portfolio/portfolioUnifiedData.js'
	);
	const { portfolioProjects } = require(portfolioPath);
	await prisma.project.deleteMany({});
	await prisma.project.createMany({
		data: portfolioProjects.map((p) => ({
			slug: p.slug,
			title: p.title,
			location: p.location || '',
			category: p.category?.name || '',
			description: p.description,
			shortDescription: p.shortDescription || '',
			client: p.client || '',
			completedDate: p.completedDate ? new Date(p.completedDate) : null,
			area: p.area || '',
			videoUrl: p.videoUrl || '',
			image: p.image,
			coverImage: p.coverImage || '',
			galleryImages: p.galleryImages || [],
			featured: !!p.featured,
			services: p.services || [],
		})),
	});

	// --- BlogPost ---
	const blogPath = path.join(__dirname, '../app/data/blog/blogUnifiedData.js');
	const blogUnifiedData = require(blogPath);
	await prisma.blogPost.deleteMany({});
	await prisma.blogPost.createMany({
		data: blogUnifiedData.posts.map((post) => ({
			slug: post.slug,
			title: post.title,
			date: new Date(post.date),
			tag: post.category || '',
			image: post.image?.url || '',
			mainImage: post.mainImage?.url || '',
			excerpt: post.excerpt || '',
			authorName: post.authorId || '',
			authorImage: '',
			content: Array.isArray(post.content)
				? post.content
						.map((block) => {
							if (block.type === 'heading') return `<h2>${block.text}</h2>`;
							if (block.type === 'paragraph') return `<p>${block.text}</p>`;
							return '';
						})
						.join('')
				: post.content,
		})),
	});

	// --- Message ---
	const messagesPath = path.join(
		__dirname,
		'../app/data/contact/messages.json'
	);
	let messagesData = [];
	try {
		const raw = fs.readFileSync(messagesPath, 'utf-8');
		if (raw.trim()) {
			messagesData = JSON.parse(raw).messages || [];
		}
	} catch (e) {
		// file may be empty or not exist
	}
	if (messagesData.length) {
		await prisma.message.deleteMany({});
		await prisma.message.createMany({ data: messagesData });
	}
}

main()
	.catch((e) => {
		console.error('Error during seeding:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
