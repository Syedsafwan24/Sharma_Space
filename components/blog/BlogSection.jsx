import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component from Next.js
import BlogCard from './BlogCard';
import { blogPosts } from '@/app/data/blogUnifiedData';

const BlogSection = () => {
	// Get the first 3 blog posts
	const featuredPosts = blogPosts.slice(0, 3);

	return (
		<section className='bg-white py-16'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold leading-tight text-gray-900 mb-4'>
						Our Latest Articles
					</h2>
					<p className='text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto'>
						Explore our collection of articles on interior design tips, trends,
						and inspiration.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{blogPosts.map((post, index) => (
						<BlogCard key={index} post={post} />
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
