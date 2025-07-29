import AboutSection from '@/components/AboutSection';
import Cta from '@/components/Cta';
import DesignInsights from '@/components/DesignInsights';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import PartnerBrands from '@/components/PartnerBrands';
import Portfolio from '@/components/PortfolioSection';
import Process from '@/components/Process';
import Services from '@/components/services/Services';
import Testimonials from '@/components/Testimonials';
import WelcomeModal from '@/components/WelcomeModal';
import { MessageCircle, Instagram, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import {
	fetchServices,
	fetchTestimonials,
	fetchProjects,
	fetchBlogPosts,
	fetchCompanyStats,
} from '@/lib/utils';
import brandsData from '@/app/data/company/brands.json';

// Enable ISR for homepage
export const revalidate = 1800; // Revalidate every 30 minutes

export default async function Home() {
	// Fetch dynamic data with caching - prioritize hero and above-fold content
	const [services, testimonials, projects, blogPosts, companyData] =
		await Promise.all([
			fetchServices(),
			fetchTestimonials(),
			fetchProjects(),
			fetchBlogPosts(),
			fetchCompanyStats(),
		]);

	return (
		<div className='relative'>
			{/* Main content */}
			<main className='hero-container'>
				<Hero />
				<AboutSection
					companyStats={companyData.stats}
					companyInfo={companyData.companyInfo}
				/>
				<Services services={services} />
				<Process />
				<PartnerBrands partnerBrands={brandsData.partnerBrands} />
				<DesignInsights blogPosts={blogPosts} />
				<Portfolio projects={projects} />
				<Testimonials testimonials={testimonials} />
				<Cta />
			</main>

			{/* Footer component */}
			<Footer />

			{/* Floating Social Icons (kept here for homepage-specific rendering) */}
			<div className='fixed right-6 bottom-6 flex flex-col gap-3 z-50'>
				{/* Enhanced WhatsApp */}
				<a
					href='https://wa.me/+919876543210'
					target='_blank'
					rel='noopener noreferrer'
					className='group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white no-underline shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-500/30 hover:bg-green-600 animate-pulse'
				>
					<MessageCircle
						size={26}
						className='group-hover:scale-110 transition-transform duration-200'
					/>
					{/* Pulsing ring effect */}
					<div className='absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping'></div>
					{/* Notification badge */}
					<div className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce'>
						<span className='text-xs font-bold text-white'>1</span>
					</div>
				</a>

				{/* Instagram */}
				<a
					href='https://instagram.com/sharmaspace'
					target='_blank'
					rel='noopener noreferrer'
					className='w-14 h-14 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white no-underline shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/30'
				>
					<Instagram size={26} />
				</a>
			</div>

			{/* Welcome Modal */}
			<WelcomeModal />
		</div>
	);
}

export const metadata = {
	title:
		'Sharma Space | Interior Designers in Bangalore - Residential & Commercial',
	description:
		'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts. Book a free consultation today!',
	openGraph: {
		title: 'Sharma Space | Interior Designers in Bangalore',
		description:
			'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts.',
		images: [
			{
				url: '/public/images/AboutSection.webp',
				width: 1200,
				height: 630,
				alt: 'Sharma Space team at work in Bangalore interior design project',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sharma Space | Interior Designers in Bangalore',
		description:
			'Award-winning interior designers in Bangalore. 150+ projects, 500+ happy clients. Residential, commercial, modular kitchen, and renovation experts.',
		image: '/public/images/AboutSection.webp',
	},
	alternates: {
		canonical: '/',
	},
	other: {
		'application/ld+json': JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Sharma Space',
			url: 'https://sharmaspace.in/',
			logo: '/public/images/icon/SharmaSpace-Logo.webp',
			contactPoint: [
				{
					'@type': 'ContactPoint',
					telephone: '+91 886 757 4542',
					contactType: 'customer service',
					areaServed: 'IN',
					availableLanguage: ['English', 'Hindi'],
				},
			],
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'HSR Layout, Mangammana Palya',
				addressLocality: 'Bangalore',
				addressRegion: 'KA',
				postalCode: '560068',
				addressCountry: 'IN',
			},
			sameAs: [
				'https://instagram.com/sharmaspace',
				'https://facebook.com/sharmaspace',
				'https://youtube.com/@sharmaspace',
			],
		}),
	},
};
