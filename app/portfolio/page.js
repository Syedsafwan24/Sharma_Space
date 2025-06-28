// app/portfolio/page.jsx
'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroPortfolio from '@/components/portfolio/HeroPortfolio';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import Cta from '@/components/Cta';

// Remove the metadata export from here since we can't use it with 'use client'
// We'll handle metadata differently (see solutions below)

export default function Portfolio() {
	const [activeFilter, setActiveFilter] = useState('all');

	return (
		<div className='min-h-screen flex flex-col'>
			<Navigation />

			<main className='flex-grow'>
				<HeroPortfolio />

				<div className='container mx-auto px-4 py-12'>
					<PortfolioFilter
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>

					<PortfolioGrid activeFilter={activeFilter} />
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
