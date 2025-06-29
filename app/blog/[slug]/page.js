import Footer from '@/components/Footer';
import BlogPostHero from '@/components/blog/BlogPostHero';
import AuthorBio from '@/components/blog/AuthorBio';
import BlogContent from '@/components/blog/BlogContent';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedTags from '@/components/blog/RelatedTags';
import RelatedArticlesSection from '@/components/blog/RelatedArticlesSection';
import { fetchBlogPosts, fetchBlogPost } from '@/lib/utils';
// import NewsletterSection from '@/components/blog/NewsletterSection';

// export async function generateStaticParams() {
// 	const posts = await fetchBlogPosts();
// 	return posts.map((post) => ({ slug: post.slug }));
// }

export async function generateMetadata({ params }) {
	const post = await fetchBlogPost(params.slug);
	if (!post) return { title: 'Not Found' };
	return {
		title: post.title,
		description: post.excerpt || post.description || '',
		openGraph: {
			title: post.title,
			description: post.excerpt || post.description || '',
			images: post.mainImage ? [{ url: post.mainImage }] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.excerpt || post.description || '',
			image: post.mainImage,
		},
		other: {
			'application/ld+json': JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: post.title,
				author: { '@type': 'Person', name: post.author?.name || '' },
				datePublished: post.date,
				image: post.mainImage,
				publisher: { '@type': 'Organization', name: 'Sharma Space' },
			}),
		},
	};
}

export default async function BlogPostPage({ params }) {
	const { slug } = params;
	const post = await fetchBlogPost(slug);

	if (!post) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Blog Post Not Found
					</h1>
					<p className='mt-4 text-gray-600'>
						The blog post you're looking for doesn't exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-gray-50'>
			<BlogPostHero
				title={post.title}
				date={post.date}
				tag={post.tag}
				mainImage={post.mainImage}
				image={post.image}
			/>

			<main className='py-12 md:py-20'>
				<article className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<AuthorBio author={post.author} />
					<BlogContent content={post.content} />
					<ShareButtons title={post.title} />
					<RelatedTags tags={post.relatedTags} />
				</article>
			</main>

			<RelatedArticlesSection articles={post.relatedArticles} />

			{/* <NewsletterSection /> */}

			<Footer />
		</div>
	);
}
