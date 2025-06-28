// app/components/PortfolioSection.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';

/* -------------------------------------------------------------------------- */
/*  Card components                                                           */
/* -------------------------------------------------------------------------- */

const HeroCard = ({ project }) => (
	<article className='relative group h-[400px] rounded-2xl overflow-hidden shadow-lg'>
		{/* Image */}
		<Image
			src={project.image.url || project.image}
			alt={`${project.title} interior design`}
			fill
			sizes='(min-width: 1024px) 50vw, 100vw'
			priority
			className='object-cover transition duration-300 group-hover:scale-105'
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

const ThumbCard = ({ project }) => (
	<article className='relative group h-48 rounded-xl overflow-hidden'>
		<Image
			src={project.image.url || project.image}
			alt={project.title}
			fill
			sizes='(min-width: 1024px) 20vw, 50vw'
			className='object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-75'
		/>

		<h4 className='absolute bottom-3 left-4 z-10 text-white text-base font-medium drop-shadow-sm'>
			{project.title}
		</h4>
	</article>
);

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const PortfolioSection = () => {
	// Get featured projects or first 5 projects
	const featuredProjects = portfolioProjects
		.filter((p) => p.featured)
		.slice(0, 5);
	const projects =
		featuredProjects.length >= 5
			? featuredProjects
			: portfolioProjects.slice(0, 5);

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

				{/* Main (2-col) grid for first two projects */}
				<div className='grid gap-8 lg:grid-cols-2 mb-10'>
					{projects.slice(0, 2).map((project) => (
						<HeroCard key={project.id} project={project} />
					))}
				</div>

				{/* Thumbnails (3-col on lg) for the rest */}
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16'>
					{projects.slice(2).map((project) => (
						<ThumbCard key={project.id} project={project} />
					))}
				</div>

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
