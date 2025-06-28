import React, { useState } from 'react';
import Image from 'next/image';
import EditProjectModal from './EditProjectModal';
import EditProjectForm from './EditProjectForm';
import { useMutation } from '@tanstack/react-query';

const ProjectCard = ({ project, onEdit, refetchProjects }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState(null);

	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			const res = await fetch('/api/projects', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});
			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || 'Failed to delete project');
			}
			return res.json();
		},
		onSuccess: () => {
			if (refetchProjects) refetchProjects();
		},
		onError: (err) => {
			setError(err.message);
		},
	});

	const handleEditClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this project?')) {
			deleteMutation.mutate(project.id);
		}
	};

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden'>
			<div className='relative w-full h-48'>
				<Image
					src={project?.image || '/placeholder.svg'}
					alt={project?.title || 'Project Image'}
					fill
					className='object-cover'
				/>
			</div>
			<div className='p-4'>
				<div className='flex justify-between items-start mb-2'>
					<h3 className='text-lg font-semibold text-[#1C1C1C]'>
						{project?.title || 'Project Title'}
					</h3>
					<span className='bg-[#EDEDED] text-[#E63946] text-xs font-medium px-2.5 py-0.5 rounded-full'>
						{project?.category || 'Category'}
					</span>
				</div>
				<p className='text-gray-600 text-sm mb-4 line-clamp-3'>
					{project?.description ||
						'A sleek, minimalist design with neutral tones and contemporary furnishings. This project transformed...'}
				</p>
				{error && <div className='text-red-600 mb-2'>{error}</div>}
				<div className='flex space-x-4'>
					<button
						onClick={handleEditClick}
						className='text-[#E63946] hover:text-[#D62828] font-medium text-sm'
					>
						Edit
					</button>
					<button
						onClick={handleDelete}
						className='text-gray-500 hover:text-[#1C1C1C] font-medium text-sm'
						disabled={deleteMutation.isLoading}
					>
						{deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
					</button>
				</div>
			</div>

			<EditProjectModal isOpen={isModalOpen} onClose={handleCloseModal}>
				<EditProjectForm
					project={project}
					onClose={handleCloseModal}
					refetchProjects={refetchProjects}
				/>
			</EditProjectModal>
		</div>
	);
};

export default ProjectCard;
