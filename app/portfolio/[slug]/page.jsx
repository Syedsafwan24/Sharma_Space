import ProjectDetailsHeader from '@/components/portfolio/ProjectDetails/ProjectDetailsHeader';
import ProjectDetailsContent from '@/components/portfolio/ProjectDetails/ProjectDetailsContent';
import ProjectGallery from '@/components/portfolio/ProjectDetails/ProjectGallery';
import CtaSection from '@/components/portfolio/ProjectDetails/CtaSection';
import Link from 'next/link';
import portfolioProjects from '@/app/data/portfolio/portfolioUnifiedData';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

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
			<Navigation />
			<ProjectDetailsHeader project={project} />
			<div className='container mx-auto px-4 py-12'>
				<ProjectDetailsContent project={project} />

				{/* Render ProjectGallery only if there are images or a video */}
				{(project.galleryImages?.length > 0 || project.videoUrl) && (
					<ProjectGallery
						images={project.galleryImages}
						videoUrl={project.videoUrl}
					/>
				)}

				{/* Pass current project slug and category to CtaSection */}
				<CtaSection
					currentProjectSlug={project.slug}
					currentProjectCategory={project.category.name}
				/>
			</div>
			<Cta />
			<Footer />
		</div>
	);
}
