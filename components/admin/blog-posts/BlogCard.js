import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

const BlogCard = ({ post, onEdit, authors }) => {
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

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden'>
			<div className='relative w-full h-48'>
				<Image
					src={post.image?.url || post.image}
					alt={post.title}
					fill
					className='object-cover'
				/>
			</div>
			<div className='p-6'>
				<p className='text-sm text-gray-500 mb-2'>
					{post.date} • {post.category || post.tag}
				</p>
				<h3 className='text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition duration-300'>
					{post.title}
				</h3>
				<p className='text-gray-700 text-base mb-4'>
					{post.description || post.excerpt}
				</p>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-gray-700 text-sm'>
						{authorImage ? (
							<Image
								src={authorImage}
								alt={authorName}
								width={24}
								height={24}
								className='rounded-full object-cover'
							/>
						) : (
							<User size={20} className='text-gray-500' />
						)}
						<span>{authorName}</span>
					</div>
					<div className='flex space-x-4'>
						<button
							onClick={() => onEdit(post)}
							className='text-[#E63946] hover:text-[#D62828] font-medium text-sm'
						>
							Edit
						</button>
						<button className='text-gray-500 hover:text-[#1C1C1C] font-medium text-sm'>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
