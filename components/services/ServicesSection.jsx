import React from 'react';
import {
	Home,
	Briefcase,
	Utensils,
	Ruler,
	Sofa,
	Clipboard,
} from 'lucide-react';

const ServicesSection = ({ services = [], loading = false }) => {
	// Ensure services is an array
	const safeServices = Array.isArray(services) ? services : [];

	// Map service icons
	const iconMap = {
		Home: Home,
		Briefcase: Briefcase,
		Utensils: Utensils,
		Ruler: Ruler,
		Sofa: Sofa,
		Clipboard: Clipboard,
		Building: Briefcase,
		Hotel: Utensils,
		LayoutGrid: Ruler,
		Hammer: Clipboard,
		Armchair: Sofa,
	};

	return (
		<section className='py-16 bg-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
						Comprehensive Design Solutions
					</h1>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						We offer a wide range of interior design services tailored to meet
						your specific needs and aspirations.
					</p>
				</div>

				{/* Services Grid */}
				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className='bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow'>
								<div className='w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg animate-pulse mb-6'></div>
								<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-4'></div>
								<div className='space-y-2'>
									<div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-4/5'></div>
									<div className='h-4 bg-gradient-to-r from-gray-150 to-gray-250 rounded animate-pulse w-3/4'></div>
								</div>
							</div>
						))}
					</div>
				) : safeServices.length === 0 ? (
					<div className='text-center text-gray-500 py-8'>
						<p>No services available at the moment.</p>
						<p className='text-sm mt-2'>
							Please check back later or contact us for more information.
						</p>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{safeServices.map((service, index) => {
							const IconComponent = iconMap[service.icon] || Home;
							return (
								<div
									key={service.id || index}
									className='group relative bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300'
								>
									<div className='flex flex-col h-full'>
										<div className='flex items-center mb-4'>
											<div className='p-2 rounded-full bg-red-50 mr-4'>
												<IconComponent className='w-6 h-6 text-[#E63946]' />
											</div>
											<h2 className='text-xl font-semibold text-gray-900'>
												{service.title}
											</h2>
										</div>
										<p className='text-gray-600 mb-6 flex-grow'>
											{service.description}
										</p>
										<div className='mt-auto'>
											<button className='inline-flex items-center text-[#E63946] font-medium hover:underline'>
												View Details
												<svg
													className='w-4 h-4 ml-2'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M9 5l7 7-7 7'
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default ServicesSection;
