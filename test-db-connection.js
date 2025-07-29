// Simple database connection test
const { PrismaClient } = require('./lib/generated/prisma');

async function testConnection() {
	const prisma = new PrismaClient();

	try {
		console.log('Testing database connection...');

		// Test basic connection
		await prisma.$connect();
		console.log('✅ Database connected successfully!');

		// Test if we can query data
		const serviceCount = await prisma.service.count();
		console.log(`📊 Found ${serviceCount} services in database`);

		const testimonialCount = await prisma.testimonial.count();
		console.log(`📊 Found ${testimonialCount} testimonials in database`);

		const projectCount = await prisma.project.count();
		console.log(`📊 Found ${projectCount} projects in database`);

		const messageCount = await prisma.message.count();
		console.log(`📊 Found ${messageCount} messages in database`);

		// Sample some data if exists
		if (serviceCount > 0) {
			const services = await prisma.service.findMany({ take: 3 });
			console.log('🔍 Sample services:');
			services.forEach((service) => {
				console.log(
					`  - ${service.title}: ${service.description.substring(0, 50)}...`
				);
			});
		}
	} catch (error) {
		console.error('❌ Database connection failed:', error.message);
		if (error.code) {
			console.error('Error code:', error.code);
		}
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();
