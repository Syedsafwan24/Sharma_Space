import React from 'react';
import ContactHeroText from './ContactHeroText';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import GoogleMapEmbed from './GoogleMapEmbed';
import SocialFollow from './SocialFollow';

const HeroContact = () => (
	<div className='min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8'>
		<div className='max-w-6xl mx-auto'>
			<div className='grid md:grid-cols-2 gap-12'>
				<div>
					<ContactHeroText />
					<ContactForm />
				</div>
				<div>
					<ContactDetails />
					<GoogleMapEmbed />
				</div>
			</div>

			<div className='mt-12 border-t pt-8'>
				<SocialFollow />
				<p className='text-xs text-gray-500 text-center mt-6'>
					Keyboard shortcuts · Map data ©2025 · Terms · Report a map error
				</p>
			</div>
		</div>
	</div>
);

export default HeroContact;
