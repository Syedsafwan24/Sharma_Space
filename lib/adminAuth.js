import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	if (session.user.role !== 'admin') {
		redirect('/'); // Redirect non-admin users to home
	}

	return session;
}

export async function getAdminSession() {
	const session = await getServerSession(authOptions);

	if (!session || session.user.role !== 'admin') {
		return null;
	}

	return session;
}
