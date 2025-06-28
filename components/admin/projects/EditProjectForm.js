'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle } from 'lucide-react';

const ImageInput = ({
	label,
	imageUrl,
	onImageUrlChange,
	onRemove,
	showRemove = false,
}) => {
	return (
		<div className='flex items-end gap-2 mb-4'>
			<div className='flex-1'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					{label}
				</label>
				<input
					type='text'
					value={imageUrl}
					onChange={(e) => onImageUrlChange(e.target.value)}
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
					placeholder='Enter image URL'
				/>
			</div>
			{imageUrl && (
				<div className='w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200'>
					<Image
						src={imageUrl}
						alt='Preview'
						width={80}
						height={80}
						className='object-cover w-full h-full'
					/>
				</div>
			)}
			{showRemove && (
				<button
					onClick={onRemove}
					className='p-2 text-gray-500 hover:text-[#E63946] transition-colors duration-200'
				>
					<MinusCircle size={20} />
				</button>
			)}
		</div>
	);
};

const EditProjectForm = ({ project, onClose }) => {
	const isEditMode = !!project;
	const [formData, setFormData] = useState({
		title: project?.title || '',
		location: project?.location || '',
		category: project?.category?.name || '',
		description: project?.description || '',
		shortDescription: project?.shortDescription || '',
		client: project?.client || '',
		completedDate: project?.completedDate || '',
		area: project?.area || '',
		videoUrl: project?.videoUrl || '',
		image: project?.image || '',
		coverImage: project?.coverImage || '',
		galleryImages: project?.galleryImages || [''],
		featured: project?.featured || false,
		services: project?.services || [''],
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleImageChange = (type, index, value) => {
		setFormData((prev) => {
			const newImages = [...prev[type]];
			newImages[index] = value;
			return { ...prev, [type]: newImages };
		});
	};

	const handleAddImage = (type) => {
		setFormData((prev) => ({ ...prev, [type]: [...prev[type], ''] }));
	};

	const handleRemoveImage = (type, index) => {
		setFormData((prev) => {
			const newImages = prev[type].filter((_, i) => i !== index);
			return { ...prev, [type]: newImages.length > 0 ? newImages : [''] };
		});
	};

	const handleServiceChange = (index, value) => {
		setFormData((prev) => {
			const newServices = [...prev.services];
			newServices[index] = value;
			return { ...prev, services: newServices };
		});
	};

	const handleAddService = () => {
		setFormData((prev) => ({ ...prev, services: [...prev.services, ''] }));
	};

	const handleRemoveService = (index) => {
		setFormData((prev) => {
			const newServices = prev.services.filter((_, i) => i !== index);
			return { ...prev, services: newServices.length > 0 ? newServices : [''] };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Clean up empty strings from arrays
		const cleanedData = {
			...formData,
			galleryImages: formData.galleryImages.filter((img) => img.trim() !== ''),
			services: formData.services.filter((service) => service.trim() !== ''),
		};

		console.log(
			isEditMode ? 'Form submitted for edit:' : 'Form submitted for add:',
			cleanedData
		);
		// Here you would typically send data to your backend
		onClose();
	};

	return (
		<div className='p-6'>
			<h2 className='text-2xl font-bold text-[#1C1C1C] mb-4'>
				{isEditMode ? 'Edit Project' : 'Add Project'}
			</h2>
			<p className='text-gray-600 mb-6'>
				{isEditMode
					? 'Update the details for this portfolio project.'
					: 'Fill in the details for the new portfolio project.'}
			</p>

			<form onSubmit={handleSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label
							htmlFor='title'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Project Title *
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						/>
					</div>
					<div>
						<label
							htmlFor='location'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Location *
						</label>
						<input
							type='text'
							id='location'
							name='location'
							value={formData.location}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						/>
					</div>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='category'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Category *
					</label>
					<select
						id='category'
						name='category'
						value={formData.category}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
					>
						<option value=''>Select Category</option>
						<option value='Residential'>Residential</option>
						<option value='Commercial'>Commercial</option>
						<option value='Hospitality'>Hospitality</option>
					</select>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='description'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Description *
					</label>
					<textarea
						id='description'
						name='description'
						value={formData.description}
						onChange={handleChange}
						required
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-32 resize-none'
					></textarea>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='shortDescription'
						className='block text-gray-700 text-sm font-bold mb-2'
					>
						Short Description
					</label>
					<textarea
						id='shortDescription'
						name='shortDescription'
						value={formData.shortDescription}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] h-20 resize-none'
						placeholder='Brief description for cards and previews'
					></textarea>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label
							htmlFor='client'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Client (Optional)
						</label>
						<input
							type='text'
							id='client'
							name='client'
							value={formData.client}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						/>
					</div>
					<div>
						<label
							htmlFor='completedDate'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Completion Date (Optional)
						</label>
						<input
							type='date'
							id='completedDate'
							name='completedDate'
							value={formData.completedDate}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label
							htmlFor='area'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Area (Optional)
						</label>
						<input
							type='text'
							id='area'
							name='area'
							value={formData.area}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
							placeholder='e.g., 1800 sq ft'
						/>
					</div>
					<div>
						<label
							htmlFor='videoUrl'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Video Walkthrough URL (Optional)
						</label>
						<input
							type='text'
							id='videoUrl'
							name='videoUrl'
							value={formData.videoUrl}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
							placeholder='YouTube embed URL'
						/>
					</div>
				</div>

				<div className='mb-4'>
					<label className='flex items-center'>
						<input
							type='checkbox'
							name='featured'
							checked={formData.featured}
							onChange={handleChange}
							className='mr-2 h-4 w-4 text-[#E63946] focus:ring-[#E63946] border-gray-300 rounded'
						/>
						<span className='text-gray-700 text-sm font-bold'>
							Featured Project (Show on homepage)
						</span>
					</label>
				</div>

				<ImageInput
					label='Main Image URL *'
					imageUrl={formData.image}
					onImageUrlChange={(url) =>
						setFormData((prev) => ({ ...prev, image: url }))
					}
				/>

				<ImageInput
					label='Cover Image URL (Optional)'
					imageUrl={formData.coverImage}
					onImageUrlChange={(url) =>
						setFormData((prev) => ({ ...prev, coverImage: url }))
					}
				/>

				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Gallery Images (Optional)
					</label>
					{formData.galleryImages.map((url, index) => (
						<ImageInput
							key={index}
							imageUrl={url}
							onImageUrlChange={(value) =>
								handleImageChange('galleryImages', index, value)
							}
							onRemove={() => handleRemoveImage('galleryImages', index)}
							showRemove={
								formData.galleryImages.length > 1 ||
								(formData.galleryImages.length === 1 && url !== '')
							}
						/>
					))}
					<button
						type='button'
						onClick={() => handleAddImage('galleryImages')}
						className='flex items-center gap-2 text-[#E63946] hover:text-[#D62828] font-medium text-sm'
					>
						<PlusCircle size={20} />
						Add Gallery Image
					</button>
				</div>

				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Services Offered (Optional)
					</label>
					{formData.services.map((service, index) => (
						<div key={index} className='flex items-end gap-2 mb-2'>
							<div className='flex-1'>
								<input
									type='text'
									value={service}
									onChange={(e) => handleServiceChange(index, e.target.value)}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C]'
									placeholder='e.g., Interior Design, Space Planning'
								/>
							</div>
							{formData.services.length > 1 && (
								<button
									type='button'
									onClick={() => handleRemoveService(index)}
									className='p-2 text-gray-500 hover:text-[#E63946] transition-colors duration-200'
								>
									<MinusCircle size={20} />
								</button>
							)}
						</div>
					))}
					<button
						type='button'
						onClick={handleAddService}
						className='flex items-center gap-2 text-[#E63946] hover:text-[#D62828] font-medium text-sm'
					>
						<PlusCircle size={20} />
						Add Service
					</button>
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
						{isEditMode ? 'Save Project' : 'Add Project'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProjectForm;
