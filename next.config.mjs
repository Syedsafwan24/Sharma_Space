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
	
	// Security Headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin'
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block'
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains; preload'
					},
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"connect-src 'self' https://api.emailjs.com",
							"frame-src 'self' https://www.google.com https://www.recaptcha.net",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'"
						].join('; ')
					}
				]
			}
		]
	}
};

export default nextConfig;
