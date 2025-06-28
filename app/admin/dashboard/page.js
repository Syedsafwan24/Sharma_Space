'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCard from '@/components/admin/StatsCard';
import RecentMessages from '@/components/admin/RecentMessages';
import ProjectCategories from '@/components/admin/ProjectCategories';
import RecentProjects from '@/components/admin/RecentProjects';
import { dynamicStats } from '@/app/data';

export default function AdminDashboardPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
				Loading...
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen bg-[#F8F9FA]'>
			<TopNavbar /> {/* Visible on small screens */}
			<div className='flex flex-1'>
				<Sidebar /> {/* Visible on large screens */}
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8'>
					{' '}
					{/* Adjusted padding */}
					<DashboardHeader />
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
						{dynamicStats.map((stat, index) => (
							<StatsCard
								key={index}
								title={stat.title}
								value={stat.value}
								icon={stat.icon}
								color={stat.color}
							/>
						))}
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<div className='lg:col-span-1'>
							<RecentMessages />
						</div>
						<div className='lg:col-span-1'>
							<ProjectCategories />
						</div>
						<div className='lg:col-span-1'>
							<RecentProjects />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
