/** @type {import('next').NextConfig} */
const nextConfig = {
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
		// Device sizes for responsive images
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// Image sizes for different breakpoints
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// Minimize layout shift
		minimumCacheTTL: 60,
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
