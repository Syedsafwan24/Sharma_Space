import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';

const SocialFollow = () => {
	const socialLinks = [
		{ Icon: FaInstagram, href: 'https://instagram.com/sharmaspace' },
		{ Icon: FaFacebookF, href: 'https://facebook.com/sharmaspace' },
		{ Icon: FaYoutube, href: 'https://youtube.com/@sharmaspace' },
		{ Icon: FaTwitter, href: 'https://twitter.com/sharmaspace' },
	];

	return (
		<div className='text-center'>
			<p className='text-base font-semibold text-gray-900 mb-4'>Follow Us</p>
			<div className='flex justify-center space-x-4'>
				{socialLinks.map(({ Icon, href }, i) => (
					<a
						key={i}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className='bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition'
					>
						<Icon size={16} />
					</a>
				))}
			</div>
		</div>
	);
};

export default SocialFollow;
