// app/blog/[slug]/loading.js
import Footer from '@/components/Footer';

export default function Loading() {
	return (
		<div className='bg-gray-50 min-h-screen'>
			{/* Hero Section Loading */}
			<div className='relative h-96 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse'>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
				<div className='relative z-10 flex flex-col justify-end h-full p-8'>
					<div className='max-w-4xl mx-auto'>
						<div className='h-4 bg-red-300/60 rounded w-24 mb-4 animate-pulse'></div>
						<div className='h-8 bg-white/70 rounded w-3/4 mb-2 animate-pulse'></div>
						<div className='h-8 bg-white/70 rounded w-1/2 animate-pulse'></div>
					</div>
				</div>
			</div>

			{/* Content Section Loading */}
			<main className='py-12 md:py-20'>
				<article className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Author Bio Loading */}
					<div className='flex items-center gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100'>
						<div className='w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full animate-pulse'></div>
						<div className='flex-1'>
							<div className='h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-2 animate-pulse'></div>
							<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-48 animate-pulse'></div>
						</div>
					</div>

					{/* Content Loading */}
					<div className='bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-100'>
						<div className='space-y-4'>
							{[...Array(8)].map((_, i) => (
								<div key={i} className='space-y-2'>
									<div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-5/6'></div>
									<div className='h-4 bg-gradient-to-r from-gray-150 to-gray-250 rounded animate-pulse w-4/6'></div>
								</div>
							))}
						</div>
					</div>

					{/* Share Buttons Loading */}
					<div className='flex gap-4 justify-center mb-8'>
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className='w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded animate-pulse'></div>
						))}
					</div>

					{/* Related Articles Loading */}
					<div className='bg-white rounded-lg shadow-sm p-8 border border-gray-100'>
						<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-6 animate-pulse'></div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{[1, 2, 3].map((i) => (
								<div key={i} className='space-y-4'>
									<div className='h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4 animate-pulse'></div>
								</div>
							))}
						</div>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	);
}
