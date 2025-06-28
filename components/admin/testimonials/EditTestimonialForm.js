'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const EditTestimonialForm = ({ testimonial, onClose }) => {
	const isEditMode = !!testimonial;
	const [formData, setFormData] = useState({
		name: testimonial?.name || '',
		fullName: testimonial?.fullName || '',
		location: testimonial?.location || '',
		city: testimonial?.city || '',
		state: testimonial?.state || '',
		rating: testimonial?.rating || 5,
		image: testimonial?.image?.url || testimonial?.image || '',
		text: testimonial?.text || '',
		shortText: testimonial?.shortText || '',
		projectType: testimonial?.projectType || '',
		projectTitle: testimonial?.projectTitle || '',
		featured: testimonial?.featured || false,
		verified: testimonial?.verified || true,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			isEditMode ? 'Form submitted for edit:' : 'Form submitted for add:',
			formData
		);
		// Here you would typically send data to your backend
		onClose();
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Client Name (Short)
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
							placeholder='e.g., Priya S.'
						/>
					</div>
					<div>
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
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
					<div>
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
						/>
					</div>
					<div>
						<label
							htmlFor='city'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							City
						</label>
						<input
							type='text'
							id='city'
							name='city'
							value={formData.city}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
							placeholder='e.g., Mumbai'
						/>
					</div>
					<div>
						<label
							htmlFor='state'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							State
						</label>
						<input
							type='text'
							id='state'
							name='state'
							value={formData.state}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
							placeholder='e.g., Maharashtra'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
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
						/>
					</div>
					<div>
						<label
							htmlFor='projectType'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Project Type
						</label>
						<select
							id='projectType'
							name='projectType'
							value={formData.projectType}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						>
							<option value=''>Select Project Type</option>
							<option value='Residential'>Residential</option>
							<option value='Commercial'>Commercial</option>
							<option value='Hospitality'>Hospitality</option>
						</select>
					</div>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='projectTitle'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Project Title
					</label>
					<input
						type='text'
						id='projectTitle'
						name='projectTitle'
						value={formData.projectTitle}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						placeholder='e.g., Modern Apartment Design'
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
						placeholder='Enter image URL'
					/>
					{formData.image && (
						<div className='mt-2 w-20 h-20 rounded-full overflow-hidden border border-gray-200'>
							<Image
								src={formData.image}
								alt='Client Preview'
								width={80}
								height={80}
								className='object-cover w-full h-full'
							/>
						</div>
					)}
				</div>

				<div className='mb-4'>
					<label
						htmlFor='shortText'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Short Testimonial Text
					</label>
					<textarea
						id='shortText'
						name='shortText'
						value={formData.shortText}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-20 resize-y'
						placeholder='Brief testimonial for cards/summaries'
					></textarea>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='text'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Full Testimonial Text
					</label>
					<textarea
						id='text'
						name='text'
						value={formData.text}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-32 resize-y'
						placeholder='Complete testimonial text'
					></textarea>
				</div>

				<div className='flex items-center gap-4 mb-6'>
					<label className='flex items-center'>
						<input
							type='checkbox'
							name='featured'
							checked={formData.featured}
							onChange={handleChange}
							className='mr-2'
						/>
						<span className='text-sm text-gray-700'>Featured Testimonial</span>
					</label>
					<label className='flex items-center'>
						<input
							type='checkbox'
							name='verified'
							checked={formData.verified}
							onChange={handleChange}
							className='mr-2'
						/>
						<span className='text-sm text-gray-700'>Verified Client</span>
					</label>
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
					>
						{isEditMode ? 'Save Testimonial' : 'Add Testimonial'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditTestimonialForm;
