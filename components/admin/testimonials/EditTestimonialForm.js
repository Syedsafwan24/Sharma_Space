'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const EditTestimonialForm = ({ testimonial, onClose, refetchTestimonials }) => {
	const isEditMode = !!testimonial;
	const [formData, setFormData] = useState({
		fullName: testimonial?.fullName || testimonial?.name || '',
		location: testimonial?.location || '',
		rating: testimonial?.rating || 5,
		image: testimonial?.image?.url || testimonial?.image || '',
		text: testimonial?.text || '',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const method = isEditMode ? 'PUT' : 'POST';
			const url = '/api/testimonials';
			const body = isEditMode ? { ...formData, id: testimonial.id } : formData;
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const error = await res.json();
				alert('Error: ' + (error.error || 'Failed to save testimonial'));
				return;
			}
			if (refetchTestimonials) refetchTestimonials();
			onClose();
		} catch (err) {
			alert('Error: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6'>
			<h2 className='text-2xl font-bold text-[#1C1C1C] mb-4'>
				{isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
			</h2>
			<p className='text-gray-600 mb-6'>
				{isEditMode
					? 'Update the details for this testimonial.'
					: 'Fill in the details for the new testimonial.'}
			</p>

			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='fullName'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Full Name
					</label>
					<input
						type='text'
						id='fullName'
						name='fullName'
						value={formData.fullName}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						placeholder='e.g., Priya Sharma'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='location'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Location
					</label>
					<input
						type='text'
						id='location'
						name='location'
						value={formData.location}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						placeholder='e.g., Mumbai'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='rating'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Rating (1-5)
					</label>
					<input
						type='number'
						id='rating'
						name='rating'
						value={formData.rating}
						onChange={handleChange}
						min='1'
						max='5'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='image'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Client Image URL
					</label>
					<input
						type='text'
						id='image'
						name='image'
						value={formData.image}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						placeholder='e.g., /images/testimonials/priya.jpg'
						required
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='text'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Testimonial Text
					</label>
					<textarea
						id='text'
						name='text'
						value={formData.text}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-28 resize-none'
						placeholder='What did the client say?'
						required
					></textarea>
				</div>
				<div className='flex justify-end gap-4'>
					<button
						type='button'
						onClick={onClose}
						className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='px-6 py-2 bg-[#E63946] hover:bg-[#D62828] text-white rounded-md transition-colors duration-200'
						disabled={loading}
					>
						{loading
							? isEditMode
								? 'Saving...'
								: 'Adding...'
							: isEditMode
							? 'Save Testimonial'
							: 'Add Testimonial'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditTestimonialForm;
