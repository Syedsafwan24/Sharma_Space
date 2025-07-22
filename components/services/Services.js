'use client';

import React from 'react';
import Link from 'next/link';
import { Sofa, Building2, Hotel, ArrowRight } from 'lucide-react';

const Services = ({ services = [], loading = false }) => {
	// Get the first 3 services for the homepage
	const homeServices = services.slice(0, 3);

	// Map service icons
	const iconMap = {
		Home: Sofa,
		Building: Building2,
		Hotel: Hotel,
		Sofa: Sofa,
		Building2: Building2,
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
				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[1, 2, 3].map((i) => (
							<div key={i} className='bg-white rounded-lg shadow-md px-6 py-10'>
								<div className='mb-4'>
									<div className='w-7 h-7 bg-gray-200 rounded animate-pulse'></div>
								</div>
								<div className='h-6 bg-gray-200 rounded animate-pulse mb-3'></div>
								<div className='space-y-2 mb-6'>
									<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-4/5'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-3/4'></div>
								</div>
								<div className='h-10 bg-gray-200 rounded animate-pulse'></div>
							</div>
						))}
					</div>
				) : homeServices.length === 0 ? (
					<div className='text-center text-gray-500 py-8'>
						<p>No services available at the moment.</p>
					</div>
				) : (
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
								<p className='text-gray-600 mb-6'>
									{service.shortDescription || service.description}
								</p>
								<Link
									href='/services'
									className='text-red-600 font-medium flex items-center gap-1 hover:text-red-700 transition-colors duration-300'
								>
									Learn More <ArrowRight size={16} />
								</Link>
							</div>
						);
					})}
					</div>
				)}

				{/* CTA Button - Centered */}
				<div className='text-center mt-12'>
					<Link
						href='/services'
						className='inline-block bg-red-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition-all duration-300 hover:-translate-y-1'
					>
						Explore All Services
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Services;
