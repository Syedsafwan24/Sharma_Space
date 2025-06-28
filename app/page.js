import AboutSection from '@/components/AboutSection';
import Cta from '@/components/Cta';
import DesignInsights from '@/components/DesignInsights';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import PartnerBrands from '@/components/PartnerBrands';
import Portfolio from '@/components/PortfolioSection';
import Process from '@/components/Process';
import Services from '@/components/services/Services';
import Testimonials from '@/components/Testimonials';
import WelcomeModal from '@/components/WelcomeModal';
import { MessageCircle, Instagram, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='relative'>
			{/* Navigation component */}
			<Navigation />

			{/* Main content */}
			<main>
				<Hero />
				<AboutSection />
				<Services />
				<Process />
				<PartnerBrands />
				<DesignInsights />
				<Portfolio />
				<Testimonials />
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
