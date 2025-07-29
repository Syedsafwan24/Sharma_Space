import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		// For now, return static company stats since we don't have a CompanyStats model
		// In the future, you can create a CompanyStats model in Prisma schema
		const companyStats = {
			stats: [
				{
					id: 'projects-completed',
					value: '150+',
					displayValue: '150+',
					label: 'Projects Completed',
				},
				{
					id: 'years-experience',
					value: '10+',
					displayValue: '10+',
					label: 'Years Experience',
				},
				{
					id: 'happy-clients',
					value: '500+',
					displayValue: '500+',
					label: 'Happy Clients',
				},
				{
					id: 'year-established',
					value: '2013',
					displayValue: '2013',
					label: 'Year Established',
				},
			],
			companyInfo: {
				name: 'Sharma Space',
				founded: '2013',
				mission:
					"At Sharma Space, we believe in creating interiors that are not just beautiful but also functional. With over 10 years of experience, we've transformed 150+ spaces into dream homes and offices.",
				description:
					'Our design philosophy centers around understanding your unique needs and preferences, then translating them into spaces that reflect your personality while enhancing your everyday life.',
			},
		};

		return new Response(JSON.stringify(companyStats), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
