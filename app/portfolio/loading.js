// app/portfolio/loading.js
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Loading() {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navigation />
			
			<main className='flex-grow'>
				{/* Hero Section Loading */}
				<div className='relative h-96 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse'>
					<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
					<div className='relative z-10 flex flex-col justify-center items-center h-full text-center'>
						<div className='h-12 bg-white/70 rounded w-96 mb-4 animate-pulse'></div>
						<div className='h-6 bg-white/60 rounded w-2/3 animate-pulse'></div>
					</div>
				</div>

				<div className='container mx-auto px-4 py-12'>
					{/* Filter Loading */}
					<div className='flex justify-center mb-12'>
						<div className='flex gap-4'>
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className='h-10 bg-gradient-to-r from-red-100 to-red-200 rounded-full w-24 animate-pulse border border-red-200'></div>
							))}
						</div>
					</div>

					{/* Portfolio Grid Loading */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, i) => (
							<div key={i} className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100'>
								<div className='w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse'></div>
								<div className='p-6'>
									<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-2'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse mb-4 w-2/3'></div>
									<div className='h-4 bg-gradient-to-r from-red-100 to-red-200 rounded animate-pulse w-1/2'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			
			{/* CTA Section Loading */}
			<div className='bg-gradient-to-br from-gray-50 to-gray-100 py-16'>
				<div className='max-w-4xl mx-auto text-center px-4'>
					<div className='h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80 mx-auto mb-4 animate-pulse'></div>
					<div className='h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse'></div>
					<div className='h-12 bg-gradient-to-r from-red-200 to-red-300 rounded w-40 mx-auto animate-pulse'></div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
