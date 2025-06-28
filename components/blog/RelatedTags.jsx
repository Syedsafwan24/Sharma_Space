// components/blog/RelatedTags.jsx
import React from 'react';

const RelatedTags = ({ tags }) => {
	if (!tags || tags.length === 0) return null; // Don't render if no tags

	return (
		// Outer container with responsive width, padding, and top margin for separation
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20'>
			{' '}
			{/* Adjusted mt- for more space */}
			{/* Section Heading */}
			<h3 className='text-xl font-bold text-gray-900 mb-4'>
				Related Tags
			</h3>{' '}
			{/* Looks pixel-perfect */}
			{/* Tags Container */}
			<div className='flex flex-wrap gap-3'>
				{' '}
				{/* flex-wrap for responsiveness, gap-3 for spacing */}
				{tags.map((tag, index) => (
					<span
						key={index} // Consider using a unique tag ID if available for better keying
						className='bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-200'
						// Classes for individual tag styling: light gray background, dark text, rounded-pill shape, padding, hover effect
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
};

export default RelatedTags;
