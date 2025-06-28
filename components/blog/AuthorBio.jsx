// components/blog/AuthorBio.jsx
import React from 'react';
import Image from 'next/image';

const AuthorBio = ({ author }) => {
	// Provide robust fallbacks for author data
	const {
		name = 'Unknown Author',
		specialization = 'Specialist',
		image: avatarImage = '/images/placeholder-avatar.webp', // Default avatar if not provided
	} = author || {}; // Ensure author object is not null/undefined

	if (!author || !author.name) return null; // Only render if author name is present

	return (
		// Outer container with responsive padding and the top border
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 border-t border-gray-200 mt-10 md:mt-12'>
			<div className='flex items-center'>
				{/* Author Avatar */}
				<div className='relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mr-4 md:mr-6 flex-shrink-0'>
					<Image
						src={avatarImage}
						alt={name}
						fill // Use fill for responsive sizing within the parent div
						className='object-cover'
						sizes='(max-width: 768px) 48px, 56px' // Optimize based on screen size
						quality={80}
						// If you ARE configuring remotePatterns in next.config.js, remove unoptimized={true}
						// unoptimized={true} // Keep this ONLY if you cannot configure remotePatterns
					/>
				</div>

				{/* Author Name and Specialization */}
				<div>
					<p className='text-base md:text-lg font-semibold text-gray-900 leading-tight'>
						Written by {name}
					</p>
					<p className='text-sm text-gray-600 leading-tight mt-0.5'>
						{specialization}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthorBio;
