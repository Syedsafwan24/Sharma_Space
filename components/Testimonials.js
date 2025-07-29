'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
	const [expanded, setExpanded] = useState(false);
	const textRef = useRef(null);
	const [needsTruncation, setNeedsTruncation] = useState(false);

	useEffect(() => {
		if (textRef.current) {
			setNeedsTruncation(
				textRef.current.scrollHeight > textRef.current.clientHeight
			);
		}
	}, []);

	return (
		<div className='h-full bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 flex flex-col'>
			<FaQuoteLeft className='text-red-100 text-2xl mb-4' />

			<div
				ref={textRef}
				className={`text-left italic text-gray-700 leading-relaxed mb-6 ${
					!expanded && needsTruncation ? 'line-clamp-4' : ''
				}`}
			>
				&quot;{testimonial.text}&quot;
			</div>

			{needsTruncation && (
				<button
					onClick={() => setExpanded(!expanded)}
					className='text-sm text-[#E63946] hover:text-[#c82e3b] self-start mb-6 transition'
				>
					{expanded ? 'Read less' : 'Read more'}
				</button>
			)}

			<div className='mt-auto pt-4 border-t border-gray-100'>
				<div className='flex items-center gap-4'>
					<div className='w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm'>
						<Image
							src={testimonial.image?.url || testimonial.image}
							alt={testimonial.fullName || testimonial.name}
							width={48}
							height={48}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='flex-1'>
						<div className='font-semibold text-gray-900'>
							{testimonial.fullName || testimonial.name}
						</div>
						<div className='text-sm text-gray-500'>{testimonial.location}</div>
					</div>
					<div className='flex items-center'>
						{[...Array(5)].map((_, i) => (
							<span key={i} className='text-yellow-400 text-lg'>
								★
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const Testimonials = ({ testimonials = [], loading = false }) => {
	const isCarousel = testimonials.length > 3;
	const [sliderRef, instanceRef] = useKeenSlider({
		loop: true,
		slides: {
			origin: 'center',
			perView: 3,
			spacing: 24,
		},
		breakpoints: {
			'(max-width: 1024px)': {
				slides: {
					perView: 2,
					spacing: 20,
				},
			},
			'(max-width: 640px)': {
				slides: {
					perView: 1,
					spacing: 16,
				},
			},
		},
	});

	// Autoplay functionality
	useEffect(() => {
		let interval;
		if (isCarousel && instanceRef.current) {
			const slider = instanceRef.current;
			const startAutoplay = () => {
				clearInterval(interval);
				interval = setInterval(() => {
					slider.next();
				}, 5000);
			};

			startAutoplay();
			slider.container.addEventListener('mouseover', () =>
				clearInterval(interval)
			);
			slider.container.addEventListener('mouseout', startAutoplay);

			return () => {
				clearInterval(interval);
				slider.container.removeEventListener('mouseover', () =>
					clearInterval(interval)
				);
				slider.container.removeEventListener('mouseout', startAutoplay);
			};
		}
	}, [instanceRef, isCarousel]);

	return (
		<section className='bg-white py-16 sm:py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3'>
						Client Testimonials
					</h2>
					<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
						Hear what our clients have to say about working with us
					</p>
				</div>

				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[1, 2, 3].map((i) => (
							<div key={i} className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-8'>
								<div className='w-6 h-6 bg-gray-200 rounded animate-pulse mb-4'></div>
								<div className='space-y-2 mb-6'>
									<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-5/6'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-4/6'></div>
									<div className='h-4 bg-gray-200 rounded animate-pulse w-3/4'></div>
								</div>
								<div className='pt-4 border-t border-gray-100'>
									<div className='flex items-center gap-4'>
										<div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
										<div className='flex-1'>
											<div className='h-4 bg-gray-200 rounded animate-pulse mb-1'></div>
											<div className='h-3 bg-gray-200 rounded animate-pulse w-2/3'></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : testimonials.length === 0 ? (
					<div className='text-center text-gray-500 py-12'>
						<p>No testimonials available at the moment.</p>
					</div>
				) : isCarousel ? (
					<div className='relative'>
						<div ref={sliderRef} className='keen-slider py-4'>
							{testimonials.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className='keen-slider__slide h-auto px-2'
								>
									<TestimonialCard testimonial={testimonial} />
								</div>
							))}
						</div>

						<div className='flex justify-center gap-4 mt-10'>
							<button
								onClick={() => instanceRef.current?.prev()}
								aria-label='Previous testimonial'
								className='bg-[#E63946] hover:bg-[#c82e3b] text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-opacity-50'
							>
								<ChevronLeft size={28} />
							</button>
							<button
								onClick={() => instanceRef.current?.next()}
								aria-label='Next testimonial'
								className='bg-[#E63946] hover:bg-[#c82e3b] text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-opacity-50'
							>
								<ChevronRight size={28} />
							</button>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{testimonials.map((testimonial, index) => (
							<TestimonialCard key={testimonial.id} testimonial={testimonial} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Testimonials;
