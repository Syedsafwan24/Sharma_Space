'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCard from '@/components/admin/StatsCard';
import RecentMessages from '@/components/admin/RecentMessages';
import ProjectCategories from '@/components/admin/ProjectCategories';
import RecentProjects from '@/components/admin/RecentProjects';
import { calculateDynamicStats } from '@/app/data/dynamicStats';

export default function AdminDashboardPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [dynamicStats, setDynamicStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (status === 'loading') return; // Still loading

		if (status === 'unauthenticated') {
			router.push('/login');
			return;
		}

		if (session && session.user.role !== 'admin') {
			router.push('/');
			return;
		}
	}, [status, session, router]);

	useEffect(() => {
		const fetchStats = async () => {
			setLoading(true);
			setError('');
			try {
				const stats = await calculateDynamicStats();
				setDynamicStats(stats);
			} catch (err) {
				setError('Failed to load stats. Please check your API and database.');
				setDynamicStats([]);
			} finally {
				setLoading(false);
			}
		};

		if (status === 'authenticated') {
			fetchStats();
		}
	}, [status]);

	if (status === 'loading' || loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
				Loading dashboard stats...
			</div>
		);
	}

	// Don't render if not authenticated or not admin
	if (
		status === 'unauthenticated' ||
		!session ||
		session.user.role !== 'admin'
	) {
		return null;
	}

	return (
		<div>
			<DashboardHeader />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
				{error ? (
					<div className='col-span-full text-center text-red-500'>{error}</div>
				) : dynamicStats.length === 0 ? (
					<div className='col-span-full text-center text-gray-500'>
						No stats available. Please check your API/data.
					</div>
				) : (
					dynamicStats.map((stat, index) => (
						<StatsCard
							key={index}
							title={stat.title}
							value={stat.value}
							icon={stat.icon}
							color={stat.color}
							href={
								stat.title === 'Total Projects'
									? '/admin/projects'
									: stat.title === 'Services Offered'
									? '/admin/services'
									: stat.title === 'Testimonials'
									? '/admin/testimonials'
									: stat.title === 'New Inquiries'
									? '/admin/messages'
									: stat.title === 'Blog Posts'
									? '/admin/blog-posts'
									: '#'
							}
						/>
					))
				)}
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
	);
}
