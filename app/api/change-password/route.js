import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{ message: 'Authentication required.' },
				{ status: 401 }
			);
		}

		const { currentPassword, newPassword } = await request.json();

		if (!currentPassword || !newPassword) {
			return NextResponse.json(
				{
					message: 'Current password and new password are required.',
				},
				{ status: 400 }
			);
		}

		if (newPassword.length < 6) {
			return NextResponse.json(
				{
					message: 'New password must be at least 6 characters long.',
				},
				{ status: 400 }
			);
		}

		// Get the current user from database
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
		});

		if (!user) {
			return NextResponse.json({ message: 'User not found.' }, { status: 404 });
		}

		// Verify current password
		const isCurrentPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!isCurrentPasswordValid) {
			return NextResponse.json(
				{
					message: 'Current password is incorrect.',
				},
				{ status: 400 }
			);
		}

		// Hash new password
		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		// Update password in database
		await prisma.user.update({
			where: { id: session.user.id },
			data: { password: hashedNewPassword },
		});

		return NextResponse.json(
			{
				message: 'Password updated successfully.',
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Something went wrong.',
			},
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
