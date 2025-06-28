'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetailsContent = ({ project }) => {
	const [displayImage, setDisplayImage] = useState(
		project.coverImage?.url ||
			project.coverImage ||
			project.image?.url ||
			project.image
	);
	const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(-1);

	useEffect(() => {
		setDisplayImage(
			project.coverImage?.url ||
				project.coverImage ||
				project.image?.url ||
				project.image
		);
		setActiveThumbnailIndex(-1);
	}, [project]);

	const handleThumbnailClick = (imageSrc, index) => {
		setDisplayImage(imageSrc);
		setActiveThumbnailIndex(index);
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16'>
			{/* Left Column - Main Image and Thumbnails */}
			<div className='lg:col-span-2'>
				{/* Main Image */}
				<div className='relative aspect-[4/3] rounded-lg overflow-hidden mb-6'>
					<Image
						src={displayImage}
						alt={project.title}
						fill
						className='object-cover'
						sizes='(max-width: 1024px) 100vw, 66vw'
					/>
				</div>

				{/* Thumbnail Gallery - Display if galleryImages exist */}
				{project.galleryImages && project.galleryImages.length > 0 && (
					<div className='grid grid-cols-4 gap-4'>
						{/* Main project image as a thumbnail (optional, but good for consistency) */}
						<button
							onClick={() =>
								handleThumbnailClick(
									project.coverImage?.url ||
										project.coverImage ||
										project.image?.url ||
										project.image,
									-1
								)
							}
							className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
								activeThumbnailIndex === -1
									? 'border-red-600 ring-2 ring-red-600 ring-opacity-50'
									: 'border-gray-200 hover:border-gray-300'
							}`}
						>
							<Image
								src={project.image?.url || project.image}
								alt={`${project.title} - Main View`}
								fill
								className='object-cover'
							/>
						</button>

						{/* Other gallery images as thumbnails */}
						{project.galleryImages.slice(0, 3).map((image, index) => (
							<button
								key={index}
								onClick={() => handleThumbnailClick(image.url || image, index)}
								className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
									activeThumbnailIndex === index
										? 'border-red-600 ring-2 ring-red-600 ring-opacity-50'
										: 'border-gray-200 hover:border-gray-300'
								}`}
							>
								<Image
									src={image.url || image}
									alt={`Gallery thumbnail ${index + 1}`}
									fill
									className='object-cover'
								/>
							</button>
						))}
					</div>
				)}
			</div>

			{/* Right Column - Project Details */}
			<div className='lg:col-span-1'>
				<div className='bg-white p-8 rounded-lg shadow-sm border border-gray-200 sticky lg:top-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Project Details
					</h2>

					<p className='text-gray-600 mb-8 leading-relaxed'>
						{project.description}
					</p>

					<div className='space-y-6 mb-8'>
						<div>
							<h3 className='text-sm font-semibold text-gray-900 mb-2'>
								Client:
							</h3>
							<p className='text-gray-600'>{project.client}</p>
						</div>

						<div>
							<h3 className='text-sm font-semibold text-gray-900 mb-2'>
								Location:
							</h3>
							<p className='text-gray-600'>{project.location}</p>
						</div>

						<div>
							<h3 className='text-sm font-semibold text-gray-900 mb-2'>
								Area:
							</h3>
							<p className='text-gray-600'>{project.area}</p>
						</div>

						<div>
							<h3 className='text-sm font-semibold text-gray-900 mb-2'>
								Completed:
							</h3>
							<p className='text-gray-600'>{project.completedDate}</p>
						</div>
					</div>

					{/* Changed button to Link component */}
					<Link
						href='/contact' // Link to your contact page
						className='w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 text-center inline-block'
					>
						Request Similar Project
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsContent;
