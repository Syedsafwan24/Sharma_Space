'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import ProjectHeader from '@/components/admin/projects/ProjectHeader';
import ProjectSearchFilter from '@/components/admin/projects/ProjectSearchFilter';
import ProjectCard from '@/components/admin/projects/ProjectCard';
import EditProjectModal from '@/components/admin/projects/EditProjectModal';
import EditProjectForm from '@/components/admin/projects/EditProjectForm';
import { PlusCircle } from 'lucide-react';

export default function AdminProjectsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	// Fetch projects dynamically
	const {
		data: projects = [],
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['admin-projects'],
		queryFn: async () => {
			const res = await fetch('/api/projects');
			if (!res.ok) throw new Error('Failed to fetch projects');
			return res.json();
		},
	});

	const safeProjects = Array.isArray(projects) ? projects : [];
	const filteredProjects = safeProjects.filter((project) => {
		const matchesFilter =
			activeFilter === 'All' || project.category === activeFilter;
		const matchesSearch =
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const handleEditProject = (project) => {
		setSelectedProject(project);
		setIsEditModalOpen(true);
	};

	const handleAddProject = () => {
		setSelectedProject(null);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedProject(null);
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	if (status === 'loading' || isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
				Loading...
			</div>
		);
	}

	if (isError) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA] text-red-600'>
				Failed to load projects.
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen bg-[#F8F9FA]'>
			<TopNavbar />
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8'>
					<ProjectHeader onAddProjectClick={handleAddProject} />
					<ProjectSearchFilter
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredProjects.length === 0 ? (
							<div className='col-span-full text-center text-gray-400'>
								No data available.
							</div>
						) : (
							filteredProjects.map((project, index) => (
								<ProjectCard
									key={project.id || index}
									project={project}
									onEdit={handleEditProject}
									refetchProjects={refetch}
								/>
							))
						)}
					</div>
				</div>
			</div>

			{/* Floating add button for mobile */}
			<button
				onClick={handleAddProject}
				className='fixed bottom-20 right-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg w-16 h-16 md:hidden z-50'
				aria-label='Add New Project'
			>
				<PlusCircle size={32} />
			</button>

			{/* Modal */}
			<EditProjectModal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
				{selectedProject && (
					<EditProjectForm
						project={selectedProject}
						onClose={handleCloseEditModal}
						refetchProjects={refetch}
					/>
				)}
				{!selectedProject && (
					<EditProjectForm
						onClose={handleCloseEditModal}
						refetchProjects={refetch}
					/>
				)}
			</EditProjectModal>
		</div>
	);
}
