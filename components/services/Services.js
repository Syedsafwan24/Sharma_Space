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
		<section className='bg-gray-100 py-12 sm:py-16'>
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
					<div className='text-center py-16'>
						<div className='max-w-md mx-auto'>
							{/* Icon */}
							<div className='mb-6'>
								<svg
									className='mx-auto h-16 w-16 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1.5}
										d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
									/>
								</svg>
							</div>

							{/* Content */}
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								Services Coming Soon
							</h3>
							<p className='text-gray-600 mb-6'>
								We're preparing our comprehensive service offerings. Get in
								touch to discuss your specific design needs!
							</p>

							{/* Call to Action */}
							<Link
								href='/contact'
								className='inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-center'
							>
								Discuss Your Project
							</Link>
						</div>
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
