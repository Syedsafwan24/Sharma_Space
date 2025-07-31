'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function OptimizedPartnerBrands({ partnerBrands = [] }) {
	const rowRef = useRef(null);

	useEffect(() => {
		const row = rowRef.current;
		if (!row || partnerBrands.length === 0) return;

		// Use CSS animation instead of GSAP for better performance
		const brandWidth = 200; // approximate width per brand
		const totalWidth = brandWidth * partnerBrands.length;

		// Set CSS custom property for animation
		row.style.setProperty('--scroll-width', `-${totalWidth}px`);

		// Add CSS animation class
		row.classList.add('scroll-animation');

		return () => {
			if (row) {
				row.classList.remove('scroll-animation');
			}
		};
	}, [partnerBrands]);

	if (!partnerBrands.length) return null;

	return (
		<section className='py-16 bg-gray-50 overflow-hidden'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4'>
						Trusted by Leading Brands
					</h2>
					<p className='text-gray-600 max-w-2xl mx-auto'>
						We've had the privilege of working with some amazing brands and
						creating spaces that reflect their vision and values.
					</p>
				</div>

				<div className='relative'>
					<div
						ref={rowRef}
						className='flex items-center gap-8 will-change-transform'
					>
						{/* Duplicate brands for seamless loop */}
						{[...partnerBrands, ...partnerBrands].map((brand, index) => (
							<div
								key={`${brand.id}-${index}`}
								className='flex-shrink-0 w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300'
							>
								<Image
									src={brand.logo}
									alt={brand.name}
									className='max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300'
									width={120}
									height={60}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<style jsx>{`
				.scroll-animation {
					animation: scroll 30s linear infinite;
				}

				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(var(--scroll-width));
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.scroll-animation {
						animation: none;
					}
				}
			`}</style>
		</section>
	);
}
