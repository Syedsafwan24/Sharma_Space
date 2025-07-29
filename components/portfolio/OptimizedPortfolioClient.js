// components/portfolio/OptimizedPortfolioClient.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import Footer from '@/components/Footer';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import PortfolioGrid from './PortfolioGrid';
import Cta from '@/components/Cta';

export default function OptimizedPortfolioClient() {
	const [activeFilter, setActiveFilter] = useState('all');
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Memoize filtered projects to avoid recalculation
	const filteredProjects = useMemo(() => {
		if (activeFilter === 'all') return projects;
		return projects.filter(
			(project) =>
				project.category?.toLowerCase() === activeFilter.toLowerCase()
		);
	}, [projects, activeFilter]);

	// Preload critical images
	useEffect(() => {
		const preloadImages = (imageUrls) => {
			imageUrls.forEach((url) => {
				if (url && typeof url === 'string') {
					const link = document.createElement('link');
					link.rel = 'preload';
					link.as = 'image';
					link.href = url;
					document.head.appendChild(link);
				}
			});
		};

		if (projects.length > 0) {
			// Preload first 6 images (visible above fold)
			const criticalImages = projects
				.slice(0, 6)
				.map((p) => p.image?.url || p.image)
				.filter(Boolean);

			preloadImages(criticalImages);
		}
	}, [projects]);

	// Fetch projects with better error handling
	useEffect(() => {
		let isMounted = true;

		const fetchProjects = async () => {
			if (!isMounted) return;

			setLoading(true);
			setError(null);

			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

				const res = await fetch('/api/projects', {
					signal: controller.signal,
					cache: 'force-cache', // Use cache when possible
				});

				clearTimeout(timeoutId);

				if (!res.ok) {
					throw new Error(`HTTP ${res.status}: Failed to fetch projects`);
				}

				const projectsData = await res.json();

				if (isMounted) {
					setProjects(Array.isArray(projectsData) ? projectsData : []);
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					console.warn('Fetch request timed out');
					setError('Request timed out. Please check your connection.');
				} else {
					console.error('Error fetching projects:', error);
					setError('Failed to load projects. Please try again later.');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchProjects();

		return () => {
			isMounted = false;
		};
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
										className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100'
									>
										<div className='w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse'></div>
										<div className='p-6'>
											<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-2'></div>
											<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse mb-4 w-2/3'></div>
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
						<PortfolioGrid
							projects={filteredProjects}
							activeFilter={activeFilter}
						/>
					)}
				</div>
			</main>
			<Cta />
			<Footer />
		</div>
	);
}
