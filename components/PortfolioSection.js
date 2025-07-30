// app/components/PortfolioSection.jsx
'use client';

import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';
import React from 'react';
import { imageSizes, imageQuality } from '@/lib/imageUtils';

/* -------------------------------------------------------------------------- */
/*  Card components                                                           */
/* -------------------------------------------------------------------------- */

const HeroCard = ({ project }) => {
	return (
		<article className='relative group h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'>
			{/* Image */}
			<OptimizedImage
				src={project.image.url || project.image}
				alt={`${project.title} interior design`}
				fill
				className='object-cover transition duration-500 group-hover:scale-110'
				sizes={imageSizes.portfolioCard}
				priority={true}
				quality={imageQuality.portfolio}
				showSkeleton={true}
				skeletonClassName='rounded-2xl'
			/>

			{/* Gradient overlay - Always visible, enhanced on hover */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-all duration-300 z-10' />

			{/* Caption - Always visible, enhanced on hover */}
			<div className='absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end h-full p-6 text-white transform transition-all duration-300'>
				<div className='space-y-3'>
					<h3 className='text-2xl font-bold leading-snug text-white drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300'>
						{project.title}
					</h3>
					{(project.description || project.shortDescription) && (
						<p className='text-sm leading-relaxed line-clamp-3 text-gray-100 drop-shadow-md opacity-95 group-hover:opacity-100 transition-opacity duration-300'>
							{project.shortDescription || project.description}
						</p>
					)}
					<Link
						href={`/portfolio/${project.slug}`}
						className='inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-fit'
					>
						View Project{' '}
						<span
							aria-hidden
							className='transition-transform duration-300 group-hover:translate-x-1'
						>
							→
						</span>
					</Link>
				</div>
			</div>
		</article>
	);
};

const ThumbCard = ({ project }) => {
	return (
		<Link href={`/portfolio/${project.slug}`} className='block'>
			<article className='relative group h-48 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300'>
				<OptimizedImage
					src={project.image.url || project.image}
					alt={project.title}
					fill
					className='object-cover transition duration-500 group-hover:scale-110'
					sizes={imageSizes.portfolioCard}
					quality={imageQuality.thumbnail}
					showSkeleton={true}
					skeletonClassName='rounded-xl'
				/>

				{/* Overlay for better text visibility - Always visible, enhanced on hover */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent group-hover:from-black/95 transition-all duration-300 z-10' />

				{/* Title with better visibility - Always visible */}
				<div className='absolute bottom-0 left-0 right-0 z-20 p-4 transform transition-all duration-300'>
					<h4 className='text-white text-base font-semibold drop-shadow-lg leading-tight group-hover:text-yellow-200 transition-colors duration-300'>
						{project.title}
					</h4>
					{(project.shortDescription || project.description) && (
						<p className='text-gray-200 text-xs mt-2 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300'>
							{project.shortDescription || project.description}
						</p>
					)}
					<span className='inline-flex items-center text-red-400 text-xs mt-2 font-medium group-hover:text-red-300 transition-colors duration-300'>
						View Details →
					</span>
				</div>
			</article>
		</Link>
	);
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const PortfolioSection = ({ projects = [], loading = false }) => {
	// Get featured projects or first 5 projects
	const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);
	const displayProjects =
		featuredProjects.length >= 5 ? featuredProjects : projects.slice(0, 5);

	return (
		<section id='portfolio' className='py-12 sm:py-16 md:py-20'>
			<div className='mx-auto max-w-7xl px-4'>
				{/* Section header */}
				<header className='mb-12 text-center'>
					<h2 className='text-3xl md:text-4xl font-extrabold text-[#1C1C1C]'>
						Featured Projects
					</h2>
					<p className='mt-4 max-w-3xl mx-auto text-base md:text-lg text-neutral-600'>
						Browse through our portfolio of meticulously crafted spaces designed
						to inspire.
					</p>
				</header>

				{loading ? (
					<>
						{/* Loading skeleton for main grid */}
						<div className='grid gap-8 lg:grid-cols-2 mb-10'>
							{[1, 2].map((i) => (
								<div
									key={i}
									className='relative h-[400px] rounded-2xl overflow-hidden shadow-lg bg-gray-200 animate-pulse'
								>
									<div className='absolute bottom-6 left-6 right-6'>
										<div className='h-6 bg-gray-300 rounded mb-2'></div>
										<div className='h-4 bg-gray-300 rounded w-3/4'></div>
									</div>
								</div>
							))}
						</div>

						{/* Loading skeleton for thumbnails */}
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='relative h-48 rounded-xl overflow-hidden bg-gray-200 animate-pulse'
								>
									<div className='absolute bottom-3 left-4'>
										<div className='h-4 bg-gray-300 rounded w-24'></div>
									</div>
								</div>
							))}
						</div>
					</>
				) : displayProjects.length === 0 ? (
					<div className='text-center py-16'>
						<div className='max-w-md mx-auto'>
							{/* Icon */}
							<div className='mb-6'>
								<svg
									className='mx-auto h-16 w-16 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1.5}
										d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
									/>
								</svg>
							</div>

							{/* Content */}
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								No Projects Available
							</h3>
							<p className='text-gray-600 mb-6'>
								We're currently updating our portfolio with stunning new
								projects. Check back soon to see our latest work!
							</p>

							{/* Call to Action */}
							<Link
								href='/contact'
								className='inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-center'
							>
								Start Your Project
							</Link>
						</div>
					</div>
				) : (
					<>
						{/* Main (2-col) grid for first two projects */}
						<div className='grid gap-8 lg:grid-cols-2 mb-10'>
							{displayProjects.slice(0, 2).map((project) => (
								<HeroCard key={project.id} project={project} />
							))}
						</div>

						{/* Thumbnails (3-col on lg) for the rest */}
						<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16'>
							{displayProjects.slice(2).map((project) => (
								<ThumbCard key={project.id} project={project} />
							))}
						</div>
					</>
				)}

				{/* CTA button - Only show when there are projects */}
				{displayProjects.length > 0 && (
					<div className='text-center'>
						<Link
							href='/portfolio'
							className='inline-block rounded border border-[#E63946] px-8 py-3 text-sm font-semibold
                       text-[#E63946] hover:bg-[#E63946] hover:text-white transition'
						>
							View Full Portfolio
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default PortfolioSection;
