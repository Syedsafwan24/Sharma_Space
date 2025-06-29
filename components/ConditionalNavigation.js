'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function ConditionalNavigation() {
	const pathname = usePathname();

	// Hide navigation on admin, login, and register pages
	const hideNavigation =
		pathname.startsWith('/admin') ||
		pathname === '/login' ||
		pathname === '/register';

	if (hideNavigation) {
		return null;
	}

	return <Navigation />;
}
