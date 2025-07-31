'use client';

// Critical components that should load immediately
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Portfolio from '@/components/PortfolioSection';
import Services from '@/components/services/Services';

// Lazy loaded components for better performance
import {
	LazyAboutSection,
	LazyDesignInsights,
	LazyTestimonials,
	LazyPartnerBrands,
	LazyProcess,
	LazyWelcomeModal,
} from '@/components/LazyComponents';

import { MessageCircle, Instagram, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useOptimizedHomepageData } from '@/hooks/useOptimizedHomepageData';
import { useNavigation } from '@/components/providers/NavigationContext';
import brandsData from '@/app/data/company/brands.json';

export default function Home() {
	// Use optimized cached data with priority-based loading
	const {
		services,
		testimonials,
		projects,
		blogPosts,
		companyData,
		loading,
		error,
	} = useOptimizedHomepageData();

	// Get mobile menu state from navigation context
	const { isMobileMenuOpen } = useNavigation();

	if (loading) {
		return (
			<div className='relative'>
				<main className='hero-container'>
					{/* Hero with loading state */}
					<Hero />

					{/* Mobile-optimized loading skeletons */}
					<div className='animate-pulse px-4 sm:px-6'>
						{/* About Section Skeleton */}
						<div className='py-8 sm:py-12'>
							<div className='h-6 sm:h-8 bg-gray-200 rounded-lg mb-4 mx-auto w-48'></div>
							<div className='h-4 bg-gray-200 rounded-lg mb-2 w-full max-w-md mx-auto'></div>
							<div className='h-4 bg-gray-200 rounded-lg mb-6 w-3/4 max-w-sm mx-auto'></div>
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className='h-16 sm:h-20 bg-gray-200 rounded-lg'
									></div>
								))}
							</div>
						</div>

						{/* Services Section Skeleton */}
						<div className='py-8 sm:py-12'>
							<div className='h-6 sm:h-8 bg-gray-200 rounded-lg mb-6 mx-auto w-32'></div>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
								{[1, 2, 3].map((i) => (
									<div
										key={i}
										className='h-32 sm:h-40 bg-gray-200 rounded-lg'
									></div>
								))}
							</div>
						</div>

						{/* Portfolio Section Skeleton */}
						<div className='py-8 sm:py-12'>
							<div className='h-6 sm:h-8 bg-gray-200 rounded-lg mb-6 mx-auto w-40'></div>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{[1, 2].map((i) => (
									<div
										key={i}
										className='h-48 sm:h-56 bg-gray-200 rounded-lg'
									></div>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}

	if (error) {
		return (
			<div className='relative'>
				<main className='hero-container'>
					<Hero />
					<div className='text-center py-8'>
						<p className='text-red-500'>Error loading data: {error}</p>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className='relative'>
			{/* Main content */}
			<main className='hero-container'>
				<Hero />
				<LazyAboutSection
					companyStats={companyData.stats}
					companyInfo={companyData.companyInfo}
				/>
				<Services services={services} />
				<LazyProcess />
				<LazyPartnerBrands partnerBrands={brandsData.partnerBrands} />
				<LazyDesignInsights blogPosts={blogPosts} projects={projects} />
				<Portfolio projects={projects} />
				<LazyTestimonials testimonials={testimonials} />
				<Cta />
			</main>

			{/* Footer component */}
			<Footer />

			{/* Floating Social Icons - Show on desktop always, on mobile only when menu is closed */}
			<div
				className={`fixed right-6 bottom-6 flex-col gap-3 z-50 ${
					isMobileMenuOpen ? 'hidden' : 'flex lg:flex'
				}`}
			>
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
			<LazyWelcomeModal />
		</div>
	);
}
