import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function RecentProjects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('/api/projects');
				const data = await response.json();
				setProjects(data.slice(0, 5)); // Get only the first 5 projects
			} catch (error) {
				console.error('Error fetching projects:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (loading) {
		return (
			<div className='bg-white p-6 rounded-lg shadow-md h-full'>
				<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>
					Recent Projects
				</h2>
				<p className='text-gray-600 text-sm mb-6'>
					Latest projects added to your portfolio
				</p>
				<div className='space-y-4'>
					{[1, 2, 3].map((i) => (
						<div key={i} className='flex items-center gap-4'>
							<div className='w-16 h-16 bg-gray-200 rounded-md animate-pulse'></div>
							<div className='flex-1'>
								<div className='h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
								<div className='h-3 bg-gray-200 rounded animate-pulse w-2/3'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white p-6 rounded-lg shadow-md h-full'>
			<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>Recent Projects</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Latest projects added to your portfolio
			</p>
			<div className='space-y-4'>
				{projects.map((project, index) => (
					<div key={project.id || index} className='flex items-center gap-4'>
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
							<p className='text-sm text-gray-500'>{project.category}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecentProjects;
