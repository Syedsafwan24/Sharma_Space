'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { imageSizes, imageQuality } from '@/lib/imageUtils';

const Hero = () => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const scrollToNext = () => {
		const nextSection = document.querySelector('#about-section');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className='relative min-h-screen w-full flex items-center overflow-hidden py-20 sm:py-24 md:py-0'>
			{/* Background Image */}
			<div className='absolute inset-0 z-0 w-full h-full'>
				{/* Loading skeleton for hero background */}
				{!imageLoaded && (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center'>
						<div className='text-center'>
							<div className='w-16 h-16 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin mx-auto mb-4'></div>
							<p className='text-gray-400 text-sm'>Loading experience...</p>
						</div>
					</div>
				)}

				<OptimizedImage
					src='/images/Hero-Background.webp'
					alt='Modern interior design showcase'
					fill
					className='object-cover object-center'
					priority={true}
					quality={imageQuality.hero}
					sizes={imageSizes.hero}
					showSkeleton={false}
					onLoad={() => setImageLoaded(true)}
				/>
			</div>

			{/* Dark Overlay - Made darker for better text visibility */}
			<div className='absolute inset-0 bg-black/50 z-10' />

			{/* Main Content */}
			<div
				className={`relative z-20 max-w-6xl mx-auto px-6 w-full transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-75'}`}
			>
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
					<Link
						href='/contact'
						className='inline-block bg-red-700 text-gray-50 px-8 sm:px-9 py-3.5 sm:py-4 rounded border-none text-base font-semibold cursor-pointer transition-all duration-300 transform shadow-lg shadow-red-700/30 hover:bg-red-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-700/40 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 text-center'
					>
						Book a Free Consultation
					</Link>
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
