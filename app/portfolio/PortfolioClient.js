// app/portfolio/PortfolioClient.js
'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import PortfolioGrid from '../../components/portfolio/PortfolioGrid';
import Cta from '@/components/Cta';

export default function PortfolioClient() {
	const [activeFilter, setActiveFilter] = useState('all');

	// Use ISR: revalidate every 60 seconds for fresh but not continuous data
	const [projects, setProjects] = useState([]);

	// Fetch projects on component mount
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects`,
					{ next: { revalidate: 60 } }
				);
				const projectsData = await res.json();
				setProjects(projectsData);
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-grow'>
				<HeroPortfolio />

				<div className='container mx-auto px-4 py-12'>
					<PortfolioFilter
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>

					<PortfolioGrid projects={projects} activeFilter={activeFilter} />
				</div>
			</main>
			<Cta
				title="Let's Work Together"
				description='have a project in mind? Our team of expert designers is ready to bring your vision to life.'
				buttonText='Start a Project'
				backgroundColor='bg-gray-100'
				textColor='text-gray-700'
				buttonBgColor='bg-[#E63946]'
				buttonTextColor='text-white'
			/>
			<Footer />
		</div>
	);
}
