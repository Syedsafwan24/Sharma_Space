import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { formatBlogDate, fetchWithCacheBust } from '@/lib/utils';

const BlogCard = ({ post, onEdit, onDelete, authors }) => {
	// Support both string and object for author
	let authorName = '';
	let authorImage = '';
	if (typeof post.author === 'object' && post.author !== null) {
		authorName = post.author.name;
		authorImage = post.author.image?.url || post.author.image || '';
	} else if (typeof post.author === 'string') {
		authorName = post.author;
		authorImage = post.authorImage || '';
	}

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this blog post?'))
			return;
		try {
			const res = await fetchWithCacheBust('/api/blog-posts', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: post.id }),
			});
			if (!res.ok) {
				const error = await res.json();
				alert('Error: ' + (error.error || 'Failed to delete blog post'));
				return;
			}
			if (onDelete) onDelete();
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full min-h-[420px]'>
			<div className='relative w-full h-48'>
				<Image
					src={post.image?.url || post.image}
					alt={post.title}
					fill
					className='object-cover'
				/>
			</div>
			<div className='p-6 flex-1 flex flex-col'>
				<p className='text-sm text-gray-500 mb-2'>
					{formatBlogDate(post.date)} • {post.category || post.tag}
				</p>
				<h3 className='text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition duration-300'>
					{post.title}
				</h3>
				<p className='text-gray-700 text-base mb-4 flex-1'>
					{post.description || post.excerpt}
				</p>
				<div className='flex justify-end gap-2 mt-auto pt-4'>
					<button
						onClick={() => onEdit(post)}
						className='text-[#E63946] hover:text-[#D62828] font-medium text-sm'
					>
						Edit
					</button>
					<button
						className='text-gray-500 hover:text-[#1C1C1C] font-medium text-sm'
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
