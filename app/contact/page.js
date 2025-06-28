// pages/contact.js (or app/contact/page.js for App Router)
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
// Import the specific hero header for the contact page
import HeroContactHeader from '@/components/contact/HeroContactHeader'; // This is the component with "Contact Us" title
// Import the main contact content block
import HeroContact from '@/components/contact/HeroContact'; // This is the component that holds the form, details, map, social follow

export const metadata = {
	title: 'Contact Interior Designers in Bangalore | Free Consultation',
	description:
		'Contact Sharma Space for interior design consultation in Bangalore. Call +91 98765 43210 or visit us at 123 Design Avenue, Mumbai. Free consultation available.',
};

export default function Contact() {
	return (
		<div className='bg-gray-50'>
			<Navigation />
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
