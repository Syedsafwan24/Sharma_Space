import React from 'react';
import Link from 'next/link';

const BlogCard = ({ post }) => {
	const { slug, image, title, excerpt, tag, author, date } = post;

	return (
		<Link href={`/blog/${slug}`} className='block h-full'>
			<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden h-full flex flex-col group cursor-pointer hover:-translate-y-1'>
				{/* Image Container with Category Badge */}
				<div className='relative w-full h-48 sm:h-56 md:h-64 overflow-hidden'>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>

					{/* Category Badge - positioned exactly like in your image */}
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
								{author?.image ? (
									<img
										src={author.image}
										alt={author?.name || 'Author'}
										className='w-full h-full object-cover'
									/>
								) : (
									<div className='w-full h-full bg-red-600 flex items-center justify-center text-white text-xs font-bold'>
										{author?.name?.charAt(0) || 'A'}
									</div>
								)}
							</div>
							<span className='text-sm text-gray-700 font-medium'>
								{author?.name || 'Author'}
							</span>
						</div>
						<span className='text-sm text-gray-500 ml-4'>{date}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;
