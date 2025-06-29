'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Optimized Image component with WebP support, lazy loading, and blur placeholder
 * Automatically handles image optimization and loading states
 */
const OptimizedImage = ({
	src,
	alt,
	width,
	height,
	fill = false,
	priority = false,
	className = '',
	sizes = '100vw',
	quality = 85,
	placeholder = 'blur',
	blurDataURL,
	onLoad,
	...props
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Generate a simple blur placeholder if none provided
	const defaultBlurDataURL = 
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

	const handleLoad = () => {
		setIsLoading(false);
		if (onLoad) onLoad();
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);
	};

	// Error fallback
	if (hasError) {
		return (
			<div 
				className={`bg-gray-200 flex items-center justify-center ${className}`}
				style={fill ? {} : { width, height }}
			>
				<span className="text-gray-500 text-sm">Image not available</span>
			</div>
		);
	}

	return (
		<div className={`relative ${isLoading ? 'animate-pulse' : ''}`}>
			<Image
				src={src}
				alt={alt}
				width={fill ? undefined : width}
				height={fill ? undefined : height}
				fill={fill}
				priority={priority}
				className={`transition-opacity duration-300 ${
					isLoading ? 'opacity-0' : 'opacity-100'
				} ${className}`}
				sizes={sizes}
				quality={quality}
				placeholder={placeholder}
				blurDataURL={blurDataURL || defaultBlurDataURL}
				onLoad={handleLoad}
				onError={handleError}
				{...props}
			/>
			
			{/* Loading overlay */}
			{isLoading && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
					<div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default OptimizedImage;
