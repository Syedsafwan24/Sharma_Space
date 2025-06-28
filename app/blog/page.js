import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import blogUnifiedData from '@/app/data/blog/blogUnifiedData';
import BlogHero from '@/components/blog/BlogHero';
import NewsletterSection from '@/components/blog/NewsletterSection';

export const metadata = {
	title: 'Interior Design Blog - Tips & Trends',
	description:
		'Interior design blog with latest trends, tips, and insights from Bangalore experts. Home decor ideas, design guides, and industry updates.',
};

export default function Blog() {
	const posts = blogUnifiedData.posts;
	return (
		<div className='bg-gray-50'>
			<Navigation />
			<BlogHero />
			<main className='min-h-[60vh] py-20'>
				<div className='max-w-6xl mx-auto px-6 text-center'>
					<h1 className='text-4xl font-bold text-gray-900 mb-6'>Design Blog</h1>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto mb-12'>
						Latest trends, tips, and insights from our interior design experts.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left'>
						{posts.map((post) => (
							<BlogCard key={post.slug} post={post} />
						))}
					</div>
				</div>
			</main>
			<NewsletterSection />
			<Footer />
		</div>
	);
}
