'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import ServiceHeader from '@/components/admin/services/ServiceHeader';
import ServiceSearchFilter from '@/components/admin/services/ServiceSearchFilter';
import ServiceCard from '@/components/admin/services/ServiceCard';
import EditServiceModal from '@/components/admin/services/EditServiceModal';
import EditServiceForm from '@/components/admin/services/EditServiceForm';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { services } from '@/app/data';

export default function AdminServicesPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedService, setSelectedService] = useState(null);

	const filteredServices = services.filter((service) => {
		const matchesSearch =
			service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			service.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesSearch;
	});

	const handleEditService = (service) => {
		setSelectedService(service);
		setIsEditModalOpen(true);
	};

	const handleAddService = () => {
		setSelectedService(null);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedService(null);
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
				Loading...
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen bg-[#F8F9FA]'>
			<TopNavbar />
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8'>
					<ServiceHeader onAddServiceClick={handleAddService} />
					<ServiceSearchFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredServices.map((service) => (
							<ServiceCard
								key={service.id}
								service={service}
								onEdit={handleEditService}
							/>
						))}
					</div>
				</div>
			</div>
			<button
				onClick={handleAddService}
				className='fixed bottom-4 right-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200 shadow-lg lg:hidden z-50'
			>
				<PlusCircle size={24} />
				Add New Service
			</button>

			<EditServiceModal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
				{selectedService ? (
					<EditServiceForm
						service={selectedService}
						onClose={handleCloseEditModal}
					/>
				) : (
					<EditServiceForm onClose={handleCloseEditModal} />
				)}
			</EditServiceModal>
		</div>
	);
}
