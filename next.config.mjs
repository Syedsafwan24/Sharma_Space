/** @type {import('next').NextConfig} */
const nextConfig = {
	// Experimental features to improve build stability
	experimental: {
		turbo: {
			memoryLimit: 512,
		},
	},
	// Output configuration for production deployment
	output: 'standalone',
	// Build configuration
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		// Allow production builds to succeed - we've fixed the ESLint errors
		ignoreDuringBuilds: false,
	},
	// Environment variables
	env: {
		SKIP_DB_DURING_BUILD: process.env.SKIP_DB_DURING_BUILD || 'false',
	},
	images: {
		// Enable modern image formats
		formats: ['image/webp', 'image/avif'],
		// Remote image patterns
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'lovable.dev',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				port: '',
				pathname: '/**',
			},
		],
		// Device sizes for responsive images - optimized for common breakpoints
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// Image sizes for different breakpoints - optimized for performance
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
		// Improve caching and loading
		minimumCacheTTL: 86400, // 24 hours
		// Optimize for LCP
		dangerouslyAllowSVG: false,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		// Add loader for faster image optimization
		loader: 'default',
		// Disable image optimization in development for faster builds
		unoptimized: process.env.NODE_ENV === 'development',
	},
	transpilePackages: ['lucide-react'],

	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
				],
			},
		];
	},
};

export default nextConfig;
