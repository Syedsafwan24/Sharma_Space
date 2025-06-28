// components/blog/BlogPostHero.jsx
import React from 'react';
import Image from 'next/image';

const BlogPostHero = ({ title, date, tag, mainImage }) => {
	return (
		<div className='relative mb-10'>
			{' '}
			{/* Overall container for the hero section */}
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-16 lg:pt-20'>
				{/* Date and Category Tag */}
				<p className='text-gray-700 text-sm mb-2 font-medium'>
					{' '}
					{/* Adjusted text color and font-weight */}
					{date} •{' '}
					<span
						className='inline-block px-2.5 py-0.5 text-xs font-semibold text-white rounded bg-red-600 uppercase tracking-wider'
						// Simplified category tag styling to match the image consistently
					>
						{tag || 'CATEGORY'} {/* Use actual tag, fallback to 'CATEGORY' */}
					</span>
				</p>

				{/* Blog Post Title */}
				<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8'>
					{title}
				</h1>
			</div>
			{/* Main Blog Post Image */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{' '}
				{/* Image container matches wider layout if needed */}
				<div className='relative w-full h-80 sm:h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg'>
					<Image
						src={mainImage}
						alt={title}
						fill // Use fill to cover the sized parent div
						className='object-cover' // Ensures image covers the area, cropping if necessary
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw' // Optimized for responsive image delivery
						quality={85} // Slightly higher quality for hero image
						// REMOVE unoptimized={true} if you've configured remotePatterns in next.config.js
						// unoptimized={true} // Keep this ONLY if you cannot configure remotePatterns
					/>
				</div>
			</div>
		</div>
	);
};

export default BlogPostHero;
