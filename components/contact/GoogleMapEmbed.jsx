import React from 'react';

const GoogleMapEmbed = () => (
	<div className='w-full h-64 rounded-lg overflow-hidden mt-8'>
		<iframe
			src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.909503417734!2d72.87118235!3d19.07598485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5dafd802268762a!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1719504899988!5m2!1sen!2sus'
			width='100%'
			height='100%'
			style={{ border: 0 }}
			allowFullScreen=''
			loading='lazy'
		></iframe>
	</div>
);

export default GoogleMapEmbed;
