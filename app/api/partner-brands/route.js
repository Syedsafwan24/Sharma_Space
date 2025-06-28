import { PrismaClient } from '../../../lib/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		// For now, return static partner brands since we don't have a PartnerBrands model
		// In the future, you can create a PartnerBrands model in Prisma schema
		const partnerBrands = [
			{ id: '1', name: 'Godrej', category: 'Furniture' },
			{ id: '2', name: 'Hafele', category: 'Hardware' },
			{ id: '3', name: 'Blum', category: 'Hardware' },
			{ id: '4', name: 'Hettich', category: 'Hardware' },
			{ id: '5', name: 'Asian Paints', category: 'Paints' },
			{ id: '6', name: 'Berger Paints', category: 'Paints' },
			{ id: '7', name: 'Dulux', category: 'Paints' },
			{ id: '8', name: 'Nippon', category: 'Paints' },
			{ id: '9', name: 'Kajaria', category: 'Tiles' },
			{ id: '10', name: 'Somany', category: 'Tiles' },
			{ id: '11', name: 'Johnson', category: 'Tiles' },
			{ id: '12', name: 'Orient Bell', category: 'Tiles' },
		];

		return new Response(JSON.stringify(partnerBrands), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
