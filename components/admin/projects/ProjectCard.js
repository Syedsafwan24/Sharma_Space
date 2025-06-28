import React, { useState } from 'react';
import Image from 'next/image';
import EditProjectModal from './EditProjectModal';
import EditProjectForm from './EditProjectForm';

const ProjectCard = ({ project }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
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
						{project?.category?.name || 'Category'}
					</span>
				</div>
				<p className='text-gray-600 text-sm mb-4 line-clamp-3'>
					{project?.description ||
						'A sleek, minimalist design with neutral tones and contemporary furnishings. This project transformed...'}
				</p>
				<div className='flex space-x-4'>
					<button
						onClick={handleEditClick}
						className='text-[#E63946] hover:text-[#D62828] font-medium text-sm'
					>
						Edit
					</button>
					<button className='text-gray-500 hover:text-[#1C1C1C] font-medium text-sm'>
						Delete
					</button>
				</div>
			</div>

			<EditProjectModal isOpen={isModalOpen} onClose={handleCloseModal}>
				<EditProjectForm project={project} onClose={handleCloseModal} />
			</EditProjectModal>
		</div>
	);
};

export default ProjectCard;
