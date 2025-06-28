// components/blog/RelatedArticlesSection.jsx
import React from 'react';
import BlogCard from './BlogCard'; // Make sure this path is correct
import Link from 'next/link';

const RelatedArticlesSection = ({ articles }) => {
	if (!articles || articles.length === 0) return null; // Don't render if no articles

	return (
		// Section container with a light gray background and vertical padding
		<section className='bg-gray-50 py-16 md:py-20 lg:py-24'>
			{' '}
			{/* Changed bg-white to bg-gray-50, adjusted responsive padding */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{' '}
				{/* Standardized horizontal padding */}
				{/* Section Heading */}
				<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-12'>
					{' '}
					{/* Added text-center, adjusted mb- */}
					Related Articles
				</h2>
				{/* Blog Cards Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10'>
					{' '}
					{/* Added sm:gap-10 for consistency */}
					{articles.map((post, index) => (
						<BlogCard key={post.slug || index} post={post} />
					))}
				</div>
				{/* View All Articles Button */}
				<div className='text-center mt-12 md:mt-16'>
					{' '}
					{/* Adjusted mt- for more space */}
					<Link href='/blog' passHref>
						{' '}
						{/* Added passHref for Link wrapping button */}
						<button className='bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md shadow-md transition duration-300 ease-in-out'>
							View All Articles
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default RelatedArticlesSection;
