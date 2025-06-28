import React from 'react';

const NewsletterSection = () => {
	return (
		<section className='bg-gray-50 py-16 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto text-center'>
				<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
					Subscribe to Our Newsletter
				</h2>
				<p className='text-base sm:text-lg text-gray-600 mb-8'>
					Stay updated with our latest articles, design tips, and project
					showcases.
				</p>
				<div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
					<input
						type='email'
						placeholder='Enter your email'
						aria-label='Enter your email for newsletter'
						className='w-full sm:w-80 px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400'
					/>
					<button
						type='submit'
						className='w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
					>
						Subscribe
					</button>
				</div>
			</div>
		</section>
	);
};

export default NewsletterSection;
