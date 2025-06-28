// prisma/seed.js

import { PrismaClient } from '../lib/generated/prisma/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import portfolioProjects from '../app/data/portfolio/portfolioUnifiedData.js';
import blogUnifiedData from '../app/data/blog/blogUnifiedData.js';
import testimonials from '../app/data/testimonials/testimonialsUnifiedData.js';

// __dirname for ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const servicesData = JSON.parse(
	fs.readFileSync(
		path.join(__dirname, '../app/data/services/services.json'),
		'utf8'
	)
).services;

function toDate(dateStr) {
	if (!dateStr) return null;
	return new Date(dateStr);
}

async function main() {
	console.log('Seeding started...');
	console.log('Projects:', portfolioProjects.length);
	console.log('BlogPosts:', blogUnifiedData.posts.length);
	console.log('Services:', servicesData.length);
	console.log('Testimonials:', testimonials.length);

	for (const project of portfolioProjects) {
		await prisma.project.create({
			data: {
				title: project.title,
				location: project.location || '',
				category: project.category?.name || project.category || '',
				description: project.description,
				shortDescription: project.shortDescription || '',
				client: project.client || '',
				completedDate: toDate(project.completedDate),
				area: project.area || '',
				videoUrl: project.videoUrl || '',
				image: project.image,
				coverImage: project.coverImage || '',
				galleryImages: project.galleryImages || [],
				featured: !!project.featured,
				services: project.services || [],
			},
		});
	}

	for (const post of blogUnifiedData.posts) {
		await prisma.blogPost.create({
			data: {
				slug: post.slug,
				title: post.title,
				date: toDate(post.date),
				tag: Array.isArray(post.tags) ? post.tags[0] : post.tags || '',
				image: typeof post.image === 'object' ? post.image.url : post.image,
				mainImage:
					typeof post.mainImage === 'object'
						? post.mainImage.url
						: post.mainImage,
				excerpt: post.excerpt || '',
				authorName:
					blogUnifiedData.authors.find((a) => a.id === post.authorId)?.name ||
					'',
				authorImage:
					blogUnifiedData.authors.find((a) => a.id === post.authorId)?.image
						?.url || '',
				content: Array.isArray(post.content)
					? JSON.stringify(post.content)
					: post.content || '',
			},
		});
	}

	for (const service of servicesData) {
		await prisma.service.create({
			data: {
				title: service.title,
				description: service.description,
				icon: service.icon,
			},
		});
	}

	for (const testimonial of testimonials) {
		await prisma.testimonial.create({
			data: {
				fullName: testimonial.fullName,
				location: testimonial.location,
				rating: testimonial.rating,
				image: testimonial.image,
				text: testimonial.text,
			},
		});
	}

	const messagesData = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, '../app/data/contact/messages.json'),
			'utf8'
		)
	).messages;

	for (const msg of messagesData) {
		await prisma.message.create({
			data: {
				name: msg.name,
				email: msg.email,
				phone: msg.phone,
				message: msg.message,
				date: new Date(msg.date),
				read: !!msg.read,
			},
		});
	}

	console.log('Seeding complete!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
