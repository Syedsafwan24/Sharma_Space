// pages/contact.js (or app/contact/page.js for App Router)
import Footer from '@/components/Footer';
// Import the specific hero header for the contact page
import HeroContactHeader from '@/components/contact/HeroContactHeader'; // This is the component with "Contact Us" title
// Import the main contact content block
import HeroContact from '@/components/contact/HeroContact'; // This is the component that holds the form, details, map, social follow

export const metadata = {
	title: 'Contact Interior Designers in Bangalore | Free Consultation',
	description:
		'Contact Sharma Space for interior design consultation in Bangalore. Call +91 886 757 4542 or visit us at HSR Layout, Mangammana Palya, Bangalore, Karnataka 560068. Free consultation available.',
	other: {
		'application/ld+json': JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			'@id': 'https://sharmaspace.in/contact',
			name: 'Sharma Space',
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'HSR Layout, Mangammana Palya',
				addressLocality: 'Bangalore',
				addressRegion: 'KA',
				postalCode: '560068',
				addressCountry: 'IN',
			},
			telephone: '+91 886 757 4542',
			geo: {
				'@type': 'GeoCoordinates',
				latitude: 12.9121,
				longitude: 77.6446,
			},
			openingHoursSpecification: [
				{
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
			],
			areaServed: ['Bangalore', 'Whitefield', 'Indiranagar'],
			url: 'https://sharmaspace.in/contact',
		}),
	},
};

export default function Contact() {
	return (
		<div className='bg-gray-50'>
			<main>
				{/* The top banner/hero section for the Contact page */}
				<HeroContactHeader />

				{/* The main content section of the Contact page (form, details, map, social) */}
				<HeroContact />
			</main>
			<Footer />
			{/* Floating Social Icons */}
		</div>
	);
}
