'use client';

import { useEffect } from 'react';

export const useImagePreloader = (projects, priority = 6) => {
	useEffect(() => {
		if (!projects || projects.length === 0) return;

		const preloadImages = () => {
			// Preload critical images (first few projects)
			const criticalImages = projects
				.slice(0, priority)
				.map(
					(project) =>
						project.coverImage?.url ||
						project.coverImage ||
						project.image?.url ||
						project.image
				)
				.filter(Boolean);

			// Preload critical images immediately
			criticalImages.forEach((src, index) => {
				if (src && typeof src === 'string') {
					const link = document.createElement('link');
					link.rel = 'preload';
					link.as = 'image';
					link.href = src;
					// Set higher priority for first 3 images
					if (index < 3) {
						link.fetchPriority = 'high';
					}
					document.head.appendChild(link);
				}
			});

			// Preload remaining images in background using requestIdleCallback
			const remainingImages = projects
				.slice(priority)
				.map(
					(project) =>
						project.coverImage?.url ||
						project.coverImage ||
						project.image?.url ||
						project.image
				)
				.filter(Boolean);

			if (remainingImages.length > 0) {
				const preloadRemaining = () => {
					remainingImages.forEach((src) => {
						if (src && typeof src === 'string') {
							const img = new Image();
							img.loading = 'lazy';
							img.src = src;
						}
					});
				};

				// Use requestIdleCallback if available, otherwise setTimeout
				if ('requestIdleCallback' in window) {
					requestIdleCallback(preloadRemaining, { timeout: 3000 });
				} else {
					setTimeout(preloadRemaining, 1000);
				}
			}
		};

		// Start preloading after a short delay to not block initial render
		const timeoutId = setTimeout(preloadImages, 100);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [projects, priority]);
};

export default useImagePreloader;
