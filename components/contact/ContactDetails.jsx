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
				href='https://www.google.com/maps/search/?api=1&query=123+Design+Avenue,+Mumbai,+Maharashtra,+India+400001'
				target='_blank'
				rel='noopener noreferrer'
				className='text-red-600 hover:text-red-700 transition-colors duration-200'
			>
				123 Design Avenue, Mumbai, Maharashtra, India 400001
			</a>
		</Item>
		<Item icon={FaPhone} title='Phone'>
			<a
				href='tel:+919876543210'
				className='text-red-600 hover:text-red-700 transition-colors duration-200'
			>
				+91 98765 43210
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
