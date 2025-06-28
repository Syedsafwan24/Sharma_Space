import React from 'react';
import { companyStats, companyInfo } from '@/app/data';

const OurJourney = () => {
	// Get stats from centralized data
	const projectsCompleted =
		companyStats.find((s) => s.id === 'projects-completed')?.displayValue ||
		'150+';
	const yearsExperience =
		companyStats.find((s) => s.id === 'years-experience')?.displayValue ||
		'10+';
	const happyClients =
		companyStats.find((s) => s.id === 'happy-clients')?.displayValue || '500+';

	return (
		<div className='bg-[#F8F9FA] py-12 md:py-16 lg:py-20 w-full min-h-auto md:min-h-[600px]'>
			<div
				className='max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 
                  flex flex-col md:flex-row items-center gap-10 md:gap-16'
			>
				{/* Text Content */}
				<div className='flex-1 max-w-full md:max-w-[600px] order-2 md:order-1'>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-6 md:mb-8 leading-tight tracking-tight'>
						Our Journey
					</h2>

					<p className='text-base sm:text-lg text-[#666666] leading-relaxed mb-4 md:mb-6 font-normal'>
						Founded in {companyInfo?.founded || '2013'}, Sharma Space has been
						at the forefront of innovative interior design. Our mission is to
						create spaces that inspire and delight while reflecting the unique
						personality of each client.
					</p>

					<p className='text-base sm:text-lg text-[#666666] leading-relaxed mb-4 md:mb-6 font-normal'>
						What began as a small studio has grown into a full-service design
						firm with a portfolio spanning residential, commercial, and
						hospitality projects across India.
					</p>

					<p className='text-base sm:text-lg text-[#666666] leading-relaxed mb-8 md:mb-12 font-normal'>
						Our team combines creativity with technical expertise, ensuring that
						each design is not only aesthetically pleasing but also functional
						and sustainable.
					</p>

					{/* Stats Section */}
					<div className='flex flex-wrap justify-center sm:justify-start gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-6 mt-8 md:mt-12'>
						<div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
							<div className='text-4xl sm:text-5xl font-bold text-[#E63946] leading-none mb-1.5 md:mb-2 tracking-tight'>
								{projectsCompleted}
							</div>
							<div className='text-base sm:text-lg text-[#666666] font-normal leading-tight'>
								Projects Completed
							</div>
						</div>
						<div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
							<div className='text-4xl sm:text-5xl font-bold text-[#E63946] leading-none mb-1.5 md:mb-2 tracking-tight'>
								{yearsExperience}
							</div>
							<div className='text-base sm:text-lg text-[#666666] font-normal leading-tight'>
								Years of Experience
							</div>
						</div>
						<div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
							<div className='text-4xl sm:text-5xl font-bold text-[#E63946] leading-none mb-1.5 md:mb-2 tracking-tight'>
								{happyClients}
							</div>
							<div className='text-base sm:text-lg text-[#666666] font-normal leading-tight'>
								Happy Clients
							</div>
						</div>
					</div>
				</div>

				{/* Image Content */}
				<div className='flex-1 max-w-full md:max-w-[600px] mt-10 md:mt-0 order-1 md:order-2'>
					{/* Added responsive height classes here */}
					<div className='w-full h-64 sm:h-72 md:h-full rounded-lg overflow-hidden shadow-lg'>
						<img
							src='/images/AboutPage/our-journey.jpg'
							alt='Two professionals in business attire having a friendly conversation in a modern office setting'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OurJourney;
