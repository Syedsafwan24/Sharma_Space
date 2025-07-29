// app/portfolio/PortfolioClient.js
'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import PortfolioGrid from '../../components/portfolio/PortfolioGrid';
import Cta from '@/components/Cta';

export default function PortfolioClient() {
	const [activeFilter, setActiveFilter] = useState('all');
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch projects on component mount
	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects`,
					{ next: { revalidate: 60 } }
				);
				if (!res.ok) {
					throw new Error('Failed to fetch projects');
				}
				const projectsData = await res.json();
				setProjects(projectsData);
			} catch (error) {
				setError('Failed to load projects. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-grow'>
				<HeroPortfolio />

				<div className='container mx-auto px-4 py-12'>
					<PortfolioFilter
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>

					{loading ? (
						<div className='container mx-auto px-4 py-8'>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div
										key={i}
										className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow'
									>
										<div className='w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse'></div>
										<div className='p-6'>
											<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-2'></div>
											<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse mb-4 w-2/3'></div>
											<div className='h-4 bg-gradient-to-r from-red-100 to-red-200 rounded animate-pulse w-1/2'></div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : error ? (
						<div className='text-center py-12'>
							<p className='text-red-500 mb-4'>{error}</p>
							<button
								onClick={() => window.location.reload()}
								className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition'
							>
								Try Again
							</button>
						</div>
					) : (
						<PortfolioGrid projects={projects} activeFilter={activeFilter} />
					)}
				</div>
			</main>
			<Cta
				title="Let's Work Together"
				description='have a project in mind? Our team of expert designers is ready to bring your vision to life.'
				buttonText='Start a Project'
				backgroundColor='bg-gray-100'
				textColor='text-gray-700'
				buttonBgColor='bg-[#E63946]'
				buttonTextColor='text-white'
			/>
			<Footer />
		</div>
	);
}
