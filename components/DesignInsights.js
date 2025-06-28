import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/app/data';

const DesignInsights = () => {
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
									<Image
										src={article.image}
										alt={article.title}
										width={500}
										height={320} // Ensure optimal aspect ratio for image
										className='w-full h-56 object-cover'
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
											<Image
												src={article.author.avatar}
												alt={article.author.name}
												width={32}
												height={32}
												className='rounded-full w-8 h-8 object-cover'
											/>
											<span className='text-gray-700 text-sm font-medium'>
												{article.author.name}
											</span>
										</div>
										<span className='text-gray-400 text-sm'>
											{article.date}
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
