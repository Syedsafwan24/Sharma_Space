// app/portfolio/[slug]/loading.jsx
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Loading() {
	return (
		<div className='min-h-screen'>
			<Navigation />
			
			{/* Project Header Loading */}
			<div className='relative h-96 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse'>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
				<div className='relative z-10 flex flex-col justify-end h-full p-8'>
					<div className='max-w-6xl mx-auto'>
						<div className='h-4 bg-red-300/60 rounded w-32 mb-4 animate-pulse'></div>
						<div className='h-10 bg-white/70 rounded w-3/4 mb-4 animate-pulse'></div>
						<div className='h-5 bg-white/70 rounded w-1/2 animate-pulse'></div>
					</div>
				</div>
			</div>

			{/* Content Loading */}
			<div className='container mx-auto px-4 py-12'>
				{/* Project Details Loading */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16'>
					<div className='lg:col-span-2'>
						<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-6 animate-pulse'></div>
						<div className='space-y-4 mb-8'>
							{[...Array(4)].map((_, i) => (
								<div key={i} className='space-y-2'>
									<div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-5/6'></div>
								</div>
							))}
						</div>
					</div>
					
					<div className='space-y-6'>
						<div>
							<div className='h-5 bg-gradient-to-r from-red-200 to-red-300 rounded w-24 mb-2 animate-pulse'></div>
							<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-32 animate-pulse'></div>
						</div>
						<div>
							<div className='h-5 bg-gradient-to-r from-red-200 to-red-300 rounded w-24 mb-2 animate-pulse'></div>
							<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-28 animate-pulse'></div>
						</div>
						<div>
							<div className='h-5 bg-gradient-to-r from-red-200 to-red-300 rounded w-24 mb-2 animate-pulse'></div>
							<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-36 animate-pulse'></div>
						</div>
					</div>
				</div>

				{/* Gallery Loading */}
				<div className='mb-16'>
					<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-8 animate-pulse'></div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(6)].map((_, i) => (
							<div key={i} className='aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse shadow-sm'></div>
						))}
					</div>
				</div>

				{/* Similar Projects Loading */}
				<div>
					<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-8 animate-pulse'></div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='space-y-4 bg-white rounded-lg p-4 shadow-sm border border-gray-100'>
								<div className='aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse'></div>
								<div className='h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
								<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4 animate-pulse'></div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section Loading */}
			<div className='bg-gradient-to-br from-gray-50 to-gray-100 py-16'>
				<div className='max-w-4xl mx-auto text-center px-4'>
					<div className='h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto mb-4 animate-pulse'></div>
					<div className='h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse'></div>
					<div className='h-12 bg-gradient-to-r from-red-200 to-red-300 rounded w-40 mx-auto animate-pulse'></div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
