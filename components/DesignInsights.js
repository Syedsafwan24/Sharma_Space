import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';
import { formatBlogDate } from '@/lib/utils';
import { imageSizes, imageQuality } from '@/lib/imageUtils';

const DesignInsights = ({ blogPosts = [] }) => {
	// Get the first 3 blog posts for the insights section
	const articles = blogPosts.slice(0, 3).map((post) => ({
		tag: post.category || post.tag,
		image: post.image,
		title: post.title,
		summary: post.excerpt, // Using excerpt as summary
		author: {
			name: post.author?.name || 'Sharma Space Team',
			avatar: post.author?.image || '/images/Desgin-Insights/10.webp', // Fallback avatar
		},
		date: post.date,
		slug: post.slug,
	}));

	// Show empty state if no articles
	if (articles.length === 0) {
		return (
			<section className='py-20 bg-white'>
				<div className='max-w-6xl mx-auto px-6'>
					<h2 className='text-4xl font-bold text-center mb-3'>
						Design Insights
					</h2>
					<p className='text-gray-600 text-center mb-12 text-lg'>
						Explore our latest articles for inspiration and expert advice on
						interior design.
					</p>

					{/* Empty State */}
					<div className='text-center py-16'>
						<div className='max-w-md mx-auto'>
							{/* Icon */}
							<div className='mb-6'>
								<svg
									className='mx-auto h-16 w-16 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1.5}
										d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
									/>
								</svg>
							</div>

							{/* Content */}
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								No Articles Yet
							</h3>
							<p className='text-gray-600 mb-6'>
								We're working on bringing you fresh design insights and expert
								tips. Check back soon for inspiring content!
							</p>

							{/* Call to Action */}
							<div className='flex flex-col sm:flex-row gap-3 justify-center'>
								<Link
									href='/blog'
									className='inline-flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200'
								>
									View Blog
								</Link>
								<Link
									href='/contact'
									className='inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
								>
									Get Design Consultation
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-20 bg-white'>
			<div className='max-w-6xl mx-auto px-6'>
				<h2 className='text-4xl font-bold text-center mb-3'>Design Insights</h2>
				<p className='text-gray-600 text-center mb-12 text-lg'>
					Explore our latest articles for inspiration and expert advice on
					interior design.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
					{articles.map((article, idx) => (
						// Added h-full to the Link component
						<Link
							href={`/blog/${article.slug}`}
							key={idx}
							className='block h-full'
						>
							{/* Added h-full to the card div to make it stretch */}
							<div className='bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full'>
								<div className='relative'>
									<OptimizedImage
										src={article.image}
										alt={article.title}
										width={500}
										height={320}
										className='w-full h-56 object-cover'
										quality={imageQuality.blogThumbnail}
										sizes={imageSizes.blogThumbnail}
										showSkeleton={true}
										skeletonClassName='rounded-t-2xl'
									/>
									<span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded'>
										{article.tag}
									</span>
								</div>
								<div className='p-6 flex flex-col flex-1'>
									{/* Title has line-clamp-2 already for consistency */}
									<h3
										className={`text-xl font-bold mb-2 ${
											article.tag === 'TIPS' ? 'text-red-600' : 'text-gray-900'
										}`}
									>
										{article.title}
									</h3>
									{/* Added line-clamp-3 to the summary paragraph */}
									<p className='text-gray-600 mb-4 flex-1 line-clamp-3'>
										{article.summary}
									</p>
									<div className='flex items-center justify-between mt-4'>
										<div className='flex items-center gap-2'>
											<OptimizedImage
												src={article.author.avatar}
												alt={article.author.name}
												width={32}
												height={32}
												className='rounded-full w-8 h-8 object-cover'
												quality={imageQuality.avatar}
												sizes={imageSizes.avatar}
												showSkeleton={true}
												skeletonClassName='rounded-full'
											/>
											<span className='text-gray-700 text-sm font-medium'>
												{article.author.name}
											</span>
										</div>
										<span className='text-gray-400 text-sm'>
											{formatBlogDate(article.date)}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default DesignInsights;
