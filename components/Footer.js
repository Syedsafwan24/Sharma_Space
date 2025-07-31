'use client'; // Ensure this is at the very top for client components

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
	const quickLinks = [
		'Home',
		'About',
		'Services',
		'Portfolio',
		'Blog',
		'Contact',
	];

	const services = [
		'Residential Design',
		'Commercial Design',
		'Hospitality Design',
		'Space Planning',
		'Furniture Selection',
		'Renovation Consultation',
	];

	const contactInfo = [
		{
			icon: MapPin,
			text: '123 Design Avenue, Mumbai, Maharashtra, India 400001',
			iconClass: 'flex-shrink-0',
		},
		{
			icon: Phone,
			text: '+91 98765 43210',
			iconClass: 'flex-shrink-0',
		},
		{
			icon: Mail,
			text: 'info@sharmaspace.in',
			iconClass: 'flex-shrink-0',
		},
		{
			icon: Clock,
			text: 'Mon-Sat: 10 AM - 7 PM',
			iconClass: 'flex-shrink-0',
		},
	];

	const legalLinks = ['Privacy Policy', 'Terms of Service', 'Sitemap'];

	return (
		<>
			<footer className='bg-[#1F1F1F] text-white py-12 md:py-20'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12'>
						{/* Company Info with Logo and "Sharma Space" text */}
						<div className='flex flex-col items-start'>
							<Link
								href='/'
								className='flex items-center gap-2 mb-4 transition-transform duration-300 hover:scale-105'
							>
								<div className='w-10 h-10 bg-red-600 rounded-md flex items-center justify-center p-1'>
									<Image
										src='/images/icon/SharmaSpace-Logo.webp'
										alt='SharmaSpace Logo'
										width={40}
										height={40}
										className='w-full h-full object-contain'
									/>
								</div>
								<span className='text-2xl font-bold text-white'>
									Sharma Space
								</span>
							</Link>
							<p className='text-sm leading-relaxed text-gray-300'>
								Creating functional and beautiful spaces that reflect your
								personality and enhance your lifestyle.
							</p>
						</div>

						{/* Quick Links */}
						<div>
							<h2 className='text-xl font-semibold mb-5'>Quick Links</h2>
							<ul className='list-none p-0 m-0 space-y-3'>
								{quickLinks.map((link, index) => (
									<li key={index}>
										<Link
											href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
											className='text-gray-300 no-underline text-base transition-colors duration-300 hover:text-red-400'
											aria-label={`Go to ${link} page`}
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Services */}
						<div>
							<h2 className='text-xl font-semibold mb-5'>Services</h2>
							<ul className='list-none p-0 m-0 space-y-3'>
								{services.map((service, index) => (
									<li key={index}>
										<Link
											href='/services'
											className='text-gray-300 no-underline text-base transition-colors duration-300 hover:text-red-400'
											aria-label={`Learn more about our ${service} service`}
										>
											{service}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contact Info with Icons */}
						<div>
							<h2 className='text-xl font-semibold mb-5'>Contact Us</h2>
							<ul className='list-none p-0 m-0 space-y-3'>
								<li className='flex items-start gap-4'>
									<MapPin
										size={18}
										className='text-red-600 flex-shrink-0 mt-1'
									/>
									<a
										href='https://www.google.com/maps/search/?api=1&query=123+Design+Avenue,+Mumbai,+Maharashtra,+India+400001'
										target='_blank'
										rel='noopener noreferrer'
										className='text-gray-300 text-base leading-relaxed hover:text-red-400 transition-colors duration-300'
										aria-label='View location on Google Maps: 123 Design Avenue, Mumbai, Maharashtra, India 400001'
									>
										123 Design Avenue, Mumbai, Maharashtra, India 400001
									</a>
								</li>
								<li className='flex items-start gap-4'>
									<Phone
										size={18}
										className='text-red-600 flex-shrink-0 mt-1'
									/>
									<a
										href='tel:+919876543210'
										className='text-gray-300 text-base leading-relaxed hover:text-red-400 transition-colors duration-300'
										aria-label='Call Sharma Space at +91 98765 43210'
									>
										+91 98765 43210
									</a>
								</li>
								<li className='flex items-start gap-4'>
									<Mail size={18} className='text-red-600 flex-shrink-0 mt-1' />
									<a
										href='mailto:info@sharmaspace.in'
										className='text-gray-300 text-base leading-relaxed hover:text-red-400 transition-colors duration-300'
										aria-label='Email Sharma Space at info@sharmaspace.in'
									>
										info@sharmaspace.in
									</a>
								</li>
								<li className='flex items-start gap-4'>
									<Clock
										size={18}
										className='text-red-600 flex-shrink-0 mt-1'
									/>
									<span className='text-gray-300 text-base leading-relaxed'>
										Mon-Sat: 10 AM - 7 PM
									</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Footer */}
					<div className='border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4'>
						<p className='text-gray-300 text-sm m-0'>
							© {new Date().getFullYear()} Sharma Space. All rights reserved.
						</p>
						<div className='flex flex-wrap justify-center md:justify-start gap-4'>
							{legalLinks.map((link, index) => (
								<Link
									key={index}
									href={
										link === 'Privacy Policy'
											? '/privacy-policy'
											: link === 'Terms of Service'
												? '/terms-of-service'
												: '/sitemap'
									}
									className='text-gray-300 no-underline text-sm hover:text-white transition-colors duration-300'
								>
									{link}
								</Link>
							))}
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
