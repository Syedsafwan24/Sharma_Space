import React, { useEffect, useState } from 'react';

const CATEGORY_LIST = ['Residential', 'Commercial', 'Hospitality'];

const ProjectCategories = () => {
	const [categoryStats, setCategoryStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			setError('');
			try {
				const res = await fetch('/api/projects');
				if (!res.ok) throw new Error('Failed to fetch projects');
				const projects = await res.json();
				if (!Array.isArray(projects) || projects.length === 0) {
					setCategoryStats([]);
					setLoading(false);
					return;
				}
				const total = projects.length;
				const counts = CATEGORY_LIST.map((cat) => ({
					name: cat,
					count: projects.filter((p) => p.category === cat).length,
				}));
				const stats = counts.map((c) => ({
					name: c.name,
					percentage: total > 0 ? Math.round((c.count / total) * 100) : 0,
					color: '#E63946',
				}));
				setCategoryStats(stats);
			} catch (err) {
				setError('Could not load project categories.');
				setCategoryStats([]);
			} finally {
				setLoading(false);
			}
		};
		fetchProjects();
	}, []);

	return (
		<div className='bg-white p-6 rounded-lg shadow-md h-full'>
			<h2 className='text-xl font-bold text-[#1C1C1C] mb-4'>
				Project Categories
			</h2>
			<p className='text-gray-600 text-sm mb-6'>
				Distribution of projects by category
			</p>
			{loading ? (
				<div className='text-center text-gray-500'>Loading...</div>
			) : error ? (
				<div className='text-center text-red-500'>{error}</div>
			) : categoryStats.length === 0 ? (
				<div className='text-center text-gray-400'>No data available.</div>
			) : (
				<div className='space-y-4'>
					{categoryStats.map((category, index) => (
						<div key={index}>
							<div className='flex justify-between items-center mb-1'>
								<p className='text-gray-800 font-medium'>{category.name}</p>
								<p className='text-sm text-gray-600'>{category.percentage}%</p>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='h-2 rounded-full'
									style={{
										width: `${category.percentage}%`,
										backgroundColor: category.color,
									}}
								></div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProjectCategories;
