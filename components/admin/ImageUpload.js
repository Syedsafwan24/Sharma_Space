'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

const ImageUpload = ({
	label,
	currentImage,
	onImageChange,
	onRemove,
	showRemove = false,
	required = false,
	className = '',
}) => {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState('');

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Validate file type
		const allowedTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/webp',
			'image/gif',
		];
		if (!allowedTypes.includes(file.type)) {
			setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
			return;
		}

		// Validate file size (5MB limit)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			setError('File size too large. Maximum size is 5MB.');
			return;
		}

		setUploading(true);
		setError('');

		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Upload failed');
			}

			onImageChange(data.filePath);
		} catch (err) {
			setError(err.message || 'Upload failed');
		} finally {
			setUploading(false);
		}
	};

	const handleRemove = () => {
		onImageChange('');
		setError('');
	};

	return (
		<div className={`mb-4 ${className}`}>
			<label className='block text-[#1C1C1C] text-xs font-semibold mb-2'>
				{label} {required && '*'}
			</label>

			<div className='flex items-end gap-2'>
				<div className='flex-1'>
					<div className='relative'>
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							disabled={uploading}
							className='hidden'
							id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
						/>
						<label
							htmlFor={`file-upload-${label
								.replace(/\s+/g, '-')
								.toLowerCase()}`}
							className={`flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-[#EDEDED] rounded-md cursor-pointer transition-colors duration-200 ${
								uploading
									? 'bg-gray-100 cursor-not-allowed'
									: 'hover:border-[#E63946] hover:bg-gray-50'
							}`}
						>
							{uploading ? (
								<div className='flex items-center gap-2 text-gray-500'>
									<Loader2 size={16} className='animate-spin' />
									<span className='text-sm'>Uploading...</span>
								</div>
							) : (
								<div className='flex items-center gap-2 text-gray-500'>
									<Upload size={16} />
									<span className='text-sm'>
										{currentImage ? 'Change Image' : 'Click to upload image'}
									</span>
								</div>
							)}
						</label>
					</div>

					{error && <p className='text-red-500 text-xs mt-1'>{error}</p>}

					{currentImage && (
						<p className='text-green-600 text-xs mt-1'>
							✓ Image uploaded successfully
						</p>
					)}
				</div>

				{currentImage && (
					<div className='w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-[#EDEDED] relative'>
						<Image
							src={currentImage}
							alt='Preview'
							width={80}
							height={80}
							className='object-cover w-full h-full'
						/>
						{showRemove && (
							<button
								type='button'
								onClick={handleRemove}
								className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200'
								title='Remove image'
							>
								<X size={12} />
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
