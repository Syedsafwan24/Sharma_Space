// app/portfolio/page.jsx
import PortfolioClient from './PortfolioClient';

// Server Component that exports metadata
export const metadata = {
	title: 'Portfolio - Sharma Space | Interior Design Bangalore',
	description:
		"Explore Sharma Space's portfolio of interior design projects in Bangalore. See our work in residential, commercial, and modular spaces. 150+ projects delivered.",
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
			{ url: '/favicon.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
		other: [
			{
				rel: 'icon',
				url: '/favicon-16x16.png',
				sizes: '16x16',
				type: 'image/png',
			},
			{
				rel: 'icon',
				url: '/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
		],
	},
	openGraph: {
		title: 'Portfolio - Sharma Space | Interior Design Bangalore',
		description:
			"Explore Sharma Space's portfolio of interior design projects in Bangalore. See our work in residential, commercial, and modular spaces. 150+ projects delivered.",
		images: [
			{
				url: '/public/images/portfolio/portfolio-hero.jpg',
				width: 1200,
				height: 630,
				alt: 'Sharma Space interior design portfolio in Bangalore',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Portfolio - Sharma Space | Interior Design Bangalore',
		description:
			"Explore Sharma Space's portfolio of interior design projects in Bangalore. See our work in residential, commercial, and modular spaces. 150+ projects delivered.",
		image: '/public/images/portfolio/portfolio-hero.jpg',
	},
	alternates: {
		canonical: '/portfolio',
	},
	other: {
		'application/ld+json': JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: 'Sharma Space Portfolio',
			description:
				"Explore Sharma Space's portfolio of interior design projects in Bangalore. See our work in residential, commercial, and modular spaces. 150+ projects delivered.",
			url: 'https://sharmaspace.in/portfolio',
			publisher: {
				'@type': 'Organization',
				name: 'Sharma Space',
			},
		}),
	},
};

// Server Component that renders the Client Component
export default function PortfolioPage() {
	return <PortfolioClient />;
}
