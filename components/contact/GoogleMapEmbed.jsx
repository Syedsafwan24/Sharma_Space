'use client';
import React, { useState } from 'react';

const GoogleMapEmbed = () => {
	// Address and business information
	const address = 'HSR Layout, Mangammana Palya, Bangalore, Karnataka 560068';
	const businessName = 'Sharma Space';
	const phone = '+91 886 757 4542';

	// Google Maps links for navigation
	const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		address
	)}`;
	const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
		address
	)}`;

	const [copied, setCopied] = useState(false);

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(address);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='w-full mt-8'>
			{/* Custom Map Illustration - CSP Compliant */}
			<div className='relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-green-50'>
				{/* Map Background Pattern */}
				<div className='absolute inset-0 opacity-10'>
					<svg width='100%' height='100%' viewBox='0 0 400 300'>
						{/* Grid pattern */}
						<defs>
							<pattern
								id='grid'
								width='20'
								height='20'
								patternUnits='userSpaceOnUse'
							>
								<path
									d='M 20 0 L 0 0 0 20'
									fill='none'
									stroke='currentColor'
									strokeWidth='0.5'
								/>
							</pattern>
						</defs>
						<rect width='100%' height='100%' fill='url(#grid)' />

						{/* Road lines */}
						<path
							d='M0 100 Q200 80 400 120'
							stroke='#6b7280'
							strokeWidth='2'
							fill='none'
						/>
						<path
							d='M0 200 Q150 180 400 190'
							stroke='#6b7280'
							strokeWidth='2'
							fill='none'
						/>
						<path
							d='M100 0 Q120 150 140 300'
							stroke='#6b7280'
							strokeWidth='2'
							fill='none'
						/>
						<path
							d='M250 0 Q270 150 290 300'
							stroke='#6b7280'
							strokeWidth='2'
							fill='none'
						/>
					</svg>
				</div>

				{/* Location Marker */}
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<div className='relative'>
						{/* Pulsing circle */}
						<div className='absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75 w-8 h-8'></div>
						{/* Main marker */}
						<div className='relative bg-red-600 rounded-full w-8 h-8 flex items-center justify-center'>
							<svg
								className='w-5 h-5 text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						{/* Business label */}
						<div className='absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-1 text-sm font-medium text-gray-900 whitespace-nowrap'>
							{businessName}
						</div>
					</div>
				</div>

				{/* Decorative elements */}
				<div className='absolute top-4 right-4 text-gray-400'>
					<svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
						<path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>
				</div>

				{/* Interactive overlay */}
				<div
					className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 cursor-pointer group'
					onClick={() => window.open(mapsLink, '_blank', 'noopener,noreferrer')}
				>
					<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						<div className='bg-white rounded-lg p-4 shadow-xl border'>
							<p className='text-sm text-gray-600 mb-2'>
								Click to open in Maps
							</p>
							<div className='flex space-x-2'>
								<span className='inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded'>
									<svg
										className='w-3 h-3 mr-1'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
											clipRule='evenodd'
										/>
									</svg>
									View
								</span>
								<span className='inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded'>
									<svg
										className='w-3 h-3 mr-1'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path
											fillRule='evenodd'
											d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
									Directions
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Address Information Card */}
			<div className='mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden'>
				<div className='p-6'>
					<div className='flex items-start justify-between'>
						<div className='flex-1'>
							<h4 className='text-lg font-semibold text-gray-900 mb-1'>
								{businessName}
							</h4>
							<div className='flex items-start text-gray-600 mb-3'>
								<svg
									className='w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
										clipRule='evenodd'
									/>
								</svg>
								<span>{address}</span>
							</div>

							<div className='flex items-center text-gray-600 mb-3'>
								<svg
									className='w-5 h-5 text-gray-400 mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
										clipRule='evenodd'
									/>
								</svg>
								<span>Mon-Sat: 10 AM - 7 PM</span>
							</div>

							<div className='flex items-center text-gray-600'>
								<svg
									className='w-5 h-5 text-gray-400 mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
								</svg>
								<a
									href={`tel:${phone}`}
									className='hover:text-blue-600 transition-colors'
								>
									{phone}
								</a>
							</div>
						</div>

						<div className='flex flex-col space-y-2 ml-4'>
							<a
								href={mapsLink}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors'
							>
								<svg
									className='w-4 h-4 mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
										clipRule='evenodd'
									/>
								</svg>
								View Maps
							</a>

							<a
								href={directionsLink}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors'
							>
								<svg
									className='w-4 h-4 mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
								Directions
							</a>

							<button
								onClick={handleCopyAddress}
								className={`inline-flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
									copied
										? 'bg-green-600 text-white'
										: 'bg-gray-600 text-white hover:bg-gray-700'
								}`}
							>
								<svg
									className='w-4 h-4 mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									{copied ? (
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									) : (
										<>
											<path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
											<path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
										</>
									)}
								</svg>
								{copied ? 'Copied!' : 'Copy Address'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoogleMapEmbed;
