// components/services/AlternatingServices.jsx
import Image from 'next/image';
import { services } from '@/app/data';

const AlternatingServices = () => {
	// Get the first 3 services for the alternating layout
	const alternatingServices = services.slice(0, 3).map((service, index) => ({
		title: service.title,
		description: [
			service.description,
			service.features ? service.features.slice(0, 2).join('. ') + '.' : 'We help establish your unique identity in the competitive market, creating environments that clients will remember and want to return to again and again.'
		],
		image: service.image?.url || '/images/resident.jpg', // Fallback image
		alt: `${service.title} interior design`,
		reverse: index % 2 === 1,
	}));

	return (
		<section className='py-16 bg-white'>
			<div className='max-w-6xl mx-auto px-6 sm:px-8'>
				{alternatingServices.map((service, index) => (
					<div
						key={index}
						className={`flex flex-col ${
							service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
						} items-start gap-8 mb-20 last:mb-0`}
					>
						{/* Text Column - Now includes the title */}
						<div className='w-full lg:w-[45%]'>
							<h2 className='text-3xl font-bold text-gray-900 mb-6'>
								{service.title}
							</h2>
							<div className='space-y-5 text-gray-600 text-base leading-relaxed'>
								{service.description.map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}
							</div>
						</div>

						{/* Image Column */}
						<div className='w-full lg:w-[55%] h-80 md:h-96 relative rounded-lg overflow-hidden'>
							<Image
								src={service.image}
								alt={service.alt}
								fill
								className='object-cover'
								sizes='(max-width: 1024px) 100vw, 55vw'
								priority={index === 0}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default AlternatingServices;