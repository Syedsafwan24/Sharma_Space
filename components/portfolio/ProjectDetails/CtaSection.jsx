'use client';

import Image from 'next/image';
import Link from 'next/link';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';

const CtaSection = ({ currentProjectSlug, currentProjectCategory }) => {
	// Filter for similar projects based on category, excluding the current project
	const similarProjects = portfolioProjects
		.filter(
			(project) =>
				project.category.name === currentProjectCategory &&
				project.slug !== currentProjectSlug
		)
		.slice(0, 2); // Limit to 2 similar projects as per design

	return (
		<section className='mb-16'>
			<h2 className='text-3xl font-bold text-gray-900 mb-8'>
				Similar Projects
			</h2>

			{similarProjects.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
					{similarProjects.map((project) => (
						<Link
							key={project.id}
							href={`/portfolio/${project.slug}`}
							className='group block'
						>
							<div className='relative aspect-[4/3] rounded-lg overflow-hidden mb-4'>
								<Image
									src={project.image?.url || project.image}
									alt={project.title}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
								<div className='absolute bottom-4 left-4 text-white'>
									<h3 className='text-xl font-bold mb-1'>{project.title}</h3>
									<div className='flex items-center space-x-4 text-sm'>
										<span className='bg-red-600 px-2 py-1 rounded text-xs'>
											{project.category.name}
										</span>
										<span>{project.location}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<p className='text-gray-600 mb-12'>No similar projects found.</p>
			)}

			<div className='text-center'>
				<Link
					href='/portfolio'
					className='inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'
				>
					View All Projects
					<svg className='w-5 h-5 ml-2' fill='currentColor' viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</Link>
			</div>
		</section>
	);
};

export default CtaSection;
