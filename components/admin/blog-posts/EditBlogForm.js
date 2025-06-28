'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle, X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

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
				<label className='block text-[#1C1C1C] text-xs font-semibold mb-2'>
					{label}
				</label>
				<input
					type='text'
					value={imageUrl}
					onChange={(e) => onImageUrlChange(e.target.value)}
					className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
					placeholder='Enter image URL'
				/>
			</div>
			{imageUrl && (
				<div className='w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-[#EDEDED]'>
					<Image
						src={imageUrl}
						alt='Preview'
						width={64}
						height={64}
						className='object-cover w-full h-full'
					/>
				</div>
			)}
			{showRemove && (
				<button
					onClick={onRemove}
					className='p-2 text-gray-400 hover:text-[#E63946] transition-colors duration-200'
				>
					<MinusCircle size={18} />
				</button>
			)}
		</div>
	);
};

const EditBlogForm = ({ blogPost, onClose, refetchBlogPosts }) => {
	const isEditMode = !!blogPost;
	const [formData, setFormData] = useState({
		title: blogPost?.title || '',
		date: blogPost?.date || '',
		tag: blogPost?.tag || blogPost?.category || '',
		image: blogPost?.image || '',
		mainImage: blogPost?.mainImage || '',
		excerpt: blogPost?.excerpt || '',
		authorName: blogPost?.author?.name || '',
		authorImage: blogPost?.author?.image || '',
		content: blogPost?.content || '',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// Generate slug from title
		const slug = formData.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');
		// Format date as ISO string
		const dateISO = new Date(formData.date).toISOString();
		// Prepare blog post data for saving (flat, matches Prisma model)
		const cleanedData = {
			slug,
			title: formData.title,
			date: dateISO,
			tag: formData.tag,
			image: formData.image,
			mainImage: formData.mainImage,
			excerpt: formData.excerpt,
			authorName: formData.authorName,
			authorImage: formData.authorImage,
			content: formData.content,
		};
		try {
			const method = isEditMode ? 'PUT' : 'POST';
			const url = '/api/blog-posts';
			const body = isEditMode
				? { ...cleanedData, id: blogPost.id }
				: cleanedData;
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const error = await res.json();
				alert('Error: ' + (error.error || 'Failed to save blog post'));
				return;
			}
			if (refetchBlogPosts) refetchBlogPosts();
			onClose();
		} catch (err) {
			alert('Error: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-[#F8F9FA] p-0 rounded-xl'>
			<div className='px-8 pt-8 pb-2'>
				<h2 className='text-2xl font-bold text-[#1C1C1C] mb-1'>
					{isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
				</h2>
				<p className='text-gray-500 text-sm mb-6'>
					{isEditMode
						? 'Update the details of your blog post.'
						: 'Fill in the details for the new blog post.'}
				</p>
			</div>
			<form onSubmit={handleSubmit} className='px-8 pb-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
					<div>
						<label
							htmlFor='title'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Title
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='date'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Publish Date
						</label>
						<input
							type='date'
							id='date'
							name='date'
							value={formData.date}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='tag'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Category/Tag
						</label>
						<select
							id='tag'
							name='tag'
							value={formData.tag}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						>
							<option value=''>Select Category</option>
							<option value='TRENDS'>Trends</option>
							<option value='GUIDES'>Guides</option>
							<option value='TIPS'>Tips</option>
						</select>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
					<div>
						<label
							htmlFor='image'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Card Image URL
						</label>
						<input
							type='text'
							id='image'
							name='image'
							value={formData.image}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='mainImage'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Hero Image URL
						</label>
						<input
							type='text'
							id='mainImage'
							name='mainImage'
							value={formData.mainImage}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						/>
					</div>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='excerpt'
						className='block text-[#1C1C1C] text-xs font-semibold mb-2'
					>
						Excerpt
					</label>
					<textarea
						id='excerpt'
						name='excerpt'
						value={formData.excerpt}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm h-20 resize-none'
						placeholder='A short summary of the blog post'
						required
					></textarea>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
					<div>
						<label
							htmlFor='authorName'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Author Name
						</label>
						<input
							type='text'
							id='authorName'
							name='authorName'
							value={formData.authorName}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='authorImage'
							className='block text-[#1C1C1C] text-xs font-semibold mb-2'
						>
							Author Image URL
						</label>
						<input
							type='text'
							id='authorImage'
							name='authorImage'
							value={formData.authorImage}
							onChange={handleChange}
							className='w-full px-3 py-2 border border-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white text-sm'
						/>
					</div>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='content'
						className='block text-[#1C1C1C] text-xs font-semibold mb-2'
					>
						Content
					</label>
					<div className='w-full'>
						<Editor
							id='content'
							apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || ''}
							value={formData.content}
							onEditorChange={(content) =>
								setFormData((prev) => ({ ...prev, content }))
							}
							init={{
								height: 300,
								menubar: true,
								plugins: [
									'advlist autolink lists link image charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime media table paste code help wordcount',
								],
								toolbar:
									'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | code',
								content_style:
									'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
							}}
						/>
					</div>
				</div>
				<div className='flex justify-end gap-4 mt-8'>
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
							? 'Save Blog Post'
							: 'Add Blog Post'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditBlogForm;
