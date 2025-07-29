'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			// Reset form
			setFormData({
				name: '',
				email: '',
				phone: '',
				message: '',
			});

			toast.success("Message sent successfully! We'll get back to you soon.");
		} catch (error) {
			toast.error('Failed to send message. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6 w-full max-w-lg'>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Full Name *
				</label>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					placeholder='Your name'
					required
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Email Address *
				</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='Your email'
					required
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Phone Number *
				</label>
				<input
					type='tel'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					placeholder='Your phone number'
					required
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				/>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Message *
				</label>
				<textarea
					name='message'
					value={formData.message}
					onChange={handleChange}
					rows={4}
					placeholder='Tell us about your project'
					required
					className='w-full border border-gray-300 px-4 py-2 rounded-md focus:border-red-500 focus:outline-none'
				></textarea>
			</div>
			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full bg-red-600 text-white font-medium py-3 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed'
			>
				{isSubmitting ? 'Sending...' : 'Send Message'}
			</button>
		</form>
	);
};

export default ContactForm;
