// lib/imagePreloader.js
class ImagePreloader {
	constructor() {
		this.cache = new Map();
		this.preloadQueue = [];
		this.isProcessing = false;
	}

	// Preload an image and cache it
	async preloadImage(src, priority = false) {
		if (!src || this.cache.has(src)) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			const img = new Image();

			img.onload = () => {
				this.cache.set(src, true);
				resolve();
			};

			img.onerror = () => {
				reject(new Error(`Failed to load ${src}`));
			};

			// Set loading strategy
			if (priority) {
				img.loading = 'eager';
				img.fetchPriority = 'high';
			} else {
				img.loading = 'lazy';
			}

			img.src = src;
		});
	}

	// Preload multiple images with batch processing
	async preloadImages(imageUrls, batchSize = 3) {
		const batches = [];
		for (let i = 0; i < imageUrls.length; i += batchSize) {
			batches.push(imageUrls.slice(i, i + batchSize));
		}

		for (const batch of batches) {
			try {
				await Promise.allSettled(batch.map((url) => this.preloadImage(url)));
				// Small delay between batches to prevent overwhelming the network
				await new Promise((resolve) => setTimeout(resolve, 100));
			} catch (error) {
				// Silently handle batch preload errors
			}
		}
	}

	// Preload critical above-the-fold images first
	async preloadCriticalImages(projects, count = 6) {
		const criticalImages = projects
			.slice(0, count)
			.map((project) => project.image?.url || project.image)
			.filter(Boolean);

		if (criticalImages.length > 0) {
			await Promise.allSettled(
				criticalImages.map((url) => this.preloadImage(url, true))
			);
		}
	}

	// Preload remaining images in background
	preloadRemainingImages(projects, startIndex = 6) {
		const remainingImages = projects
			.slice(startIndex)
			.map((project) => project.image?.url || project.image)
			.filter(Boolean);

		if (remainingImages.length > 0) {
			// Use requestIdleCallback for background preloading
			const preloadInBackground = () => {
				this.preloadImages(remainingImages, 2); // Smaller batches for background
			};

			if ('requestIdleCallback' in window) {
				requestIdleCallback(preloadInBackground, { timeout: 5000 });
			} else {
				setTimeout(preloadInBackground, 1000);
			}
		}
	}

	// Check if image is cached
	isImageCached(src) {
		return this.cache.has(src);
	}

	// Clear cache
	clearCache() {
		this.cache.clear();
	}
}

// Create singleton instance
const imagePreloader = new ImagePreloader();

export default imagePreloader;

// React hook for easy usage
export function useImagePreloader() {
	return {
		preloadImage: imagePreloader.preloadImage.bind(imagePreloader),
		preloadImages: imagePreloader.preloadImages.bind(imagePreloader),
		preloadCriticalImages:
			imagePreloader.preloadCriticalImages.bind(imagePreloader),
		preloadRemainingImages:
			imagePreloader.preloadRemainingImages.bind(imagePreloader),
		isImageCached: imagePreloader.isImageCached.bind(imagePreloader),
		clearCache: imagePreloader.clearCache.bind(imagePreloader),
	};
}
