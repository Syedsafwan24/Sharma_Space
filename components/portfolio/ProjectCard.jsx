// app/components/portfolio/ProjectCard.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project, priority = false }) => {
	// Ensure the slug is properly formatted
	const projectSlug =
		project.slug || project.title.toLowerCase().replace(/\s+/g, '-');

	const imageSrc =
		project.coverImage?.url ||
		project.coverImage ||
		project.image?.url ||
		project.image ||
		'/images/placeholder.svg';

	// Generate a better blur placeholder
	const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
		`<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill="#f3f4f6"/>
			<text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">Loading...</text>
		</svg>`
	).toString('base64')}`;

	return (
		<div className='group relative h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
			{/* Image with hover effect - optimized */}
			<div className='absolute inset-0 h-full w-full overflow-hidden'>
				<Image
					src={imageSrc}
					alt={project.title}
					fill
					className='object-cover transition-all duration-500 group-hover:scale-105'
					sizes='(max-width: 1024px) 100vw, 33vw'
					placeholder='blur'
					blurDataURL={blurDataURL}
					priority={priority}
					loading={priority ? 'eager' : 'lazy'}
				/>
			</div>

			{/* Gradient overlay - unchanged */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90' />

			{/* Content container - unchanged layout */}
			<div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
				<h3 className='text-xl font-bold mb-3 drop-shadow-md line-clamp-2'>
					{project.title}
				</h3>

				<div className='min-h-[80px] mb-4'>
					<p className='text-sm leading-relaxed line-clamp-3 drop-shadow-sm whitespace-pre-line'>
						{project.shortDescription || project.description}
					</p>
				</div>

				{/* Updated Link component with proper slug handling */}
				<Link
					href={`/portfolio/${projectSlug}`}
					className='inline-flex items-center text-[#E63946] font-medium hover:underline text-sm group/link'
					passHref
				>
					View Project
					<span className='ml-1 transition-transform duration-300 group-hover/link:translate-x-1'>
						→
					</span>
				</Link>
			</div>

			{/* Category tag - unchanged */}
			{project.category && (
				<span className='absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm'>
					{project.category.name}
				</span>
			)}
		</div>
	);
};

export default ProjectCard;
