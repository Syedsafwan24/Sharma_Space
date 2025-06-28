import blogUnifiedData from '@/app/data/blog/blogUnifiedData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogPostHero from '@/components/blog/BlogPostHero';
import AuthorBio from '@/components/blog/AuthorBio';
import BlogContent from '@/components/blog/BlogContent';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedTags from '@/components/blog/RelatedTags';
import RelatedArticlesSection from '@/components/blog/RelatedArticlesSection';
// import NewsletterSection from '@/components/blog/NewsletterSection';

export async function generateStaticParams() {
	return blogUnifiedData.posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }) {
	const { slug } = params;
	const post = blogUnifiedData.posts.find((post) => post.slug === slug);

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className='bg-gray-50'>
			<Navigation />

			<BlogPostHero
				title={post.title}
				date={post.date}
				tag={post.tag}
				mainImage={post.mainImage}
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
