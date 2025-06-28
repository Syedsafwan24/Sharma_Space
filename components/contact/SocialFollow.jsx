import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';

const SocialFollow = () => (
	<div className='text-center'>
		<p className='text-base font-semibold text-gray-900 mb-4'>Follow Us</p>
		<div className='flex justify-center space-x-4'>
			{[FaInstagram, FaFacebookF, FaYoutube, FaTwitter].map((Icon, i) => (
				<a
					key={i}
					href='#'
					className='bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition'
				>
					<Icon size={16} />
				</a>
			))}
		</div>
	</div>
);

export default SocialFollow;
