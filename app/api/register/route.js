import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const { email, name, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ message: 'Email and password are required.' },
				{ status: 400 }
			);
		}

		// Check if any users exist in the database
		const userCount = await prisma.user.count();

		// If this is the first user, make them admin; otherwise, block registration
		if (userCount > 0) {
			return NextResponse.json(
				{
					message:
						'Registration is currently disabled. Please contact the administrator.',
				},
				{ status: 403 }
			);
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email already exists.' },
				{ status: 409 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				role: userCount === 0 ? 'admin' : 'user', // First user becomes admin
			},
		});

		return NextResponse.json(
			{
				message: 'User registered successfully.',
				user: {
					id: newUser.id,
					email: newUser.email,
					name: newUser.name,
					role: newUser.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong.' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
