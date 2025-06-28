import { PrismaClient } from '../../../lib/generated/prisma/index.js';
import ProjectDetailsHeader from '../../../components/portfolio/ProjectDetails/ProjectDetailsHeader.jsx';
import ProjectDetailsContent from '../../../components/portfolio/ProjectDetails/ProjectDetailsContent.jsx';
import ProjectGallery from '../../../components/portfolio/ProjectDetails/ProjectGallery.jsx';
import CtaSection from '../../../components/portfolio/ProjectDetails/CtaSection.jsx';
import Link from 'next/link';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const prisma = new PrismaClient();

export async function generateStaticParams() {
	try {
		const projects = await prisma.project.findMany({
			select: { slug: true },
		});
		return projects.map((project) => ({
			slug: project.slug,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

export default async function ProjectDetailPage({ params }) {
	const { slug } = params;

	try {
		// Fetch the specific project and all projects for similar projects
		const [project, allProjects] = await Promise.all([
			prisma.project.findFirst({
				where: { slug },
				include: {
					// Include any related data if needed
				},
			}),
			prisma.project.findMany({
				select: {
					id: true,
					slug: true,
					title: true,
					category: true,
					location: true,
					image: true,
				},
			}),
		]);

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

					{/* Pass current project slug, category, and all projects to CtaSection */}
					<CtaSection
						currentProjectSlug={project.slug}
						currentProjectCategory={project.category}
						allProjects={allProjects}
					/>
				</div>
				<Cta />
				<Footer />
			</div>
		);
	} catch (error) {
		console.error('Error fetching project:', error);
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Error Loading Project
					</h1>
					<p className='mt-4 text-gray-600'>
						Something went wrong while loading the project.
					</p>
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
}
