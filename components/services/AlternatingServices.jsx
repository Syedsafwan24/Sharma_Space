// components/services/AlternatingServices.jsx
import Image from 'next/image';

const AlternatingServices = () => {
	return (
		<section className='py-16 bg-white'>
			<div className='max-w-6xl mx-auto px-6 sm:px-8'>
				{/* 1. Commercial Design */}
				<div className='flex flex-col lg:flex-row items-start gap-8 mb-20'>
					<div className='w-full lg:w-[45%]'>
						<h2 className='text-3xl font-bold text-gray-900 mb-6'>
							Commercial Design
						</h2>
						<div className='space-y-5 text-gray-600 text-base leading-relaxed'>
							<p>
								Functional and inspiring workspaces for businesses that boost
								productivity and reflect your brand identity.
							</p>
							<p>
								We help establish your unique identity in the competitive
								market, creating environments that clients will remember and
								want to return to again and again.
							</p>
						</div>
					</div>
					<div className='w-full lg:w-[55%] h-80 md:h-96 relative rounded-lg overflow-hidden'>
						<Image
							src='/images/bedroom-suite.jpg'
							alt='Commercial Design interior design'
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 55vw'
							priority={true}
						/>
					</div>
				</div>

				{/* 2. Residential Design */}
				<div className='flex flex-col lg:flex-row-reverse items-start gap-8 mb-20'>
					<div className='w-full lg:w-[45%]'>
						<h2 className='text-3xl font-bold text-gray-900 mb-6'>
							Residential Design
						</h2>
						<div className='space-y-5 text-gray-600 text-base leading-relaxed'>
							<p>
								Tailored interiors for homes that reflect your personality and
								enhance your daily living experience.
							</p>
							<p>
								Our team creates beautiful, functional spaces that make your
								home a true reflection of you and your lifestyle.
							</p>
						</div>
					</div>
					<div className='w-full lg:w-[55%] h-80 md:h-96 relative rounded-lg overflow-hidden'>
						<Image
							src='/images/resident.jpg'
							alt='Residential Design interior design'
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 55vw'
							priority={false}
						/>
					</div>
				</div>

				{/* 3. Hospitality Design */}
				<div className='flex flex-col lg:flex-row items-start gap-8 mb-20'>
					<div className='w-full lg:w-[45%]'>
						<h2 className='text-3xl font-bold text-gray-900 mb-6'>
							Hospitality Design
						</h2>
						<div className='space-y-5 text-gray-600 text-base leading-relaxed'>
							<p>
								Creating memorable experiences for hotels and restaurants that
								leave lasting impressions on guests.
							</p>
							<p>
								We design hospitality spaces that combine comfort, style, and
								functionality to delight your guests every time.
							</p>
						</div>
					</div>
					<div className='w-full lg:w-[55%] h-80 md:h-96 relative rounded-lg overflow-hidden'>
						<Image
							src='/images/commercial.jpg'
							alt='Hospitality Design interior design'
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 55vw'
							priority={false}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AlternatingServices;
