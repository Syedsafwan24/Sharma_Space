'use client';

import React from 'react';
import {
	Sofa,
	Building,
	Hotel,
	LayoutGrid,
	Hammer,
	Armchair,
} from 'lucide-react';

// Map icon names to components
const iconMap = {
	Sofa: Sofa,
	Building: Building,
	Hotel: Hotel,
	LayoutGrid: LayoutGrid,
	Hammer: Hammer,
	Armchair: Armchair, // Replaces Chair
};

const ServiceCard = ({ service, onEdit, onDelete }) => {
	const IconComponent = iconMap[service.icon];

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this service?'))
			return;
		try {
			const res = await fetch('/api/services', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: service.id }),
			});
			if (!res.ok) {
				const error = await res.json();
				alert('Error: ' + (error.error || 'Failed to delete service'));
				return;
			}
			if (onDelete) onDelete();
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	return (
		<div className='bg-white rounded-lg shadow-md p-6 flex flex-col justify-between'>
			<div className='flex justify-between items-start mb-4'>
				<h3 className='text-lg font-semibold text-[#1C1C1C]'>
					{service.title}
				</h3>
				{IconComponent && (
					<div className='w-10 h-10 bg-[#EDEDED] rounded-full flex items-center justify-center flex-shrink-0'>
						<IconComponent size={20} className='text-[#E63946]' />
					</div>
				)}
			</div>
			<p className='text-gray-600 text-sm mb-4 line-clamp-3'>
				{service.description}
			</p>
			<div className='flex gap-2 mt-4'>
				<button
					onClick={() => onEdit(service)}
					className='text-[#E63946] hover:text-[#D62828] font-medium text-base'
				>
					Edit
				</button>
				<button
					onClick={handleDelete}
					className='text-gray-500 hover:text-[#1C1C1C] font-medium text-base'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ServiceCard;
