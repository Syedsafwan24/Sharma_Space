'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import TopNavbar from '@/components/admin/TopNavbar';
import MessageHeader from '@/components/admin/messages/MessageHeader';
import MessageSearchFilter from '@/components/admin/messages/MessageSearchFilter';
import MessageCard from '@/components/admin/messages/MessageCard';
import { contactMessages } from '@/app/data';
import ReplyMessageModal from '@/components/admin/messages/ReplyMessageModal';
import ReplyMessageForm from '@/components/admin/messages/ReplyMessageForm';

export default function AdminMessages() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [messages, setMessages] = useState(contactMessages);
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState('All'); // 'All', 'Unread', 'Read'

	const filteredMessages = messages.filter((message) => {
		const matchesSearch =
			message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			message.message.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesFilter =
			filter === 'All' ||
			(filter === 'Unread' && !message.read) ||
			(filter === 'Read' && message.read);

		return matchesSearch && matchesFilter;
	});

	const handleMarkAsReadToggle = (id) => {
		setMessages((prevMessages) =>
			prevMessages.map((msg) =>
				msg.id === id ? { ...msg, read: !msg.read } : msg
			)
		);
	};

	const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
	const [messageToReply, setMessageToReply] = useState(null);

	const handleReply = (message) => {
		setMessageToReply(message);
		setIsReplyModalOpen(true);
	};

	const handleCloseReplyModal = () => {
		setIsReplyModalOpen(false);
		setMessageToReply(null);
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
					<div className='bg-white rounded-lg shadow p-6'>
						<MessageHeader />
						<MessageSearchFilter
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							filter={filter}
							setFilter={setFilter}
							unreadCount={messages.filter((msg) => !msg.read).length}
							readCount={messages.filter((msg) => msg.read).length}
						/>
						<div className='mt-6 space-y-4'>
							{filteredMessages.length === 0 ? (
								<p className='text-center text-gray-500'>No messages found.</p>
							) : (
								filteredMessages.map((message) => (
									<MessageCard
										key={message.id}
										message={message}
										onMarkAsReadToggle={handleMarkAsReadToggle}
										onReply={handleReply}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</div>
			<ReplyMessageModal
				isOpen={isReplyModalOpen}
				onClose={handleCloseReplyModal}
			>
				{messageToReply && (
					<ReplyMessageForm
						message={messageToReply}
						onClose={handleCloseReplyModal}
					/>
				)}
			</ReplyMessageModal>
		</div>
	);
}
