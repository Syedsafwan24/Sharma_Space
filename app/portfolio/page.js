// app/portfolio/page.jsx
import PortfolioStaticGrid from '@/components/portfolio/PortfolioStaticGrid';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import dynamic from 'next/dynamic';

// Dynamically import PerformanceMonitor to avoid SSR issues
const PerformanceMonitor = dynamic(
	() => import('@/components/debug/PerformanceMonitor'),
	{
		ssr: false,
	}
);

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

// Pre-fetch projects data at build time
async function getProjects() {
	try {
		const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
		const res = await fetch(`${baseUrl}/api/projects`, {
			next: { revalidate: 3600 }, // Cache for 1 hour
			// Removed cache: force-cache to fix conflict
		});

		if (!res.ok) {
			return [];
		}

		return await res.json();
	} catch (error) {
		return [];
	}
}

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

// Server Component that renders static content with pre-fetched data
export default async function PortfolioPage() {
	// Pre-fetch projects at build time/request time
	const projects = await getProjects();

	return (
		<div className='min-h-screen flex flex-col'>
			{process.env.NODE_ENV === 'development' && (
				<PerformanceMonitor componentName='Portfolio' />
			)}
			<main className='flex-grow'>
				<HeroPortfolio />
				<div className='container mx-auto px-4 py-12'>
					<PortfolioStaticGrid projects={projects} />
				</div>
			</main>
			<Cta
				title="Let's Work Together"
				description='Have a project in mind? Our team of expert designers is ready to bring your vision to life.'
				buttonText='Start a Project'
				backgroundColor='bg-gray-100'
				textColor='text-gray-700'
				buttonBgColor='bg-[#E63946]'
				buttonTextColor='text-white'
			/>
			<Footer />
		</div>
	);
}
