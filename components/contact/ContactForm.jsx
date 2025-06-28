import React from 'react';

const ContactForm = () => {
	return (
		<form className='space-y-6 w-full max-w-lg'>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Full Name
				</label>
				<input
					type='text'
					placeholder='Your name'
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Email Address
				</label>
				<input
					type='email'
					placeholder='Your email'
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Phone Number
				</label>
				<input
					type='tel'
					placeholder='Your phone number'
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Message
				</label>
				<textarea
					rows={4}
					placeholder='Tell us about your project'
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				></textarea>
			</div>
			<button
				type='submit'
				className='w-full bg-red-600 text-white font-medium py-3 rounded-md hover:bg-red-700 transition'
			>
				Send Message
			</button>
		</form>
	);
};

export default ContactForm;
