/**
 * Utility functions for image optimization
 */

/**
 * Generates a data URL for a blur placeholder
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} color - Base64 color (optional)
 * @returns {string} - Data URL for blur placeholder
 */
export const generateBlurDataURL = (
	width = 8,
	height = 8,
	color = '#f3f4f6'
) => {
	// Convert hex color to RGB
	const hexToRgb = (hex) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: { r: 243, g: 244, b: 246 }; // Default gray
	};

	const rgb = hexToRgb(color);

	// Create a simple SVG as base64
	const svg = `
		<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="rgb(${rgb.r}, ${rgb.g}, ${rgb.b})" />
		</svg>
	`;

	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

/**
 * Optimized sizes prop generator for responsive images
 * @param {Object} breakpoints - Object with breakpoint values
 * @returns {string} - Sizes string for Next.js Image component
 */
export const generateImageSizes = (breakpoints = {}) => {
	const defaultBreakpoints = {
		mobile: '100vw',
		tablet: '50vw',
		desktop: '33vw',
		...breakpoints,
	};

	return `(max-width: 768px) ${defaultBreakpoints.mobile}, (max-width: 1024px) ${defaultBreakpoints.tablet}, ${defaultBreakpoints.desktop}`;
};

/**
 * Common image sizes for different use cases
 */
export const imageSizes = {
	// Hero images
	hero: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw',

	// Portfolio cards
	portfolioCard: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',

	// Blog thumbnails
	blogThumbnail: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw',

	// Gallery images
	gallery: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw',

	// Avatar/profile images
	avatar: '(max-width: 768px) 20vw, 10vw',

	// Logo images (small, fixed size)
	logo: '40px',

	// Full width sections
	fullWidth: '100vw',

	// Two column layout
	twoColumn: '(max-width: 768px) 100vw, 50vw',

	// Three column layout
	threeColumn: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
};

/**
 * Quality settings for different image types
 */
export const imageQuality = {
	hero: 90, // High quality for hero images
	portfolio: 85, // Good quality for portfolio
	thumbnail: 80, // Medium quality for thumbnails
	avatar: 85, // Good quality for user photos
	logo: 90, // High quality for logos
	background: 75, // Lower quality for background images
};

/**
 * Check if image source is external
 * @param {string} src - Image source
 * @returns {boolean} - Whether the image is external
 */
export const isExternalImage = (src) => {
	return src.startsWith('http://') || src.startsWith('https://');
};

/**
 * Get optimized image props for common use cases
 * @param {string} type - Image type (hero, portfolio, blog, etc.)
 * @param {Object} options - Additional options
 * @returns {Object} - Optimized props for Image component
 */
export const getOptimizedImageProps = (type, options = {}) => {
	const { priority = false, placeholder = 'blur', ...otherOptions } = options;

	const baseProps = {
		quality: imageQuality[type] || 85,
		sizes: imageSizes[type] || imageSizes.fullWidth,
		...otherOptions,
	};

	// Don't use blur placeholder for logos (small images)
	if (type !== 'logo') {
		baseProps.placeholder = placeholder;
	}

	// Set priority for above-the-fold images
	if (type === 'hero' || priority) {
		baseProps.priority = true;
	}

	return baseProps;
};
