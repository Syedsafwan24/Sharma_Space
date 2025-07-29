'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import PortfolioFilter from './PortfolioFilter';
import { useImagePreloader } from '@/hooks/useImagePreloader';

const PortfolioStaticGrid = ({ projects = [] }) => {
	const [activeFilter, setActiveFilter] = useState('all');

	// Preload images for better performance
	useImagePreloader(projects, 6);

	// Memoize filtered projects to avoid recalculation
	const filteredProjects = useMemo(() => {
		if (activeFilter === 'all') return projects;
		return projects.filter(
			(project) =>
				project.category?.toLowerCase() === activeFilter.toLowerCase()
		);
	}, [projects, activeFilter]);

	// Get unique categories for filter
	const categories = useMemo(() => {
		const uniqueCategories = [
			...new Set(projects.map((project) => project.category).filter(Boolean)),
		];
		return ['all', ...uniqueCategories];
	}, [projects]);

	if (!projects || projects.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-500'>No projects available at the moment.</p>
			</div>
		);
	}

	return (
		<>
			<PortfolioFilter
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				categories={categories}
			/>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
				{filteredProjects.map((project, index) => (
					<ProjectCard
						key={project.id || project.slug || index}
						project={project}
						priority={index < 6} // First 6 images get priority loading
					/>
				))}
			</div>

			{filteredProjects.length === 0 && activeFilter !== 'all' && (
				<div className='text-center py-12'>
					<p className='text-gray-500'>
						No projects found for category "{activeFilter}".
						<button
							onClick={() => setActiveFilter('all')}
							className='text-red-600 hover:text-red-700 ml-1 underline'
						>
							Show all projects
						</button>
					</p>
				</div>
			)}
		</>
	);
};

export default PortfolioStaticGrid;
