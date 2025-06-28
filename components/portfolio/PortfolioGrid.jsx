// app/components/portfolio/PortfolioGrid.jsx
'use client';

import ProjectCard from './ProjectCard';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';

const PortfolioGrid = ({ activeFilter = 'all' }) => {
	// Filter projects (case-insensitive)
	const filteredProjects = portfolioProjects.filter(
		(project) =>
			activeFilter === 'all' ||
			project.category?.name?.toLowerCase() === activeFilter.toLowerCase()
	);

	return (
		<div className='container mx-auto px-4 py-8'>
			{filteredProjects.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<div className='text-center py-12 text-gray-500'>
					No projects found in this category.
				</div>
			)}
		</div>
	);
};

export default PortfolioGrid;
