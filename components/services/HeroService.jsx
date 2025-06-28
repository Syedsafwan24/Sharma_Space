// components/HeroService.js
import React from 'react';
import Image from 'next/image';

const HeroService = () => {
	return (
		<section className='relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] flex items-center justify-center text-center overflow-hidden'>
			{/* Background Image with darker overlay */}
			<div className='absolute inset-0'>
				<Image
					src='/images/sofa.jpg'
					alt='Our Expertise in Interior Design Background'
					fill
					priority
					className='object-cover object-center'
				/>
				{/* Darker overlay div */}
				<div className='absolute inset-0 bg-black/60'></div>{' '}
				{/* Increased darkness */}
			</div>

			{/* Overlay Content */}
			<div className='relative z-10 text-white px-4 max-w-4xl mx-auto'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
					Our Expertise in Interior Design
				</h1>
			</div>
		</section>
	);
};

export default HeroService;
