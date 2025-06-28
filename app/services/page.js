// app/services/page.js
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import AlternatingServices from '@/components/services/AlternatingServices';
import DesignProcess from '@/components/services/DesignProcess';
import HeroService from '@/components/services/HeroService';
import ServicesSection from '@/components/services/ServicesSection';

export const metadata = {
	title:
		'Premium Interior Design Services | Residential & Commercial Solutions',
	description:
		'Expert interior design services specializing in modular kitchens, wardrobes, and space planning for homes and offices.',
	keywords: [
		'interior design services',
		'modular kitchen design',
		'wardrobe design',
		'residential interior design',
		'commercial space design',
		'space planning services',
		'home renovation',
	],
	openGraph: {
		title: 'Premium Interior Design Services',
		description: 'Complete interior design solutions for homes and offices',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Premium Interior Design Services',
		description: 'Complete interior design solutions for homes and offices',
	},
	alternates: {
		canonical: '/services',
	},
};

export default function Services() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Sharma Space',
		description: 'Professional interior design services',
		serviceType: 'Interior design',
		offers: {
			'@type': 'Offer',
			name: 'Interior Design Consultation',
		},
	};

	return (
		<>
			<Navigation />
			<HeroService />
			{/* Structured data for services */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ServicesSection />
			<AlternatingServices />
			<DesignProcess />
			<Cta
				title='Ready to Start Your Design Journey?'
				description='Contact us today to schedule a consultation and discuss how we can transform your space.'
				buttonText='Contact Us'
				buttonLink='/contact'
			/>
			<Footer />
		</>
	);
}
