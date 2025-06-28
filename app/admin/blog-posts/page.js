'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import BlogHeader from '@/components/admin/blog-posts/BlogHeader';
import BlogSearchFilter from '@/components/admin/blog-posts/BlogSearchFilter';
import BlogCard from '@/components/admin/blog-posts/BlogCard';
import EditBlogModal from '@/components/admin/blog-posts/EditBlogModal';
import EditBlogForm from '@/components/admin/blog-posts/EditBlogForm';
import { PlusCircle } from 'lucide-react';
import blogUnifiedData from '@/app/data/blog/blogUnifiedData';

export default function AdminBlogPostsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedBlogPost, setSelectedBlogPost] = useState(null);

	const posts = blogUnifiedData.posts;
	const categories = blogUnifiedData.categories;
	const authors = blogUnifiedData.authors;

	const filteredBlogPosts = posts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.metaDescription?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter =
			activeFilter === 'all' ||
			post.category.toLowerCase() === activeFilter.toLowerCase();
		return matchesSearch && matchesFilter;
	});

	const handleEditBlogPost = (post) => {
		setSelectedBlogPost(post);
		setIsEditModalOpen(true);
	};

	const handleAddBlogPost = () => {
		setSelectedBlogPost(null);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedBlogPost(null);
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
				Loading...
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen bg-[#F8F9FA]'>
			<TopNavbar />
			<div className='flex flex-1'>
				<div className='hidden lg:block fixed top-0 left-0 h-full w-64 z-20 bg-white border-r'>
					<Sidebar />
				</div>
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8 lg:ml-64'>
					<BlogHeader onAddBlogPostClick={handleAddBlogPost} />
					<BlogSearchFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
						categories={categories}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredBlogPosts.map((post) => (
							<BlogCard
								key={post.slug}
								post={post}
								onEdit={handleEditBlogPost}
								authors={authors}
							/>
						))}
					</div>
				</div>
			</div>
			<button
				onClick={handleAddBlogPost}
				className='fixed bottom-4 right-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200 shadow-lg lg:hidden z-50'
			>
				<PlusCircle size={24} />
				New Blog Post
			</button>

			<EditBlogModal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
				{selectedBlogPost ? (
					<EditBlogForm
						blogPost={selectedBlogPost}
						onClose={handleCloseEditModal}
						categories={categories}
						authors={authors}
					/>
				) : (
					<EditBlogForm
						onClose={handleCloseEditModal}
						categories={categories}
						authors={authors}
					/>
				)}
			</EditBlogModal>
		</div>
	);
}
