import Footer from '@/components/Footer';
import OurJourney from '@/components/about/OurJourney';
import OurStory from '@/components/about/OurStory';
import OurMissionVision from '@/components/about/OurMissionVision';
import TeamSection from '@/components/about/TeamSection';
import Cta from '@/components/Cta';

export const metadata = {
	title: 'About Us - Interior Designers in Bangalore',
	description:
		"Learn about Sharma Space's 10+ years of interior design expertise in Bangalore. 150+ projects completed, 500+ happy clients across residential and commercial spaces.",
	other: {
		'application/ld+json': JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Sharma Space',
			url: 'https://sharmaspace.in/about',
			logo: '/public/images/icon/SharmaSpace-Logo.webp',
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

export default function About() {
	return (
		<div className='bg-gray-50'>
			<main>
				<OurStory />
				<OurJourney />
				<OurMissionVision />
				<TeamSection />
				<Cta
					title='Ready to Work with Us?'
					description='Contact our team today to discuss your project and how we can help bring your vision to life.'
					buttonText='Get in Touch'
					buttonLink='/contact'
				/>
			</main>
			<Footer />
		</div>
	);
}
