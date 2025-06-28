import AuthSessionProvider from '@/components/AuthSessionProvider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'], // Optional: choose the weights you plan to use
	display: 'swap',
});

export const metadata = {
	title: {
		default:
			'Interior Designers in Bangalore | Free 3D Consultation - Sharma Space',
		template: '%s | Sharma Space',
	},
	description:
		"Transform your space with Bangalore's leading interior designers. Custom residential & commercial design solutions. Book free consultation today!",
	keywords: [
		'interior designers bangalore',
		'interior design',
		'home interior design',
		'office interior design',
		'modular kitchen',
		'wardrobe design',
		'residential interior',
		'commercial interior',
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
	},
	openGraph: {
		title:
			'Interior Designers in Bangalore | Free 3D Consultation - Sharma Space',
		description:
			"Transform your space with Bangalore's leading interior designers. Custom residential & commercial design solutions. Book free consultation today!",
		url: 'https://sharmaspace.in',
		siteName: 'Sharma Space',
		images: [
			{
				url: '/images/Hero-Background.webp',
				width: 1200,
				height: 630,
				alt: 'Sharma Space Interior Design',
			},
		],
		locale: 'en_IN',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title:
			'Interior Designers in Bangalore | Free 3D Consultation - Sharma Space',
		description:
			"Transform your space with Bangalore's leading interior designers. Custom residential & commercial design solutions. Book free consultation today!",
		images: ['/images/Hero-Background.webp'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'LocalBusiness',
							'@id': 'https://sharmaspace.in',
							name: 'Sharma Space',
							description:
								'Interior design studio specializing in functional, personalized spaces blending aesthetics with practicality.',
							address: {
								'@type': 'PostalAddress',
								streetAddress: '123 Design Avenue',
								addressLocality: 'Mumbai',
								addressRegion: 'Maharashtra',
								postalCode: '400001',
								addressCountry: 'IN',
							},
							telephone: '+91 98765 43210',
							email: 'info@sharmaspace.in',
							url: 'https://sharmaspace.in',
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
								'Bangalore',
								'Whitefield',
								'Indiranagar',
								'Koramangala',
								'HSR Layout',
							],
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '12.9716',
								longitude: '77.5946',
							},
						}),
					}}
				/>
			</head>
			<body className={poppins.className}>
				<AuthSessionProvider>
					<QueryProvider>
						<TooltipProvider>
							{/* Navigation component, rendered once for the entire site */}

							{/* This is where your page content will be rendered */}
							{children}

							{/* Footer component, rendered once for the entire site */}

							{/* WelcomeModal component for the popup, also rendered once */}

							{/* Toasters for notifications */}
							<Toaster />
							<Sonner />
						</TooltipProvider>
					</QueryProvider>
				</AuthSessionProvider>
			</body>
		</html>
	);
}
