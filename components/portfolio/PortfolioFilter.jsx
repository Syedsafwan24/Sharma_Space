// app/components/portfolio/PortfolioFilter.jsx
'use client';

import { useState, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const PortfolioFilter = ({ activeFilter, setActiveFilter }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const filters = [
		{ id: 'all', name: 'All' },
		{ id: 'residential', name: 'Residential' },
		{ id: 'commercial', name: 'Commercial' },
		{ id: 'hospitality', name: 'Hospitality' },
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (isMobile) {
		return (
			<div className='relative mb-8 md:hidden'>
				{/* Mobile filter dropdown button */}
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className='flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm'
				>
					<div className='flex items-center'>
						<FiFilter className='mr-2 text-[#E63946]' />
						<span className='font-medium'>
							{filters.find((f) => f.id === activeFilter)?.name || 'Filter'}
						</span>
					</div>
					<FiChevronDown
						className={`transition-transform ${
							isMobileMenuOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{/* Mobile dropdown menu */}
				{isMobileMenuOpen && (
					<div className='absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg'>
						{filters.map((filter) => (
							<button
								key={filter.id}
								onClick={() => {
									setActiveFilter(filter.id);
									setIsMobileMenuOpen(false);
								}}
								className={`flex w-full px-4 py-3 text-left ${
									activeFilter === filter.id
										? 'bg-[#E63946] text-white'
										: 'hover:bg-gray-50'
								}`}
							>
								{filter.name}
							</button>
						))}
					</div>
				)}
			</div>
		);
	}

	// Desktop view
	return (
		<div className='flex flex-wrap justify-center gap-2 mb-8 md:gap-4'>
			{filters.map((filter) => (
				<button
					key={filter.id}
					onClick={() => setActiveFilter(filter.id)}
					className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
						activeFilter === filter.id
							? 'bg-[#E63946] text-white shadow-md'
							: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
					}`}
				>
					{filter.name}
				</button>
			))}
		</div>
	);
};

export default PortfolioFilter;
