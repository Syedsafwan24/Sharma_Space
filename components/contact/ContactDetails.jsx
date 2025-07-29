import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Item = ({ icon: Icon, title, children }) => (
	<div className='flex items-start space-x-4'>
		<div className='bg-red-100 text-red-600 rounded-full p-3'>
			<Icon size={16} />
		</div>
		<div>
			<h4 className='text-base font-semibold text-gray-900 mb-0.5'>{title}</h4>
			<p className='text-sm text-gray-600'>{children}</p>
		</div>
	</div>
);

const ContactDetails = () => (
	<div className='space-y-6'>
		<h1 className='text-4xl font-bold text-gray-900 mb-6'>
			Contact Information
		</h1>

		<Item icon={FaMapMarkerAlt} title='Our Office'>
			<a
				href='https://www.google.com/maps/search/?api=1&query=HSR+Layout,+Mangammana+Palya,+Bangalore,+Karnataka,+India+560068'
				target='_blank'
				rel='noopener noreferrer'
				className='text-red-600 hover:text-red-700 transition-colors duration-200'
			>
				HSR Layout, Mangammana Palya, Bangalore, Karnataka 560068
			</a>
		</Item>
		<Item icon={FaPhone} title='Phone'>
			<a
				href='tel:+918867574542'
				className='text-red-600 hover:text-red-700 transition-colors duration-200'
			>
				+91 886 757 4542
			</a>
		</Item>
		<Item icon={FaEnvelope} title='Email'>
			<a
				href='mailto:info@sharmaspace.in'
				className='text-red-600 hover:text-red-700 transition-colors duration-200'
			>
				info@sharmaspace.in
			</a>
		</Item>
		<Item icon={FaClock} title='Working Hours'>
			Mon-Sat: 10 AM - 7 PM
		</Item>
	</div>
);

export default ContactDetails;
