// app/portfolio/page.js - SSG Version
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import { getBaseUrl } from '@/lib/utils';

// Static Generation with Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

async function getProjects() {
	try {
		const baseUrl = getBaseUrl();
		const res = await fetch(`${baseUrl}/api/projects`, {
			next: { revalidate: 3600 }, // Cache for 1 hour
		});

		if (!res.ok) {
			throw new Error('Failed to fetch projects');
		}

		return await res.json();
	} catch (error) {
		return [];
	}
}

export const metadata = {
	title: 'Portfolio - Sharma Space | Interior Design Bangalore',
	description:
		"Explore Sharma Space's portfolio of interior design projects in Bangalore. See our work in residential, commercial, and modular spaces. 150+ projects delivered.",
	// ... rest of metadata
};

export default async function PortfolioPage() {
	// Pre-fetch data at build time
	const projects = await getProjects();

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-grow'>
				<HeroPortfolio />
				<div className='container mx-auto px-4 py-12'>
					<PortfolioGrid projects={projects} />
				</div>
			</main>
			<Cta />
			<Footer />
		</div>
	);
}
