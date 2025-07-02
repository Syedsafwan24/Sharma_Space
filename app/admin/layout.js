'use client';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';

export default function AdminLayout({ children }) {
	return (
		<div className='flex min-h-screen flex-col bg-[#F8F9FA]'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<TopNavbar />
				<main className='flex-1 p-4 lg:p-8 pt-6 lg:pt-4 pb-20 lg:pb-8 lg:ml-64'>
					{children}
				</main>
				<nav className='fixed bottom-0 left-0 w-full z-50 bg-white border-t md:hidden'>
					{/* Place your mobile nav icons here */}
				</nav>
			</div>
		</div>
	);
}
