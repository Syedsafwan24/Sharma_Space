/** @type {import('next').NextConfig} */
const nextConfig = {
	// Experimental features to improve build stability and performance
	experimental: {
		turbo: {
			memoryLimit: 512,
		},
		// Enable optimizePackageImports for better tree shaking
		optimizePackageImports: [
			'@radix-ui/react-accordion',
			'@radix-ui/react-alert-dialog',
			'@radix-ui/react-aspect-ratio',
			'@radix-ui/react-avatar',
			'@radix-ui/react-checkbox',
			'@radix-ui/react-collapsible',
			'@radix-ui/react-context-menu',
			'@radix-ui/react-dialog',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-hover-card',
			'@radix-ui/react-label',
			'@radix-ui/react-menubar',
			'@radix-ui/react-navigation-menu',
			'@radix-ui/react-popover',
			'@radix-ui/react-progress',
			'@radix-ui/react-radio-group',
			'@radix-ui/react-scroll-area',
			'@radix-ui/react-select',
			'@radix-ui/react-separator',
			'@radix-ui/react-slider',
			'@radix-ui/react-slot',
			'@radix-ui/react-switch',
			'@radix-ui/react-tabs',
			'@radix-ui/react-toast',
			'@radix-ui/react-toggle',
			'@radix-ui/react-toggle-group',
			'@radix-ui/react-tooltip',
			'lucide-react',
			'react-icons',
		],
	},
	// Enable modern build output
	output: 'standalone',
	// Compression and optimization
	compress: true,
	// PoweredByHeader
	poweredByHeader: false,
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
					// Performance headers
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				// Cache static assets aggressively
				source: '/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				// Cache images with shorter TTL
				source: '/images/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=604800, stale-while-revalidate=86400',
					},
				],
			},
		];
	},

	// Bundle analyzer for production optimization
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Optimize bundle size
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
						maxSize: 200000, // 200KB chunks
					},
					common: {
						name: 'common',
						minChunks: 2,
						chunks: 'all',
						enforce: true,
						maxSize: 200000,
					},
				},
			};
		}

		return config;
	},
};

export default nextConfig;
