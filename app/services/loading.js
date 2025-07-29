// app/services/loading.js
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Loading() {
	return (
		<div className='min-h-screen'>
			<Navigation />
			
			{/* Hero Section Loading */}
			<div className='relative h-96 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse'>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
				<div className='relative z-10 flex flex-col justify-center items-center h-full text-center'>
					<div className='h-12 bg-white/70 rounded w-80 mb-4 animate-pulse'></div>
					<div className='h-6 bg-white/60 rounded w-2/3 animate-pulse'></div>
				</div>
			</div>

			{/* Services Section Loading */}
			<section className='py-16 bg-white'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Section Header Loading */}
					<div className='text-center mb-12'>
						<div className='h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto mb-4 animate-pulse'></div>
						<div className='h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-2/3 mx-auto animate-pulse'></div>
					</div>

					{/* Services Grid Loading */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, i) => (
							<div key={i} className='bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow'>
								<div className='w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg animate-pulse mb-6'></div>
								<div className='h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mb-4'></div>
								<div className='space-y-2 mb-6'>
									<div className='h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
									<div className='h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-4/5'></div>
									<div className='h-4 bg-gradient-to-r from-gray-150 to-gray-250 rounded animate-pulse w-3/4'></div>
								</div>
								<div className='h-10 bg-gradient-to-r from-red-100 to-red-200 rounded animate-pulse'></div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Alternating Services Loading */}
			<section className='py-16 bg-gray-50'>
				<div className='container mx-auto px-4'>
					{[...Array(3)].map((_, i) => (
						<div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 mb-16`}>
							<div className='flex-1'>
								<div className='h-64 bg-gray-200 rounded-lg animate-pulse'></div>
							</div>
							<div className='flex-1 space-y-4'>
								<div className='h-8 bg-gray-200 rounded animate-pulse w-3/4'></div>
								<div className='space-y-2'>
									<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-5/6'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-4/5'></div>
								</div>
								<div className='h-10 bg-gray-200 rounded w-32 animate-pulse'></div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Design Process Loading */}
			<section className='py-16 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-12'>
						<div className='h-10 bg-gray-200 rounded w-80 mx-auto mb-4 animate-pulse'></div>
						<div className='h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse'></div>
					</div>
					
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[...Array(4)].map((_, i) => (
							<div key={i} className='text-center'>
								<div className='w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse'></div>
								<div className='h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse'></div>
								<div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section Loading */}
			<div className='bg-gray-100 py-16'>
				<div className='max-w-4xl mx-auto text-center px-4'>
					<div className='h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse'></div>
					<div className='h-5 bg-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse'></div>
					<div className='h-12 bg-gray-200 rounded w-40 mx-auto animate-pulse'></div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
