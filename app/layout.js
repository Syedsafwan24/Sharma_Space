import AuthSessionProvider from '@/components/AuthSessionProvider';
import { QueryProvider } from '@/components/providers/query-provider';
import { DataCacheProvider } from '@/components/providers/data-cache-provider';
import { NavigationProvider } from '@/components/providers/NavigationContext';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import ConditionalNavigation from '@/components/ConditionalNavigation';
import WelcomeModal from '@/components/WelcomeModal';
import PerformanceMonitor from '@/components/performance/PerformanceMonitor';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	preload: true, // Preload for better performance
});

export const metadata = {
	title: {
		default:
			'Sharma Space | Interior Designers in Bangalore - Residential & Commercial',
		template: '%s | Sharma Space',
	},
	description:
		'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts. Book a free consultation today!',
	keywords: [
		'interior designers bangalore',
		'interior design',
		'home interior design',
		'office interior design',
		'modular kitchen',
		'wardrobe design',
		'residential interior',
		'commercial interior',
		'bangalore interior designers',
		'best interior designers',
		'interior designers near me',
		'HSR layout interior designers',
		'Koramangala interior designers',
		'Whitefield interior designers',
		'Indiranagar interior designers',
		'BTM layout interior designers',
		'Jayanagar interior designers',
		'Electronic city interior designers',
		'Sarjapur road interior designers',
		'Marathahalli interior designers',
		'interior design consultation',
		'3D interior design',
		'turnkey interior solutions',
		'luxury interior design bangalore',
		'affordable interior design',
		'modern interior design',
		'traditional interior design',
		'minimalist interior design',
		'contemporary interior design',
		'villa interior design',
		'apartment interior design',
		'duplex interior design',
		'studio apartment design',
		'kitchen interior design',
		'bedroom interior design',
		'living room interior design',
		'bathroom interior design',
		'office interior design bangalore',
		'restaurant interior design',
		'retail interior design',
		'hospital interior design',
		'hotel interior design',
		'interior design services bangalore',
		'interior decorators bangalore',
		'home renovation bangalore',
		'interior design cost bangalore',
		'interior design packages bangalore',
	],
	authors: [{ name: 'Sharma Space' }],
	creator: 'Sharma Space',
	publisher: 'Sharma Space',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://sharmaspace.in'),
	alternates: {
		canonical: '/',
		languages: {
			'en-IN': '/',
			'hi-IN': '/hi',
		},
	},
	category: 'Interior Design',
	classification: 'Business',
	referrer: 'origin-when-cross-origin',
	// Search engine verification codes - uncomment and add to .env.local when ready
	// verification: {
	// 	google: process.env.GOOGLE_SITE_VERIFICATION || '', // Google Search Console verification
	// 	yandex: process.env.YANDEX_VERIFICATION || '', // Yandex Webmaster verification
	// 	yahoo: process.env.YAHOO_VERIFICATION || '', // Yahoo Site Explorer verification
	// 	other: {
	// 		'msvalidate.01': process.env.BING_VERIFICATION || '', // Bing Webmaster Tools verification
	// 	},
	// },
	openGraph: {
		title: 'Sharma Space | Interior Designers in Bangalore',
		description:
			'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts.',
		url: 'https://sharmaspace.in',
		siteName: 'Sharma Space',
		locale: 'en_IN',
		type: 'website',
		images: [
			{
				url: '/images/AboutSection.webp',
				width: 1200,
				height: 630,
				alt: 'Sharma Space team at work in Bangalore interior design project',
				type: 'image/webp',
			},
			{
				url: '/images/Hero-Background.webp',
				width: 1200,
				height: 630,
				alt: 'Modern interior design by Sharma Space in Bangalore',
				type: 'image/webp',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@sharmaspace',
		creator: '@sharmaspace',
		title: 'Sharma Space | Interior Designers in Bangalore',
		description:
			'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts.',
		images: ['/images/AboutSection.webp'],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }],
		apple: [{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }],
	},
	manifest: '/site.webmanifest',
	other: {
		'msapplication-TileColor': '#da532c',
		'msapplication-config': '/browserconfig.xml',
		'application/ld+json': JSON.stringify([
			{
				'@context': 'https://schema.org',
				'@type': 'Organization',
				name: 'Sharma Space',
				url: 'https://sharmaspace.in/',
				logo: '/images/icon/SharmaSpace-Logo.webp',
				foundingDate: '2020',
				founders: [
					{
						'@type': 'Person',
						name: 'Sharma',
					},
				],
				contactPoint: [
					{
						'@type': 'ContactPoint',
						telephone: '+91 886 757 4542',
						contactType: 'customer service',
						areaServed: 'IN',
						availableLanguage: ['English', 'Hindi', 'Kannada'],
						hoursAvailable: {
							'@type': 'OpeningHoursSpecification',
							dayOfWeek: [
								'Monday',
								'Tuesday',
								'Wednesday',
								'Thursday',
								'Friday',
								'Saturday',
							],
							opens: '10:00',
							closes: '19:00',
						},
					},
				],
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'HSR Layout, Mangammana Palya',
					addressLocality: 'Bangalore',
					addressRegion: 'Karnataka',
					postalCode: '560068',
					addressCountry: 'IN',
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: '12.9129',
					longitude: '77.6445',
				},
				sameAs: [
					'https://instagram.com/sharmaspace',
					'https://facebook.com/sharmaspace',
					'https://youtube.com/@sharmaspace',
					'https://linkedin.com/company/sharmaspace',
					'https://twitter.com/sharmaspace',
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Interior Design Services',
					itemListElement: [
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Residential Interior Design',
								description:
									'Complete home interior design and renovation services',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Commercial Interior Design',
								description: 'Office and commercial space interior design',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Modular Kitchen Design',
								description: 'Custom modular kitchen design and installation',
							},
						},
					],
				},
			},
			{
				'@context': 'https://schema.org',
				'@type': 'LocalBusiness',
				'@id': 'https://sharmaspace.in',
				name: 'Sharma Space',
				image: '/images/AboutSection.webp',
				description:
					'Professional interior design studio in Bangalore specializing in residential and commercial spaces. We create functional, aesthetic interiors that reflect your personality and lifestyle.',
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'HSR Layout, Mangammana Palya',
					addressLocality: 'Bangalore',
					addressRegion: 'Karnataka',
					postalCode: '560068',
					addressCountry: 'IN',
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: '12.9129',
					longitude: '77.6445',
				},
				telephone: '+91 886 757 4542',
				email: 'info@sharmaspace.in',
				url: 'https://sharmaspace.in',
				priceRange: '₹₹₹',
				openingHoursSpecification: {
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
					],
					opens: '10:00',
					closes: '19:00',
				},
				areaServed: [
					{
						'@type': 'City',
						name: 'Bangalore',
						containedInPlace: {
							'@type': 'State',
							name: 'Karnataka',
							containedInPlace: {
								'@type': 'Country',
								name: 'India',
							},
						},
					},
				],
				serviceArea: [
					'HSR Layout',
					'Koramangala',
					'Whitefield',
					'Indiranagar',
					'BTM Layout',
					'Jayanagar',
					'Electronic City',
					'Sarjapur Road',
					'Marathahalli',
					'JP Nagar',
					'Bannerghatta Road',
					'Yelahanka',
					'Hebbal',
					'RT Nagar',
					'Rajajinagar',
				],
				hasMap: 'https://maps.google.com/maps?q=HSR+Layout+Bangalore',
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '4.8',
					reviewCount: '150',
					bestRating: '5',
					worstRating: '1',
				},
				review: [
					{
						'@type': 'Review',
						reviewRating: {
							'@type': 'Rating',
							ratingValue: '5',
							bestRating: '5',
						},
						author: {
							'@type': 'Person',
							name: 'Happy Client',
						},
						reviewBody:
							'Excellent interior design services. Professional team and great results.',
					},
				],
			},
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Sharma Space',
				url: 'https://sharmaspace.in/',
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: 'https://sharmaspace.in/search?q={search_term_string}',
					},
					'query-input': 'required name=search_term_string',
				},
				sameAs: [
					'https://instagram.com/sharmaspace',
					'https://facebook.com/sharmaspace',
					'https://youtube.com/@sharmaspace',
				],
			},
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://sharmaspace.in/',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Services',
						item: 'https://sharmaspace.in/services',
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'Portfolio',
						item: 'https://sharmaspace.in/portfolio',
					},
					{
						'@type': 'ListItem',
						position: 4,
						name: 'About',
						item: 'https://sharmaspace.in/about',
					},
					{
						'@type': 'ListItem',
						position: 5,
						name: 'Contact',
						item: 'https://sharmaspace.in/contact',
					},
				],
			},
		]),
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	colorScheme: 'light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				{/* Critical Resource Hints */}
				<link rel='dns-prefetch' href='//fonts.googleapis.com' />
				<link rel='dns-prefetch' href='//www.google-analytics.com' />
				<link rel='dns-prefetch' href='//www.googletagmanager.com' />

				{/* Preload critical images for LCP optimization */}
				<link
					rel='preload'
					as='image'
					href='/images/Hero-Background.webp'
					fetchPriority='high'
				/>

				{/* Preload critical CSS */}
				{/* Font preload removed - using Google Fonts directly */}

				{/* Additional meta tags for local SEO */}
				<meta name='geo.region' content='IN-KA' />
				<meta name='geo.placename' content='Bangalore' />
				<meta name='geo.position' content='12.9129;77.6445' />
				<meta name='ICBM' content='12.9129, 77.6445' />
				<meta name='language' content='English' />
				<meta name='distribution' content='global' />
				<meta name='rating' content='general' />
				<meta name='revisit-after' content='7 days' />
				<meta name='HandheldFriendly' content='True' />
				<meta name='MobileOptimized' content='320' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
				<meta name='apple-mobile-web-app-title' content='Sharma Space' />
				<meta name='application-name' content='Sharma Space' />

				{/* Business contact information */}
				<meta itemProp='telephone' content='+91 886 757 4542' />
				<meta itemProp='email' content='info@sharmaspace.in' />
				<meta
					itemProp='address'
					content='HSR Layout, Mangammana Palya, Bangalore, Karnataka 560068'
				/>

				{/* Local business categories */}
				<meta name='business-category' content='Interior Design' />
				<meta name='business-type' content='Interior Design Service' />
				<meta
					name='service-area'
					content='Bangalore, HSR Layout, Koramangala, Whitefield, Indiranagar, BTM Layout'
				/>

				{/* Performance hints */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
			</head>
			<body className={poppins.className}>
				<PerformanceMonitor />
				<AuthSessionProvider>
					<QueryProvider>
						<TooltipProvider>
							<NavigationProvider>
								{/* Navigation component, rendered conditionally based on route */}
								<ConditionalNavigation />

								{/* This is where your page content will be rendered */}
								<DataCacheProvider>{children}</DataCacheProvider>

								{/* Footer component, rendered once for the entire site */}

								{/* WelcomeModal component for the popup, also rendered once */}
								<WelcomeModal />

								{/* Toasters for notifications */}
								<Toaster />
								<Sonner />
							</NavigationProvider>
						</TooltipProvider>
					</QueryProvider>
				</AuthSessionProvider>
			</body>
		</html>
	);
}
