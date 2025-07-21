'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	LayoutDashboard,
	Folder,
	Settings,
	FileText,
	MessageSquare,
} from 'lucide-react';

export default function AdminLayout({ children }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === 'loading') return; // Still loading

		if (!session) {
			router.push('/login');
			return;
		}

		if (session.user.role !== 'admin') {
			router.push('/');
			return;
		}
	}, [session, status, router]);

	// Show loading while checking authentication
	if (status === 'loading') {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
			</div>
		);
	}

	// Don't render admin content if not authenticated or not admin
	if (!session || session.user.role !== 'admin') {
		return null;
	}
	const navItems = [
		{ name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
		{ name: 'Projects', href: '/admin/projects', icon: Folder },
		{ name: 'Services', href: '/admin/services', icon: Settings },
		{ name: 'Blog Posts', href: '/admin/blog-posts', icon: FileText },
		{ name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
	];
	return (
		<div className='flex min-h-screen flex-col bg-[#F8F9FA]'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<TopNavbar />
				<main className='flex-1 p-4 lg:p-8 pt-6 lg:pt-4 pb-20 lg:pb-8 lg:ml-64'>
					{children}
				</main>
				<nav className='fixed bottom-0 left-0 w-full z-50 bg-white border-t md:hidden'>
					<div className='flex justify-around items-center h-16'>
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`flex flex-col items-center justify-center text-xs font-medium h-full w-full ${
									pathname === item.href
										? 'text-[#E63946]'
										: 'text-gray-500 hover:text-[#E63946]'
								}`}
							>
								<item.icon size={20} />
							</Link>
						))}
					</div>
				</nav>
			</div>
		</div>
	);
}
