import React from 'react';

const GoogleMapEmbedAlternative = () => {
	// Alternative approach using Google Maps embed with place ID
	const mapUrl =
		'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=HSR+Layout,+Mangammana+Palya,+Bangalore,+Karnataka+560068,+India';

	// Fallback to simple place search if API key is not available
	const fallbackUrl =
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4848815186547!2d77.64196931482231!3d12.912142990896447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae149569c6e8c5%3A0x4c54e5b6e5b6e5b6!2sHSR%20Layout%2C%20Mangammana%20Palya%2C%20Bengaluru%2C%20Karnataka%20560068%2C%20India!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus';

	return (
		<div className='w-full h-64 rounded-lg overflow-hidden mt-8'>
			<iframe
				src={fallbackUrl}
				width='100%'
				height='100%'
				style={{ border: 0 }}
				allowFullScreen=''
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
				title='Sharma Space Office Location - HSR Layout, Mangammana Palya, Bangalore'
			></iframe>
		</div>
	);
};

export default GoogleMapEmbedAlternative;
