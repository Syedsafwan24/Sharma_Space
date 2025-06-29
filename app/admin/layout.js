'use client';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';

export default function AdminLayout({ children }) {
	return (
		<div className='flex min-h-screen bg-[#F8F9FA]'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<TopNavbar />
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8 lg:ml-64'>
					{children}
				</div>
			</div>
		</div>
	);
}
