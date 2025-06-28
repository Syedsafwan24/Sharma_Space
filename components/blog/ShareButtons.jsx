// components/blog/ShareButtons.jsx
'use client';

import React, { useState, useEffect } from 'react';

const ShareButtons = ({ title }) => {
	// shareLinks prop is not used in the logic, removed for clarity
	const [currentUrl, setCurrentUrl] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
		}
	}, []);

	const encodedUrl = encodeURIComponent(currentUrl);
	const encodedTitle = encodeURIComponent(title || document.title); // Fallback to document.title

	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
		email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
	};

	// Ensure there's a title and URL to share before rendering
	if (!title && currentUrl === '') return null;

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-8'>
			{/* Section Heading */}
			<h3 className='text-xl font-bold text-gray-900 mb-4'>Share This Post</h3>

			{/* Share Buttons Container */}
			<div className='flex flex-wrap gap-3'>
				{/* Facebook */}
				<a
					href={shareUrls.facebook}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2.5 rounded transition-colors duration-200 text-sm'
					// Background color, hover, text, padding, rounded corners adjusted
				>
					<svg
						className='w-4 h-4 mr-2'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z'
							clipRule='evenodd'
						/>
					</svg>
					Facebook
				</a>

				{/* Twitter */}
				<a
					href={shareUrls.twitter}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2.5 rounded transition-colors duration-200 text-sm'
					// Background color, hover, text, padding, rounded corners adjusted
				>
					<svg
						className='w-4 h-4 mr-2'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M18.901 1.144H20l-5.638 6.417L21 22h-3.376L10.392 11.666 4.79 22H3l6.096-9.28L2 1.144h3.64l4.98 7.57L14.764 1.144h4.137zm-2.078 18.298h2.008L7.545 3.66H5.437l11.386 15.782z' />
					</svg>
					Twitter
				</a>

				{/* LinkedIn */}
				<a
					href={shareUrls.linkedin}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center bg-blue-800 hover:bg-blue-900 text-white font-medium px-4 py-2.5 rounded transition-colors duration-200 text-sm'
					// Background color, hover, text, padding, rounded corners adjusted
				>
					<svg
						className='w-4 h-4 mr-2'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.676v6.559z'
							clipRule='evenodd'
						/>
					</svg>
					LinkedIn
				</a>

				{/* Email */}
				<a
					href={shareUrls.email}
					className='flex items-center bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2.5 rounded transition-colors duration-200 text-sm'
					// Background color, hover, text, padding, rounded corners adjusted
				>
					<svg
						className='w-4 h-4 mr-2'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M2.003 5.884L10 11.583 17.997 5.884H2.003zm0 12.232V8.65l8 5.7L22 8.65v9.466c0 .828-.672 1.5-1.5 1.5H3.5c-.828 0-1.5-.672-1.5-1.5zM22 5.884c0-.828-.672-1.5-1.5-1.5H3.5c-.828 0-1.5.672-1.5 1.5L12 11.084 22 5.884z' />
					</svg>
					Email
				</a>
			</div>
		</div>
	);
};

export default ShareButtons;
