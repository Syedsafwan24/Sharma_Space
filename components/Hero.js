'use client';

import React from 'react';
import Image from 'next/image';

const Hero = () => {
	const scrollToNext = () => {
		const nextSection = document.querySelector('#about-section');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className='relative min-h-screen w-full flex items-center overflow-hidden py-20 sm:py-24 md:py-0'>
			{/* Background Image */}
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/Hero-Background.webp'
					alt='Modern interior design showcase'
					fill
					className='object-cover object-center'
					priority
					quality={90}
				/>
			</div>

			{/* Dark Overlay */}
			<div className='absolute inset-0 bg-gray-900/60 z-10' />

			{/* Main Content */}
			<div className='relative z-20 max-w-6xl mx-auto px-6 w-full'>
				<div className='max-w-2xl text-left opacity-0 animate-fade-in [animation-delay:0.5s] [animation-fill-mode:forwards]'>
					{/* Main Heading */}
					<h1 className='text-5xl sm:text-6xl md:text-6xl font-extrabold leading-tight sm:leading-[0.9] text-gray-50 mb-6 md:mb-8 tracking-tight'>
						Crafting
						<br />
						Spaces
						<br />
						That
						<br />
						Reflect
						<br />
						You
					</h1>

					{/* Subtitle */}
					<p className='text-base sm:text-lg leading-relaxed text-gray-50 mb-8 md:mb-10 opacity-90 max-w-sm sm:max-w-md md:max-w-lg'>
						Elevate your surroundings with custom interiors designed to enhance
						both aesthetics and functionality.
					</p>

					{/* CTA Button */}
					<button className='bg-red-700 text-gray-50 px-8 sm:px-9 py-3.5 sm:py-4 rounded border-none text-base font-semibold cursor-pointer transition-all duration-300 transform shadow-lg shadow-red-700/30 hover:bg-red-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-700/40 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50'>
						Book a Free Consultation
					</button>
				</div>
			</div>

			{/* Scroll Down Indicator */}
			<div
				className='absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-30
                   flex flex-col items-center cursor-pointer transition-all duration-300 opacity-0 animate-fade-in [animation-delay:2s] [animation-fill-mode:forwards] hover:-translate-y-2 group'
				onClick={scrollToNext}
			>
				<div className='text-gray-50 text-sm sm:text-base mb-1 sm:mb-2 opacity-80 font-medium tracking-wide group-hover:opacity-100 transition-opacity duration-300'>
					Discover More
				</div>
				<div className='text-gray-50 text-2xl sm:text-3xl opacity-80 animate-bounce-subtle group-hover:opacity-100 transition-opacity duration-300'>
					&#x2193;
				</div>
			</div>

			{/* Custom Keyframe for subtle bounce */}
			<style jsx>{`
				@keyframes bounce-subtle {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-5px);
					}
				}
				.animate-bounce-subtle {
					animation: bounce-subtle 1.8s infinite;
				}
			`}</style>
		</section>
	);
};

export default Hero;
