import React from 'react';

const GoogleMapEmbed = () => (
	<div className='w-full h-64 rounded-lg overflow-hidden mt-8'>
		<iframe
			src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9969406827915!2d72.8776559758762!3d19.076090982060827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c6f8b1f2a3%3A0x9c8b9c9c9c9c9c9c!2s123%20Design%20Avenue%2C%20Mumbai%2C%20Maharashtra%20400001%2C%20India!5e0!3m2!1sen!2sus!4v1719504899988!5m2!1sen!2sus'
			width='100%'
			height='100%'
			style={{ border: 0 }}
			allowFullScreen=''
			loading='lazy'
			referrerPolicy='no-referrer-when-downgrade'
			title='Sharma Space Office Location - 123 Design Avenue, Mumbai'
		></iframe>
	</div>
);

export default GoogleMapEmbed;
