'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, onEdit, onDelete }) => {
	return (
		<div className='bg-white rounded-lg shadow p-6 flex flex-col'>
			<div className='flex items-center mb-4'>
				{testimonial.image && (
					<Image
						src={testimonial.image?.url || testimonial.image}
						alt={testimonial.fullName || testimonial.name}
						width={56}
						height={56}
						className='rounded-full object-cover mr-4'
					/>
				)}
				<div>
					<h3 className='text-lg font-semibold text-[#1C1C1C]'>
						{testimonial.fullName || testimonial.name}
					</h3>
					<p className='text-gray-600 text-sm'>{testimonial.location}</p>
					<div className='flex items-center mt-1'>
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								size={16}
								fill={i < testimonial.rating ? '#FFD700' : 'none'}
								stroke={i < testimonial.rating ? '#FFD700' : '#9CA3AF'}
								className='mr-1'
							/>
						))}
						<span className='text-sm text-gray-600'>
							({testimonial.rating}/5)
						</span>
					</div>
				</div>
			</div>
			<p className='text-gray-700 mb-4 flex-grow'>"{testimonial.text}"</p>
			<div className='flex justify-end gap-2 mt-auto'>
				<button
					onClick={() => onEdit(testimonial)}
					className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
				>
					Edit
				</button>
				<button
					onClick={() => onDelete(testimonial.id)}
					className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TestimonialCard;
