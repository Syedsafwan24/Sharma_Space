'use client';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogHero from '@/components/blog/BlogHero';
import NewsletterSection from '@/components/blog/NewsletterSection';
import useSWR from 'swr';
import { fetchWithCacheBust } from '@/lib/utils';

const fetcher = () =>
	fetchWithCacheBust('/api/blog-posts').then((res) => res.json());

export default function Blog() {
	const {
		data: posts,
		isLoading,
		error,
	} = useSWR('/api/blog-posts', fetcher, {
		refreshInterval: 5000, // 5 seconds
		revalidateOnFocus: true,
		revalidateIfStale: true,
	});

	return (
		<div className='bg-gray-50'>
			<BlogHero />
			<main className='min-h-[60vh] py-20'>
				<div className='max-w-6xl mx-auto px-6 text-center'>
					<h1 className='text-4xl font-bold text-gray-900 mb-6'>Design Blog</h1>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto mb-12'>
						Latest trends, tips, and insights from our interior design experts.
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left'>
						{isLoading ? (
							<div className='col-span-full text-center py-8'>
								<p className='text-gray-500'>Loading...</p>
							</div>
						) : error ? (
							<div className='col-span-full text-center py-8'>
								<p className='text-red-500'>Failed to load blog posts.</p>
							</div>
						) : posts && posts.length > 0 ? (
							posts.map((post) => <BlogCard key={post.slug} post={post} />)
						) : (
							<div className='col-span-full text-center py-8'>
								<p className='text-gray-500'>No blog posts available.</p>
							</div>
						)}
					</div>
				</div>
			</main>
			<NewsletterSection />
			<Footer />
		</div>
	);
}
