// components/portfolio/ProjectDetails/Gallery/Thumbnail.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export const Thumbnail = ({ src, alt }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className='relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
			<Image
				src={src}
				alt={alt}
				fill
				className={`object-cover transition-opacity duration-300 ${
					isLoading ? 'opacity-0' : 'opacity-100'
				}`}
				onLoadingComplete={() => setIsLoading(false)}
			/>
			{isLoading && (
				<div className='absolute inset-0 bg-gray-200 animate-pulse' />
			)}
		</div>
	);
};
