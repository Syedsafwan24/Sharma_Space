import React from 'react';
import Image from 'next/image';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';

function RecentProjects() {
	return (
		<div className='bg-white p-6 rounded-lg shadow-md h-full'>
			<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>Recent Projects</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Latest projects added to your portfolio
			</p>
			<div className='space-y-4'>
				{portfolioProjects.map((project, index) => (
					<div key={index} className='flex items-center gap-4'>
						<div className='w-16 h-16 flex-shrink-0 rounded-md overflow-hidden shadow-sm'>
							<Image
								src={project.image}
								alt={project.title}
								width={64}
								height={64}
								className='object-cover w-full h-full'
							/>
						</div>
						<div>
							<p className='font-semibold text-gray-800'>{project.title}</p>
							<p className='text-sm text-gray-500'>{project.category.name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecentProjects;
