'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import TestimonialHeader from '@/components/admin/testimonials/TestimonialHeader';
import TestimonialSearchFilter from '@/components/admin/testimonials/TestimonialSearchFilter';
import TestimonialCard from '@/components/admin/testimonials/TestimonialCard';
import EditTestimonialModal from '@/components/admin/testimonials/EditTestimonialModal';
import EditTestimonialForm from '@/components/admin/testimonials/EditTestimonialForm';
import { PlusCircle } from 'lucide-react';

export default function AdminTestimonials() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [testimonialsList, setTestimonialsList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedTestimonial, setSelectedTestimonial] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login');
		}
	}, [status, router]);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch('/api/testimonials');
				const data = await response.json();
				setTestimonialsList(data);
			} catch (error) {
				console.error('Error fetching testimonials:', error);
			} finally {
				setLoading(false);
			}
		};

		if (status === 'authenticated') {
			fetchTestimonials();
		}
	}, [status]);

	const filteredTestimonials = Array.isArray(testimonialsList)
		? testimonialsList.filter(
				(testimonial) =>
					testimonial.fullName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					testimonial.location
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					testimonial.text?.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	const handleEditTestimonial = (testimonial) => {
		setSelectedTestimonial(testimonial);
		setIsEditModalOpen(true);
	};

	const handleAddTestimonial = () => {
		setSelectedTestimonial(null);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setSelectedTestimonial(null);
	};

	const refetchTestimonials = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/testimonials');
			const data = await response.json();
			setTestimonialsList(data);
		} catch (error) {
			console.error('Error fetching testimonials:', error);
		} finally {
			setLoading(false);
		}
	};

	if (status === 'loading' || loading) {
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
					<TestimonialHeader onAddTestimonialClick={handleAddTestimonial} />
					<TestimonialSearchFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mx-auto px-4'>
						{filteredTestimonials.length === 0 ? (
							<div className='col-span-full text-center text-gray-400'>
								No data available.
							</div>
						) : (
							filteredTestimonials.map((testimonial) => (
								<TestimonialCard
									key={testimonial.id}
									testimonial={testimonial}
									onEdit={handleEditTestimonial}
									onDelete={refetchTestimonials}
								/>
							))
						)}
					</div>
				</div>
			</div>
			<button
				onClick={handleAddTestimonial}
				className='fixed bottom-20 right-4 bg-[#E63946] hover:bg-[#D62828] text-white font-semibold rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg w-16 h-16 md:hidden z-50'
				aria-label='Add New Testimonial'
			>
				<PlusCircle size={32} />
			</button>

			<EditTestimonialModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
			>
				{selectedTestimonial ? (
					<EditTestimonialForm
						testimonial={selectedTestimonial}
						onClose={handleCloseEditModal}
						refetchTestimonials={refetchTestimonials}
					/>
				) : (
					<EditTestimonialForm
						onClose={handleCloseEditModal}
						refetchTestimonials={refetchTestimonials}
					/>
				)}
			</EditTestimonialModal>
		</div>
	);
}
