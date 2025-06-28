// app/portfolio/[slug]/page.jsx
import Link from 'next/link';
import ProjectDetailsHeader from '@/components/portfolio/ProjectDetails/Header';
import ProjectDetailsContent from '@/components/portfolio/ProjectDetails/Content';
import ProjectGallery from '@/components/portfolio/ProjectDetails/Gallery';
import CtaSection from '@/components/portfolio/ProjectDetails/CtaSection';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';

export async function generateStaticParams() {
	return portfolioProjects.map((project) => ({
		slug: project.slug,
	}));
}

export default function ProjectDetail({ params }) {
	const project = portfolioProjects.find((p) => p.slug === params.slug);

	if (!project) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Project Not Found
					</h1>
					<Link
						href='/portfolio'
						className='mt-4 inline-block text-[#E63946] hover:underline'
					>
						← Back to Portfolio
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen'>
			<ProjectDetailsHeader project={project} />
			<div className='container mx-auto px-4 py-12'>
				<ProjectDetailsContent project={project} />
				{project.galleryImages?.length > 0 && (
					<ProjectGallery images={project.galleryImages} />
				)}
				<CtaSection />
			</div>
		</div>
	);
}
