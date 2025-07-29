import React from 'react';

const MapFallback = () => {
	const address = 'HSR Layout, Mangammana Palya, Bangalore, Karnataka 560068';
	const businessName = 'Sharma Space';

	// Different map providers as fallbacks
	const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		address
	)}`;
	const appleMapsLink = `https://maps.apple.com/?q=${encodeURIComponent(
		address
	)}`;

	return (
		<div className='w-full mt-8'>
			{/* Static Map Image as a visual placeholder */}
			<div className='relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 border'>
				<div
					className='w-full h-full bg-cover bg-center'
					style={{
						backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
							address
						)}&zoom=15&size=800x400&markers=color:red%7C${encodeURIComponent(
							address
						)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgkGVgVr0MI)`,
					}}
				>
					{/* Overlay for interactive actions */}
					<div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
						<div className='text-center'>
							<p className='text-white text-lg font-semibold mb-4'>
								Click to open in Maps
							</p>
							<div className='space-x-4'>
								<a
									href={googleMapsLink}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors'
								>
									Google Maps
								</a>
								<a
									href={appleMapsLink}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors'
								>
									Apple Maps
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Address information below map */}
			<div className='mt-4 p-4 bg-gray-50 rounded-lg'>
				<h4 className='font-semibold text-gray-900 mb-2'>{businessName}</h4>
				<p className='text-gray-600 mb-3'>{address}</p>
				<div className='flex flex-wrap gap-2'>
					<a
						href={googleMapsLink}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
					>
						<svg
							className='w-4 h-4 mr-1'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
								clipRule='evenodd'
							/>
						</svg>
						Directions
					</a>
					<button
						onClick={() => {
							navigator.clipboard.writeText(address);
							alert('Address copied to clipboard!');
						}}
						className='inline-flex items-center px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
					>
						<svg
							className='w-4 h-4 mr-1'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
							<path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
						</svg>
						Copy Address
					</button>
				</div>
			</div>
		</div>
	);
};

export default MapFallback;
