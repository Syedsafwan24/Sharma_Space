'use client';

import Link from 'next/link';

const ProjectDetailsHeader = ({ project }) => {
	return (
		// Added pt-16 (padding-top: 4rem) to push content down below the fixed navigation.
		// Adjust pt- value if your Navigation component has a different height.
		<div className='bg-white pt-16'>
			{/* Breadcrumb */}
			<div className='container mx-auto px-4 py-4'>
				<nav className='flex items-center space-x-2 text-sm text-gray-600'>
					<Link href='/portfolio' className='hover:text-red-600'>
						Portfolio
					</Link>
					<span>/</span>
					<span className='text-red-600'>{project.title}</span>
				</nav>
			</div>

			{/* Page Title */}
			<div className='container mx-auto px-4 pb-8'>
				<h1 className='text-4xl font-bold text-gray-900 mb-4'>
					{project.title}
				</h1>
				<div className='flex items-center space-x-4'>
					<span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium'>
						{project.category}
					</span>
					<span className='text-gray-600'>{project.location}</span>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsHeader;
