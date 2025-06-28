'use client';

import React from 'react';
import { Sofa, Building2, Hotel, ArrowRight } from 'lucide-react';
import { services } from '@/app/data';

const Services = () => {
	// Get the first 3 services for the homepage
	const homeServices = services.slice(0, 3);

	// Map service icons
	const iconMap = {
		'Home': Sofa,
		'Building': Building2,
		'Hotel': Hotel,
		'Sofa': Sofa,
		'Building2': Building2
	};

	return (
		<section className='bg-gray-100 py-20'>
			<div className='max-w-6xl mx-auto px-6'>
				{/* Section Header - Centered */}
				<div className='text-center mb-20'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>
						Our Services
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						We offer comprehensive design solutions tailored to your specific
						needs and aspirations.
					</p>
				</div>

				{/* Services Grid - Cards Aligned Left */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{homeServices.map((service, index) => {
						const IconComponent = iconMap[service.icon] || Sofa;
						return (
							<div
								key={service.id}
								className='bg-white rounded-lg shadow-md px-6 py-10 group hover:shadow-xl transition-shadow duration-300'
							>
								<div className='mb-4'>
									<IconComponent size={28} className='text-red-600' />
								</div>
								<h3 className='text-xl font-semibold text-gray-900 mb-3'>
									{service.title}
								</h3>
								<p className='text-gray-600 mb-6'>{service.shortDescription || service.description}</p>
								<button className='text-red-600 font-medium flex items-center gap-1 hover:text-red-700 transition-colors duration-300'>
									Learn More <ArrowRight size={16} />
								</button>
							</div>
						);
					})}
				</div>

				{/* CTA Button - Centered */}
				<div className='text-center mt-12'>
					<button className='bg-red-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition-all duration-300 hover:-translate-y-1'>
						Explore All Services
					</button>
				</div>
			</div>
		</section>
	);
};

export default Services;