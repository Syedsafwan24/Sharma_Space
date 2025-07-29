'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import BlogHeader from '@/components/admin/blog-posts/BlogHeader';
import BlogSearchFilter from '@/components/admin/blog-posts/BlogSearchFilter';
import BlogCard from '@/components/admin/blog-posts/BlogCard';
import EditBlogModal from '@/components/admin/blog-posts/EditBlogModal';
import EditBlogForm from '@/components/admin/blog-posts/EditBlogForm';
import { PlusCircle } from 'lucide-react';
import { fetchWithCacheBust } from '@/lib/utils';

export default function AdminBlogPostsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedBlogPost, setSelectedBlogPost] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	const fetchBlogPosts = useCallback(async () => {
		try {
			const response = await fetchWithCacheBust('/api/blog-posts');
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			// Handle error silently
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (status === 'authenticated') {
			fetchBlogPosts();
		}
	}, [status, fetchBlogPosts]);

	// Extract unique categories from posts
	const safePosts = Array.isArray(posts) ? posts : [];
	const categories = [...new Set(safePosts.map((post) => post.tag))].filter(
		Boolean
	);

	// Mock authors data (you can create an authors API if needed)
	const authors = [
		{
			id: 'sharma-space-team',
			name: 'Sharma Space Team',
			image: '/images/Desgin-Insights/10.webp',
		},
	];

	const filteredBlogPosts = safePosts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.metaDescription?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter =
			activeFilter === 'all' ||
			post.tag?.toLowerCase() === activeFilter.toLowerCase();
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

	const refetchBlogPosts = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetchWithCacheBust('/api/blog-posts');
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			// Handle error silently
		} finally {
			setLoading(false);
		}
	}, []);

	if (status === 'loading' || loading) {
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
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8'>
					<BlogHeader onAddBlogPostClick={handleAddBlogPost} />
					<BlogSearchFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
						categories={categories}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredBlogPosts.length === 0 ? (
							<div className='col-span-full text-center text-gray-400'>
								No data available.
							</div>
						) : (
							filteredBlogPosts.map((post) => (
								<BlogCard
									key={post.slug}
									post={post}
									onEdit={handleEditBlogPost}
									onDelete={refetchBlogPosts}
									authors={authors}
								/>
							))
						)}
					</div>
				</div>
			</div>
			<button
				onClick={handleAddBlogPost}
				className='fixed bottom-20 right-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg w-16 h-16 md:hidden z-50'
				aria-label='Add New Blog Post'
			>
				<PlusCircle size={32} />
			</button>

			<EditBlogModal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
				{selectedBlogPost ? (
					<EditBlogForm
						blogPost={selectedBlogPost}
						onClose={handleCloseEditModal}
						categories={categories}
						authors={authors}
						refetchBlogPosts={refetchBlogPosts}
					/>
				) : (
					<EditBlogForm
						onClose={handleCloseEditModal}
						categories={categories}
						authors={authors}
						refetchBlogPosts={refetchBlogPosts}
					/>
				)}
			</EditBlogModal>
		</div>
	);
}
