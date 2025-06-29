const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function testServices() {
	try {
		// Check if services exist
		const services = await prisma.service.findMany();

		if (services.length === 0) {
			// Add sample services
			const sampleServices = [
				{
					title: 'Residential Interior Design',
					description:
						'Complete interior design solutions for homes, apartments, and residential spaces. We transform your living spaces into beautiful, functional environments.',
					icon: 'Home',
				},
				{
					title: 'Commercial Space Design',
					description:
						'Professional interior design for offices, retail spaces, and commercial establishments. Create productive and attractive work environments.',
					icon: 'Building',
				},
				{
					title: 'Modular Kitchen Design',
					description:
						'Custom modular kitchen solutions that maximize space efficiency and create the perfect cooking environment for your home.',
					icon: 'Utensils',
				},
				{
					title: 'Wardrobe Design',
					description:
						'Custom wardrobe and closet design solutions that provide optimal storage and organization for your clothing and accessories.',
					icon: 'Sofa',
				},
				{
					title: 'Space Planning',
					description:
						'Expert space planning and layout optimization to make the most of your available space and improve functionality.',
					icon: 'Ruler',
				},
				{
					title: 'Renovation Services',
					description:
						'Complete renovation and remodeling services to transform your existing spaces into modern, beautiful environments.',
					icon: 'Hammer',
				},
			];

			for (const service of sampleServices) {
				await prisma.service.create({ data: service });
			}
		}
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}

testServices();
