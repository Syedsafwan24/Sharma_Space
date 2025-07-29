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
		<article className='relative group h-[400px] rounded-2xl overflow-hidden shadow-lg'>
			{/* Image */}
			<OptimizedImage
				src={project.image.url || project.image}
				alt={`${project.title} interior design`}
				fill
				className='object-cover transition duration-300 group-hover:scale-105'
				sizes={imageSizes.portfolioCard}
				priority={true}
				quality={imageQuality.portfolio}
				showSkeleton={true}
				skeletonClassName='rounded-2xl'
			/>

			{/* Gradient overlay */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />

			{/* Caption */}
			<div className='relative z-10 flex flex-col justify-end h-full p-6 text-white'>
				<h3 className='text-2xl font-semibold leading-snug'>{project.title}</h3>
				{project.description && (
					<p className='mt-2 text-sm leading-relaxed line-clamp-3'>
						{project.shortDescription || project.description}
					</p>
				)}
				<Link
					href={`/portfolio/${project.slug}`}
					className='mt-4 inline-flex items-center gap-1 text-sm font-medium tracking-wide hover:text-[#E63946] transition'
				>
					View Project <span aria-hidden>→</span>
				</Link>
			</div>
		</article>
	);
};

const ThumbCard = ({ project }) => {
	return (
		<article className='relative group h-48 rounded-xl overflow-hidden'>
			<OptimizedImage
				src={project.image.url || project.image}
				alt={project.title}
				fill
				className='object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-75'
				sizes={imageSizes.portfolioCard}
				quality={imageQuality.thumbnail}
				showSkeleton={true}
				skeletonClassName='rounded-xl'
			/>

			<h4 className='absolute bottom-3 left-4 z-10 text-white text-base font-medium drop-shadow-sm'>
				{project.title}
			</h4>
		</article>
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
		<section id='portfolio' className='py-24'>
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
								className='inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
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

				{/* CTA button */}
				<div className='text-center'>
					<Link
						href='/portfolio'
						className='inline-block rounded border border-[#E63946] px-8 py-3 text-sm font-semibold
                       text-[#E63946] hover:bg-[#E63946] hover:text-white transition'
					>
						View Full Portfolio
					</Link>
				</div>
			</div>
		</section>
	);
};

export default PortfolioSection;
