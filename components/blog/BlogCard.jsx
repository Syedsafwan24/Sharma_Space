import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatBlogDate } from '@/lib/utils';

const BlogCard = ({ post }) => {
	const { slug, image, title, excerpt, tag, authorName, authorImage, date } =
		post;

	// Use the same logic as the detail page for image selection
	let imageSrc = '/images/placeholder.svg';
	if (image && image !== '') {
		imageSrc = image.url || image;
	}

	return (
		<Link href={`/blog/${slug}`} className='block h-full'>
			<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden h-full flex flex-col group cursor-pointer hover:-translate-y-1'>
				{/* Image Container with Category Badge */}
				<div className='relative w-full h-48 sm:h-56 md:h-64 overflow-hidden'>
					<Image
						src={imageSrc}
						alt={title}
						fill
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>

					{/* Category Badge */}
					<div className='absolute top-4 left-4'>
						<span className='bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider'>
							{tag}
						</span>
					</div>
				</div>

				{/* Content Area */}
				<div className='p-6 flex flex-col flex-grow'>
					{/* Title */}
					<h3 className='text-xl font-bold text-gray-900 leading-tight mb-4 line-clamp-2'>
						{title}
					</h3>

					{/* Excerpt */}
					<p className='text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3'>
						{excerpt}
					</p>

					{/* Author and Date Section */}
					<div className='flex items-center mt-auto pt-4 border-t border-gray-100'>
						<div className='flex items-center flex-grow'>
							<div className='w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-200 flex items-center justify-center'>
								{authorImage ? (
									<Image
										src={authorImage}
										alt={authorName || 'Author'}
										width={32}
										height={32}
										className='w-full h-full object-cover'
									/>
								) : (
									<div className='w-full h-full bg-red-600 flex items-center justify-center text-white text-xs font-bold'>
										{authorName?.charAt(0) || 'A'}
									</div>
								)}
							</div>
							<span className='text-sm text-gray-700 font-medium'>
								{authorName || 'Author'}
							</span>
						</div>
						<span className='text-sm text-gray-500 ml-4'>
							{formatBlogDate(date)}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;
