'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProjectGallery = ({ images, videoUrl }) => {
	const [activeTab, setActiveTab] = useState('walkthrough');

	return (
		<section className='mb-16'>
			{/* Tab Navigation */}
			<div className='flex space-x-1 mb-8'>
				{videoUrl && ( // Only show "Walkthrough Video" tab if videoUrl exists
					<button
						onClick={() => setActiveTab('walkthrough')}
						className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
							activeTab === 'walkthrough'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
						}`}
					>
						Walkthrough Video
					</button>
				)}
				{images?.length > 0 && ( // Only show "3D Renders" tab if there are images
					<button
						onClick={() => setActiveTab('renders')}
						className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
							activeTab === 'renders'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
						}`}
					>
						3D Renders
					</button>
				)}
			</div>

			{/* Tab Content */}
			{activeTab === 'walkthrough' && videoUrl && (
				<div className='relative aspect-video rounded-lg overflow-hidden bg-gray-900'>
					<iframe
						src={videoUrl}
						title='Project Walkthrough Video'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
						className='absolute top-0 left-0 w-full h-full'
					></iframe>
				</div>
			)}

			{activeTab === 'renders' && images?.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{images.map((img, index) => (
						<div
							key={index}
							className='relative aspect-square rounded-lg overflow-hidden group cursor-pointer'
						>
							<Image
								src={img}
								alt={`3D Render ${index + 1}`}
								fill
								className='object-cover transition-transform duration-300 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
								<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
										<svg
											className='w-6 h-6 text-gray-900'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
											<path
												fillRule='evenodd'
												d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default ProjectGallery;
