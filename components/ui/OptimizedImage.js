'use client';

import Image from 'next/image';
import { useState } from 'react';
import { generateBlurDataURL } from '@/lib/imageUtils';

const OptimizedImage = ({
	src,
	alt,
	width,
	height,
	fill,
	priority = false,
	quality = 85,
	sizes,
	className = '',
	showSkeleton = true,
	skeletonClassName = '',
	onLoad,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleLoad = (e) => {
		setIsLoading(false);
		if (onLoad) {
			onLoad(e);
		}
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	// Generate blur placeholder - smaller for faster generation
	const blurDataURL = generateBlurDataURL(10, 10, '#f3f4f6');

	return (
		<div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
			{/* Loading skeleton */}
			{showSkeleton && isLoading && (
				<div
					className={`absolute inset-0 bg-gray-200 animate-pulse ${skeletonClassName}`}
					style={!fill && width && height ? { width, height } : {}}
				>
					<div className='flex items-center justify-center h-full'>
						<div className='w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin'></div>
					</div>
				</div>
			)}

			{/* Error state */}
			{hasError && (
				<div
					className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}
					style={!fill && width && height ? { width, height } : {}}
				>
					<svg
						className='w-8 h-8'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
				</div>
			)}

			{/* Actual image */}
			{!hasError && (
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					fill={fill}
					priority={priority}
					quality={quality}
					sizes={sizes}
					className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
					placeholder='blur'
					blurDataURL={blurDataURL}
					onLoad={handleLoad}
					onError={handleError}
					{...props}
				/>
			)}
		</div>
	);
};

export default OptimizedImage;
